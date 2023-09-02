import User from 'src/model/User/User';
import getFirebaseServices from '../getFirebaseServices';
import retrieveUserData from './retrieveUserData';

async function getCurrentUser(): Promise<User | undefined> {
  const { authRef } = getFirebaseServices();
  const currentUser = authRef.currentUser;
  if (!currentUser) {
    return undefined;
  }

  const user = await retrieveUserData(currentUser.uid);
  return user;
}

export default getCurrentUser;
