"use strict";

// forEach method, could be shipped as part of an Object Literal/Module
var forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
};

function toItemId(obj) {
  return obj.id || obj.nextSibling.data.trim();
}

function checkboxChanged(eventObj) {
  console.log("Changed", this, eventObj);
  if (this.checked) {
    this.className += " done";
  }

  var itemId = toItemId(this);
  window.localStorage.setItem(itemId, this.checked)
}

function updateOnlineStatus(event) {
  var condition = navigator.onLine ? "online" : "offline";
  var status = document.getElementById("status");
  status.innerHTML = "<p>" + condition + "</p>";
}

forEach(document.getElementsByTagName("input"), function(index, value){
  var itemId = toItemId(value);
  var result = window.localStorage.getItem(itemId);
  value.checked = (result == "true");
  console.log("Loaded " + itemId + " = " + result);

  value.addEventListener("change", checkboxChanged);  
});

window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
document.getElementById("newflight").addEventListener("click", function(){
  window.localStorage.clear();
  forEach(document.getElementsByTagName("input"), function(index, value){
    value.checked = false;
  });
});
updateOnlineStatus();
