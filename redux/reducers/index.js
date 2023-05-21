import { combineReducers } from 'redux'
import badgeC_reducer from './badgeC_reducer'
import badgeL_reducer from './badgeL_reducer'
import badgeF_reducer from './badgeF_reducer'

export default combineReducers({
  badgeC_reducer,
  badgeL_reducer,
  badgeF_reducer
})