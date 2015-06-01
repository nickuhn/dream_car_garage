$(function() {

  function User(firstName, lastName, email) {
    this.firstName   = firstName;
    this.lastName    = lastName;
    this.email       = email;
    this.cars        = [];
    this.displayUser = function(){
      $('.user-first-name').text(this.firstName);
      $('.user-last-name').text(this.lastName);
      $('.user-email').text(this.email);
    };
  }

  function Car(color, year, make, model, cost) {
    this.color  = color;
    this.year   = year;
    this.make   = make;
    this.model  = model;
    this.cost   = cost;
    this.displayCar = function() {
      $('.color').text(this.color);
      $('.year').text(this.year);
      $('.make').text(this.make);
      $('.model').text(this.model);
      $('.cost').text(this.cost);
    };
  }

  function Garage() {
    this.removeCars = 0;
    this.users = [];
    this.displayGarage = function() {
      for(var i = 0; i < this.users.length; i++) {
        console.log(this.users[i]);
        $('.car-list').append('<section class="user-info two columns"><p class="user-first-name"></p><p class="user-last-name"></p><p class="user-email"></p></section>');
        this.users[i].displayUser();
        console.log(this.users[i].cars);
        for (var j = 0; j < this.users[i].cars.length; j++) {
          $('.car-list').append('<section class="vehicle-list ten columns"><div class="color"></div><div class="year"></div><div class="make"></div><div class="model"></div><div class="cost"></div></section>');
          this.users[i].cars[j].displayCar();
        };
      };
    }
  }

  Garage.prototype.addUser = function(firstName, lastName, email){
    this.users.push(new User(firstName, lastName, email));
  }

  User.prototype.addCars = function(color, year, make, model, cost){
    this.cars.push(new Car(color, year, make, model, cost));
  }

});


