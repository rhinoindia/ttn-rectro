/* eslint-disable no-console */
import mailer from 'nodemailer';

// Use Smtp Protocol to send Email
const smtpTransport = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rectro.testing1@gmail.com',
    pass: 'rectro@123',
  },
});

export const mockDAta = {
  from: 'Yashwant Chavan <from@gmail.com>',
  to: 'vishal.kashyap@tothenew.com',
  subject: 'Send Email Using Node.js',
  text: 'Node.js New world for me',
  html: '<b>Node.js New world for me</b>',
};

export default async function sendMail(template) {
  console.log(template, 'emailer data');
  smtpTransport.sendMail(template, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Message sent: ${response.message}`);
    }

    smtpTransport.close();
  });
}
