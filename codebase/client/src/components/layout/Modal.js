import React, { useState } from 'react';
import createId from '../../utils/createId';

export const ModalContent = () => {
  return (
    <div className='bg-white h-96 w-96 mx-auto mt-10 px-4 py-5 rounded-lg'>
      <h1 className='text-3xl text-center font-bold tk-acumin-pro-condensed'>
        Modal Content
      </h1>
    </div>
  );
};

// isActive: Boolean. Allows other elements to activate or deactivate the modal
const Modal = ({ isActive, onDeactivate, children }) => {
  const [modalId] = useState(createId());

  const deactivate = (e) => {
    // We only want to deactivate the modal if the background is clicked
    if (e.target.id === modalId) {
      onDeactivate(false);
    }
  };

  return (
    <div
      className={`h-screen w-screen bg-[rgba(49,53,59,0.7)] fixed z-10 ${
        isActive ? '' : 'hidden'
      }`}
      onMouseUp={deactivate}
      id={modalId}
    >
      {children}
    </div>
  );
};

Modal.defaultProps = {
  isActive: true,
};

export default Modal;
