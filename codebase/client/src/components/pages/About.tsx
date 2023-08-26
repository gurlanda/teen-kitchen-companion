import React from 'react';
import TkpBanner from 'src/components/layout/TkpBanner';

const About: React.FC = () => {
  return (
    <div className=" min-h-screen">
      {/* Hero */}
      <TkpBanner>About the Teen Kitchen Project</TkpBanner>

      <main className="flex flex-col gap-8 max-w-[min(90vw,70ch)] mx-auto font-body text-lg">
        <Section>
          <div className="flex flex-col gap-1 text-center">
            <h2 className=" text-brand-orange text-5xl">Our Mission:</h2>
            <h3 className="font-heading font-bold text-4xl">
              The Teen Kitchen Project builds healthy communities
              through&nbsp;food
            </h3>
          </div>
          <AboutParagraph>
            The <strong>Teen Kitchen Project</strong> is a nonprofit
            organization that brings young people into the kitchen to learn to
            cook delicious and nourishing food. The meals they prepare are
            delivered to individuals and families who are in crisis due to a
            life-threatening illness like cancer. We serve families in{' '}
            <strong>Santa Cruz County, California</strong>.
          </AboutParagraph>
          <AboutParagraph>
            The teens gain skills in cooking healthy food, learn about the
            impact of their food choices, and are offered an opportunity to
            build connections through community service.
          </AboutParagraph>
          <AboutParagraph>
            The Teen Kitchen Project operates on Sundays all day, and Monday,
            Tuesday, and Wednesday afternoons, out of a commercial kitchen in
            Soquel, California. We are supported through donations from the
            community, grants, and contracts with local and state agencies.
          </AboutParagraph>
        </Section>

        <SectionWithHeadline headline="Background and Overview of Teen Kitchen Project">
          <AboutParagraph>
            Teen Kitchen Project (TKP) was founded by current Executive Director
            Angela Farley after her own family experienced a life-threatening
            illness. In 2011 her son was diagnosed with cancer. During his
            treatment, friends and family brought home cooked meals to help keep
            Angela's family nourished. After her son's treatment was
            successfully completed, she made a commitment to help others as she
            was helped during her time of need.
          </AboutParagraph>
          <AboutParagraph>
            Founded in 2012, TKP provides home-delivered, medically tailored
            meals (MTMs) to individuals in Santa Cruz County. Meals are designed
            by an in-house Registered Dietitian Nutritionist and Executive Chef,
            prepared by teen chefs who benefit from the opportunity to give back
            to their community while learning valuable workforce and life skills
            and delivered by volunteer adults who perform weekly wellness checks
            for meal recipients.
          </AboutParagraph>
        </SectionWithHeadline>

        <SectionWithHeadline headline="Organizational Mission and Values">
          <div className="flex flex-col">
            <H3>Our Mission</H3>
            <p>To build healthy communities through food.</p>
          </div>

          <div className="flex flex-col">
            <H3>Our Values</H3>
            <Ul>
              <LiWithHeadline
                headline="Work with Intention:"
                content="Our actions and choices lead to the
            greatest positive impact."
              />
              <LiWithHeadline
                headline="Food is Love:"
                content="The preparation and sharing of food allows
            our community to experience gratitude, compassion, connection, and
            serving those in greatest need."
              />
              <LiWithHeadline
                headline="Young People are the Future:"
                content="Young people are
            intelligent, responsible, capable, creative, caring, and must be
            central participants in shaping our collective future."
              />
              <LiWithHeadline
                headline="Integrity Matters:"
                content="We are committed to trust, respect,
            and honesty."
              />
            </Ul>
          </div>
        </SectionWithHeadline>

        <SectionWithHeadline headline="Current Programs and Services">
          {/* <p>TKP's services include:</p> */}
          <Ul>
            <LiWithHeadline
              headline="Meal Delivery Service:"
              content="Clients are referred by healthcare providers. Professional chefs train employee/volunteer teen chefs in preparing, cooking and packaging meals for delivery. A Registered Dietitian evaluates meals to ensure they are in accordance with DASH (Dietary Approaches to Stop Hypertension) guidelines and are diabetes-friendly (lower carb, no refined sugars). Meals are delivered for 12 weeks with the possibility of recertification for an additional 12 weeks with a doctor referral.
"
            />
            <LiWithHeadline
              headline="Nutritional Counseling:"
              content="All clients receive individualized nutritional counseling sessions from a bilingual Registered Dietitian to discuss clients' health goals in relation to their current diagnosis.
"
            />
            <LiWithHeadline
              headline="Teen Chef Program:"
              content="Working under the guidance of experienced chefs, approximately 85 teen chefs per year (ages 14-18) learn how to prepare, cook and package meals for delivery. Teens gain the opportunity to give back to their community while learning about nutrition, teamwork, leadership and workforce skills."
            />
            <LiWithHeadline
              headline="Classes and Camps:"
              content="TKP offers a range of cooking classes and camps for children and youth.
"
            />
          </Ul>
        </SectionWithHeadline>

        <SectionWithHeadline headline="Financial Position">
          <Ul>
            <li>TKP's annual budget for 2023 is $1.2M.</li>
            <li>
              In 2022, 84% of the organization's total budget was allocated to
              programs, 9% to administration and 5% to fundraising. Most
              personnel expenses are allocated to programs, with the remaining
              amount allocated to administration and fundraising.
            </li>
            <li>
              TKP has diversified its revenue streams over the last six years.
              Comparing 2022 to 2017, TKP has increased the percentage of
              revenue from earned income, events and in-kind donations. This
              meant the organization decreased its reliance on foundation
              grants, individual donors and corporate gifts.
            </li>
            <li>
              Over the last three years, TKP has continued to serve more clients
              and the organization's budget has increased accordingly. The
              personnel budget increased in 2021 because the organization had
              fewer volunteers in the kitchen due to the pandemic.
            </li>
            <li>
              Roughly 14% of TKP's personnel budget supports teen salaries.
            </li>
            <li>
              TKP has provided medically tailored meals to vulnerable members of
              the Santa Cruz County community for 10 years. In the calendar year
              2022, the agency delivered 80,297 meals to a total of 623
              unduplicated clients in Santa Cruz County impacted by
              life-threatening illnesses.
            </li>
          </Ul>
        </SectionWithHeadline>

        <SectionWithHeadline headline="Client Demographics">
          <p>
            In 2022, 84% of clients served were low-income (59% on Medi-Cal and
            25% less than 200% below the poverty level).
          </p>

          <div className="flex flex-col">
            <H3>Clients By Location</H3>
            <Ul>
              <Li>South County: 30%</Li>
              <Li>San Lorenzo Valley: 10%</Li>
              <Li>Mid County: 31%</Li>
              <Li>Greater Santa Cruz and North County: 29%</Li>
            </Ul>
          </div>

          <div className="flex flex-col">
            <H3>Clients By Primary Diagnosis</H3>
            <Ul>
              <Li>Cancer: 19%</Li>
              <Li>Diabetes: 26%</Li>
              <Li>Congestive Heart Failure: 8%</Li>
              <Li>Severe Neurological Disease: 13%</Li>
              <Li>Recent Major Surgery: 12%</Li>
              <Li>Other Eligible Diagnosis: 22%</Li>
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
