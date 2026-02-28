# Cloud Server Dashboard — QA Automation Proof of Work

> A demonstration of the QA Automation *.

![CI](https://github.comMeshach-Zm/qa-demo/actions/workflows/cypress.yml/badge.svg)

---

## What This Project Demonstrates

| Requirement from JD | Implementation |
|---|---|
| Cypress E2E Testing | `cypress/e2e/dashboard.cy.js` |
| Cypress Component Testing (Shift-Left) | `cypress/component/server-card.cy.js` |
| `cy.intercept()` for API mocking | Tests 1–4 in E2E suite |
| Edge case: 500 error handling | Test 3 in E2E suite |
| Flaky test awareness & fix | Documented in E2E suite comments |
| Lit component-driven UI | `src/server-card.js` |
| TypeScript / JavaScript | JavaScript (ES Modules) |
| GitHub Actions CI/CD | `.github/workflows/cypress.yml` |

---

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open Cypress interactive runner (for the Loom demo)
npm run cypress:open

# 4. Or run all tests headlessly (as CI does)
npm run cypress:run
```

## Project Structure

```
levelbuild-qa-demo/
├── src/
│   ├── server-card.js        # Lit web component
│   └── main.js               # App logic (fetch + render)
├── cypress/
│   ├── e2e/
│   │   └── dashboard.cy.js   # Full E2E suite (4 tests)
│   ├── component/
│   │   └── server-card.cy.js # Component isolation tests (4 tests)
│   └── fixtures/
│       └── servers.json      # Mock API response data
├── .github/
│   └── workflows/
│       └── cypress.yml       # CI/CD pipeline
├── index.html
└── vite.config.js
```

---

Built by Misheck Zimba | zimbamisheck00@gmail.com | [[LinkedIn]](https://www.linkedin.com/in/meshachzimba/)
