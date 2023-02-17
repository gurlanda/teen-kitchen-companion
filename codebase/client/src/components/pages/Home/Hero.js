import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo.png';

const Hero = () => {
  return (
    <>
      <div className='flex h-screen-5/6 w-screen overflow-hidden'>
        {/* Hero content */}
        <div className='flex flex-col pt-[20%] items-center basis-0 grow bg-hero-img bg-cover bg-gray-400 bg-blend-multiply px-3 lg:pt-0 lg:justify-center lg:bg-none lg:bg-gray-200'>
          <div className='flex flex-col my-3'>
            <div className='flex justify-center -ml-6'>
              <img
                src={logo}
                alt='Teen Kitchen Project logo'
                className='h-[5.1rem] w-[5.1rem] '
              />
              <h1 className='font-bold text-7xl acumin text-white lg:text-gray-800 pt-3'>
                Teen
              </h1>
            </div>
            <h1 className='font-bold text-7xl -mt-2.5 acumin text-white lg:text-gray-800 text-center'>
              Kitchen
            </h1>
            <h1 className='font-bold text-7xl -mt-2.5 acumin text-white lg:text-gray-800 text-center'>
              Project
            </h1>
          </div>
          <h4 className='text-2xl text-white tk-acumin-pro-condensed my-2 mx-6 text-center lg:text-gray-700'>
            Building healthier communities <br className='hidden xs:inline' />{' '}
            through food
          </h4>
          <div className='mx-auto my-5'>
            <Link to='/about'>
              <button className='border-gray-200 hover:bg-slate-200 bg-white text-cyan-600 tk-acumin-pro-semi-condensed font-medium border rounded-lg shadow-md text-lg px-6 py-4'>
                Learn more about the
                <br />
                Teen Kitchen Project
              </button>
            </Link>
          </div>
        </div>

        {/* Hero image section for large screen sizes */}
        <div className='hidden bg-hero-img bg-cover max-h-full max-w-full basis-0 grow lg:block'></div>
      </div>
    </>
  );
};

export default Hero;
