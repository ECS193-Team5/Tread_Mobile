const badgeC_increment = (value) => {
  return {
    type: "badgeC_increment",
    value
  }
}
const badgeC_decrement = () => {
  return {
    type: "badgeC_decrement",
  }
}
export {badgeC_increment, badgeC_decrement};