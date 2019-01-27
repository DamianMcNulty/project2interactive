describe('homepage', function() {
  beforeEach(function() {
    cy.visit('/');
  });

  it('get the title', function(){
    cy.title().should('include', 'Expense Dashboard')
  });

  it('contains "Expense Amount"', function(){
    cy.contains('Expense Amount');
  });

  // it('contains "Total Transaction Amount"', function(){
  //   cy.contains('Total Transaction Amount');
  // });

  it('contains "Transaction Amount"', function(){
    cy.contains('Transaction Amount');
  });

  // it('contains "Expense Amount per Day"', function(){
  //   cy.contains('Expense Amount per Day');
  // });

  // it('contains "Payment Method"', function(){
  //   cy.contains('Payment Method');
  // });

  it('contains "6,905.25"', function(){
    cy.contains('Expense Amount');
  });

  it('contains "Show Data"', function(){
    cy.contains('Show Data');
  });

  it('check radio elements', () => {
    cy.get('input[type="radio"]').not('[disabled]')
      .check({ force: true }).should('be.checked')
  });

  it('click on an element', () => {
    cy.get('#show').click();
  });

  it('click on an element again', () => {
    cy.get('#show').click();
    cy.get('#show').click();
  });



  // it('can take a screenshot', function(){
  //   cy.screenshot('site', {capture: 'runner'});
  // });

});