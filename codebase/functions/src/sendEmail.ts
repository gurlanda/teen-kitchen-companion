import * as nodemailer from 'nodemailer';

// Create transporter
// Used to send emails
const mailTransporter = nodemailer.createTransport({
  host: 'smtp.forwardemail.net',
  port: 465,
  secure: true,
  auth: {
    user: 'sandbox@gamurlanda.com',
    pass: '646dd3003ff0353ca86dc668',
  },
});

const defaultSenderEmail = '"Gam\'s Sandbox Email" sandbox@gamurlanda.com';
async function sendEmail(
  subject: string,
  text: string,
  recipientEmail: string,
  senderEmail: string = defaultSenderEmail
) {
  await mailTransporter.sendMail({
    from: senderEmail,
    to: recipientEmail,
    subject,
    text,
  });
}

export default sendEmail;
