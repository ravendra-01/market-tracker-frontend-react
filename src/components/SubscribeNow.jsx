import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionCard from './SubscriptionCard';

const SubscribeNow = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [allFeatures, setAllFeatures] = useState([]);
  const [subscriptionId, setSubscriptionId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/subscriptions');
        const data = await response.json();
        setSubscriptions(data);

        const allFeaturesSet = new Set();
        data.forEach(subscription =>
          subscription.features.forEach(feature => allFeaturesSet.add(feature.description))
        );
        setAllFeatures(Array.from(allFeaturesSet));

        if (data.length > 0) {
          setSubscriptionId(data[0].id);
          setSubscription(data[0]);
        }
      } catch (error) {
        handleError('Error fetching subscriptions:', error);
      }
    };
    fetchSubscriptions();
  }, []);

  const handleSubscriptionChange = (e) => {
    const selectedId = e.target.value;
    setSubscriptionId(selectedId);
    const foundSubscription = subscriptions.find(sub => sub.id === Number(selectedId));
    setSubscription(foundSubscription);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/razorpay_payments/create_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription_id: subscriptionId,
          name,
          email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData.errors || {});
      } else {
        const data = await response.json();
        openRazorpayPayment(data);
      }
    } catch (error) {
      handleError('Error submitting form:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    return newErrors;
  };

  const handleError = (message, error) => {
    console.error(message, error);
    alert(`${message} ${error}`);
  };

  const openRazorpayPayment = (data) => {
    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      name: 'Market Tracker',
      description: data.description,
      order_id: data.order_id,
      handler: (response) => handlePaymentSuccess(response),
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  const handlePaymentSuccess = (response) => {
    fetch('http://localhost:3000/api/v1/razorpay_payments/verify_payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        subscription_id: subscriptionId,
      }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.error);
          });
        }
        return response.json();
      })
      .then(data => {
        alert(data.message);
        navigate('/');
      })
      .catch(error => {
        handleError('Error verifying payment:', error);
      });
  };

  return (
    <div id="subscribe-now-form" className="mt-8 mx-auto p-10 min-h-screen w-1/2 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Subscribe Us</h2>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <FormField
          label="Subscription"
          type="select"
          id="subscription_id"
          value={subscriptionId}
          onChange={handleSubscriptionChange}
          options={subscriptions}
          error={errors.subscription_id}
        />
        {subscription && (
          <SubscriptionCard subscription={subscription} allFeatures={allFeatures} />
        )}
        <FormField
          label="Name"
          type="text"
          id="name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <FormField
          label="Email"
          type="email"
          id="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <div>
          <button
            type="submit"
            id="payment-form"
            className="bg-purple-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Make Payment
          </button>
        </div>
      </form>
    </div>
  );
};

const FormField = ({ label, type, id, value, onChange, placeholder, options, error }) => (
  <div>
    <label htmlFor={id} className="block font-medium text-gray-600">{label}</label>
    {type === 'select' ? (
      <select
        id={id}
        className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-purple-500"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-purple-500"
        value={value}
        onChange={onChange}
      />
    )}
    {error && <div className="text-red-600">{error}</div>}
  </div>
);

export default SubscribeNow;
