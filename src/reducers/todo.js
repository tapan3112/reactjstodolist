export default (state = { data: [] }, action) => {
  switch (action.type) {
    case 'LIST_TODO':
      return {
        ...state,
        ...action.payload.data,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage,
        dispatchType: action.type
      }

    case 'ADD_TODO':
      return {
        ...state,
        data: action.payload.resStatus ? [...state.data, action.payload.data] : state.data,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage,
        dispatchType: action.type
      }

    case 'EDIT_TODO':
      return {
        ...state,
        ...action.payload.data,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage,
        dispatchType: action.type
      }

    case 'MARK_COMPLETE':
      return {
        ...state,
        ...action.payload.data,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage,
        dispatchType: action.type
      }

    case 'CLEAR_TODO_PROPS':
      return {
        ...state,
        resStatus: '',
        resMessage: '',
        dispatchType: ''
      }

    case 'LOGOUT':
      return {
        ...state,
        data: ''
      }

    default:
      return state
  }
}