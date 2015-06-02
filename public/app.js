$(function() {
  var garages;
  var garageList = [];
  var tableCounter = 0;
  var ref = new Firebase('https://dream-car-garage.firebaseio.com/');
  var garagesRef = ref.child('garage');
  var newGarages = [];
  var counter = 1;

  function Car(color, year, make, model, cost) {
    this.color  = color;
    this.year   = year;
    this.make   = make;
    this.model  = model;
    this.cost   = cost;
  }

  function Garage(firstName, lastName, email) {
    this.firstName   = firstName;
    this.lastName    = lastName;
    this.email       = email;
    this.cars        = [];
    this.removeCars = 0;
  }

  Garage.prototype.addCars = function(color, year, make, model, cost){
    this.cars.push(new Car(color, year, make, model, cost));
  };

$('#userButton').on('click', function(e) {
  e.preventDefault();
  var firstName = $('#firstName').val();
  var lastName = $('#lastName').val();
  var email = $('#email').val();
  newGarages.push(new Garage(firstName, lastName, email));
  for(i = 1; i <= 5; i++) {
    newGarages[0].addCars($('#color' + i).text(), $('#year' + i).text(), $('#make' + i).text(), $('#model' + i).text(), $('#cost' + i).text());
  }
    garagesRef.child(newGarages[0].firstName).set(JSON.stringify(newGarages[0]));
});

  $('#add').on('click', function(e) {
  e.preventDefault();
  var total = 0;
  var cost1 = parseInt($('#cost1').text(), 10);
  console.log(cost1);
  var cost2 = parseInt($('#cost2').text(), 10);
  var cost3 = parseInt($('#cost3').text(), 10);
  var cost4 = parseInt($('#cost4').text(), 10);
  var cost5 = parseInt($('#cost5').text(), 10);
  total = cost1 + cost2 + cost3 + cost4 + cost5 + parseInt($('#cost').val(), 10);
  console.log(total);
  if(total <= 1000000) {
    var color = $('#color').val();
    var year = $('#year').val();
    var make = $('#make').val();
    var model = $('#model').val();
    var cost = $('#cost').val();
    $('#color' + counter).text(color);
    $('#year' + counter).text(year);
    $('#make' + counter).text(make);
    $('#model' + counter).text(model);
    $('#cost' + counter).text(cost);
    counter ++;
  } else {
    $('#add').after('<p>Total Must Be Less Than $1,000,000</p>');
  }
});

  ref.on('child_added', function(snapshot) {
  garages = snapshot.val();
  for (var key in garages) {
    garageList.push(JSON.parse(garages[key]));
  }
  displayGarage();
  });

  var displayGarage = function() {
    for (var i = 0; i < garageList.length; i++) {
      var tableId = 'table' + tableCounter;
      $('.car-list').append('<table class="vehicle-list twelve columns" id=' + tableId + '></table>');
      $('#' + tableId).append('<tr id="user-info"><th>Name:</th><th><strong>' + garageList[i].firstName + ' ' + garageList[i].lastName + '</strong></th><th>Email:</th><th><strong>' + garageList[i].email + '</strong></th></tr>');
      $('#' + tableId).append('<tr><th>Year</th><th>Make</th><th>Model</th><th>Color</th><th>Cost</th></tr>');
      for (var j = 0; j < garageList[i].cars.length; j++) {
        $('#' + tableId).append('<tr><td class="year">' + garageList[i].cars[j].year + '</td><td class="make">' + garageList[i].cars[j].make + '</td><td class="model">' + garageList[i].cars[j].model + '</td><td class="color">' + garageList[i].cars[j].color + '</td><td class="cost">' + garageList[i].cars[j].cost + '</td></tr>');
      }
      tableCounter ++;
    }
  };

});


