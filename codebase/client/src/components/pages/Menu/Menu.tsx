import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import salmonImg from 'src/assets/img/weekly-menu/hoisin-glazed-salmon.png';
import createId from '../../../utils/createId';

const MenuSelectItem: React.FC<{
  info: {
    weekStart: string;
    weekEnd: string;
    isActive: boolean;
    onClick: { (): void };
  };
}> = ({ info }) => {
  const { weekStart, weekEnd, isActive, onClick } = info;

  return (
    <div
      className={`flex flex-col min-w-[6rem] p-2.5 text-center shadow-lg border rounded-xl ${
        isActive ? 'border-4 border-cyan-500' : ''
      } tk-acumin-pro-condensed text-lg font-bold text-gray-700`}
      onClick={onClick}
    >
      <span className="block">{`${weekStart} to`}</span>
      <span className="block">{`${weekEnd}`}</span>
    </div>
  );
};

const MenuItem: React.FC<{
  img?: string;
  header?: string;
  subheader?: string;
  key?: string;
}> = ({ img, header, subheader, key }) => {
  return (
    <Link className="flex flex-col border rounded-xl shadow-lg" to="menu-item">
      <div className="">
        <img
          src={salmonImg}
          alt=""
          className="w-full h-auto border rounded-xl"
        />
      </div>
      <div className="my-4 px-3">
        <h3 className="font-bold">Hoisin-Glazed Salmon</h3>
        <p>Roasted broccoli, cabbage slaw with cashews, sesame seeds</p>
      </div>
    </Link>
  );
};

const Menu: React.FC = () => {
  const [w1Active, setW1Active] = useState(false);
  const [w2Active, setW2Active] = useState(true);
  const [w3Active, setW3Active] = useState(false);

  const onW1Click = () => {
    setW1Active(true);
    setW2Active(false);
    setW3Active(false);
  };

  const onW2Click = () => {
    setW1Active(false);
    setW2Active(true);
    setW3Active(false);
  };

  const onW3Click = () => {
    setW1Active(false);
    setW2Active(false);
    setW3Active(true);
  };

  const menuDates = [
    {
      weekStart: 'June 26',
      weekEnd: 'July 2',
      isActive: w1Active,
      onClick: onW1Click,
    },
    {
      weekStart: 'July 3',
      weekEnd: 'July 9',
      isActive: w2Active,
      onClick: onW2Click,
    },
    {
      weekStart: 'July 10',
      weekEnd: 'July 16',
      isActive: w3Active,
      onClick: onW3Click,
    },
  ];

  const numMenuItems = [1, 2, 3, 4, 5, 6];

  return (
    <div className="flex flex-col max-w-screen-md mx-auto px-3 ms:px-6 pb-12 space-y-4 items-center tk-acumin-pro-semi-condensed text-gray-700">
      <h1 className="tk-acumin-pro-condensed text-4xl font-bold">
        Weekly Menus
      </h1>
      {/* Menu select */}
      <div className="flex space-x-4 pb-8">
        {menuDates.map((week) => (
          <MenuSelectItem info={week} key={createId()} />
        ))}
      </div>

      {/* Menu items */}
      <div className="grid grid-cols-2 ms:grid-cols-3 gap-6">
        {numMenuItems.map((n) => (
          <MenuItem key={createId()} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
