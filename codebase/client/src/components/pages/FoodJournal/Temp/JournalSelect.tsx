// import React, { useEffect, useState, useRef } from 'react';
// import ServerAdapter from 'src/model/Server/ServerAdapter';
// import JournalInputContext from 'src/context/JournalInput/JournalInputContext';
// import Loading from 'src/components/layout/Loading';

// const JournalSelectItem: React.FC = ({ journal }) => {
//   const getMonthString = (date) => {
//     const options = { month: 'long' };
//     const monthString = new Intl.DateTimeFormat('en-US', options).format(date);
//     return monthString;
//   };

//   const weekStart = {
//     date: journal.weekStart.getDate(),
//     month: getMonthString(journal.weekStart),
//   };
//   const weekEnd = {
//     date: journal.weekEnd.getDate(),
//     month: getMonthString(journal.weekEnd),
//   };

//   return (
//     <div className="flex flex-col min-w-[6rem] p-2.5 text-center bg-cyan-100 border-[3px] border-cyan-600 rounded-xl tk-acumin-pro-condensed text-lg font-bold text-gray-800">
//       <span className="block">{`${weekStart.month} ${weekStart.date} to`}</span>
//       <span className="block">{`${weekEnd.month} ${weekEnd.date}`}</span>
//     </div>
//   );
// };

// const FoodJournal = () => {
//   const [journals, setJournals] = useState(null);
//   const _isMounted = useRef(true); // This flag indicates if this component is mounted, and therefore if we can write to its state

//   useEffect(() => {
//     // We can't declare the effect callback as async due to race conditions.
//     // Instead, we create and call an async helper function.
//     (async () => {
//       try {
//         console.log(
//           'FoodJournal page: Attempting to retrieve journals from server...'
//         );
//         const journalArray = await ServerAdapter.fetchAllJournals();
//         if (!journalArray || journalArray.length === 0) {
//           throw new Error('No journals successfully received.');
//         }

//         if (_isMounted) {
//           setJournals(journalArray);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     })();

//     return () => {
//       _isMounted.current = false;
//     };
//   }, []);

//   return journals ? (
//     <div className="flex flex-col w-screen px-4 space-y-4 tk-acumin-pro-semi-condensed text-gray-800">
//       <div className="flex space-x-4 w-full overflow-x-auto p-2 ">
//         {journals.map((jrnl) => (
//           <JournalSelectItem journal={jrnl} key={jrnl.id} />
//         ))}
//       </div>
//       <JournalInputContext journal={journals[0]}>
//         <JournalInput />
//       </JournalInputContext>
//     </div>
//   ) : (
//     <Loading />
//   );
// };

// export default FoodJournal;

export {};
