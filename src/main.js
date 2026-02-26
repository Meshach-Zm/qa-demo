import './server-card.js'

const grid = document.getElementById('server-grid')
const statusMessage = document.getElementById('status-message')
const refreshBtn = document.getElementById('refresh-btn')
const lastUpdated = document.getElementById('last-updated')

async function fetchServers() {
  // Set loading state
  refreshBtn.disabled = true
  refreshBtn.classList.add('loading')
  statusMessage.className = 'loading-msg'
  statusMessage.textContent = '// Fetching server data...'
  grid.innerHTML = ''

  try {
    const res = await fetch('/api/servers')

    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`)
    }

    const servers = await res.json()

    // Clear any error state
    statusMessage.className = ''
    statusMessage.style.display = 'none'

    // Render cards
    servers.forEach(server => {
      const card = document.createElement('server-card')
      card.serverId  = server.id
      card.name      = server.name
      card.region    = server.region
      card.status    = server.status
      card.cpu       = server.cpu
      card.uptime    = server.uptime
      grid.appendChild(card)
    })

    // Update stats
    const online  = servers.filter(s => s.status === 'online').length
    const offline = servers.filter(s => s.status === 'offline').length
    const error   = servers.filter(s => s.status === 'error').length

    document.getElementById('count-online').textContent  = `${online} online`
    document.getElementById('count-offline').textContent = `${offline} offline`
    document.getElementById('count-error').textContent   = `${error} errors`

    // Timestamp
    const now = new Date()
    lastUpdated.textContent = `Updated ${now.toLocaleTimeString()}`

  } catch (err) {
    statusMessage.className = 'error'
    statusMessage.textContent = `⚠ Failed to load servers — ${err.message}`
    grid.innerHTML = ''
  } finally {
    refreshBtn.disabled = false
    refreshBtn.classList.remove('loading')
  }
}

refreshBtn.addEventListener('click', fetchServers)

// Initial load
fetchServers()
