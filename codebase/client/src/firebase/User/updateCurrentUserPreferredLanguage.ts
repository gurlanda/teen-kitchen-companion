import SupportedLanguage from 'src/model/Language/SupportedLanguage';
import getCurrentUser from './getCurrentUser';
import getUserDocRefWithConverter from './getUserDocRefWithConverter';
import { updateDoc } from 'firebase/firestore';

async function updateCurrentUserPreferredLanguage(
  preferredLanguage: SupportedLanguage.Type
) {
  const currentUser = await getCurrentUser();
  if (currentUser === undefined) {
    return;
  }

  const currentUserDoc = getUserDocRefWithConverter(currentUser.id);
  const updatedUser = currentUser.toChangePreferredLanguage(preferredLanguage);
  await updateDoc(currentUserDoc, updatedUser.toStorable());
}

export default updateCurrentUserPreferredLanguage;
