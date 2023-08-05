import { FirestoreDataConverter } from 'firebase/firestore';
import User from '../../model/User/User';
import StorableUser from '../../model/User/StorableUser';

// Used to convert between StorableUsers and Users for use by Firestore.
// StorableUser represents the user's data in the server.
// User represents the user's data as used by the client.
const userConverter: FirestoreDataConverter<User> = {
  fromFirestore(snapshot) {
    const storableUser: StorableUser = snapshot.data() as StorableUser;
    const userId = snapshot.ref.id;
    return User.fromStorable(storableUser, userId);
  },

  // Always ensure that the output is a StorableUser.
  // A StorableUser explicitly excludes the User.id property.
  toFirestore(modelObject: User): StorableUser {
    return modelObject.toStorable();
  },
};

export default userConverter;
