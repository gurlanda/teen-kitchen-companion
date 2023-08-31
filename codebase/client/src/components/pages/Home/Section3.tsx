import { useContext } from 'react';
import LanguageContext from 'src/context/Language/LanguageContext';
import PreferredLanguage from 'src/model/User/PreferredLanguage';

const Section3: React.FC = () => {
  const { preferredLanguage } = useContext(LanguageContext);

  return (
    <div className="flex flex-col justify-center mx-auto my-8 max-w-[min(150ch,90vw)] font-body">
      <Item
        heading={
          preferredLanguage === PreferredLanguage.ENGLISH
            ? 'Teens'
            : 'Lorem ipsum'
        }
        details={
          preferredLanguage === PreferredLanguage.ENGLISH
            ? 'Our teen program offers an exciting opportunity for growth &#38; team-building as well as developing valuable hands-on skills.'
            : 'Lorem ipsum'
        }
        bgColor="bg-brand-orange"
        textColor="text-brand-orange"
        icon="bg-gradcap-icon"
        to="https://teenkitchenproject.org/join-our-team/become-a-teen-volunteer/"
      />
      <Item
        heading={
          preferredLanguage === PreferredLanguage.ENGLISH
            ? 'Receive'
            : 'Lorem ipsum'
        }
        details={
          preferredLanguage === PreferredLanguage.ENGLISH
            ? 'We feel there is no greater gift when you are ill than that of healthy and delicious food, prepared with love, and delivered to you.'
            : 'Lorem ipsum'
        }
        bgColor="bg-brand-green"
        textColor="text-brand-green"
        icon="bg-heart-icon"
        to="https://teenkitchenproject.org/become-a-client/"
      />
      <Item
        heading={
          preferredLanguage === PreferredLanguage.ENGLISH
            ? 'Volunteer'
            : 'Lorem ipsum'
        }
        details={
          preferredLanguage === PreferredLanguage.ENGLISH
            ? 'Adult volunteers make our project possible. The value to you and to that of our clients is both welcome and profoundly gratifying.'
            : 'Lorem ipsum'
        }
        bgColor="bg-brand-teal"
        textColor="text-brand-teal"
        icon="bg-people-icon"
        to="https://teenkitchenproject.org/join-our-team/become-an-adult-volunteer/"
      />
      <Item
        heading={
          preferredLanguage === PreferredLanguage.ENGLISH
            ? 'Donate'
            : 'Lorem ipsum'
        }
        details={
          preferredLanguage === PreferredLanguage.ENGLISH
            ? "Your donations are crucial to keeping families in crisis provided with healthy meals. Volunteers can't do it alone."
            : 'Lorem ipsum'
        }
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
  const { preferredLanguage } = useContext(LanguageContext);

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
          {preferredLanguage === PreferredLanguage.ENGLISH
            ? 'Click Here to Learn More'
            : 'Lorem ipsum'}
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
