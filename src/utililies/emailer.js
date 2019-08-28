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
// clientId: '991118270319-tnhuo4bnvipmqpqgb5n8iueh09s7633o.apps.googleusercontent.com',
// secretId: 'h6QtnQZwveIT0LQEwrocJD0J',
// refreshToken: '1/CZ-r6NmD-amS1M4IB3tjgc-qG4-KG3YjqWzyVE9Y2bY',
// accessToken: 'ya29.GltyB1fnB-5jZ9-PdRtzsK_Plzm_U8cd6RFo2NcJaZcqe3_a_S_P9J
// jJFqWF2BLGOXG8JMslwDK71uxM-lhOAWPK_hM_AgK5I2pMn5D7uK02Zm-6t8uXltNCW6Gm',

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
