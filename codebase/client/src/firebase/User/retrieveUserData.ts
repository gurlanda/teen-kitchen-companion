import { getDoc } from 'firebase/firestore';
import getUserDocRefWithConverter from './getUserDocRefWithConverter';

async function retrieveUserData(userId: string) {
  const userDocRef = getUserDocRefWithConverter(userId);
  const userSnapshot = await getDoc(userDocRef);
  const userData = userSnapshot.data();
  return userData;
}

export default retrieveUserData;
