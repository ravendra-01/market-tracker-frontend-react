import React from 'react';

const SubscriptionCard = ({ subscription, allFeatures }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white border-2 border-purple-700 rounded-lg shadow-md text-center hover:bg-purple-100">
      <h2 className="text-purple-700 font-bold mb-2">{subscription.name}</h2>
      <p className="line-through text-gray-400">
        {subscription.weekly_price ? `₹${subscription.weekly_price}/weeks` : ''}
      </p>
      <p className="text-2xl font-bold mb-2">
        {subscription.yearly_price ? `₹${subscription.yearly_price}/year` : ''}
      </p>
      <p className="text-gray-600 mb-4">
        Billed as {subscription.weekly_price ? `₹${subscription.weekly_price}/weeks` : ''} for every week for 1 year
      </p>
      <p className="text-gray-600">Cancel anytime.</p>
      <ul className="mt-4 text-gray-700">
        {allFeatures.map((feature) => (
          <li key={feature} className="mb-2">
            {subscription.features.some((f) => f.description === feature) ? (
              feature
            ) : (
              <span className="line-through">{feature}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionCard;
