const initialState = {
  badgeC : 0
};
const badgeC_reducer = (state = initialState, action) => {
  switch(action.type){
    case "increment": {
      return {...state,badgeC:action.value};
    }
    case "decrement": {
      return {...state,badgeC:state.badgeC - 1};
    }
    default: {
      return state;
    }
  }
}
export default badgeC_reducer;