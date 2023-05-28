import NotificationPageMap from "./NotificationPageMap.json"

export const getPageToNavigateOnNotif = function(message){
  if (message.substring(0, message.indexOf(' ')).length === 3){
    return NotificationPageMap[message.substring(0, message.lastIndexOf(' ')).trim()]
  } else {
    return NotificationPageMap[message.substring(message.indexOf(' ') + 1).trim()]
  }
}