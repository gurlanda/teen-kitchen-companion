import { sendEmailVerification } from 'firebase/auth';
import getFirebaseServices from '../getFirebaseServices';

async function sendVerificationEmail() {
  const { authRef } = getFirebaseServices();
  if (authRef.currentUser === null) {
    return;
  }

  try {
    await sendEmailVerification(authRef.currentUser);
  } catch (error) {
    console.log(error);
  }
}

export default sendVerificationEmail;
