 var transactionArray=new Array(); // THIS IS WHERE ALL THE PLAYERS WILL GO
        var player1= new TransactionBox();
        var player2= new TransactionBox();
        var player3= new TransactionBox();

        player1.createNewForm();
        player2.createNewForm();
        player3.createNewForm();
        transactionArray.push(player1);
        transactionArray.push(player2);
        transactionArray.push(player3);



        var addButton= document.getElementById("circleBase");
        addButton.onclick=function(){
          var player= new TransactionBox();
          player.createNewForm();
          transactionArray.push(player);
          window.scrollTo(0,document.body.scrollHeight);
        }


    function Transaction() {
        this.Date ="";
        this.Category = "";
        this.Cost="";
        this.Company="";
        this.Description="";
        
    }

     function TransactionBox(){
        this.transaction= null;
        this.div=null;
        this.createNewForm=function(){

        // CREATE THE NEW DIV
        var div = document.createElement("div");
        div.classList.add("divClass");
        this.div=div;
        div.style.height='175px';

        // PERSONAL HEADER INFO
        var transactionHeader= document.createElement("h3");
        transactionHeader.innerHTML="Transaction";
        div.appendChild(transactionHeader);

        // ADD ALL THE TEXT INPUT BOXES
        var dateInput = document.createElement("input");
        dateInput.classList.add("date"); // ****************
        var categoryInput = document.createElement("input");
        categoryInput.classList.add("category"); // ****************
        var costInput= document.createElement("input"); 
        costInput.classList.add("cost"); // ****************
        var companyInput= document.createElement("input");
        companyInput.classList.add("company"); // ****************
        var descriptionInput= document.createElement("input");
        descriptionInput.classList.add("description"); // ****************

        var inputArray=[dateInput,categoryInput,costInput,companyInput,descriptionInput];
        var textArray=["Date","Category","Cost","Company","Description"];

        for(var i=0;i<inputArray.length;i++){
            var input= inputArray[i];
            var label= document.createElement("LABEL");
            label.classList.add("labels");
            label.innerHTML=textArray[i];
            input.type = "text";
            input.classList.add("inputClass");
            div.appendChild(label);
            div.appendChild(input)
        }

       // cityInput.style.width="13%"; // FIX THE SPACING OF THE TEXTFIELDS
        // DONE WITH TEXT INPUTS

        // LETS ADD THE DROPDOWN MENUS

    addBR(div);

    var submitButton=document.createElement("BUTTON");
    submitButton.innerHTML="Submit";


    submitButton.onclick=function(){
        this.transaction=submitTransaction(div);
        //minimizeBox(this.transaction,this.div);
    }.bind(this);

    div.appendChild(submitButton);
 

      var main= document.getElementById("main");
      main.appendChild(div);
    }



    function submitTransaction(box){
       try{
       checkEmptyInputs(box);
       var dateText=box.querySelector(".date");
       var categoryText= box.querySelector(".category");
       var costText= box.querySelector(".cost");
       var companyText= box.querySelector(".company");
       var descriptionText= box.querySelector(".description");

      var player= new Player();

       player.Date=dateText.value;
       player.Category=categoryText.value;
       player.Cost=parseInt(costText.value);
       player.Company=companyText.value;
       player.Description=descriptionText.value;
      return player;

       }
       catch(err){
        alert(err);
       }
    }
}


    

    function checkEmptyInputs(box){
        var inputArrayList= box.getElementsByTagName('input');
        var empty=false;

        for(var i=0;i<inputArrayList.length;i++){
            var input= inputArrayList[i];
                if(input.value.length==0){
                    input.style.backgroundColor ="red";
                    empty=true;
                }
        }
        if(empty){throw "There is an empty field";}
    }

    

   
    function initDropDownMenu(min,max){
        var selectMenu = document.createElement("SELECT");
        for(var i=0;i<=(max-min);i++){
            var option = document.createElement("option");
            option.text = min+i;
            selectMenu.add(option);
        }
        return selectMenu;
    }

    function addBR(div){
        var brk= document.createElement("BR");
        div.appendChild(brk);
    }

    function createJSONFile(){
      var json="{\n\"Players\":[\n";
      for(x in playersArray){
        json+=JSON.stringify(playersArray[x].player,null,4)+"\n";
      }
      json+="]\n}";

     
var textFile = null,
  makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
  };

    var link = document.createElement('a');
    link.setAttribute('download', 'info.json');
    link.href = makeTextFile(json);
    document.body.appendChild(link);

    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
      var event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
    });
    }


    function minimizeBox(player,div){
    setTextVisible(div,false);
    var timer= setInterval(function(){
      var height= parseInt(div.style.height.slice(0,3))
        if(height>=180){
        height-=8;
        div.style.height=height+'px';
        }
        else{
        clearInterval(timer);
        playerPreviewLayout(player,div);
        }
   },1);
    }

    function maximizeBox(div){

     var timer2= setInterval(function(){

      var height= parseInt(div.style.height.slice(0,3));
        if(height<=500){
          height+=8;
          div.style.height=height+'px';
        }
        else{
          clearInterval(timer2);
          div.style.height='500px';
          setTextVisible(div,true);
        }

   },1);

    }

    function playerPreviewLayout(player,div){

      var picDiv= document.createElement('div');
      var infoDiv= document.createElement('div');

      picDiv.classList.add('picDiv');
      infoDiv.classList.add('infoDiv');
      div.appendChild(picDiv);
      div.appendChild(infoDiv);


      var image= document.createElement('IMG');
      image.setAttribute("src","default_avatar.jpg");
      image.style.height="100%";
      image.style.width="87%";
      picDiv.appendChild(image);

      var name=document.createElement('h1');
      name.innerHTML=player.FirstName+" "+player.LastName;
      name.classList.add("nameLabel");
 

      var lineDiv = document.createElement('hr');
      lineDiv.classList.add("lineBreaker");


      var infoList = document.createElement('ul');
      infoList.classList.add("infoList");
      
      var info=["SF",(convertHeight(player.Height)+", "+player.Weight.toString()+" lbs"), player.Team];

      for(var i=0;i<info.length;i++){
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(info[i]));

        infoList.appendChild(item);
      }

      var metaData= document.createElement('ul');
      metaData.classList.add("metaDataList");
      var labels = ["Age","Hometown","College","Experience","Contract"];
      var inform=    [player.Age,(player.City+", "+player.State),player.College,player.Exp.toString(),"$10,000,000"];

      for(var i=0; i<labels.length;i++){
        var item= document.createElement('li');
        var span= document.createElement('span');
        span.innerHTML=labels[i];
        item.appendChild(span);
        item.appendChild(document.createTextNode(inform[i]));

        metaData.appendChild(item);
      }





      infoDiv.appendChild(name);
      infoDiv.appendChild(lineDiv);
      infoDiv.appendChild(infoList);
      infoDiv.appendChild(metaData);





    }

    function setTextVisible(div,bool){
       var childNodeArray= div.childNodes;

      if(bool){
    for(var i=0;i<childNodeArray.length;i++){
        childNodeArray[i].style.display= '';
     }
      }

      else{
    for(var i=0;i<childNodeArray.length;i++){
        childNodeArray[i].style.display= 'none';
     }
      }
    }

    








