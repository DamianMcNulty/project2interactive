describe('homepage', function() {
  beforeEach(function() {
    cy.visit('/');
  });

  it('get the title', function(){
    cy.title().should('include', 'Expense Dashboard')
  });

  // it('contains "Expense Amount"', function(){
  //   cy.contains('Expense Amount');
  // });

  // it('contains "Total Transaction Amount"', function(){
  //   cy.contains('Total Transaction Amount');
  // });

  // it('contains "Transaction Amount"', function(){
  //   cy.contains('Transaction Amount');
  // });

  // it('contains "Expense Amount per Day"', function(){
  //   cy.contains('Expense Amount per Day');
  // });

  // it('contains "Payment Method"', function(){
  //   cy.contains('Payment Method');
  // });

  // it('contains "6,905.25"', function(){
  //   cy.contains('Expense Amount');
  // });

  it('contains "Toys: €343.95"', function(){
    cy.contains('Toys: €343.95');
  });

  it('contains "Tools: €474"', function(){
    cy.contains('Tools: €474');
  });

  it('contains "Sports: €322.04"', function(){
    cy.contains('Sports: €322.04');
  });

  it('contains "Shoes: €562.83"', function(){
    cy.contains('Shoes: €562.83');
  });

  it('contains "Outdoors: €175.48"', function(){
    cy.contains('Outdoors: €175.48');
  });

  it('contains "Music: €475.88"', function(){
    cy.contains('Music: €475.88');
  });

  it('contains "Movies: €295.54"', function(){
    cy.contains('Movies: €295.54');
  });

  it('contains "Kids: €345.76"', function(){
    cy.contains('Kids: €345.76');
  });

  it('contains "Jewelery: €218.34"', function(){
    cy.contains('Jewelery: €218.34');
  });

  it('contains "Industrial: €207.41"', function(){
    cy.contains('Industrial: €207.41');
  });

  it('contains "Home: €176.57"', function(){
    cy.contains('Home: €176.57');
  });

  it('contains "Health: €407.54"', function(){
    cy.contains('Health: €407.54');
  });

  it('contains "Grocery: €230.24"', function(){
    cy.contains('Grocery: €230.24');
  });

  it('contains "Garden: €208.04"', function(){
    cy.contains('Garden: €208.04');
  });

  it('contains "Games: €267.43"', function(){
    cy.contains('Games: €267.43');
  });

  it('contains "Electronics: €281.21"', function(){
    cy.contains('Electronics: €281.21');
  });

  it('contains "Computers: €350.82"', function(){
    cy.contains('Computers: €350.82');
  });

  it('contains "Clothing: €426.23"', function(){
    cy.contains('Clothing: €426.23');
  });

  it('contains "Books: €427.14"', function(){
    cy.contains('Books: €427.14');
  });

  it('contains "Beauty: €168.61"', function(){
    cy.contains('Beauty: €168.61');
  });

  it('contains "Baby: €379.96"', function(){
    cy.contains('Baby: €379.96');
  });

  it('contains "Automotive: €160.23"', function(){
    cy.contains('Automotive: €160.23');
  });

  // it('contains "Show Data"', function(){
  //   cy.contains('Show Data');
  // });

  // it('check radio elements', () => {
  //   cy.get('input[type="radio"]').not('[disabled]')
  //     .check({ force: true }).should('be.checked')
  // });

  // it('click on an element', () => {
  //   cy.get('#show').click();
  // });

  // it('click on an element again', () => {
  //   cy.get('#show').click();
  //   cy.get('#show').click();
  // });



  // it('can take a screenshot', function(){
  //   cy.screenshot('site', {capture: 'runner'});
  // });

});