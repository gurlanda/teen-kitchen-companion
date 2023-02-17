import React, { useState } from 'react';
import Modal, { ModalContent } from '../layout/Modal';
import Button from '../layout/Form/Button';

const Sandbox = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className='flex flex-col items-center'>
      <Modal isActive={isActive} onDeactivate={() => setIsActive(false)}>
        <ModalContent />
      </Modal>
      <h1 className='tk-acumin-pro-condensed text-3xl text-center font-bold'>
        Sandbox
      </h1>
      <Button onClick={() => setIsActive(true)}>Toggle Modal</Button>
    </div>
  );
};

export default Sandbox;
