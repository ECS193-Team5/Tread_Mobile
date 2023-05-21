const badgeC_increment_counter = (value) => {
  return {
    type: "increment",
    value
  }
}
const badgeC_decrement_counter = () => {
  return {
    type: "decrement",
  }
}
export {badgeC_increment_counter, badgeC_decrement_counter};