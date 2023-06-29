import { onCall } from 'firebase-functions/v2/https';
import { mailerOnCallFactory } from './mailerFactory';

// const cors = true;
const cors = [/localhost:+/, 'https://teen-kitchen-companion.web.app'];
const testMailerHandler = mailerOnCallFactory('g.urlanda@gmail.com');
export const testMailer = onCall({ cors }, testMailerHandler);
