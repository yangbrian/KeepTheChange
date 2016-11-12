function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;

    callback(url);
  });

}

function getASIN(url){
  var arr= url.split("/");
  var asin=null;
  if(arr){
      for(var i=0; i<arr.length; i++){
    if(arr[i]==="dp"){
      asin=arr[i+1];
      break;
    }
    else if(arr[i]=="gp"){
      asin=arr[i+2];
    }
  }
  }

  return asin;
}

chrome.runtime.onMessage.addListener(function (msg, sender,response) {
  if ((msg.data === 'showASIN')) {
    var pid;
    getCurrentTabUrl(function(url) {
    pid= getASIN(url);
    });
    response(pid);
  }
});

// document.addEventListener('DOMContentLoaded', function() {
//   var url;
//   chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
//   var tab = tabs[0];
//   url = tab.url;
// });
//     var pid= getASIN(url);


//      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, {greeting: pid}, function(response) {
//   });
// });
//   });


