import Axios from 'axios';
import Email from './Email';

const serverUrl = 'https://testmailer-kjvcft4q2a-uc.a.run.app';

function sendEmail(email: Email) {
  Axios.post(serverUrl, email.toStorable())
    .then((res) => {
      window.alert(res.data);
      console.log('Sent!');
    })
    .catch((err) => {
      window.alert('Error!');
      console.error(err);
    });
}

export default sendEmail;
