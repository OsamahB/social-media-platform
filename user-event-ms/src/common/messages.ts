const PASSWORD_RULE_MESSAGE =
  'Password should have at least one upper case letter, one lower case letter and one number';
const PASSWORD_MISMATCH = 'Password and confirm password do not match';
const EMAIL_ALREADY_EXISTS = 'Email already exists';
const USER_NOT_FOUND = 'User not found';
const NO_DATA_PROVIDED = 'No data provided';
const INVALID_DATE_FORMAT =
  'Invalid Date, date should be in format YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ';
const DATE_IN_PAST = 'Date should be in the future';
const JOIN_REQUEST_ALREADY_EXISTS =
  'Join request already exists, please wait for the response';
const EVENT_NOT_FOUND = 'Event not found, please check the event id';
const EXPIRED_EVENT = 'Event has already expired';
const USER_EVENT = 'You cannot join your own event';
const JOIN_REQUEST_NOT_FOUND = 'Join request not found';
const JOIN_REQUEST_ALREADY_RESOLVED = 'Join request already accepted/rejected';
const ACCESS_DENIED =
  'Access denied, you do not have permission to perform this action';

export default {
  PASSWORD_RULE_MESSAGE,
  PASSWORD_MISMATCH,
  EMAIL_ALREADY_EXISTS,
  USER_NOT_FOUND,
  NO_DATA_PROVIDED,
  INVALID_DATE_FORMAT,
  DATE_IN_PAST,
  JOIN_REQUEST_ALREADY_EXISTS,
  EVENT_NOT_FOUND,
  EXPIRED_EVENT,
  USER_EVENT,
  JOIN_REQUEST_NOT_FOUND,
  JOIN_REQUEST_ALREADY_RESOLVED,
  ACCESS_DENIED,
};
