import Axios from 'axios';
import Email from './Email';

const serverUrl = 'https://mailer-kjvcft4q2a-uc.a.run.app';

function sendEmail(email: Email) {
  Axios.post(serverUrl, email.toStorable())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

  Axios.post(serverUrl, email.toStorable())
    .then((res) => window.alert(res.data))
    .catch((err) => {
      window.alert('Error!');
      console.error(err);
    });
}

export default sendEmail;
