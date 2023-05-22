const initialState = {
  badgeP : 0
};
const badgeP_reducer = (state = initialState, action) => {
  switch(action.type){
    case "badgeP_increment": {
      return {...state,badgeP:action.value};
    }
    case "badgeP_decrement": {
      return {...state,badgeP:state.badgeP - 1};
    }
    default: {
      return state;
    }
  }
}
export default badgeP_reducer;