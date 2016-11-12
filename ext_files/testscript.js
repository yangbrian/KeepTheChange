var waitForVideo = setInterval (checkForElement, 150);

document.addEventListener( "DOMContentLoaded", checkForElement, false )

var loaded=0;

function checkForElement(){
var articles= document.getElementById("add-to-cart-button");
if(articles!=null && loaded!=1){
  loaded=1;
	clearInterval (waitForVideo);
	disableStyle(articles);
	articles.disabled=true;
	articles.style.cursor= "not-allowed";
	var url = window.location.href;
	var asin= getASIN(url);

$.get( "https://keep-the-change.appspot.com/amazon/"+asin, function(data) {
  $( ".result" ).html( data );
  alert(data.alternative.name+"\n"+ data.alternative.price);
});
	
}
}

function disableStyle(input){
	input.style.opacity=0.25;
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











