import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import mailTransporter from './mailTransporter';

type onRequestParameters = Parameters<typeof onRequest>;
type RequestHandler = onRequestParameters[0];
function mailerFactory(recipientEmailAddress: string): RequestHandler {
  return (request, response) => {
    const { subject, message } = request.body;

    async function main() {
      // Send mail with defined transport object
      const info = await mailTransporter.sendMail({
        from: '"Gam\'s Sandbox Email" sandbox@gamurlanda.com', // Sender address
        to: recipientEmailAddress, // List of receivers
        subject: subject, // Subject line
        text: message, // Plain text body
      });

      logger.info('Message sent: %s', info.messageId);
    }
    main().catch(logger.error);
    logger.info(`Email sent to ${recipientEmailAddress}`);
    response.send('Email sent!');
  };
}

export default mailerFactory;
