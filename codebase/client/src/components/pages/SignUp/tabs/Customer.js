import React from 'react';
import ListWithHeader from './ListWithHeader';
import LinkButton from '../LinkButton';
import createId from '../../../../utils/createId';

const Customer = () => {
  const eligItems = [
    'Client needs to live in Santa Cruz County.',
    'Client needs to have one or more of the following diagnoses:',
  ];
  const eligSubItems = [
    "Alzheimer's/Dementia",
    'Cancer',
    'Chronic Kidney Disease*',
    'Chronic Obstructive Pulmonary Disease',
    'Congestive Heart Failure',
    'Diabetes',
    'End-Stage Renal Disease',
    'Hepatitis C',
    'HIV/AIDS',
    'Malnutrition*',
    "Neurological Disorder (e.g., Stroke, Parkinson's, MS, ALS)",
    'Recent Major Surgery or Trauma',
  ];

  const notEligHeader = 'Who is NOT Eligible?';
  const notEligItems = [
    "Participants who don't have refrigerated food storage and heating capabilities.",
    'Participants who lack sufficient support or ability to adhere to the program.',
  ];

  return (
    <div className='space-y-4'>
      <h1 className='font-bold text-2xl text-center'>
        Medically-Tailored Meals Program
      </h1>
      {/* What's included? */}
      <div className=''>
        <h3 className='text-lg font-bold'>What's included?</h3>
        <ol>
          <li>
            <strong>Home delivery of medically tailored meals.</strong> The
            length of service is determined on an individual basis depending on
            client's need and program capacity. All meals, except for the
            dessert, are{' '}
            <strong>
              medically tailored to be heart-healthy and diabetes-friendly
            </strong>
            .
          </li>
          <li>
            <strong>
              Consultation with a Registered Dietitian Nutritionist
            </strong>
            , if desired.
          </li>
        </ol>
      </div>
      {/* Eligibility */}
      <div className=''>
        <h3 className='text-lg font-bold'>Eligibility</h3>
        <ol className='list-decimal list-inside'>
          {eligItems.map((item) => (
            <li className='mb-1' key={createId()}>
              {item}
            </li>
          ))}
          <ol className='list-[lower-alpha] list-inside ml-4' type='a'>
            {eligSubItems.map((item) => (
              <li className='mb-1' key={createId()}>
                {item}
              </li>
            ))}
          </ol>
        </ol>
        <p className='italic ml-4'>(*Medi-Cal only)</p>
      </div>
      <ListWithHeader header={notEligHeader} items={notEligItems} ordered />
      {/* Notes */}
      <div className=''>
        <h3 className='text-lg font-bold'>Notes</h3>
        <p>
          On the application, please fill in all fields and return it via fax or
          secure email. An electronic provider signature is acceptable, or you
          can print and sign then fax or scan and email it back. Applicant
          signature can be an original signature or verbal consent, documented
          as follows: Verbal ok - (your initials). Please include the client's
          Medi-Cal number, if applicable.
        </p>
      </div>
      <p>
        Please make sure that whoever signs this form is an: MD, DO, NP, PA, RD,
        RN, LCSW, or MSW
      </p>
      <h4 className='text-center font-bold'>
        Questions? Call Client Services at 831-316-4540 extension 1.
      </h4>
      <LinkButton href='https://teenkitchenproject.org/site/wp-content/uploads/2021/12/TKP_Referral_Form_Nov_2021_2.pdf'>
        Teen Kitchen Project
        <br />
        Client Application
      </LinkButton>
    </div>
  );
};

export default Customer;
