$(function() {


  var garages;
  var tableCounter = 0;
  var ref          = new Firebase('https://dream-car-garage.firebaseio.com/');
  var garagesRef   = ref.child('garage');
  var newGarages   = [];
  var counter      = 1;

  function Car(color, year, make, model, cost) {
    this.color = color;
    this.year  = year;
    this.make  = make;
    this.model = model;
    this.cost  = cost;
  }

  function Garage(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName  = lastName;
    this.email     = email;
    this.cars      = [];
  }

  Garage.prototype.addCars = function(color, year, make, model, cost){
    this.cars.push(new Car(color, year, make, model, cost));
  };

  //event listener for the create garage button, clears table and stores garage in firebase
  $('#userButton').on('click', function(e) {
    e.preventDefault();
    $('.warning').remove();
    if ($('#color1').text() !== '') {
      var firstName = $('#firstName').val();
      var lastName  = $('#lastName').val();
      var email     = $('#email').val();
      newGarages.push(new Garage(firstName, lastName, email));
      for(var i = 1; i <= 5; i++) {
        if($('#color' + i).text() !== ''){
        newGarages[0].addCars($('#color' + i).text(), $('#year' + i).text(), $('#make' + i).text(), $('#model' + i).text(), $('#cost' + i).text());
        }
      }
      garagesRef.child(newGarages[0].firstName + newGarages[0].lastName).set(newGarages[0]);
      $('#userButton').after('<p id="createWarning" class="success">Your garage was successfully submitted! <a href="view.html"> Click here to view garages! </a></p>');
      for(var j = 0; j < 5; j++) {
        removeRow();
      }
      $('#totalCost').text(0);
    } else {
      $('#userButton').after('<p id="createWarning" class="warning">Please enter at least one car</p>');
    }
  });

  //event listener for add a car button, if total is going to be over 1m refuses entry.
  $('#add').on('click', function(e) {
    e.preventDefault();
    $('.warning').remove();
    var total = 0;
    var cost1 = parseInt($('#cost1').text(), 10);
    var cost2 = parseInt($('#cost2').text(), 10);
    var cost3 = parseInt($('#cost3').text(), 10);
    var cost4 = parseInt($('#cost4').text(), 10);
    var cost5 = parseInt($('#cost5').text(), 10);
    var costInput = parseInt($('#cost').val(), 10)
    total = cost1 + cost2 + cost3 + cost4 + cost5 + costInput;
    if(costInput <= 0) {
      $('#add').after('<p id="costWarning" class="warning">Car cost must be greater than zero</p>')
    } else if(total <= 1000000) {
      var color = $('#color').val();
      var year  = $('#year').val();
      var make  = $('#make').val();
      var model = $('#model').val();
      var cost  = $('#cost').val();
      $('#color' + counter).text(color);
      $('#year' + counter).text(year);
      $('#make' + counter).text(make);
      $('#model' + counter).text(model);
      $('#cost' + counter).text(cost);
      $('#totalCost').text(total);
      counter ++;
    } else {
      $('#totalCost').text(total - costInput);
      $('#add').after('<p id="addWarning" class="warning">Total Must Be Less Than $1,000,000</p>');
    }
  });

  //event listener for remove last car button
  $('#remove').on('click', function(e) {
    e.preventDefault();
    removeRow();
  });

  //Event Listener for scrolling door
  $('#pictureContainer').click(function() {
    console.log($( "#pictureContainer img" ).css('top'))
    if ( $( "#pictureContainer img" ).css('top') === '0px' ) {
      $( "#pictureContainer img" ).animate({ top: '-1500px'}, 250);
    } else {
      $( "#pictureContainer img" ).animate({ top: '0px'}, 250);
    }
  });

  //clears the most recently populated row on the create page.
  var removeRow = function () {
    if(counter > 1) {
    $('.warning').remove();
    counter --;
    var totalCost = parseInt($('#totalCost').text());
    var cost      = parseInt($('#cost' + counter).text());
    $('#totalCost').text(totalCost - cost);
    $('#color' + counter).text('');
    $('#year' + counter).text('');
    $('#make' + counter).text('');
    $('#model' + counter).text('');
    $('#cost' + counter).text(0);
  }
  };

  //displays a garage table on the view page
  var displayGarage = function(garageList) {
    for (var i = 0; i < garageList.length; i++) {
      var tableId = 'table' + tableCounter;
      $('.car-list').append('<table class="vehicle-list twelve columns" id=' + tableId + '></table>');
      $('#' + tableId).append('<tr id="user-info"><th>' + garageList[i].firstName + ' ' + garageList[i].lastName + '</th><th>' + garageList[i].email + '</th></tr>');
      $('#' + tableId).append('<tr><th>Year</th><th>Make</th><th>Model</th><th>Color</th><th>Cost</th></tr>');
      for (var j = 0; j < garageList[i].cars.length; j++) {
        $('#' + tableId).append('<tr><td class="year">' + garageList[i].cars[j].year + '</td><td class="make">' + garageList[i].cars[j].make + '</td><td class="model">' + garageList[i].cars[j].model + '</td><td class="color">' + garageList[i].cars[j].color + '</td><td class="cost">' + garageList[i].cars[j].cost + '</td></tr>');
      }
      tableCounter ++;
    }
  };

  //everytime a new garage is added to firebase this runs creating a displayed garage on the view page
  ref.on('child_added', function(snapshot) {
    garages = snapshot.val();
    var garageList = [];
    for (var key in garages) {
      if (garages.hasOwnProperty(key)) {
        garageList.push(garages[key]);
      }
    }
    displayGarage(garageList);
  });

  $('#sortFirst').on('click', function(e) {
    e.preventDefault();
    var garageList = [];
    clearGarages();
    ref.orderByChild('firstName').on('child_added', function(snapshot){
      garages = snapshot.val();
      for (var key in garages) {
        if (garages.hasOwnProperty(key)) {
          garageList.push(garages[key]);
        }
      }
    displayGarage(garageList);
    });
  });

  $('#sortLast').on('click', function(e) {
    e.preventDefault();
    var garageList = [];
    clearGarages();
    garagesRef.orderByChild('lastName').on('child_added', function(snapshot){
      garage = snapshot.val();
      garageList.push(garage);
    });
    displayGarage(garageList);
  });

  $('#sortEmail').on('click', function(e) {
    e.preventDefault();
    var garageList = [];
    clearGarages();
    garagesRef.orderByChild('email').on('child_added', function(snapshot){
      garage = snapshot.val();
      garageList.push(garage);
    });
    displayGarage(garageList);
  });

  var clearGarages = function() {
    $('.car-list table').remove();
  };
});


