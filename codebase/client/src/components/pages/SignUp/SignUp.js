import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import createId from '../../../utils/createId';
import * as Tabs from './tabs';
import * as HeroSections from './HeroSections';

const RouterLinkButton = ({ currentTab, data }) => {
  const { param, text } = data;
  const selectedBtnStyles =
    'border-cyan-500 text-white bg-cyan-600 hover:bg-cyan-700 border';
  const unselectedBtnStyles =
    'border-gray-400 hover:bg-slate-200 text-cyan-600 bg-white border';
  return (
    <Link
      className={`basis-0 grow block px-4 py-2 rounded-md text-center tk-acumin-pro-semi-condensed ${
        currentTab === param ? selectedBtnStyles : unselectedBtnStyles
      }`}
      to={`/sign-up/${param}`}
    >
      {text}
    </Link>
  );
};

const SignUp = () => {
  const { tab } = useParams();

  const renderTab = (tab) => {
    if (!tab) {
      return <div></div>;
    }

    switch (tab) {
      case 'delivery-angel': {
        return <Tabs.DeliveryAngel />;
      }
      case 'teen-cook': {
        return <Tabs.TeenCook />;
      }
      case 'customer': {
        return <Tabs.Customer />;
      }
      default: {
        return <Redirect to='/not-found' />;
      }
    }
  };

  const renderHero = (tab) => {
    switch (tab) {
      case 'delivery-angel': {
        return <HeroSections.DeliveryAngel />;
      }
      case 'teen-cook': {
        return <HeroSections.TeenCook />;
      }
      case 'customer': {
        return <HeroSections.Customer />;
      }
      default: {
        return <HeroSections.Default />;
      }
    }
  };

  const tabLinkData = [
    { param: 'delivery-angel', text: 'Delivery Angel' },
    { param: 'teen-cook', text: 'Teen Cook' },
    { param: 'customer', text: 'Customer' },
  ];

  return (
    <>
      {/* Hero section */}
      {renderHero(tab)}
      <div className='h-screen px-5 sm:px-9 pb-8 mb-32 lg:w-screen-2/3 lg:mx-auto xl:w-screen-1/2 tk-acumin-pro-semi-condensed text-gray-800'>
        <h1
          className={`tk-acumin-pro-condensed font-bold text-center text-3xl mt-8 mb-8 ${
            tab ? 'hidden' : 'block'
          }`}
        >
          Click a link below to get started.
        </h1>
        {/* Content */}
        <div className='flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-screen-2/3 xl:w-screen-1/2 mx-auto my-6'>
          {tabLinkData.map((data) => (
            <RouterLinkButton data={data} currentTab={tab} key={createId()} />
          ))}
        </div>
        <div className=''>{renderTab(tab)}</div>
      </div>
    </>
  );
};

export default SignUp;
