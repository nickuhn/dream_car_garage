$(function() {
  var tableCounter = 0;

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
    this.displayGarage = function() {
      tableId = 'table' + tableCounter;
      $('.car-list').append('<table class="vehicle-list twelve columns" id=' + tableId + '></table>');
      $('#' + tableId).append('<tr id="user-info"><th>Name:</th><th><strong>' + this.firstName + ' ' + this.lastName + '</strong></th><th>Email:</th><th><strong>' + this.email + '</strong></th></tr>');
      $('#' + tableId).append('<tr><th>Year</th><th>Make</th><th>Model</th><th>Color</th><th>Cost</th></tr>');
      for (var j = 0; j < this.cars.length; j++) {
        $('#' + tableId).append('<tr><td class="color">' + this.cars[j].color + '</td><td class="year">' + this.cars[j].year + '</td><td class="make">' + this.cars[j].make + '</td><td class="model">' + this.cars[j].model + '</td><td class="cost">' + this.cars[j].cost + '</td></tr>');
      };
      tableCounter ++;
    }
  }

  Garage.prototype.addCars = function(color, year, make, model, cost){
    this.cars.push(new Car(color, year, make, model, cost));
  }

  nicks = new Garage('Nick', 'Kuhn', 'nkuhn@email.com');
  nates = new Garage('Nate', 'Pecota', 'npecota@email.com');
  nicks.addCars('black', 2012, 'aston martin', 'vanquish', 100000);
  nicks.addCars('green', 2015, 'dodge', 'hellcat', 60000);
  nates.addCars('red', 1969, 'chevy', 'chevelle', 750000);
  nicks.displayGarage();
  nates.displayGarage();


});


