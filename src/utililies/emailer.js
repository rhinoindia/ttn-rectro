/* eslint-disable no-console */
import mailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

// Use Smtp Protocol to send Email
const transport = mailer.createTransport(smtpTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: 'rectro.testing1@gmail.com',
    pass: 'rectro@123',
  },
}));

export const mockDAta = {
  from: 'Yashwant Chavan <from@gmail.com>',
  to: 'vishal.kashyap@tothenew.com',
  subject: 'Send Email Using Node.js',
  text: 'Node.js New world for me',
  html: '<b>Node.js New world for me</b>',
};

export default async function sendMail(template) {
  console.log(template, 'emailer data');
  transport.sendMail(template, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Message sent: ${response.message}`);
    }

    transport.close();
  });
}
