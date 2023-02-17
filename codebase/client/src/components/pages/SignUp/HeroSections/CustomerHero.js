import React from 'react';

const CustomerHero = () => {
  return (
    <div className="bg-[url('/src/assets/img/carrots-hero.png')] bg-center bg-no-repeat bg-cover bg-gray-400 bg-blend-multiply h-64 relative">
      <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tk-acumin-pro-condensed font-bold text-5xl text-white text-center'>
        Welcome! Let's personalize your account.
      </h1>
    </div>
  );
};

export default CustomerHero;
