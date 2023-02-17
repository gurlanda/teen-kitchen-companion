import React from 'react';
import ListWithHeader from './ListWithHeader';
import LinkButton from '../LinkButton';

const DeliveryAngel = () => {
  const respHeader = 'Responsibilities:';
  const respItems = [
    'Being prompt and responsive to emails.',
    'Keeping confidential all information about Teen Kitchen clients.',
    'Reflecting the Teen Kitchen culture of love, respect, and nurturing to our clients and families.',
    'Being dependable in your commitment, including being on time on delivery days.',
    'Being flexible, having a good sense of humor and an inclination to persevere.',
    'Ensuring that no person under the age of 18 delivers or accompanies a Delivery Angel.',
    'Providing a copy of your driver’s license and proof of insurance.',
  ];

  const overviewHeader =
    'An overview of what this job entails. Before delivery day:';
  const overviewItems = [
    'The Delivery Angel signs up for delivery shifts using the Google link provided.',
    'The Friday before the week of the deliveries, the Client Manager emails your delivery route information to you. If you are not needed that week, you will also be notified of that. You can use Google Maps or GPS to get directions. If you are unfamiliar with map applications, please contact the Client Manager and they can assist you.',
  ];

  const delivDayHeader = 'On delivery day:';
  const delivDayItems = [
    'Delivery Angels pick up the client food bags from the kitchen between 12:45 and 1:00 p.m. o On Mondays and Wednesdays at 2880 Research Park Drive, Suite 200 (Ohlsen Foods Kitchen) in Soquel, or on Thursdays at 412 East Riverside Drive, Watsonville (Community Development Corporation’s Kitchen Incubator).',
    'Deliver bags to the clients on your list. You will deliver to 4 to 8 clients.',
    'We engage in NO CONTACT DELIVERIES. You will be given more information on what this means- basically we deliver meals to the doors of homes and call the clients from our car for them to come get the meals. We do not enter homes or apartment buildings during delivery.',
  ];

  return (
    <div className='flex flex-col space-y-4 text-gray-800'>
      <h1 className='font-bold text-2xl text-center'>
        Becoming an Adult Volunteer
      </h1>
      <p>
        All adult volunteers are required to provide proof of COVID 19 Vaccine
        before they may participate in our program.
      </p>
      <p>
        <em>Delivery Angel Job: </em>This is one of the most essential volunteer
        positions at Teen Kitchen Project, because the Delivery Angels are
        responsible for making sure that the meals our teens prepare are
        delivered promptly and with love to our clients.
      </p>
      <ListWithHeader header={respHeader} items={respItems} />
      <ListWithHeader header={overviewHeader} items={overviewItems} />
      <ListWithHeader header={delivDayHeader} items={delivDayItems} />
      <p className='font-bold'>
        All volunteers are required to submit information for a criminal
        background check.
      </p>
      <LinkButton href=' https://forms.office.com/pages/responsepage.aspx?id=rb_y2EXhPU-BOQFLNx1OVwVmsBciAfFHuLiGZkoHIfZUNjBOMFFZSUoyNUwxNFNWM0gyMEc3TzBEVi4u'>
        Teen Kitchen Project
        <br />
        Delivery Angel Application
      </LinkButton>
    </div>
  );
};

export default DeliveryAngel;
