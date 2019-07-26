import axios from '../axios'

const errMsg = 'Server is unavailable.'

export const listTodo = ({ token = '' } = {}) => async (dispatch) => {
  axios.get('/todos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    dispatch({
      type: 'LIST_TODO',
      payload: {
        data: response.data,
        resMessage: response.data.messages,
        resStatus: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: 'LIST_TODO',
      payload: {
        resStatus: false,
        resMessage: error.response ? error.response.data.messages : errMsg
      }
    })
  })
}

export const addTodo = ({ token = '', name = '' } = {}) => async (dispatch) => {
  axios.post('/todos', {
    name
  }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      dispatch({
        type: 'ADD_TODO',
        payload: {
          data: response.data.data,
          resMessage: response.data.messages,
          resStatus: true
        }
      })
    }).catch((error) => {
      dispatch({
        type: 'ADD_TODO',
        payload: {
          resStatus: false,
          resMessage: error.response ? error.response.data.messages : errMsg
        }
      })
    })
}

export const editTodo = ({ token = '', name = '', todoId = '' } = {}) => async (dispatch) => {
  axios.put(`/todos/${todoId}`, {
    name
  }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      axios.get('/todos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((responseList) => {
        dispatch({
          type: 'EDIT_TODO',
          payload: {
            data: responseList.data,
            resMessage: response.data.messages,
            resStatus: true
          }
        })
      }).catch((error) => {
        dispatch({
          type: 'EDIT_TODO',
          payload: {
            resStatus: false,
            resMessage: error.response ? error.response.data.messages : errMsg
          }
        })
      })
    }).catch((error) => {
      dispatch({
        type: 'EDIT_TODO',
        payload: {
          resStatus: false,
          resMessage: error.response ? error.response.data.messages : errMsg
        }
      })
    })
}

export const markComplete = ({ token = '', todoId = '' } = {}) => async (dispatch) => {
  axios.get(`/todos/markComplete/${todoId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    axios.get('/todos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      dispatch({
        type: 'MARK_COMPLETE',
        payload: {
          data: response.data,
          resMessage: response.data.messages,
          resStatus: true
        }
      })
    }).catch((error) => {
      dispatch({
        type: 'MARK_COMPLETE',
        payload: {
          resStatus: false,
          resMessage: error.response ? error.response.data.messages : errMsg
        }
      })
    })
  }).catch((error) => {
    dispatch({
      type: 'MARK_COMPLETE',
      payload: {
        resStatus: false,
        resMessage: error.response ? error.response.data.messages : errMsg
      }
    })
  })
}