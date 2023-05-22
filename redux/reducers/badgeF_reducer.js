const initialState = {
  badgeF : 0
};
const badgeF_reducer = (state = initialState, action) => {
  switch(action.type){
    case "badgeF_increment": {
      return {...state,badgeF:action.value};
    }
    case "badgeF_decrement": {
      return {...state,badgeF:state.badgeF - 1};
    }
    default: {
      return state;
    }
  }
}
export default badgeF_reducer;