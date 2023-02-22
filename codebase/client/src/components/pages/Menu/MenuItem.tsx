import React from 'react';
import salmonImg from 'src/assets/img/weekly-menu/hoisin-glazed-salmon.png';
import createId from '../../../utils/createId';

type FoodInfo = {
  left: string;
  right: string;
};

const NutritionItem: React.FC<{ info: FoodInfo; key?: string }> = ({
  info,
}) => {
  return (
    <div
      className="flex justify-between border-slate-300 border-b"
      role="listitem"
    >
      <span className="block">{info.left}</span>
      <span className="block">{info.right}</span>
    </div>
  );
};

const MenuItem: React.FC = () => {
  const nutritionInfo: FoodInfo[] = [
    { left: '', right: 'Per serving' },
    { left: 'Calories', right: '740 kcal' },
    { left: 'Fat', right: '53g' },
    { left: 'Saturated Fat', right: '9g' },
    { left: 'Carbohydrates', right: '31g' },
    { left: 'Sugar', right: '15g' },
    { left: 'Dietary Fiber', right: '4g' },
    { left: 'Protein', right: '34g' },
    { left: 'Cholesterol', right: '75mg' },
    { left: 'Sodium', right: '1010mg' },
  ];

  return (
    <div className="flex flex-col space-y-4 max-w-3xl mx-auto tk-acumin-pro-semi-condensed text-gray-800 pb-12">
      <div className="px-4 space-y-4">
        <h1 className="tk-acumin-pro-condensed text-4xl font-bold underline">
          Hoisin-Glazed Salmon
        </h1>
        <h3 className="text-lg">
          Roasted broccoli, cabbage slaw with cashews, sesame seeds
        </h3>
      </div>
      <div className="">
        <img className="w-full h-auto" src={salmonImg} alt="" />
      </div>
      <div className="flex flex-row justify-center space-around space-x-4">
        <p className="bg-cyan-600 rounded-lg text-white p-2">Gluten-Free</p>
        <p className="bg-cyan-600 rounded-lg text-white p-2">Paleo</p>
      </div>
      {/* Nutritional value */}
      <div className="flex flex-col sm:flex-row-reverse sm:justify-evenly px-4 space-y-4">
        <div
          className="xs:min-w-[400px] xs:self-center sm:basis-0 sm:grow sm:min-w-fit sm:max-w-[350px] text-gray-900"
          role="list"
        >
          <h3 className="font-bold text-lg">Nutritional Value</h3>
          {nutritionInfo.map((item) => (
            <NutritionItem info={item} key={createId()} />
          ))}
        </div>

        <p className="sm:basis-0 sm:grow break-words ms:text-lg sm:mr-6">
          A quick trip in the oven transforms our hoisin-style amino sauce into
          a salty-sweet glaze for tonight's Asian-inspired salmon. Roasted to
          flaky perfection, the fish is paired with garlicky roasted broccoli
          and a citrusy cabbage and carrot slaw with cashews. A sprinkle of
          sesame seeds, plus a dash of crushed red pepper flakes, ties the
          20-minute, umami-rich meal together.
        </p>
      </div>
      <div className="flex flex-col px-4">
        <h3 className="font-bold text-lg mb-2">Ingredients</h3>
        <h4>Allergies: Fish, tree nuts</h4>
        <p className="text-sm mb-4">
          Produced in a facility that processes milk, eggs, fish, shellfish,
          tree nuts, peanuts, wheat, and soybeans
        </p>
        <p>
          Salmon, Hoisin-Style Amino Sauce, White Sesame Seeds, Garlic, Cashews,
          Red Cabbage, Carrots, Citrus Amino Sauce, Crushed Red Pepper Flakes,
          Broccoli
        </p>
      </div>
    </div>
  );
};

export default MenuItem;
