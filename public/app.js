$(function() {
  var garages = [];
  var tableCounter = 0;
  var ref = new Firebase('https://dream-car-garage.firebaseio.com/');
  var garagesRef = ref.child('garage');

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

  //Nate's Work in Progress
  // function() {
  //   $(#add).on('click' function(){
  //     .preventDefault();
  //     $('td.color1').textContent(this.color);
  //     $('td.year1').textContent(this.year);
  //     $('td.make1').textContent(this.make);
  //     $('td.model1').textContent(this.model);
  //     $('td.cost1').textContent(this.cost);
  //   });
  // }

  var nicks = new Garage('Nick', 'Kuhn', 'nkuhn@email.com');
  var nates = new Garage('Nate', 'Pecota', 'npecota@email.com');
  nicks.addCars('black', 2012, 'aston martin', 'vanquish', 100000);
  nicks.addCars('green', 2015, 'dodge', 'hellcat', 60000);
  nates.addCars('red', 1969, 'chevy', 'chevelle', 750000);
  garagesRef.set(JSON.stringify(nicks));
  // garagesRef.set(JSON.stringify(nates));

  ref.on('child_added', function(snapshot) {
  garages.push(JSON.parse(snapshot.val()));
  });

  var displayGarage = function() {
    for (var i = 0; i < garages.length; i++) {
      var tableId = 'table' + tableCounter;
      $('.car-list').append('<table class="vehicle-list twelve columns" id=' + tableId + '></table>');
      $('#' + tableId).append('<tr id="user-info"><th>Name:</th><th><strong>' + garages[i].firstName + ' ' + garages[i].lastName + '</strong></th><th>Email:</th><th><strong>' + garages[i].email + '</strong></th></tr>');
      $('#' + tableId).append('<tr><th>Year</th><th>Make</th><th>Model</th><th>Color</th><th>Cost</th></tr>');
      for (var j = 0; j < garages[i].cars.length; j++) {
        $('#' + tableId).append('<tr><td class="year">' + garages[i].cars[j].year + '</td><td class="make">' + garages[i].cars[j].make + '</td><td class="model">' + garages[i].cars[j].model + '</td><td class="color">' + garages[i].cars[j].color + '</td><td class="cost">' + garages[i].cars[j].cost + '</td></tr>');
      }
      tableCounter ++;
    }
  };

  displayGarage();
});


