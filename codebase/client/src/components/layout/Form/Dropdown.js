import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import createId from '../../../utils/createId';

const DROPDOWN_ITEM = 'DROPDOWN_ITEM';
const DROPDOWN_DIVIDER = 'DROPDOWN_DIVIDER';

export class DropdownItem {
  constructor(text, value) {
    this.text = text;
    this.value = value;
    this.type = DROPDOWN_ITEM;
  }
}

export class DropdownDivider {
  constructor() {
    this.type = DROPDOWN_DIVIDER;
  }
}

const Dropdown = ({
  defaultItem,
  items,
  menuClassNames,
  isFullWidth,
  onValueChanged,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currentItem, setCurrentItem] = useState(defaultItem);
  const dropdownMenuId = useRef(createId());
  const dropdownButtonId = useRef(createId());

  useEffect(() => {
    document.body.addEventListener('click', setVisibility);

    return () => {
      document.body.removeEventListener('click', setVisibility);
    };
  });

  const setVisibility = (event) => {
    event.stopPropagation();
    if (event.target.id === dropdownButtonId.current) {
      event.preventDefault();
      setIsActive(!isActive);
    } else {
      setIsActive(false);
    }
  };

  const onClickDropdownItem = (event) => {
    const index = parseInt(event.target.dataset.index);
    const newItem = items[index];
    setCurrentItem(newItem);
    setIsActive(false);

    if (onValueChanged) {
      onValueChanged(newItem.value);
    }
  };

  return (
    <div className={`relative mb-3 ${isFullWidth ? 'w-full xs:w-auto' : ''}`}>
      <button
        id={dropdownButtonId.current}
        className={`border-[1px] border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline focus:outline-2 focus:outline-cyan-500 ${
          isFullWidth ? 'w-full xs:w-auto sm:min-w-[200px] sm:flex' : ''
        }`}
        aria-haspopup='true'
        aria-controls={dropdownMenuId.current}
      >
        <span
          className='inline-block mr-3 sm:basis-0 sm:grow'
          id={dropdownButtonId.current}
        >
          {currentItem.text}
        </span>
        <span className='sm:basis-0' id={dropdownButtonId.current}>
          <i className='fas fa-angle-down' id={dropdownButtonId.current}></i>
        </span>
      </button>

      <div
        className={`absolute z-20 pt-1 ${
          isFullWidth ? 'w-full xs:w-auto' : ''
        } ${isActive ? 'block' : 'hidden'} ${menuClassNames}`}
        id={dropdownMenuId.current}
        role='menu'
      >
        <div className='flex flex-col py-2 rounded-md bg-white shadow-md'>
          {items.map((item, index) => {
            switch (item.type) {
              case DROPDOWN_ITEM:
                return (
                  <div
                    className='pr-12 px-4 py-1.5 text-sm text-gray-700 hover:bg-cyan-500 hover:text-white hover:font-semibold'
                    key={createId()}
                    data-index={index}
                    onClick={onClickDropdownItem}
                  >
                    {item.text}
                  </div>
                );
              case DROPDOWN_DIVIDER:
                return <hr className='bg-gray-300 my-2' key={createId()} />;
              default:
                throw new TypeError(
                  'In Dropdown.js: DropdownItem array contains invalid object'
                );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
