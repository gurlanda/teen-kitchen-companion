// import React, { useState, useContext } from 'react';
// import PropTypes from 'prop-types';

// import ImgOptInputState from 'src/model/InputState/ImgOptInputState';
// import QuestionInputState from 'src/model/InputState/QuestionInputState';
// import JournalInputContext from 'src/context/JournalInput/JournalInputContext';

// export type StateChangeHandler = { (affectedOption: string): void };
// const ImgRadio: React.FC<{
//   index: number;
//   imgOpt: ImgOptInputState;
//   onChange: StateChangeHandler;
// }> = ({ index, imgOpt, onChange }) => {
//   return (
//     <label htmlFor={imgOpt.id}>
//       <input
//         className="h-0 w-0"
//         type="radio"
//         value={imgOpt.value}
//         checked={imgOpt.isSelected}
//         name={imgOpt.id}
//         id={imgOpt.id}
//         onChange={(e) => onChange(e.target.id)}
//         data-index={index}
//       />
//       <img
//         className={`h-auto w-full ${
//           imgOpt.isSelected ? 'border-blue-600 border-4 rounded-xl' : ''
//         }`}
//         src={imgOpt.imgPath}
//         alt=""
//       />
//     </label>
//   );
// };

// const ImgLinearScaleJournalInput: React.FC<{
//   question: QuestionInputState;
// }> = ({ question }) => {
//   // Set the initial selected opt index to be -1 so that no options are rendered as selected
//   const [currentOptIndex, setCurrentOptIndex] = useState(-1);
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
//   const active = true;

//   const barWidth = (currentIndex, optArrayLength) => {
//     const unitWidth = 100.0 * (1 / (optArrayLength - 1));
//     const style = {
//       width: `${currentIndex * unitWidth}%`,
//     };
//     return style;
//   };

//   const totalBarWidth = (optArrayLength) => {
//     const unitWidth = 100.0 * (1 / (optArrayLength * 2 + 1));
//     const style = {
//       width: `calc(${100 - unitWidth * 2}% + 22px)`,
//     };
//     // const style = {
//     //   width: `calc(${100 - unitWidth * 2}% + 22px)`,
//     //   left: `calc(${unitWidth}% - 7px)`,
//     // };
//     return style;
//   };

//   const onChange = (e) => {
//     setCurrentOptIndex(e.target.dataset.index);

//     const selectedOptId = e.target.value;

//     console.log(
//       `Selected option: ${e.target.dataset.index}. ID: ${selectedOptId}`
//     );

//     journalContext.applyQuestionReducer(
//       question.createSetOption(selectedOptId),
//       questionId
//     );
//   };

//   return (
//     <div
//       className={`flex flex-col w-full py-7 px-3 mb-7 bg-white xs:px-7 shadow-sm xs:rounded-xl sm:border-[1px] ${
//         isDanger() ? 'sm:border-red-600' : 'sm:border-gray-100'
//       } md:shadow-lg`}
//       id={questionId}
//     >
//       <label className="block font-bold mb-1 text-gray-800">
//         {text}
//         {/* <span className='text-red-600'>{`${isRequired ? ' *' : ''}`}</span> */}
//       </label>

//       <div className="flex flex-col">
//         {/* Image options */}
//         <div className="flex items-center mb-4">
//           {imgOptions.map((opt, index) => (
//             <ImgRadio
//               opt={opt}
//               name={questionId}
//               onChange={onChange}
//               key={opt.id}
//               index={index}
//             />
//           ))}
//         </div>

//         <div className="flex items-center space-x-1">
//           <label className="shrink text-center" htmlFor={imgOptions[0].id}>
//             {minText}
//           </label>
//           <div className="flex justify-between relative mb-8 w-96 max-w-full">
//             {/* Progress bar */}
//             <div className="flex justify-between relative w-full">
//               <div
//                 className={`bg-blue-500 absolute top-1/2 left-0 h-1 -translate-y-1/2 z-20 transition-all ease-linear`}
//                 style={barWidth(currentOptIndex, imgOptions.length)}
//               ></div>
//               <div className="bg-gray-200 absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 z-10"></div>

//               {/* Radio buttons */}
//               {imgOptions.map((opt, index) => {
//                 // Determine whether this radio button is checked
//                 const checked = currentOptIndex == index;
//                 // console.log(`Index ${index}. checked: ${checked}`);
//                 // Determine whether this part of the bar is rendered as active
//                 const isActive = index <= currentOptIndex;
//                 return (
//                   <label
//                     className="flex flex-col justify-center items-center"
//                     htmlFor={opt.id}
//                     key={opt.id}
//                   >
//                     <div>&nbsp;</div>
//                     <div
//                       className={`z-30 bg-white border-4 rounded-[50%] h-8 w-8 flex justify-center items-center transition-all ease-in-out ${
//                         isActive ? 'border-blue-500' : 'border-gray-200'
//                       }`}
//                       id="progress"
//                     >
//                       <input
//                         className="h-4 w-4 self-center"
//                         type="radio"
//                         data-index={index}
//                         name={questionId}
//                         value={opt.id}
//                         checked={checked}
//                         id={opt.id}
//                         onChange={onChange}
//                       />
//                     </div>
//                     <span>{opt.value}</span>
//                   </label>
//                 );
//               })}
//             </div>
//           </div>

//           <label
//             className="shrink text-center"
//             htmlFor={imgOptions[imgOptions.length - 1].id}
//           >
//             {maxText}
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// ImgLinearScaleJournalInput.propTypes = {
//   questionId: PropTypes.string.isRequired,
// };

// export default ImgLinearScaleJournalInput;
export {};
