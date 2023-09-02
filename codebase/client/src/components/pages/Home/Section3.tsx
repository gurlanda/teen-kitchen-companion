import { useContext } from 'react';
import LanguageContext from 'src/context/Language/LanguageContext';
import LanguageContent from 'src/model/Language/LanguageContent';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';

const Section3: React.FC = () => {
  const { preferredLanguage } = useContext(LanguageContext);

  return (
    <div className="flex flex-col justify-center mx-auto my-8 max-w-[min(150ch,90vw)] font-body">
      <Item
        heading={{
          [SupportedLanguage.ENGLISH]: 'Teens',
          [SupportedLanguage.SPANISH]: 'Adolescentes',
        }}
        details={{
          [SupportedLanguage.ENGLISH]: (
            <>
              Our teen program offers an exciting opportunity for growth &#38;
              team-building as well as developing valuable hands-on skills.
            </>
          ),
          [SupportedLanguage.SPANISH]:
            'Nuestro programa para adolescentes ofrece una excelente oportunidad para el crecimiento y la formación de equipos, así como para desarrollar valiosas habilidades prácticas.',
        }}
        preferredLanguage={preferredLanguage}
        bgColor="bg-brand-orange"
        textColor="text-brand-orange"
        icon="bg-gradcap-icon"
        to="https://teenkitchenproject.org/join-our-team/become-a-teen-volunteer/"
      />
      <Item
        heading={{
          [SupportedLanguage.ENGLISH]: 'Receive',
          [SupportedLanguage.SPANISH]: 'Recibir',
        }}
        details={{
          [SupportedLanguage.ENGLISH]:
            'There is no greater gift when you are ill than that of healthy and delicious food, prepared with love and delivered to you.',
          [SupportedLanguage.SPANISH]:
            'No hay mayor regalo cuando estás enfermo que el de una comida sana y deliciosa, preparada con amor y entregada a ti.',
        }}
        preferredLanguage={preferredLanguage}
        bgColor="bg-brand-green"
        textColor="text-brand-green"
        icon="bg-heart-icon"
        to="https://teenkitchenproject.org/become-a-client/"
      />
      <Item
        heading={{
          [SupportedLanguage.ENGLISH]: 'Volunteer',
          [SupportedLanguage.SPANISH]: 'Voluntario',
        }}
        details={{
          [SupportedLanguage.ENGLISH]:
            'Adult volunteers make our project possible. The value to you and to that of our clients is both welcome and profoundly gratifying.',
          [SupportedLanguage.SPANISH]:
            'Los voluntarios adultos hacen posible nuestro proyecto. El valor para usted y para nuestros clientes es bienvenido y profundamente gratificante.',
        }}
        preferredLanguage={preferredLanguage}
        bgColor="bg-brand-teal"
        textColor="text-brand-teal"
        icon="bg-people-icon"
        to="https://teenkitchenproject.org/join-our-team/become-an-adult-volunteer/"
      />
      <Item
        heading={{
          [SupportedLanguage.ENGLISH]: 'Donate',
          [SupportedLanguage.SPANISH]: 'Donar',
        }}
        details={{
          [SupportedLanguage.ENGLISH]: (
            <>
              Your donations are crucial to keeping families in crisis provided
              with healthy meals. Volunteers can't do it alone.
            </>
          ),
          [SupportedLanguage.SPANISH]:
            'Sus donaciones son cruciales para mantener a las familias en crisis provistas de comidas saludables. Los voluntarios por sí solos no pueden hacerlo.',
        }}
        preferredLanguage={preferredLanguage}
        bgColor="bg-brand-purple"
        textColor="text-brand-purple"
        icon="bg-coin-icon"
        to="https://teenkitchenproject.org/donate/"
      />
    </div>
  );
};

interface ItemProps {
  heading: LanguageContent;
  details: LanguageContent;
  bgColor: string;
  textColor: string;
  icon: string;
  to: string;
  preferredLanguage: SupportedLanguage.Type;
}

const Item: React.FC<ItemProps> = ({
  heading,
  details,
  bgColor,
  textColor,
  icon,
  to,
  preferredLanguage,
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
          {
            {
              [SupportedLanguage.ENGLISH]: 'Click Here to Learn More',
              [SupportedLanguage.SPANISH]: 'Lorem ipsum',
            }[preferredLanguage]
          }
        </h2>
      </a>

      <div className="bg-slate-100 flex flex-col gap-3 items-center justify-center basis-0 grow p-6">
        <h2
          className={`font-bold font-heading text-5xl text-center ${textColor}`}
        >
          {heading[preferredLanguage]}
        </h2>
        <h3 className="text-lg text-center">{details[preferredLanguage]}</h3>
      </div>
    </div>
  );
};

export default Section3;
