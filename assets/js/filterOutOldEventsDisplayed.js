(function filter(){
  var currentDate = new Date();
  
  var events = document.getElementsByClassName("event")
  
  if (events.length != 0){
      for (var i = 0; i < events.length; i++) {
        var eventDateString = events[i].getElementsByClassName("endDate")[0].innerHTML;
        eventDateString = removeEventStartTime(eventDateString)
      
        var eventDate = new Date(eventDateString)
  
        if (eventDate < currentDate) {
            events[i].parentNode.removeChild(events[i]);
            i--;
        }
      }
      
      // Add a default event if events list is empty after removing past events
      if (events.length == 0) {
        displayNoEventsMessage()
      }
  }
})()

function removeEventStartTime(str){
    return str.replace(/from [0-9]+:[0-9]+ [AP]M to /,"")
}

function displayNoEventsMessage(){
    var noEventsMessage = document.createElement("p")
    noEventsMessage.innerHTML = "There are no upcoming events at this time. Please check back at a later date."
    document.getElementsByClassName("container")[0].appendChild(noEventsMessage)
}