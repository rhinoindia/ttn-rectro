/* eslint-disable no-console */
import Crypto from 'crypto';

export function missingFieldsGenrator(email) {
  try {
    const result = { email };
    result.password = Crypto.randomBytes(5).toString('base64');
    result.name = email.split('@')[0].replace('.', ' ');
    result.isSystemPassword = true;
    console.log(result, 'password');
    return result;
  } catch (error) {
    throw new Error('missing filed error');
  }
}

export function addMember(members, func) {
  const UserData = members.map(email => func({ email }, 'MEMBER'));

  return Promise.all(UserData).then((results) => {
    console.log(results);
  }).catch((err) => { console.log('holla', err); });
}

export function createPassword(pass) {
  const salt = Crypto.randomBytes(16).toString('base64');
  const hash = Crypto.createHmac('sha512', salt)
    .update(pass)
    .digest('base64');
  const password = `${salt}$${hash}`;
  return password;
}
