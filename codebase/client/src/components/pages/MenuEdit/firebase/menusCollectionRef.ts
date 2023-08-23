import { collection } from 'firebase/firestore';
import getFirebaseServices from 'src/firebase/getFirebaseServices';
import menusPathSegment from './menusPathSegment';

const { firestoreRef } = getFirebaseServices();
const menusCollectionRef = collection(firestoreRef, menusPathSegment);
export default menusCollectionRef;
