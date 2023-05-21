const badgeF_increment = (value) => {
  return {
    type: "badgeF_increment",
    value
  }
}
const badgeF_decrement = () => {
  return {
    type: "badgeF_decrement",
  }
}
export {badgeF_increment, badgeF_decrement};