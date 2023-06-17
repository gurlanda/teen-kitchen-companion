import React from 'react';

interface ItemProps {
  heading: string;
  details: string;
  bgColor: string;
  textColor: string;
  icon: string;
  to: string;
}

const Item: React.FC<ItemProps> = ({
  heading,
  details,
  bgColor,
  textColor,
  icon,
  to,
}) => {
  return (
    <div className="flex flex-col my-5 md:odd:flex-row md:even:flex-row-reverse">
      <a
        href={to}
        className={`${bgColor} block px-6 py-10 basis-0 grow text-center text-white font-bold`}
      >
        <div
          className={`${icon} bg-no-repeat bg-center h-28 w-full mb-2`}
        ></div>
        <h2 className={`font-bold text-2xl text-center text-white`}>
          Click Here to Learn More
        </h2>
      </a>
      <div className="bg-slate-100 flex flex-col items-center justify-center basis-0 grow p-6">
        <h2 className={`font-bold text-2xl text-center ${textColor}`}>
          {heading}
        </h2>
        <h3 className="text-md text-center">{details}</h3>
      </div>
    </div>
  );
};

const Section3: React.FC = () => {
  return (
    <div className="flex flex-col justify-center mx-auto my-8 max-w-[min(150ch,90vw)] tk-acumin-pro-semi-condensed text-gray-800">
      <Item
        heading="Teens"
        details="Our teen program offers an exciting opportunity for growth &#38; team-building as well as developing valuable hands-on skills."
        bgColor="bg-orange-600"
        textColor="text-orange-600"
        icon="bg-gradcap-icon"
        to="https://teenkitchenproject.org/join-our-team/become-a-teen-volunteer/"
      />
      <Item
        heading="Volunteer"
        details="Adult volunteers make our project possible. The value to you and to that of our clients is both welcome and profoundly gratifying."
        bgColor="bg-cyan-600"
        textColor="text-cyan-600"
        icon="bg-people-icon"
        to="https://teenkitchenproject.org/join-our-team/become-an-adult-volunteer/"
      />
      <Item
        heading="Donate"
        details="Your donations are crucial to keeping families in crisis provided with healthy meals. Volunteers can't do it alone."
        bgColor="bg-green-600"
        textColor="text-green-600"
        icon="bg-coin-icon"
        to="https://teenkitchenproject.org/donate/"
      />
      <Item
        heading="Receive"
        details="We feel there is no greater gift when you are ill than that of healthy and delicious food, prepared with love, and delivered to you."
        bgColor="bg-purple-600"
        textColor="text-purple-600"
        icon="bg-heart-icon"
        to="https://teenkitchenproject.org/become-a-client/"
      />
    </div>
  );
};

export default Section3;
