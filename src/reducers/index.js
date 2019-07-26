import { combineReducers } from 'redux'
import settings from './settings'
import auth from './auth'
import todo from './todo'

export default combineReducers({
  todo,
  auth,
  settings
})