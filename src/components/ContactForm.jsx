import React, { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleError = (message, error) => {
    console.error(message, error);
    alert(`${message} ${error}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.errors.join(','));
      } else {
        const data = await response.json();
        alert(data.message);
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      handleError('Error submitting form:', error);
    }
  };

  return (
    <div id="contact-us-form" className="mt-8">
      <h2 className="text-2xl font-bold">Contact Us</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <FormField
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          error={errors.name}
        />
        <FormField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          error={errors.email}
        />
        <FormField
          type="textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
          error={errors.message}
        />
        <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded cursor-pointer">
          Send Message
        </button>
      </form>
    </div>
  );
};

const FormField = ({ type, value, onChange, placeholder, error }) => (
  <div>
    {type === 'textarea' ? (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border border-purple-400 rounded"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border border-purple-400 rounded"
      />
    )}
    {error && <div className="text-red-600">{error}</div>}
  </div>
);

export default ContactForm;
