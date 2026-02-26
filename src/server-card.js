import { LitElement, html, css } from 'lit'

class ServerCard extends LitElement {
  static properties = {
    serverId: { type: String },
    name: { type: String },
    region: { type: String },
    status: { type: String },  // 'online' | 'offline' | 'error'
    cpu: { type: Number },
    uptime: { type: String }
  }

  static styles = css`
    :host { display: block; }

    .card {
      background: #0f1829;
      border: 1px solid #1e2d4a;
      border-radius: 8px;
      padding: 20px;
      transition: border-color 0.2s, transform 0.2s;
      position: relative;
      overflow: hidden;
      font-family: 'Space Grotesk', sans-serif;
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
    }

    .card.online::before  { background: #00ff87; }
    .card.offline::before { background: #4a6080; }
    .card.error::before   { background: #ff4560; }

    .card:hover {
      border-color: #2a3d5a;
      transform: translateY(-2px);
    }

    .card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .server-id {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px;
      color: #4a6080;
      letter-spacing: 0.1em;
      margin-bottom: 4px;
    }

    .server-name {
      font-size: 15px;
      font-weight: 600;
      color: #e2e8f0;
      letter-spacing: -0.01em;
    }

    .status-badge {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 5px;
      flex-shrink: 0;
    }

    .status-badge .dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
    }

    .status-badge.online  { background: rgba(0,255,135,0.1);  color: #00ff87; }
    .status-badge.online .dot  { background: #00ff87; animation: pulse 2s infinite; }
    .status-badge.offline { background: rgba(74,96,128,0.15); color: #4a6080; }
    .status-badge.offline .dot { background: #4a6080; }
    .status-badge.error   { background: rgba(255,69,96,0.1);  color: #ff4560; }
    .status-badge.error .dot   { background: #ff4560; animation: pulse 1s infinite; }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    .meta {
      display: flex;
      gap: 16px;
      margin-top: 12px;
    }

    .meta-item {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11px;
      color: #4a6080;
    }

    .meta-item span {
      display: block;
      font-size: 13px;
      color: #8aa0bf;
      margin-top: 2px;
    }

    .cpu-bar {
      margin-top: 16px;
    }

    .cpu-label {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px;
      color: #4a6080;
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
    }

    .cpu-track {
      height: 3px;
      background: #1e2d4a;
      border-radius: 2px;
      overflow: hidden;
    }

    .cpu-fill {
      height: 100%;
      border-radius: 2px;
      transition: width 0.6s ease;
    }

    .cpu-fill.low    { background: #00ff87; }
    .cpu-fill.medium { background: #ffb800; }
    .cpu-fill.high   { background: #ff4560; }
  `

  get cpuClass() {
    if (this.cpu < 50) return 'low'
    if (this.cpu < 80) return 'medium'
    return 'high'
  }

  get statusLabel() {
    if (this.status === 'online')  return 'Online'
    if (this.status === 'offline') return 'Offline'
    return 'Error'
  }

  render() {
    return html`
      <div class="card ${this.status}" data-cy="server-card" data-status="${this.status}">
        <div class="card-header">
          <div>
            <div class="server-id">${this.serverId}</div>
            <div class="server-name">${this.name}</div>
          </div>
          <div class="status-badge ${this.status}" data-cy="status-badge">
            <div class="dot"></div>
            ${this.statusLabel}
          </div>
        </div>

        <div class="meta">
          <div class="meta-item">
            Region
            <span>${this.region}</span>
          </div>
          <div class="meta-item">
            Uptime
            <span>${this.status === 'offline' ? '—' : this.uptime}</span>
          </div>
        </div>

        ${this.status !== 'offline' ? html`
          <div class="cpu-bar">
            <div class="cpu-label">
              <span>CPU</span>
              <span>${this.cpu}%</span>
            </div>
            <div class="cpu-track">
              <div
                class="cpu-fill ${this.cpuClass}"
                style="width: ${this.cpu}%"
                data-cy="cpu-bar"
              ></div>
            </div>
          </div>
        ` : ''}
      </div>
    `
  }
}

customElements.define('server-card', ServerCard)
export { ServerCard }
