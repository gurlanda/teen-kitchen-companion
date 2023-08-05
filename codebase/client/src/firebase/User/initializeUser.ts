import User from 'src/model/User/User';
import getUserDocRefWithConverter from './getUserDocRefWithConverter';
import { setDoc } from 'firebase/firestore';

async function initializeUser(user: User) {
  const userDocRef = getUserDocRefWithConverter(user.id);
  await setDoc(userDocRef, user);
}

export default initializeUser;
