import { onRequest } from 'firebase-functions/v2/https';
import mailerFactory from './mailerFactory';

// const cors = true;
const cors = [/localhost:+/, 'https://teen-kitchen-companion.web.app'];
const testMailerHandler = mailerFactory('g.urlanda@gmail.com');
export const testMailer = onRequest({ cors }, testMailerHandler);
