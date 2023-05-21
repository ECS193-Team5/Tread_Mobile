const badgeL_increment = (value) => {
  return {
    type: "badgeL_increment",
    value
  }
}
const badgeL_decrement = () => {
  return {
    type: "badgeL_decrement",
  }
}

export {badgeL_increment, badgeL_decrement};