export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        ...action.payload.data,
        token: action.payload.token,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage,
        dispatchType: action.type
      }

    case 'TOKEN_LOGIN': {
      return {
        ...state,
        token: action.payload.token
      }
    }

    case 'SIGN_UP':
      return {
        ...state,
        ...action.payload.data,
        token: action.payload.token,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage,
        dispatchType: action.type
      }

    case 'LOGOUT':
      localStorage.removeItem('todoToken')
      localStorage.removeItem('todoUsername')
      return {
        ...state,
        token: ''
      }

    default:
      return state
  }
}
