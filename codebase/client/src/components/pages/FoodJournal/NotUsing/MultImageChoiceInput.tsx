// import React, { useState } from 'react';
// import ImgOpts from './imgOptions';

// const ImgRadio = ({ id, name, value, checked, img, onChange }) => {
//   return (
//     <label htmlFor={id}>
//       <input
//         className="h-0 w-0"
//         type="radio"
//         value={value}
//         checked={checked}
//         name={name}
//         id={id}
//         onChange={onChange}
//       />
//       <img
//         className={`h-auto w-full ${
//           checked ? 'border-blue-600 border-4 rounded-xl' : ''
//         }`}
//         src={img}
//         alt=""
//       />
//     </label>
//   );
// };

// const MultImageChoiceInput = () => {
//   const [btnA, setBtnA] = useState(false);
//   const [btnB, setBtnB] = useState(false);
//   // Add states for each button
//   // Make it so that if a button is clicked, then the state changes and is reflected in the appearance of the button
//   const onChange = (e) => {
//     const val = e.target.value;
//     switch (val) {
//       case 'btnA':
//         setBtnA(true);
//         setBtnB(false);
//         break;
//       case 'btnB':
//         setBtnA(false);
//         setBtnB(true);
//         break;
//     }
//     console.log(e.target.value);
//   };

//   return (
//     <div>
//       MultImageChoiceInput
//       <ImgRadio
//         id="btnA"
//         name="test"
//         value="btnA"
//         checked={btnA}
//         img={ImgOpts[0]}
//         onChange={onChange}
//       />
//       <ImgRadio
//         id="btnB"
//         name="test"
//         value="btnB"
//         checked={btnB}
//         img={ImgOpts[1]}
//         onChange={onChange}
//       />
//     </div>
//   );
// };

// export default MultImageChoiceInput;

export {};
