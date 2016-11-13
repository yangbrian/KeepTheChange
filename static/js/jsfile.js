
      google.charts.load("current", {packages:["corechart", 'table']});
      google.charts.setOnLoadCallback(drawChart);

      var dataTable;
      var transactionArray= new Array();

   $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      starting_top: '4%', // Starting top style attribute
      ending_top: '10%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        document.getElementById("form1").reset();
      },
    }
  );


      function Transaction(date,company,category,cost){
        this.date=date;
        this.company=company;
        this.category=category;
        this.cost=cost;
      }

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Monthly Costs', 'Dollars'],
          ['Food',     11],
          ['Textbooks',      20],
          ['Electronics',  24],
          ['Clothing', 10],
          ['Misc',    7]
        ]);

        var options = {
          title: 'My monthly spending online',
          is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
        dataTable = new google.visualization.DataTable();

        dataTable.addColumn('string', 'Date');
        dataTable.addColumn('string','Company');
        dataTable.addColumn('string','Category');
        dataTable.addColumn('number','Cost');
        var options2 = {
          title: 'Recent Transactions',
            is3D: false,
        };
        var table2 = new google.visualization.Table(document.getElementById('table_div'));

        table2.draw(dataTable, {showRowNumber: true, width: '100%', height: '100%'}, options2);

      }
      function updatePieChart(){
        var food_input= document.getElementById("food_input");
         var textbooks_input= document.getElementById("textbooks_input");
         var electronics_input= document.getElementById("electronics_input");
         var clothing_input= document.getElementById("clothing_input");
          var misc_input= document.getElementById("misc_input");
          console.log(food_input.value+textbooks_input.value);
          if(parseFloat(food_input.value)+parseFloat(textbooks_input.value)+parseFloat(electronics_input.value)+parseFloat(clothing_input.value)+parseFloat(misc_input.value) != 100){
            alert("the total is not equal to 100")};
          if(parseFloat(food_input.value)+parseFloat(textbooks_input.value)+parseFloat(electronics_input.value)+parseFloat(clothing_input.value)+parseFloat(misc_input.value) == 100){
          var data1 = google.visualization.arrayToDataTable([
            ['Monthly Costs', 'Dollars'],
            ['Food',     parseFloat(food_input.value)],
            ['Textbooks',      parseFloat(textbooks_input.value)],
            ['Electronics',  parseFloat(electronics_input.value)],
            ['Clothing', parseFloat(clothing_input.value)],
            ['Misc',    parseFloat(misc_input.value)]
          ]);


          var options1 = {
            title: 'My monthly spending online',
            is3D: true,
          };

          var chart1 = new google.visualization.PieChart(document.getElementById('piechart_3d'));
          chart1.draw(data1, options1);
          $('#modal2').modal('close');};

      }
      function updateChart() {
          var date_input= document.getElementById("date_input");
           var company_input= document.getElementById("company_input");
           var category_input= document.getElementById("category_input");
           var cost_input= document.getElementById("cost_input");

           var inputs = [date_input, company_input, category_input,cost_input];
           var complete=0;

           for(var i=0;i<inputs.length;i++){
            if(inputs[i].value==""){
              inputs[i].style.backgroundColor='red';
              complete=-1;
            }
           }
           if(complete==0){
           var trans= new Transaction(date_input.value,company_input.value,category_input.value,cost_input.value);
           dataTable.addRow([date_input.value,company_input.value,category_input.value,parseInt(cost_input.value)]);
           transactionArray.push(trans);
            var options2 = {
            title: 'Recent Transactions',
              is3D: false,
          };
            var table2 = new google.visualization.Table(document.getElementById('table_div'));
          table2.draw(dataTable, {showRowNumber: true, width: '100%', height: '100%'}, options2);
            $('#modal1').modal('close');
        }
              }
