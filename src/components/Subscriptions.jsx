import React, { useState, useEffect } from 'react';
import SubscriptionCard from './SubscriptionCard';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [allFeatures, setAllFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/subscriptions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSubscriptions(data);

        const allFeaturesSet = new Set();
        data.forEach(subscription =>
          subscription.features.forEach(feature => allFeaturesSet.add(feature.description))
        );

        setAllFeatures(Array.from(allFeaturesSet));
        console.log('from subscription')
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div className="flex justify-center font-bold">
      <div>Loading...</div>
    </div>
  )
  if (error) return (
    <div className="flex justify-center font-bold">
      <div>Error fetching subscriptions: {error}</div>
    </div>
  )

  return (
    <div className="px-2 grid grid-cols-1 lg:grid-cols-3 lg:px-10 lg:gap-10 gap-4 place-items-center">
      {subscriptions.map(subscription => (
        <div key={subscription.id}>
          <SubscriptionCard subscription={subscription} allFeatures={allFeatures} />
        </div>
      ))}
    </div>
  );
};

export default Subscriptions;
