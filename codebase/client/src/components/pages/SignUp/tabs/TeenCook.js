import React from 'react';
import LinkButton from '../LinkButton';

const TeenCook = () => {
  return (
    <div className='flex flex-col space-y-4'>
      <h1 className='font-bold text-2xl text-center'>
        Becoming a Teen Volunteer
      </h1>
      <p>
        All teen employees and volunteers will be required to show proof of
        vaccination before they may participate in our program.
      </p>
      <p>
        Thank you for showing interest in our Teen Kitchen Project meals
        program! As a result of the COVID-19 pandemic, Teen Kitchen Project has
        moved to a hybrid model, whereby we utilize both paid and volunteer
        teens in the kitchen. We accept new teens quarterly, and all
        participants are expected to commit to their agreed-upon shift(s) for
        the entire quarter. Schedule details can be found by clicking the
        application link below.
      </p>
      <p>
        During your time in service, you will be preparing hundreds of meals to
        be delivered to your neighbors experiencing critical and chronic illness
        in Santa Cruz County. You will be washing, chopping, cooking vegetables
        and meats (3 out of 4 of our main dishes are vegetarian, so not that
        much meat), learn a variety of cooking techniques, package hundreds of
        meals, wash dishes and (of course), cleaning! This is hard, meaningful
        work and we appreciate your interest in supporting our mission to build
        a healthier community through food!
      </p>
      <LinkButton href='https://docs.google.com/forms/d/1IpKNe4XzVQ2NpcIb4--tvO6J2incTp4OFJ0JeafH1RM/viewform?edit_requested=true'>
        Teen Kitchen Project
        <br />
        Teen Cook Application
      </LinkButton>
    </div>
  );
};

export default TeenCook;
