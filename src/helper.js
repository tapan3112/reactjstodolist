import { history, store } from './index';

// Separate function for email validation
export function verifyEmail(value) {
  var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRex.test(value)) {
    return true;
  }
  return false;
};

// Separate function for password strength validation
export function verifyPassword(value) {
  var passwordRex = /^.{6,}$/;
  if (passwordRex.test(value)) {
    return true;
  }
  return false;
}

// Separate function for field length validation
export function verifyLength(value, length) {
  if (value.length >= length) {
    return true;
  }
  return false;
};

export function verifyLink(value) {
  var linkRex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  if (linkRex.test(value)) {
    return true;
  }
  return false;
}

export function verifyMobileNumber(value) {
  var mobRex = /^\+(?:[0-9] ?){6,14}[0-9]$/
  if (mobRex.test(value)) {
    return true;
  }
  return false;
}

export function verifyUsername(value) {
  var usernameRex = /^(?!.*__.*)(?!.*\.\..*)[a-z0-9_.]+$/
  if (usernameRex.test(value)) {
    return true;
  }
  return false;
}

export async function unAuthorized() {
  await localStorage.removeItem('influToken')
  store.dispatch({ type: 'LOGOUT' })
  history.push('/')
}

export const S3_URL = 'https://s3.amazonaws.com/ireply-media/'

export const FRONT_URL = 'http://irep.ly/'

export const MESSAGE_INTERVAL = 5000

export var NEXTDATA_INTERVAL = 5000

export var ADMIN_FEE = 5 //In Percentage
export var MESSAGE_ADMIN_FEE = 20 // In Percentage

export var STRIPE_FEE = 2.9 // In percentage
export var STRIPE_CLIENT_ID = process.env.NODE_ENV === 'production' ? 'ca_FM0oy0y4HfsGlLvPnWQqXiSgUQa8v3ed' : 'ca_F15tlXGN3gVodxGyAiVxB14hCEoJxmg0'
export var STRIPE_PK_TEST = process.env.NODE_ENV === 'production' ? 'pk_live_o5MMfvoP6Cl9XDc8r0lMLpWC00d5R9a5Ws' : 'pk_test_7vU2cxV1vr9X52Cc3XOBCyhW'