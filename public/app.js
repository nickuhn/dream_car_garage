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

  // event listener for the create garage button, clears table and stores garage in firebase
  $('#user-button').on('click', function(e) {
    e.preventDefault();
    $('.warning').remove();
    if ($('#color1').text() !== '') {
      var firstName = $('#first-name').val();
      var lastName  = $('#last-name').val();
      var email     = $('#email').val();
      newGarages.push(new Garage(firstName, lastName, email));
      for(var i = 1; i <= 5; i++) {
        if($('#color' + i).text() !== ''){
        newGarages[0].addCars($('#color' + i).text(), $('#year' + i).text(), $('#make' + i).text(), $('#model' + i).text(), $('#cost' + i).text());
        }
      }
      garagesRef.child(newGarages[0].firstName + newGarages[0].lastName).set(newGarages[0]);
      $('#user-button').after('<p id="create-warning" class="success">Your garage was successfully submitted! <a href="view.html"> Click here to view garages! </a></p>');
      for(var j = 0; j < 5; j++) {
        removeRow();
      }
      $('#total-cost').text(0);
    } else {
      $('#user-button').after('<p id="create-warning" class="warning">Please enter at least one car</p>');
    }
  });

  //event listener for add a car button, if total is going to be over 1m refuses entry.
  $('#add').on('click', function(e) {
    e.preventDefault();
    var year  = $('#year').val();
    var check = parseInt(year);
    $('.warning').remove();
      if(1750 < check && check < 2100) {
        var total = 0;
        var cost1 = parseInt($('#cost1').text(), 10);
        var cost2 = parseInt($('#cost2').text(), 10);
        var cost3 = parseInt($('#cost3').text(), 10);
        var cost4 = parseInt($('#cost4').text(), 10);
        var cost5 = parseInt($('#cost5').text(), 10);
        var costInput = parseInt($('#cost').val(), 10);
        total = cost1 + cost2 + cost3 + cost4 + cost5 + costInput;
        if(costInput <= 0) {
          $('#add').after('<p id="costWarning" class="warning">Car cost must be greater than zero</p>');
        } else if(total <= 1000000) {
          var color = $('#color').val();
          var make  = $('#make').val();
          var model = $('#model').val();
          var cost  = $('#cost').val();
          $('#color' + counter).text(color);
          $('#year' + counter).text(year);
          $('#make' + counter).text(make);
          $('#model' + counter).text(model);
          $('#cost' + counter).text(cost);
          $('#total-cost').text(total);
          counter ++;
          $(':input','.new-car').val('');
        } else {
          $('#total-cost').text(total - costInput);
          $('#add').after('<p id="add-warning" class="warning">Total Must Be Less Than $1,000,000</p>');
        }
      } else {
        $('#add').after('<p id="year-warning" class="warning">Year must be 4 digits between 1800 to 2100</p>');
      }
  });

  //event listener for remove last car button
  $('#remove').on('click', function(e) {
    e.preventDefault();
    removeRow();
  });

  //Event Listener for scrolling door
  $('#picture-container').click(function() {
    if ( $( '#picture-container img' ).css('top') === '0px' ) {
      $( '#picture-container img' ).animate({ top: '-1500px'}, 250);
    } else {
      $( '#picture-container img' ).animate({ top: '0px'}, 250);
    }
  });

  //clears the most recently populated row on the create page.
  var removeRow = function () {
    if(counter > 1) {
    $('.warning').remove();
    counter --;
    var totalCost = parseInt($('#total-cost').text());
    var cost      = parseInt($('#cost' + counter).text());
    $('#total-cost').text(totalCost - cost);
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

  var clearGarages = function() {
    $('.car-list table').remove();
  };

  //everytime a new garage is added to firebase this runs creating a displayed garage on the view page
  ref.on('child_added', function(snapshot) {
    garages        = snapshot.val();
    var garageList = [];
    for (var key in garages) {
      if (garages.hasOwnProperty(key)) {
        garageList.push(garages[key]);
      }
    }
    displayGarage(garageList);
  });

  //Sorts the tables on view page by users First name
  $('#sort-first').on('click', function(e) {
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

  //Sorts the tables on view page by users Last name
  $('#sort-last').on('click', function(e) {
    e.preventDefault();
    var garageList = [];
    clearGarages();
    garagesRef.orderByChild('lastName').on('child_added', function(snapshot){
      var garage = snapshot.val();
      garageList.push(garage);
    });
    displayGarage(garageList);
  });

  //Sorts the tables on view page by users email address
  $('#sort-email').on('click', function(e) {
    e.preventDefault();
    var garageList = [];
    clearGarages();
    garagesRef.orderByChild('email').on('child_added', function(snapshot){
      var garage = snapshot.val();
      garageList.push(garage);
    });
    displayGarage(garageList);
  });

  //Click event to retrieve all ready saved garages for editing.
  $('#retrieve-button').on('click', function(e) {
    e.preventDefault();
    $('.warning').remove();
    $('.success').remove();
    var removeCount = counter;
    for(var j = 0; j < removeCount; j++) {
      removeRow();
    }
    $('#total-cost').text(0);
    garagesRef.on('value', function(snapshot){
      var gar = snapshot.val();
      var totaledCost = 0;
      var fn = $('#first-name').val()+$('#last-name').val();
      if (gar.hasOwnProperty(fn)) {
        var carsPulled = gar[fn].cars;
        for(var i = 0; i < carsPulled.length; i++) {
          for (var prop in carsPulled[i]) {
            var value = carsPulled[i][prop];
            $('#' + prop + (i+1)).text(value);
            if (prop === 'cost') {
              totaledCost += parseInt(value);
              counter ++;
            }
          }
        }
      }
      $('#total-cost').text(totaledCost);
    });
  });


});


