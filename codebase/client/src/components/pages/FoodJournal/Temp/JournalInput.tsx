// import React, { Fragment, useContext } from 'react';
// import JournalContext from 'src/context/journal/journalContext';
// import * as JrnlInputs from '../JournalInputs';
// import createId from '../../../../utils/createId';

// const InputContainer = ({ children }) => {
//   return (
//     <div className="h-full p-2.5 border-[3px] border-cyan-600 rounded-xl">
//       {children}
//     </div>
//   );
// };

// const JournalInput = () => {
//   const journalContext = useContext(JournalContext);
//   const getMonthString = (date) => {
//     const options = { month: 'long' };
//     const monthString = new Intl.DateTimeFormat('en-US', options).format(date);
//     return monthString;
//   };

//   // Deconstruct needed info
//   const { id, weekStart, weekEnd, questionIds, didAttemptSubmit } =
//     journalContext;

//   // First task: Display non-question info
//   // Second task: Display question info

//   return (
//     <div className="flex flex-col items-center space-y-4 h-full w-full">
//       JournalInput
//       <div className="flex space-x-4 h-full w-full overflow-x-auto">
//         {questionIds.map((id) => {
//           const quesType = journalContext[id].type;
//           return (
//             <InputContainer key={createId()}>
//               {JrnlInputs.stateToJournalInput(quesType, id)}
//             </InputContainer>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default JournalInput;

export {};
