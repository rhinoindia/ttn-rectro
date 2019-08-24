/* eslint-disable no-console */
import * as respond from './respond';

export function required(value, name) {
  if (value === undefined || !value.length) {
    console.log(value, 'cvalidation');
    const err = `${name} is required field`;
    throw new respond.BadRequestError(err);
  }
  return value;
}
export function email(value) {
  if (!value.length) {
    // eslint-disable-next-line no-console
    console.error('error');
  }
  return value;
}
