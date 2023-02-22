// import React, { useContext } from 'react';
// import JournalInputContext from 'src/context/JournalInput/JournalInputContext';
// import QuestionInputState from 'src/model/InputState/QuestionInputState';

// const TimeJournalInput: React.FC<{ question: QuestionInputState }> = ({
//   question,
// }) => {
//   const journalContext = useContext(JournalInputContext);
//   if (!journalContext) {
//     return <></>;
//   }

//   const { id, text, isRequired } = question;
//   const isDanger = () => {
//     return (
//       isRequired &&
//       !question.isAnswered() &&
//       journalContext.state.didAttemptSubmit
//     );
//   };

//   const onChange = (e) => {
//     console.log('Value: ');
//     console.log(e.target.value);
//     const date = new Date(e.target.value);
//     date.toISOString;
//     console.log(date);
//   };

//   return (
//     <div
//       className={`flex flex-col w-full py-7 px-3 mb-7 bg-white xs:px-7 shadow-sm xs:rounded-xl sm:border-[1px] ${
//         isDanger() ? 'sm:border-red-600' : 'sm:border-gray-100'
//       } md:shadow-lg`}
//       id={id}
//     >
//       <label className="block font-bold mb-1 text-gray-800">
//         {text}
//         {/* <span className='text-red-600'>{`${isRequired ? ' *' : ''}`}</span> */}
//       </label>

//       <input
//         type="time"
//         className="px-3 py-2 border border-gray-300 rounded-md w-full hover:border-gray-400 focus:outline-blue-400"
//         name={id}
//         id={id}
//         onChange={(e) => onChange(new Date(e.target.value))}
//       />
//     </div>
//   );
// };

// export default TimeJournalInput;
export {};
