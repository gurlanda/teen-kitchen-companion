import { onRequest, onCall } from 'firebase-functions/v2/https';
import Email from './Email';
import sendEmail from './sendEmail';

type onRequestParameters = Parameters<typeof onRequest>;
type RequestHandler = onRequestParameters[0];
export function mailerOnRequestFactory(recipientEmail: string): RequestHandler {
  return (request, response) => {
    const { subject, message } = request.body;
    sendEmail(subject, message, recipientEmail);
    response.send('Email sent!');
  };
}

type OnCallParameters = Parameters<typeof onCall<Email, string>>;
type OnCallRequestHandler = OnCallParameters[0];
export function mailerOnCallFactory(
  recipientEmail: string
): OnCallRequestHandler {
  return (request) => {
    const { subject, message } = request.data;
    sendEmail(subject, message, recipientEmail);
    return 'Email sent!';
  };
}
