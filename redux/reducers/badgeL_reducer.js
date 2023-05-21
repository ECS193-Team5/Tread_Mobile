const initialState = {
  badgeL : 0
};
const badgeL_reducer = (state = initialState, action) => {
  switch(action.type){
    case "badgeL_increment": {
      return {...state,badgeC:action.value};
    }
    case "badgeL_decrement": {
      return {...state,badgeC:state.badgeC - 1};
    }
    default: {
      return state;
    }
  }
}
export default badgeL_reducer;