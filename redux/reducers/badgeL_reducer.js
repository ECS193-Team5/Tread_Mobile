const initialState = {
  badgeL : 0
};
const badgeL_reducer = (state = initialState, action) => {
  switch(action.type){
    case "badgeL_increment": {
      return {...state,badgeL:action.value};
    }
    case "badgeL_decrement": {
      return {...state,badgeL:state.badgeL - 1};
    }
    default: {
      return state;
    }
  }
}
export default badgeL_reducer;