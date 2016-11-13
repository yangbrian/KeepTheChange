var waitForVideo = setInterval (checkForElement, 150);

document.addEventListener( "DOMContentLoaded", checkForElement, false )


function checkForElement(){
var articles= document.getElementById("add-to-cart-button");
if(articles!=null){
	clearInterval (waitForVideo);
	disableStyle(articles);
	articles.disabled=true;
	articles.style.cursor= "not-allowed";
}
}

function disableStyle(input){
	input.style.opacity=0.25;
}

