$(function() {


  function User(firstName, lastName, email) {
    this.firstName   = firstName;
    this.lastName    = lastName;
    this.email       = email;
    this.displayUser = function(){
      $('.user-first-name').textContent(this.firstName);
      $('.user-last-name').textContent(this.lastName);
      $('.user-email').textContent(this.email);
    };
  }

  function Car(color, year, make, model, cost) {
    this.color  = color;
    this.year   = year;
    this.make   = make;
    this.model  = model;
    this.cost   = cost;
    this.displayCar = function() {
      $('.color').textContent(this.color);
      $('.year').textContent(this.year);
      $('.make').textContent(this.make);
      $('.model').textContent(this.model);
      $('.cost').textContent(this.cost);
    };
  }

  var displayGarage = function() {
    for(var i = 0; i < garage.users.length; i++) {
      $('.car-list').append(<section class='user-info'><p class='user-first-name'></p><p class='user-last-name'></p><p class='user-email'></p></section>);
      garage.users[i].displayUser;
      for (var j = 0; j < garage.users[i].cars.length; j++) {
        garage.users[i].cars[j]
        $('user-info').append(<section class='vehicle-list'><div class='color'></div><div class='year'></div><div class='make'></div><div class='model'></div><div class='cost'></div></section>);
      };
    };
  }

});
