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

export default mailTransporter;
