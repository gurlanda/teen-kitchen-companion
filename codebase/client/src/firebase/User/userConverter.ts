import { FirestoreDataConverter } from 'firebase/firestore';
import User from '../../model/User/User';
import StorableUser from '../../model/User/StorableUser';

const userConverter: FirestoreDataConverter<User> = {
  fromFirestore(snapshot) {
    const storableUser: StorableUser = snapshot.data() as StorableUser;
    return User.fromStorable(storableUser);
  },

  toFirestore(modelObject: User) {
    return modelObject.toStorable();
  },
};

export default userConverter;
