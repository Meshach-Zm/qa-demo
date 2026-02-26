// ==========================================================
// Component Test: <server-card> Lit Component
//
// Shift-Left testing in action — we test the component in
// complete isolation. No full page, no network, no backend.
// ==========================================================

import '../../src/server-card.js'

describe('<server-card> Component — Isolation Tests', () => {

  beforeEach(() => {
    cy.document().then(doc => {
      doc.body.style.background = '#090e1a'
      doc.body.style.padding = '32px'
      doc.body.innerHTML = ''
    })
  })

  function mountCard(props) {
    cy.document().then(doc => {
      const el = doc.createElement('server-card')
      Object.assign(el, props)
      doc.body.appendChild(el)
    })
    cy.get('server-card').should('exist')
  }

  // ----------------------------------------------------------
  // TEST 1: Online status renders correctly
  // ----------------------------------------------------------
  it('renders an ONLINE card with the correct badge', () => {
    mountCard({
      serverId: 'srv-001',
      name: 'Primary API Gateway',
      region: 'af-south-1',
      status: 'online',
      cpu: 34,
      uptime: '99.98%'
    })

    cy.get('server-card')
      .shadow()
      .find('[data-cy="status-badge"]')
      .should('have.class', 'online')
      .and('contain', 'Online')

    cy.get('server-card')
      .shadow()
      .find('.card')
      .should('have.class', 'online')
  })

  // ----------------------------------------------------------
  // TEST 2: Offline card hides the CPU bar
  // ----------------------------------------------------------
  it('renders an OFFLINE card and hides the CPU bar', () => {
    mountCard({
      serverId: 'srv-004',
      name: 'Media CDN Node',
      region: 'ap-southeast-1',
      status: 'offline',
      cpu: 0,
      uptime: '—'
    })

    cy.get('server-card')
      .shadow()
      .find('[data-cy="status-badge"]')
      .should('have.class', 'offline')
      .and('contain', 'Offline')

    cy.get('server-card')
      .shadow()
      .find('[data-cy="cpu-bar"]')
      .should('not.exist')
  })

  // ----------------------------------------------------------
  // TEST 3: Error status renders correctly
  // ----------------------------------------------------------
  it('renders an ERROR card with the correct badge', () => {
    mountCard({
      serverId: 'srv-003',
      name: 'Payment Processor',
      region: 'us-east-1',
      status: 'error',
      cpu: 89,
      uptime: '97.40%'
    })

    cy.get('server-card')
      .shadow()
      .find('[data-cy="status-badge"]')
      .should('have.class', 'error')
      .and('contain', 'Error')
  })

  // ----------------------------------------------------------
  // TEST 4: CPU bar width reflects the cpu prop
  // ----------------------------------------------------------
  it('renders a CPU bar at the correct width', () => {
    mountCard({
      serverId: 'srv-006',
      name: 'ML Inference Engine',
      region: 'us-west-2',
      status: 'online',
      cpu: 77,
      uptime: '99.85%'
    })

    cy.get('server-card')
      .shadow()
      .find('[data-cy="cpu-bar"]')
      .should('have.attr', 'style')
      .and('include', 'width: 77%')
  })
})