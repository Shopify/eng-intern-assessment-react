describe('Stopwatch Test', () => {
  it('successfully loads and displays stopwatch', () => {
    cy.visit('http://localhost:8080') // Replace with your app's URL
    cy.contains('0:0.0') // Checking for initial state of the stopwatch
  });
  it('starts the timer when the Start button is clicked', () => {
    cy.visit('http://localhost:8080')
    cy.contains('Start').click()
    // You might need to wait a bit to see the time change
    cy.wait(1000) // Wait for 1 second
    cy.contains('0:1.0') // Assuming the time updates every second
  });
  it('stops the timer when the Stop button is clicked', () => {
    cy.visit('http://localhost:8080')
    cy.contains('Start').click()
    cy.wait(1000) // Wait for 1 second
    cy.contains('Stop').click()
    // The timer should stop updating
    cy.contains('0:1.0').should('exist') // The same time should still be displayed
  });

  it('resets the timer when the Reset button is clicked', () => {
    cy.visit('http://localhost:8080')
    cy.contains('Reset').click()
    cy.contains('0:0.0') // Timer should reset to initial state
  });

  it('records laps when the Lap button is clicked', () => {
    cy.visit('http://localhost:8080')
    cy.contains('Start').click()
    cy.wait(1000) // Let the stopwatch run for a bit
    cy.contains('Lap').click()
    cy.get('.laps-container').should('contain', 'Lap 1') // Replace '.laps-container' with the actual class or identifier for the lap list
    cy.contains('Stop').click()
  });
});
