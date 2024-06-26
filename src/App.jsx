import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import Subscriptions from "./components/Subscriptions";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SubscribeNow from "./components/SubscribeNow";

function App() {
  return(
    <BrowserRouter>
      <div className="w-full min-h-screen flex flex-wrap justify-center items-center bg-violet-200">
        <div className="w-4/5 min-h-dvh">
          <div className='bg-white min-h-dvh w-full flex flex-col justify-between border border-gray-60 rounded-lg shadow-md'>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/subscribe_now" element={<SubscribeNow />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App