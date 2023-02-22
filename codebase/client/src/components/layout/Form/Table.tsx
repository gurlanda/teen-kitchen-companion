// import { FC } from 'react';

// const Table: FC<{}> = () => {
//   const heading =
//     'Table question Lorem ipsum, dolor sit amet consectetur adipisicing elit.';

//   const options = [
//     'Lorem ipsum dolor sit amet consectetur adipisicing.',
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//     'Lorem ipsum dolor sit amet.',
//     'Lorem ipsum dolor sit amet consectetur.',
//     'Lorem ipsum dolor sit amet consectetur.',
//     'Lorem ipsum dolor sit amet consectetur.',
//     'Lorem ipsum dolor sit amet consectetur.',
//     'Lorem ipsum dolor sit amet consectetur.',
//   ];

//   const rowQuestions = [
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, est?',
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus soluta vero voluptas rem ea, numquam adipisci laboriosam! Saepe enim nam vitae iste eveniet quia quibusdam?',
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, est?',
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, est?',
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, est?',
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus soluta vero voluptas rem ea, numquam adipisci laboriosam! Saepe enim nam vitae iste eveniet quia quibusdam?',
//     'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi eligendi provident non culpa quas, voluptatum facere dolore voluptas laboriosam perspiciatis!',
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, est?',
//     'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi eligendi provident non culpa quas, voluptatum facere dolore voluptas laboriosam perspiciatis!',
//   ];

//   return (
//     <div className="mb-6 pt-2">
//       <h3 className="text-gray-800 font-bold">{heading}</h3>
//       <div className="overflow-auto">
//         <table>
//           <thead className="border-b-2">
//             <tr className="">
//               <th className="px-2 pb-3 pt-1 xs:pt-3"></th>
//               {options.map((opt) => {
//                 return (
//                   <th className="px-2 pb-3 pt-1 xs:pt-3" key={createId()}>
//                     {opt}
//                   </th>
//                 );
//               })}
//             </tr>
//           </thead>
//           <tbody>
//             {rowQuestions.map((row, index) => {
//               const isEven = index % 2 === 0 ? true : false;
//               return (
//                 <tr
//                   className={`border-t-[1px] ${isEven ? 'bg-[#fafafa]' : ''}`}
//                   key={createId()}
//                 >
//                   <th className="px-3 pb-3">
//                     <p className="w-28 lg:w-44 text-left font-medium">{row}</p>
//                   </th>
//                   {options.map((opt) => {
//                     return (
//                       <td
//                         className="px-2 py-3 text-center align-middle"
//                         key={createId()}
//                       >
//                         <input
//                           type="checkbox"
//                           name="t1-r1"
//                           id=""
//                           className="w-6 h-6"
//                         />
//                       </td>
//                     );
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Table;
export {};
