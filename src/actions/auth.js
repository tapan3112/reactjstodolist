import axios from '../axios'

const errMsg = 'Server is unavailable.'

export const login = ({ email = '', password = '' } = {}) => async (dispatch) => {
  axios.post('/login', {
    email,
    password
  }).then((response) => {
    localStorage.setItem('todoToken', response.data.token)
    localStorage.setItem('todoUsername', response.data.user.name)
    dispatch({
      type: 'LOGIN',
      payload: {
        token: response.data.token,
        data: response.data.user,
        resStatus: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: 'LOGIN',
      payload: {
        resStatus: false,
        resMessage: error.response ? error.response.data.messages : errMsg
      }
    })
  })
}

export const signup = ({
  name = '',
  email = '',
  phone = '',
  password = '',
  password_confirmation = ''
} = {}) => async (dispatch) => {
  axios.post('/register', {
    name,
    email,
    phone,
    password,
    password_confirmation
  }).then((response) => {
    localStorage.setItem('todoToken', response.data.token)
    localStorage.setItem('todoUsername', response.data.user.name)
    dispatch({
      type: 'SIGN_UP',
      payload: {
        token: response.data.token,
        data: response.data.user,
        resStatus: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: 'SIGN_UP',
      payload: {
        resStatus: false,
        resMessage: error.response ? error.response.data.messages : errMsg
      }
    })
  })
}