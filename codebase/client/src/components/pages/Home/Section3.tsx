import React from 'react';
const className = 'bg-brand-black';

const Section3: React.FC = () => {
  return (
    <div className="flex flex-col justify-center mx-auto my-8 max-w-[min(150ch,90vw)] font-body">
      <Item
        heading="Teens"
        details="Our teen program offers an exciting opportunity for growth &#38; team-building as well as developing valuable hands-on skills."
        bgColor="bg-brand-orange"
        textColor="text-brand-orange"
        icon="bg-gradcap-icon"
        to="https://teenkitchenproject.org/join-our-team/become-a-teen-volunteer/"
      />
      <Item
        heading="Receive"
        details="We feel there is no greater gift when you are ill than that of healthy and delicious food, prepared with love, and delivered to you."
        bgColor="bg-brand-green"
        textColor="text-brand-green"
        icon="bg-heart-icon"
        to="https://teenkitchenproject.org/become-a-client/"
      />
      <Item
        heading="Volunteer"
        details="Adult volunteers make our project possible. The value to you and to that of our clients is both welcome and profoundly gratifying."
        bgColor="bg-brand-teal"
        textColor="text-brand-teal"
        icon="bg-people-icon"
        to="https://teenkitchenproject.org/join-our-team/become-an-adult-volunteer/"
      />
      <Item
        heading="Donate"
        details="Your donations are crucial to keeping families in crisis provided with healthy meals. Volunteers can't do it alone."
        bgColor="bg-brand-purple"
        textColor="text-brand-purple"
        icon="bg-coin-icon"
        to="https://teenkitchenproject.org/donate/"
      />
    </div>
  );
};

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
        target="_blank"
        className={`${bgColor} flex flex-col pt-10 pb-14 justify-center basis-0 grow text-center text-white font-bold`}
      >
        <div className={`${icon} bg-no-repeat bg-center h-28 w-full`}></div>
        <h2
          className={`font-bold font-heading text-5xl text-center text-white`}
        >
          Click Here to Learn More
        </h2>
      </a>

      <div className="bg-slate-100 flex flex-col gap-3 items-center justify-center basis-0 grow p-6">
        <h2
          className={`font-bold font-heading text-5xl text-center ${textColor}`}
        >
          {heading}
        </h2>
        <h3 className="text-lg text-center">{details}</h3>
      </div>
    </div>
  );
};

export default Section3;
