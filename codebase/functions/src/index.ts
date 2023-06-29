import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import * as nodemailer from 'nodemailer';

// Create transporter
// Used to send emails
const transporter = nodemailer.createTransport({
  host: 'smtp.forwardemail.net',
  port: 465,
  secure: true,
  auth: {
    user: 'sandbox@gamurlanda.com',
    pass: '646dd3003ff0353ca86dc668',
  },
});

// const cors = true;
const cors = [/localhost:+/, 'https://teen-kitchen-companion.web.app'];
export const mailer = onRequest({ cors }, (request, response) => {
  const { recipientEmail, subject, message } = request.body;

  async function main() {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Gam\'s Sandbox Email" sandbox@gamurlanda.com', // Sender address
      to: recipientEmail, // List of receivers
      subject: subject, // Subject line
      text: message, // Plain text body
    });

    logger.info('Message sent: %s', info.messageId);
  }
  main().catch(logger.error);
  logger.info(`Email sent to ${recipientEmail}`);
  response.send('Email sent!');
});
