import React from 'react';
import tkpLogo from 'src/assets/img/tkp-logo-horiz.png';

const DeliveryAngelHero = () => {
  return (
    <div className="bg-[url('/src/assets/img/sign-up-delivery-angel/da-hero.png')] bg-[50%_60%] bg-no-repeat bg-cover bg-gray-400 bg-blend-multiply h-64 relative">
      <img
        className='h-[calc(102_*_0.07rem)] w-[calc(279_*_0.07rem)] absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'
        src={tkpLogo}
        alt='Teen Kitchen Project logo'
      />
      <h1 className='absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 mx-4 w-fit tk-acumin-pro-condensed font-bold text-5xl text-white text-center'>
        Would you like to volunteer?
      </h1>
    </div>
  );
};

export default DeliveryAngelHero;
