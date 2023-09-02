import LanguageContext from 'src/context/Language/LanguageContext';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';
import TkpBanner from 'src/components/layout/TkpBanner';
import { useContext } from 'react';

const About: React.FC = () => {
  const { preferredLanguage } = useContext(LanguageContext);

  return (
    <div className=" min-h-screen">
      {/* Hero */}
      <TkpBanner>
        {
          {
            [SupportedLanguage.ENGLISH]: 'About the Teen Kitchen Project',
            [SupportedLanguage.SPANISH]:
              'Acerca del proyecto de cocina para adolescentes',
          }[preferredLanguage]
        }
      </TkpBanner>

      <main className="flex flex-col gap-8 max-w-[min(90vw,70ch)] mx-auto font-body text-lg">
        <Section>
          <div className="flex flex-col gap-1 text-center">
            <h2 className=" text-brand-orange text-5xl">
              {
                {
                  [SupportedLanguage.ENGLISH]: 'Our Mission:',
                  [SupportedLanguage.SPANISH]: 'Nuestra Misión:',
                }[preferredLanguage]
              }
            </h2>
            <h3 className="font-heading font-bold text-4xl">
              {
                {
                  [SupportedLanguage.ENGLISH]: (
                    <>
                      The Teen Kitchen Project builds healthy communities
                      through&nbsp;food
                    </>
                  ),
                  [SupportedLanguage.SPANISH]:
                    'Teen Kitchen Project construye comunidades saludables a través de la comida.',
                }[preferredLanguage]
              }
            </h3>
          </div>
          <AboutParagraph>
            {
              {
                [SupportedLanguage.ENGLISH]: (
                  <>
                    The <strong>Teen Kitchen Project</strong> is a nonprofit
                    organization that brings young people into the kitchen to
                    learn to cook delicious and nourishing food. The meals they
                    prepare are delivered to individuals and families who are in
                    crisis due to a life-threatening illness like cancer. We
                    serve families in{' '}
                    <strong>Santa Cruz County, California</strong>.
                  </>
                ),
                [SupportedLanguage.SPANISH]:
                  'Teen Kitchen Project es una organización sin fines de lucro que lleva a jóvenes a la cocina para aprender a cocinar alimentos deliciosos y nutritivos. Las comidas que preparan se entregan a personas y familias que se encuentran en crisis debido a una enfermedad potencialmente mortal como el cáncer. Servimos a familias en el condado de Santa Cruz, California.',
              }[preferredLanguage]
            }
          </AboutParagraph>
          <AboutParagraph>
            {
              {
                [SupportedLanguage.ENGLISH]: (
                  <>
                    The teens gain skills in cooking healthy food, learn about
                    the impact of their food choices, and are offered an
                    opportunity to build connections through community service.
                  </>
                ),
                [SupportedLanguage.SPANISH]:
                  'Los adolescentes adquieren habilidades para cocinar alimentos saludables, aprenden sobre el impacto de sus elecciones de alimentos y se les ofrece la oportunidad de establecer conexiones a través del servicio comunitario.',
              }[preferredLanguage]
            }
          </AboutParagraph>
          <AboutParagraph>
            {
              {
                [SupportedLanguage.ENGLISH]: (
                  <>
                    The Teen Kitchen Project operates on Sundays all day, and
                    Monday, Tuesday, and Wednesday afternoons out of a
                    commercial kitchen in Soquel, California. We are supported
                    through donations from the community, grants, and contracts
                    with local and state agencies.
                  </>
                ),
                [SupportedLanguage.SPANISH]:
                  'El Teen Kitchen Project opera los domingos todo el día y los lunes, martes y miércoles por la tarde, en una cocina comercial en Soquel, California. Contamos con el apoyo de donaciones de la comunidad, subvenciones y contratos con agencias locales y estatales.',
              }[preferredLanguage]
            }
          </AboutParagraph>
        </Section>

        <SectionWithHeadline
          headline={
            {
              [SupportedLanguage.ENGLISH]: 'Our Values',
              [SupportedLanguage.SPANISH]: 'Nuestros Valores',
            }[preferredLanguage]
          }
        >
          <div className="flex flex-col">
            <Ul>
              <LiWithHeadline
                headline={
                  {
                    [SupportedLanguage.ENGLISH]: 'Work with Intention:',
                    [SupportedLanguage.SPANISH]: 'Trabajar con Intención:',
                  }[preferredLanguage]
                }
                content={
                  {
                    [SupportedLanguage.ENGLISH]:
                      'Our actions and choices lead to the greatest positive impact.',
                    [SupportedLanguage.SPANISH]:
                      'Nuestras acciones y elecciones conducen al mayor impacto positivo.',
                  }[preferredLanguage]
                }
              />
              <LiWithHeadline
                headline={
                  {
                    [SupportedLanguage.ENGLISH]: 'Young People are the Future:',
                    [SupportedLanguage.SPANISH]: 'Los Jóvenes son el Futuro:',
                  }[preferredLanguage]
                }
                content={
                  {
                    [SupportedLanguage.ENGLISH]:
                      'Young people are intelligent, responsible, capable, creative, caring, and must be central participants in shaping our collective future.',
                    [SupportedLanguage.SPANISH]:
                      'Los jóvenes son inteligentes, responsables, capaces, creativos, solidarios y deben ser participantes centrales en la configuración de nuestro futuro colectivo.',
                  }[preferredLanguage]
                }
              />
              <LiWithHeadline
                headline={
                  {
                    [SupportedLanguage.ENGLISH]: 'Food is Love:',
                    [SupportedLanguage.SPANISH]: 'La Comida es Amor:',
                  }[preferredLanguage]
                }
                content={
                  {
                    [SupportedLanguage.ENGLISH]:
                      'The preparation and sharing of food allows and serving those in greatest need.',
                    [SupportedLanguage.SPANISH]:
                      'Preparar y compartir alimentos permite a nuestra comunidad experimentar gratitud, compasión, conexión y servir a los más necesitados.',
                  }[preferredLanguage]
                }
              />

              <LiWithHeadline
                headline={
                  {
                    [SupportedLanguage.ENGLISH]: 'Integrity Matters:',
                    [SupportedLanguage.SPANISH]: 'La Integridad Importa:',
                  }[preferredLanguage]
                }
                content={
                  {
                    [SupportedLanguage.ENGLISH]:
                      'We are committed to trust, respect, and honesty.',
                    [SupportedLanguage.SPANISH]:
                      'Estamos comprometidos con la confianza, el respeto y la honestidad.',
                  }[preferredLanguage]
                }
              />
            </Ul>
          </div>
        </SectionWithHeadline>

        <SectionWithHeadline
          headline={
            {
              [SupportedLanguage.ENGLISH]: 'Brief Organizational Overview',
              [SupportedLanguage.SPANISH]: 'Breve Descripción Organizacional',
            }[preferredLanguage]
          }
        >
          <AboutParagraph>
            {
              {
                [SupportedLanguage.ENGLISH]: (
                  <>
                    Teen Kitchen Project's (TKP) mission is to build healthy
                    communities through food. Our purpose is to provide
                    critically and chronically ill people in Santa Cruz County
                    with home-delivered, medically-tailored free or low-cost
                    meals. Meal recipients are referred to the program by social
                    workers and nurse navigators based on the client's needs,
                    current lack of food access, and their ability to prepare
                    meals for themselves.
                  </>
                ),
                [SupportedLanguage.SPANISH]:
                  'La misión de Teen Kitchen Project (TKP) es construir comunidades saludables a través de la comida. Nuestro propósito es brindar a las personas con enfermedades críticas y crónicas en el condado de Santa Cruz comidas gratuitas o de bajo costo entregadas a domicilio, adaptadas médicamente. Los trabajadores sociales y las enfermeras orientadoras remiten a los beneficiarios de las comidas al programa en función de las necesidades de los clientes, la falta actual de acceso a los alimentos y su capacidad para preparar comidas por sí mismos.',
              }[preferredLanguage]
            }
          </AboutParagraph>
          <AboutParagraph>
            {
              {
                [SupportedLanguage.ENGLISH]: (
                  <>
                    TKP was founded by current Executive Director Angela Farley
                    in 2012 after her own family experienced a life-threatening
                    illness. In 2011 her son was diagnosed with a rare lung
                    cancer. During his treatment, friends and family brought
                    home cooked meals to help keep Angela's family nourished.
                    After her son's treatment was successfully completed, she
                    made a commitment to help others as she was helped during
                    her time of need.
                  </>
                ),
                [SupportedLanguage.SPANISH]:
                  'TKP fue fundada por la actual directora ejecutiva, Angela Farley, en 2012 después de que su propia familia experimentara una enfermedad potencialmente mortal. En 2011, a su hijo le diagnosticaron un cáncer de pulmón poco común. Durante su tratamiento, amigos y familiares trajeron comida casera para ayudar a mantener alimentada a la familia de Ángela. Después de que el tratamiento de su hijo se completó con éxito, ella se comprometió a ayudar a los demás tal como la ayudaron a ella durante su momento de necesidad.',
              }[preferredLanguage]
            }
          </AboutParagraph>
          <AboutParagraph>
            {
              {
                [SupportedLanguage.ENGLISH]: (
                  <>
                    The COVID crisis created a surge in requests for TKP's
                    services. Since the pandemic began in March 2020, we have
                    increased the number of meals delivered to medically fragile
                    people by 150%. In addition, we have doubled the number of
                    households we serve and have doubled the amount of food
                    delivered to each household.
                  </>
                ),
                [SupportedLanguage.SPANISH]:
                  'La crisis de COVID generó un aumento en las solicitudes de servicios de TKP. Desde que comenzó la pandemia en marzo de 2020, hemos aumentado en un 150 % el número de comidas entregadas a personas médicamente frágiles. Además, hemos duplicado el número de hogares a los que servimos y hemos duplicado la cantidad de alimentos entregados a cada hogar.',
              }[preferredLanguage]
            }
          </AboutParagraph>
          <H3>
            {
              {
                [SupportedLanguage.ENGLISH]:
                  'Additional accomplishments over the past year include:',
                [SupportedLanguage.SPANISH]:
                  'Los logros adicionales del año pasado incluyen:',
              }[preferredLanguage]
            }
          </H3>
          <Ul>
            <Li>
              {
                {
                  [SupportedLanguage.ENGLISH]:
                    'Served a total of 507 individuals (and their families) in Santa Cruz County impacted by life-threatening illness.',
                  [SupportedLanguage.SPANISH]:
                    'Se prestó servicio a un total de 507 personas (y sus familias) en el condado de Santa Cruz afectadas por enfermedades potencialmente mortales.',
                }[preferredLanguage]
              }
            </Li>
            <Li>
              {
                {
                  [SupportedLanguage.ENGLISH]:
                    'Delivered a total of 69,574 meals.',
                  [SupportedLanguage.SPANISH]:
                    'Entregado un total de 69.574 comidas.',
                }[preferredLanguage]
              }
            </Li>
            <Li>
              {
                {
                  [SupportedLanguage.ENGLISH]:
                    '73% of meal recipients reported they learned a lot about nutrition and healthy eating.',
                  [SupportedLanguage.SPANISH]:
                    'El 73% de los destinatarios de las comidas informaron que aprendieron mucho sobre nutrición y alimentación saludable.',
                }[preferredLanguage]
              }
            </Li>
            <Li>
              {
                {
                  [SupportedLanguage.ENGLISH]:
                    '92% of meal recipients reported that having prepared meals reduced their level of stress.',
                  [SupportedLanguage.SPANISH]:
                    'El 92% de los que recibieron comidas informaron que haber preparado las comidas reducía su nivel de estrés.',
                }[preferredLanguage]
              }
            </Li>
            <Li>
              {
                {
                  [SupportedLanguage.ENGLISH]:
                    '90% of meal recipients reported they felt cared for by the community and less alone.',
                  [SupportedLanguage.SPANISH]:
                    'El 90% de los destinatarios de las comidas informaron que se sentían atendidos por la comunidad y menos solos.',
                }[preferredLanguage]
              }
            </Li>
            <Li>
              {
                {
                  [SupportedLanguage.ENGLISH]:
                    '77% of meal recipients reported that the meals helped them recover more quickly.',
                  [SupportedLanguage.SPANISH]:
                    'El 77% de los que recibieron comidas informaron que las comidas les ayudaron a recuperarse más rápidamente.',
                }[preferredLanguage]
              }
            </Li>
            <Li>
              {
                {
                  [SupportedLanguage.ENGLISH]:
                    '80% of meal recipients reported that the meals helped them feel better physically.',
                  [SupportedLanguage.SPANISH]:
                    'El 80% de los que recibieron comidas informaron que las comidas les ayudaron a sentirse mejor físicamente.',
                }[preferredLanguage]
              }
            </Li>
          </Ul>
        </SectionWithHeadline>
      </main>
    </div>
  );
};

const AboutParagraph: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <p className="leading-relaxed">{children}</p>;
};

const Section = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <section className="flex flex-col gap-4">{children}</section>;
};

const SectionWithHeadline = ({
  headline,
  children,
}: {
  headline: string;
  children?: React.ReactNode;
}): JSX.Element => {
  return (
    <section className="flex flex-col gap-2">
      <H2>{headline}</H2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
};

const H2 = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <h2 className="font-heading font-bold text-3xl">{children}</h2>;
};

const H3 = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <h3 className="text-lg font-extrabold italic">{children}</h3>;
};

const Ul = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <ul className="flex flex-col gap-2">{children}</ul>;
};

const Li = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <li className=" list-disc">{children}</li>;
};

const LiWithHeadline = ({
  headline,
  content,
}: {
  headline: string;
  content: string;
}): JSX.Element => {
  return (
    <Li>
      <span className="underline">{headline}</span> {content}
    </Li>
  );
};

export default About;
