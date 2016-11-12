// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
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
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
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
document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    var pid= getASIN(url);
  });
});
