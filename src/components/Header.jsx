import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return(
    <header className="container mx-auto py-6 px-10">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Market Tracker</Link>
        <nav className="space-x-6">
          <Link to="/" className="hover:underline font-bold text-purple-700">Home</Link>
          <Link to="/subscriptions" className="hover:underline font-bold text-purple-700">Subscriptions</Link>
          <Link to="/about" className="hover:underline font-bold text-purple-700">About</Link>
        </nav>
        <Link to="/subscribe_now" className="bg-purple-500 font-bold text-white py-2 px-4 rounded hover:bg-purple-600 active:bg-purple-700 focus:outline-none focus:ring focus:ring-violet-300">Subscribe Now</Link>
      </div>
    </header>
  )
}

export default Header