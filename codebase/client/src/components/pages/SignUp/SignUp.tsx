import React, { ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import createId from '../../../utils/createId';
import * as Tabs from './tabs';
import * as HeroSections from './HeroSections';

type TabParam = 'delivery-angel' | 'teen-cook' | 'customer';
type TabData = {
  param: string;
  text: string;
};

const RouterLinkButton: React.FC<{
  currentTab?: TabParam;
  data: TabData;
}> = ({ currentTab, data }) => {
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

const SignUp: React.FC = () => {
  const navigate = useNavigate(); // Used to redirect to 404 page if there's an invalid tab URL
  const { tab } = useParams<{ tab: TabParam }>();

  const renderTab = (tab?: TabParam): ReactNode => {
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
        navigate('/404');
      }
    }
  };

  const renderHero = (tab?: TabParam): ReactNode => {
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
      <div className="h-screen px-5 sm:px-9 pb-8 mb-32 lg:w-screen-2/3 lg:mx-auto xl:w-screen-1/2 tk-acumin-pro-semi-condensed text-gray-800">
        <h1
          className={`tk-acumin-pro-condensed font-bold text-center text-3xl mt-8 mb-8 ${
            tab ? 'hidden' : 'block'
          }`}
        >
          Click a link below to get started.
        </h1>
        {/* Content */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-screen-2/3 xl:w-screen-1/2 mx-auto my-6">
          {tabLinkData.map((data) => (
            <RouterLinkButton data={data} currentTab={tab} key={createId()} />
          ))}
        </div>
        <div className="">{renderTab(tab)}</div>
      </div>
    </>
  );
};

export default SignUp;
