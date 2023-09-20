import { sendPasswordResetEmail } from 'firebase/auth';
import getFirebaseServices from '../getFirebaseServices';

async function sendPasswordResetRequestEmail(email: string) {
  try {
    const { authRef } = getFirebaseServices();
    await sendPasswordResetEmail(authRef, email);
  } catch (error) {
    // TODO
  }
}

export default sendPasswordResetRequestEmail;
