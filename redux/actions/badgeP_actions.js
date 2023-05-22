const badgeP_increment = (value) => {
  return {
    type: "badgeP_increment",
    value
  }
}
const badgeP_decrement = () => {
  return {
    type: "badgeP_decrement",
  }
}

export {badgeP_increment, badgeP_decrement};