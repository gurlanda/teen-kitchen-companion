// This function is meant to be passed into the useEffect hook.
// Add a listener for the beforeunload event. If the user wants to navigate away from the page and has unsaved changes, the listener will ask the user to confirm losing the changes before navigating away.
const confirmUnloadEffect = () => {
  const confirmUnload = (e) => {
    let confirmationMessage =
      'It looks like there is unsubmitted info.' +
      'If you leave before submitting, your info will be lost. Confirm leaving?';

    (e || window.event).returnValue = confirmationMessage; // Gecko + IE
    return confirmationMessage; // All other browsers
  };

  window.addEventListener('beforeunload', confirmUnload);

  return () => window.removeEventListener('beforeunload', confirmUnload);
};

export default confirmUnloadEffect;
