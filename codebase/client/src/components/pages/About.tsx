import LanguageContext from 'src/context/Language/LanguageContext';
import PreferredLanguage from 'src/model/User/PreferredLanguage';
import TkpBanner from 'src/components/layout/TkpBanner';
import { useContext } from 'react';

const About: React.FC = () => {
  const { preferredLanguage } = useContext(LanguageContext);

  return (
    <div className=" min-h-screen">
      {/* Hero */}
      <TkpBanner>
        {preferredLanguage === PreferredLanguage.ENGLISH
          ? 'About the Teen Kitchen Project'
          : 'Lorem ipsum'}
      </TkpBanner>

      <main className="flex flex-col gap-8 max-w-[min(90vw,70ch)] mx-auto font-body text-lg">
        <Section>
          <div className="flex flex-col gap-1 text-center">
            <h2 className=" text-brand-orange text-5xl">
              {preferredLanguage === PreferredLanguage.ENGLISH
                ? 'Our Mission:'
                : 'Lorem ipsum'}
            </h2>
            <h3 className="font-heading font-bold text-4xl">
              {preferredLanguage === PreferredLanguage.ENGLISH ? (
                <>
                  The Teen Kitchen Project builds healthy communities
                  through&nbsp;food
                </>
              ) : (
                'Lorem ipsum'
              )}
            </h3>
          </div>
          <AboutParagraph>
            {preferredLanguage === PreferredLanguage.ENGLISH ? (
              <>
                The <strong>Teen Kitchen Project</strong> is a nonprofit
                organization that brings young people into the kitchen to learn
                to cook delicious and nourishing food. The meals they prepare
                are delivered to individuals and families who are in crisis due
                to a life-threatening illness like cancer. We serve families in{' '}
                <strong>Santa Cruz County, California</strong>.
              </>
            ) : (
              'Lorem ipsum'
            )}
          </AboutParagraph>
          <AboutParagraph>
            {preferredLanguage === PreferredLanguage.ENGLISH ? (
              <>
                The teens gain skills in cooking healthy food, learn about the
                impact of their food choices, and are offered an opportunity to
                build connections through community service.
              </>
            ) : (
              'Lorem ipsum'
            )}
          </AboutParagraph>
          <AboutParagraph>
            {preferredLanguage === PreferredLanguage.ENGLISH ? (
              <>
                The Teen Kitchen Project operates on Sundays all day, and
                Monday, Tuesday, and Wednesday afternoons, out of a commercial
                kitchen in Soquel, California. We are supported through
                donations from the community, grants, and contracts with local
                and state agencies.
              </>
            ) : (
              'Lorem ipsum'
            )}
          </AboutParagraph>
        </Section>

        <SectionWithHeadline
          headline={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Background and Overview of Teen Kitchen Project'
              : 'Lorem ipsum'
          }
        >
          <AboutParagraph>
            {preferredLanguage === PreferredLanguage.ENGLISH ? (
              <>
                Teen Kitchen Project (TKP) was founded by current Executive
                Director Angela Farley after her own family experienced a
                life-threatening illness. In 2011 her son was diagnosed with
                cancer. During his treatment, friends and family brought home
                cooked meals to help keep Angela's family nourished. After her
                son's treatment was successfully completed, she made a
                commitment to help others as she was helped during her time of
                need.
              </>
            ) : (
              'Lorem ipsum'
            )}
          </AboutParagraph>
          <AboutParagraph>
            {preferredLanguage === PreferredLanguage.ENGLISH ? (
              <>
                Founded in 2012, TKP provides home-delivered, medically tailored
                meals (MTMs) to individuals in Santa Cruz County. Meals are
                designed by an in-house Registered Dietitian Nutritionist and
                Executive Chef, prepared by teen chefs who benefit from the
                opportunity to give back to their community while learning
                valuable workforce and life skills and delivered by volunteer
                adults who perform weekly wellness checks for meal recipients.
              </>
            ) : (
              'Lorem ipsum'
            )}
          </AboutParagraph>
        </SectionWithHeadline>

        <SectionWithHeadline
          headline={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Organizational Mission and Values'
              : 'Lorem ipsum'
          }
        >
          <div className="flex flex-col">
            <H3>
              {preferredLanguage === PreferredLanguage.ENGLISH
                ? 'Our Mission'
                : 'Lorem ipsum'}
            </H3>
            <p>
              {preferredLanguage === PreferredLanguage.ENGLISH
                ? 'To build healthy communities through food.'
                : 'Lorem ipsum'}
            </p>
          </div>

          <div className="flex flex-col">
            <H3>
              {preferredLanguage === PreferredLanguage.ENGLISH
                ? 'Our Values'
                : 'Lorem ipsum'}
            </H3>
            <Ul>
              <LiWithHeadline
                headline={
                  preferredLanguage === PreferredLanguage.ENGLISH
                    ? 'Work with Intention:'
                    : 'Lorem ipsum'
                }
                content={
                  preferredLanguage === PreferredLanguage.ENGLISH
                    ? 'Our actions and choices lead to the greatest positive impact.'
                    : 'Lorem ipsum'
                }
              />
              <LiWithHeadline
                headline={
                  preferredLanguage === PreferredLanguage.ENGLISH
                    ? 'Food is Love:'
                    : 'Lorem ipsum'
                }
                content={
                  preferredLanguage === PreferredLanguage.ENGLISH
                    ? 'The preparation and sharing of food allows and serving those in greatest need.'
                    : 'Lorem ipsum'
                }
              />
              <LiWithHeadline
                headline={
                  preferredLanguage === PreferredLanguage.ENGLISH
                    ? 'Young People are the Future:'
                    : 'Lorem ipsum'
                }
                content={
                  preferredLanguage === PreferredLanguage.ENGLISH
                    ? 'Young people are intelligent, responsible, capable, creative, caring, and must be central participants in shaping our collective future.'
                    : 'Lorem ipsum'
                }
              />
              <LiWithHeadline
                headline={
                  preferredLanguage === PreferredLanguage.ENGLISH
                    ? 'Integrity Matters:'
                    : 'Lorem ipsum'
                }
                content={
                  preferredLanguage === PreferredLanguage.ENGLISH
                    ? 'We are committed to trust, respect, and honesty.'
                    : 'Lorem ipsum'
                }
              />
            </Ul>
          </div>
        </SectionWithHeadline>

        <SectionWithHeadline
          headline={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Current Programs and Services'
              : 'Lorem ipsum'
          }
        >
          {/* <p>TKP's services include:</p> */}
          <Ul>
            <LiWithHeadline
              headline={
                preferredLanguage === PreferredLanguage.ENGLISH
                  ? 'Meal Delivery Service:'
                  : 'Lorem ipsum'
              }
              content={
                preferredLanguage === PreferredLanguage.ENGLISH
                  ? 'Clients are referred by healthcare providers. Professional chefs train employee/volunteer teen chefs in preparing, cooking and packaging meals for delivery. A Registered Dietitian evaluates meals to ensure they are in accordance with DASH (Dietary Approaches to Stop Hypertension) guidelines and are diabetes-friendly (lower carb, no refined sugars). Meals are delivered for 12 weeks with the possibility of recertification for an additional 12 weeks with a doctor referral.'
                  : 'Lorem ipsum'
              }
            />
            <LiWithHeadline
              headline={
                preferredLanguage === PreferredLanguage.ENGLISH
                  ? 'Nutritional Counseling:'
                  : 'Lorem ipsum'
              }
              content={
                preferredLanguage === PreferredLanguage.ENGLISH
                  ? "All clients receive individualized nutritional counseling sessions from a bilingual Registered Dietitian to discuss clients' health goals in relation to their current diagnosis."
                  : 'Lorem ipsum'
              }
            />
            <LiWithHeadline
              headline={
                preferredLanguage === PreferredLanguage.ENGLISH
                  ? 'Teen Chef Program:'
                  : 'Lorem ipsum'
              }
              content={
                preferredLanguage === PreferredLanguage.ENGLISH
                  ? 'Working under the guidance of experienced chefs, approximately 85 teen chefs per year (ages 14-18) learn how to prepare, cook and package meals for delivery. Teens gain the opportunity to give back to their community while learning about nutrition, teamwork, leadership and workforce skills.'
                  : 'Lorem ipsum'
              }
            />
            <LiWithHeadline
              headline={
                preferredLanguage === PreferredLanguage.ENGLISH
                  ? 'Classes and Camps:'
                  : 'Lorem ipsum'
              }
              content={
                preferredLanguage === PreferredLanguage.ENGLISH
                  ? 'TKP offers a range of cooking classes and camps for children and youth.'
                  : 'Lorem ipsum'
              }
            />
          </Ul>
        </SectionWithHeadline>

        <SectionWithHeadline
          headline={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Financial Position'
              : 'Lorem ipsum'
          }
        >
          <Ul>
            <li>
              {preferredLanguage === PreferredLanguage.ENGLISH ? (
                <>TKP's annual budget for 2023 is $1.2M.</>
              ) : (
                'Lorem ipsum'
              )}
            </li>
            <li>
              {preferredLanguage === PreferredLanguage.ENGLISH ? (
                <>
                  In 2022, 84% of the organization's total budget was allocated
                  to programs, 9% to administration and 5% to fundraising. Most
                  personnel expenses are allocated to programs, with the
                  remaining amount allocated to administration and fundraising.
                </>
              ) : (
                'Lorem ipsum'
              )}
            </li>
            <li>
              {preferredLanguage === PreferredLanguage.ENGLISH ? (
                <>
                  TKP has diversified its revenue streams over the last six
                  years. Comparing 2022 to 2017, TKP has increased the
                  percentage of revenue from earned income, events and in-kind
                  donations. This meant the organization decreased its reliance
                  on foundation grants, individual donors and corporate gifts.
                </>
              ) : (
                'Lorem ipsum'
              )}
            </li>
            <li>
              {preferredLanguage === PreferredLanguage.ENGLISH ? (
                <>
                  Over the last three years, TKP has continued to serve more
                  clients and the organization's budget has increased
                  accordingly. The personnel budget increased in 2021 because
                  the organization had fewer volunteers in the kitchen due to
                  the pandemic.
                </>
              ) : (
                'Lorem ipsum'
              )}
            </li>
            <li>
              {preferredLanguage === PreferredLanguage.ENGLISH ? (
                <>
                  Roughly 14% of TKP's personnel budget supports teen salaries.
                </>
              ) : (
                'Lorem ipsum'
              )}
            </li>
            <li>
              {preferredLanguage === PreferredLanguage.ENGLISH ? (
                <>
                  TKP has provided medically tailored meals to vulnerable
                  members of the Santa Cruz County community for 10 years. In
                  the calendar year 2022, the agency delivered 80,297 meals to a
                  total of 623 unduplicated clients in Santa Cruz County
                  impacted by life-threatening illnesses.
                </>
              ) : (
                'Lorem ipsum'
              )}
            </li>
          </Ul>
        </SectionWithHeadline>

        <SectionWithHeadline
          headline={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Client Demographics'
              : 'Lorem ipsum'
          }
        >
          <p>
            {preferredLanguage === PreferredLanguage.ENGLISH ? (
              <>
                In 2022, 84% of clients served were low-income (59% on Medi-Cal
                and 25% less than 200% below the poverty level).
              </>
            ) : (
              'Lorem ipsum'
            )}
          </p>

          <div className="flex flex-col">
            <H3>
              {preferredLanguage === PreferredLanguage.ENGLISH
                ? 'Clients By Location'
                : 'Lorem ipsum'}
            </H3>
            <Ul>
              <Li>
                {preferredLanguage === PreferredLanguage.ENGLISH
                  ? 'South County: 30%'
                  : 'Lorem ipsum'}
              </Li>
              <Li>
                {preferredLanguage === PreferredLanguage.ENGLISH
                  ? 'San Lorenzo Valley: 10%'
                  : 'Lorem ipsum'}
              </Li>
              <Li>
                {preferredLanguage === PreferredLanguage.ENGLISH
                  ? 'Mid County: 31%'
                  : 'Lorem ipsum'}
              </Li>
              <Li>
                {preferredLanguage === PreferredLanguage.ENGLISH
                  ? 'Greater Santa Cruz and North County: 29%'
                  : 'Lorem ipsum'}
              </Li>
            </Ul>
          </div>

          <div className="flex flex-col">
            <H3>
              {preferredLanguage === PreferredLanguage.ENGLISH
                ? 'Clients By Primary Diagnosis'
                : 'Lorem ipsum'}
            </H3>
            <Ul>
              <Li>
                {preferredLanguage === PreferredLanguage.ENGLISH
                  ? 'Cancer: 19%'
                  : 'Lorem ipsum'}
              </Li>
              <Li>
                {preferredLanguage === PreferredLanguage.ENGLISH
                  ? 'Diabetes: 26%'
                  : 'Lorem ipsum'}
              </Li>
              <Li>
                {preferredLanguage === PreferredLanguage.ENGLISH
                  ? 'Congestive Heart Failure: 8%'
                  : 'Lorem ipsum'}
              </Li>
              <Li>
                {preferredLanguage === PreferredLanguage.ENGLISH
                  ? 'Severe Neurological Disease: 13%'
                  : 'Lorem ipsum'}
              </Li>
              <Li>
                {preferredLanguage === PreferredLanguage.ENGLISH
                  ? 'Recent Major Surgery: 12%'
                  : 'Lorem ipsum'}
              </Li>
              <Li>
                {preferredLanguage === PreferredLanguage.ENGLISH
                  ? 'Other Eligible Diagnosis: 22%'
                  : 'Lorem ipsum'}
              </Li>
            </Ul>
          </div>
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
