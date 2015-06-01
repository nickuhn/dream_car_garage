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
