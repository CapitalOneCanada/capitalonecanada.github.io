 (function filter(){
  var currentDate = new Date();
  console.log(currentDate);
  
  var events = document.getElementsByTagName("item")
  for (var i = 0; i < events.length; i++) {
    var eventDateString = events[i].getElementsByTagName("endDate")[0].innerHTML;
    var eventDate = new Date(eventDateString)
    console.log(eventDate);
    if (eventDate < currentDate) {
        events[i].parentNode.removeChild(events[i]);
        console.log("YAY")
        i--;
    }
  }
  
  // Add a default event if events list is empty
  if (events.length == 0) {
    // Create XML tags
    var item = document.createElement("item")
    var titleTag = document.createElement("title")
    var descriptionTag = document.createElement("description")
    var startDateTag = document.createElement("startDate")
    var endDateTag = document.createElement("endDate")
    var locationTag = document.createElement("location")
    var linkTag = document.createElement("link")
    var guidTag = document.createElement("guid")
    guidTag.setAttribute("isPermaLink", "true")
  
    // Set default values
    titleTag.innerHTML = "There are no upcoming events at this time.";
    startDateTag.innerHTML = currentDate;
    endDateTag.innerHTML = currentDate;
    descriptionTag.innerHTML = "";
    locationTag.innerHTML = "Please check again at a later time.";
    linkTag.innerHTML = window.location.hostname + "/events";
    guidTag.innerHTML = window.location.hostname + "/events";
  
    // Append tags to item node
    item.appendChild(titleTag)
    item.appendChild(descriptionTag)
    item.appendChild(startDateTag)
    item.appendChild(endDateTag)
    item.appendChild(locationTag)
    item.appendChild(linkTag)
    item.appendChild(guidTag)
  
    document.getElementsByTagName("channel")[0].appendChild(item)
  }
})()