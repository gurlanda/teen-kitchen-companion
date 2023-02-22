// import { FC, ReactNode, useState } from 'react';
// import createId from '../../utils/createId';

// export type ModalDeactivateHandler = {()}

// // isActive: Boolean. Allows other elements to activate or deactivate the modal
// const Modal: FC<{ isActive: boolean; onDeactivate; children: ReactNode }> = ({
//   isActive,
//   onDeactivate:,
//   children,
// }) => {
//   const [modalId] = useState(createId());

//   const deactivate = (e: MouseEvent) => {
//     // We only want to deactivate the modal if the background is clicked
//     if (e.target.id === modalId) {
//       onDeactivate(false);
//     }
//   };

//   return (
//     <div
//       className={`h-screen w-screen bg-[rgba(49,53,59,0.7)] fixed z-10 ${
//         isActive ? '' : 'hidden'
//       }`}
//       onMouseUp={deactivate}
//       id={modalId}
//     >
//       {children}
//     </div>
//   );
// };

// Modal.defaultProps = {
//   isActive: true,
// };

// export default Modal;
export {};
