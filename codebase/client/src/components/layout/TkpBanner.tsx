import React from 'react';
import tkpLogo from 'src/assets/img/tkp-logo-horiz.png';
import bannerImg from 'src/assets/img/banner-multi-person.png';

const TkpBanner = ({
  children,
  hideLogo,
  normalWeight,
}: {
  children?: React.ReactNode;
  hideLogo?: boolean;
  normalWeight?: boolean;
}): JSX.Element => {
  return (
    <div className="relative min-h-[256px] py-10 flex flex-col gap-4 justify-evenly items-center mb-12">
      <img
        src={bannerImg}
        className="absolute -z-10 h-full w-full object-cover object-[center_top] brightness-[50%]"
      />
      <div className={`w-60 ${hideLogo ? 'hidden' : 'block'}`}>
        <img
          className="w-full h-auto"
          src={tkpLogo}
          alt="Teen Kitchen Project logo"
        />
      </div>
      <h1
        className={`px-4 max-w-[25ch] tk-acumin-pro-condensed ${
          normalWeight ? '' : 'font-bold'
        } ${hideLogo ? 'text-7xl' : 'text-5xl'} text-white text-center`}
      >
        {children}
      </h1>
    </div>
  );
};

export default TkpBanner;
