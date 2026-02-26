// ==========================================================
// E2E Test Suite: Cloud Server Dashboard
// Author: [Your Name] — Levelbuild Africa QA Proof of Work
// ==========================================================

describe('Cloud Server Dashboard — E2E Suite', () => {

  // ----------------------------------------------------------
  // TEST 1: Happy Path — API returns server data successfully
  // ----------------------------------------------------------
  it('renders server cards when the API responds successfully', () => {
    cy.intercept('GET', '/api/servers', { fixture: 'servers.json' }).as('getServers')

    cy.visit('/')
    cy.wait('@getServers')

    // server-card is a Lit custom element — select by tag name
    cy.get('server-card').should('have.length', 6)

    // Check at least one card has online status in shadow DOM
    cy.get('server-card').first().shadow().find('.card.online').should('exist')
  })


  // ----------------------------------------------------------
  // TEST 2: Status counts update correctly
  // ----------------------------------------------------------
  it('displays correct online / offline / error counts in the toolbar', () => {
    cy.intercept('GET', '/api/servers', { fixture: 'servers.json' }).as('getServers')
    cy.visit('/')
    cy.wait('@getServers')

    cy.get('#count-online').should('contain', '4 online')
    cy.get('#count-offline').should('contain', '1 offline')
    cy.get('#count-error').should('contain', '1 errors')
  })


  // ----------------------------------------------------------
  // TEST 3: Edge Case — API returns 500 Internal Server Error
  // ----------------------------------------------------------
  it('shows an error message when the API returns a 500 error', () => {
    cy.intercept('GET', '/api/servers', {
      statusCode: 500,
      body: { message: 'Internal Server Error' }
    }).as('getServersFail')

    cy.visit('/')
    cy.wait('@getServersFail')

    cy.get('#status-message')
      .should('be.visible')
      .and('have.class', 'error')
      .and('contain', 'Failed to load servers')

    cy.get('server-card').should('not.exist')
  })


  // ----------------------------------------------------------
  // TEST 4: Refresh button re-fetches data
  // ----------------------------------------------------------
  it('re-fetches server data when Refresh is clicked', () => {
    cy.intercept('GET', '/api/servers', { fixture: 'servers.json' }).as('getServers')
    cy.visit('/')
    cy.wait('@getServers')

    cy.intercept('GET', '/api/servers', { fixture: 'servers.json' }).as('refresh')
    cy.get('[data-cy="refresh-btn"]').click()
    cy.wait('@refresh')

    cy.get('server-card').should('have.length', 6)
  })


  /**
   * ❌ BAD PRACTICE — Never do this in production:
   *
   *   cy.visit('/')
   *   cy.wait(2000)  <-- Arbitrary time delay
   *   cy.get('server-card').should('have.length', 6)
   *
   * WHY THIS IS DANGEROUS:
   * - On a slow CI server, 2000ms may not be enough → test FAILS
   * - On a fast machine, 2000ms wastes time unnecessarily → suite SLOWS DOWN
   * - It hides real timing bugs instead of catching them
   * - This is the #1 cause of "flaky tests" in automation suites
   *
   * ✅ CORRECT APPROACH — Always wait on an alias:
   *
   *   cy.intercept('GET', '/api/servers', ...).as('getServers')
   *   cy.visit('/')
   *   cy.wait('@getServers')  <-- Waits for the ACTUAL network event
   *
   * cy.wait('@alias') resolves the moment the request completes,
   * whether that's 50ms or 5000ms. It's deterministic, not guessed.
   */
})