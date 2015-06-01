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

});

$(function() {


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

});
