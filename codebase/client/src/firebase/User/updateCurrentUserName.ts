import { updateDoc } from 'firebase/firestore';
import getCurrentUser from './getCurrentUser';
import getUserDocRefWithConverter from './getUserDocRefWithConverter';

// If a passed-in argument is undefined, then that part of the user's name will not be changed
async function updateCurrentUserName(
  firstName: string | undefined,
  lastName: string | undefined
) {
  const currentUser = await getCurrentUser();
  if (currentUser === undefined) {
    return;
  }

  const currentUserDoc = getUserDocRefWithConverter(currentUser.id);

  let updatedUser = currentUser.clone();
  if (firstName !== undefined) {
    updatedUser = updatedUser.toChangeFirstName(firstName);
  }

  if (lastName !== undefined) {
    updatedUser = updatedUser.toChangeLastName(lastName);
  }

  await updateDoc(currentUserDoc, updatedUser.toStorable());
}

export default updateCurrentUserName;
