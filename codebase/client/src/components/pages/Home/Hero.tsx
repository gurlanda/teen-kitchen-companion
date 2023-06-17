import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo.png';
import hero from 'src/assets/img/hero.png';

const Hero: React.FC = () => {
  // bg-hero-img bg-cover bg-gray-400 bg-blend-multiply
  return (
    <div className="relative flex h-screen-5/6">
      {/* Hero content */}
      <div className="relative z-10 flex flex-col justify-center items-center basis-0 grow px-3 text-white lg:pt-0 lg:justify-center lg:bg-none lg:bg-gray-200">
        <div className="flex flex-col my-3 acumin lg:text-gray-800">
          <div className="flex justify-center -ml-6">
            <img
              src={logo}
              alt="Teen Kitchen Project logo"
              className="h-[5.1rem] w-[5.1rem] "
            />
            <h1 className="font-bold text-7xl pt-3">Teen</h1>
          </div>
          <h1 className="font-bold text-7xl -mt-2.5 text-center">Kitchen</h1>
          <h1 className="font-bold text-7xl -mt-2.5 text-center">Project</h1>
        </div>
        <h4 className="text-2xl  tk-acumin-pro-condensed my-2 mx-6 text-center lg:text-gray-700">
          Building healthier communities <br className="hidden xs:inline" />{' '}
          through food
        </h4>
        <div className="mx-auto my-5">
          <Link to="/about">
            <button className="border-gray-200 hover:bg-slate-100 bg-white text-cyan-600 tk-acumin-pro-semi-condensed font-medium border rounded-lg shadow-md text-lg px-6 py-4">
              Learn more about the
              <br />
              Teen Kitchen Project
            </button>
          </Link>
        </div>
      </div>

      {/* Hero image section for large screen sizes */}
      <img
        src={hero}
        alt="Prepared food"
        className="absolute lg:static w-full h-full lg:block basis-0 grow min-w-0 object-cover brightness-[45%] lg:filter-none"
      />
    </div>
  );
};

export default Hero;
