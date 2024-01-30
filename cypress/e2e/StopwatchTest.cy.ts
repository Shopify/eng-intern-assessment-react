describe('Stopwatch Functionality Tests', () => {
  beforeEach(() => {
      cy.visit('http://localhost:8080'); // Update URL as needed
  });

  it('should display initial time as 00: 00: 00: 00', () => {
      cy.get('.TimeDisplay').contains('00: 00: 00: 00');
  });

  it('should start and stop the stopwatch', () => {
      cy.get('.startstop-button').contains('START').click();
      cy.get('.startstop-button').contains('STOP').click();
  });

  it('should reset the stopwatch', () => {
      cy.get('.startstop-button').contains('START').click();
      cy.wait(1000); // Wait for 1 second
      cy.get('.reset-button').click();
      cy.get('.TimeDisplay').contains('00: 00: 00: 00');
  });

  it('should record lap times', () => {
      cy.get('.startstop-button').contains('START').click();
      cy.wait(1000); // Wait for 1 second
      cy.get('.lap-button').click();
      cy.wait(1000); // Wait for 1 more second
      cy.get('.lap-button').click();
      cy.get('.Laps').contains('2 LAPS');
      cy.get('.LapTimesButton').click();
      cy.get('.modal-content').should('be.visible');
      cy.get('.modal-content ul li').should('have.length', 2); // 2 Lap times recorded
  });
});
