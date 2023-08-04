import React from 'react';
import { Link } from 'react-router-dom';
import Survey from 'src/model/archive/Survey/Survey';

const SurveyItem: React.FC<{ survey: Survey }> = ({ survey }) => {
  const { id, description, title } = survey;

  return (
    <>
      <hr className="bg-gray-100 h-[0.2px] border-0" />
      <Link
        to={`/survey/id/${id}`}
        className="px-3 py-7 block group text-center hover:bg-gray-50 hover:text-black sm:hover:last:rounded-lg"
      >
        <div className="mb-2 bg-inherit">
          <h1 className="font-bold text-lg text-gray-700 hover:text-black">
            {title}
          </h1>
          <p className="">{description ? description : undefined}</p>
        </div>
        <span className="block italic text-blue-400 group-hover:text-blue-600">
          Take this survey
        </span>
      </Link>
    </>
  );
};

export default SurveyItem;
