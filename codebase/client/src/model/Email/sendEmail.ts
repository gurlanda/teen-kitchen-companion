import Axios from 'axios';
import Email from './Email';
import getFirebaseServices from 'src/firebase/getFirebaseServices';

const firebaseServices = getFirebaseServices();
const testMailer = firebaseServices.testMailer;
export function sendEmailWithCallable(email: Email) {
  testMailer(email.toStorable())
    .then((result) => {
      window.alert(result.data);
    })
    .catch(() => {
      window.alert('Error!');
    });
}
