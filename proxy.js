/**
 * DSH Plugin Market Proxy
 * 
 * Intercepts DeepSeek Harness web UI and injects a Plugin Market
 * entry into the sidebar. Run this before starting DSH.
 * 
 * Usage: node proxy.js
 * Then set your browser/Electron to use 127.0.0.1:64630 as proxy
 * or just open http://127.0.0.1:64630
 */

import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DSH_HOST = '127.0.0.1';
const DSH_PORT = 64629;
const PROXY_PORT = 64630;

const MARKET_HTML = await readFile(join(__dirname, 'market.html'), 'utf8').catch(() => null);

const INJECTION_SCRIPT = `
<script>
(function() {
  'use strict';
  
  const STYLES = \`
    <style data-plugin-market>
      #dsh-market-btn {
        position: absolute;
        bottom: 60px;
        left: 12px;
        width: calc(100% - 24px);
        height: 36px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 8px;
        color: #fff;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        z-index: 9999;
        transition: opacity 0.2s;
      }
      #dsh-market-btn:hover { opacity: 0.85; }
      #dsh-market-btn.rail {
        width: 36px;
        height: 36px;
        left: 10px;
        border-radius: 8px;
      }
      #dsh-market-modal {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.6);
        z-index: 99999;
        display: none;
        align-items: center;
        justify-content: center;
      }
      #dsh-market-modal.open { display: flex; }
      #dsh-market-panel {
        width: 90%;
        max-width: 900px;
        height: 80vh;
        background: #1a1a2e;
        border-radius: 12px;
        border: 1px solid #2a2a3e;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      #dsh-market-header {
        padding: 16px 20px;
        border-bottom: 1px solid #2a2a3e;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #16162a;
      }
      #dsh-market-header h2 { margin: 0; color: #fff; font-size: 18px; }
      #dsh-market-close {
        background: none; border: none; color: #888;
        font-size: 20px; cursor: pointer; padding: 4px 8px;
      }
      #dsh-market-close:hover { color: #fff; }
      #dsh-market-body {
        flex: 1;
        overflow: auto;
        padding: 16px;
        display: flex;
        gap: 16px;
      }
      #dsh-market-list {
        width: 300px;
        flex-shrink: 0;
      }
      #dsh-market-detail {
        flex: 1;
        min-width: 0;
      }
      .market-search {
        width: 100%;
        padding: 8px 12px;
        border-radius: 8px;
        border: 1px solid #2a2a3e;
        background: #0f0f1a;
        color: #e0e0e0;
        font-size: 13px;
        outline: none;
        margin-bottom: 12px;
        box-sizing: border-box;
      }
      .market-tabs {
        display: flex;
        gap: 4px;
        margin-bottom: 12px;
      }
      .market-tab {
        padding: 5px 12px;
        border-radius: 6px;
        border: none;
        background: transparent;
        color: #888;
        cursor: pointer;
        font-size: 12px;
      }
      .market-tab.active {
        background: #667eea;
        color: #fff;
      }
      .market-plugin-card {
        padding: 12px;
        border-radius: 8px;
        background: #0f0f1a;
        border: 1px solid transparent;
        margin-bottom: 8px;
        cursor: pointer;
        transition: all 0.15s;
      }
      .market-plugin-card:hover { background: #1e1e3a; }
      .market-plugin-card.selected {
        border-color: #667eea;
        background: #1e1e3a;
      }
      .market-plugin-card .card-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 6px;
      }
      .market-plugin-card .card-icon {
        width: 36px; height: 36px;
        border-radius: 8px;
        background: #2a2a3e;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        flex-shrink: 0;
      }
      .market-plugin-card .card-name {
        font-weight: 600;
        font-size: 13px;
        color: #fff;
      }
      .market-plugin-card .card-desc {
        font-size: 11px;
        color: #888;
        line-height: 1.4;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .market-plugin-card .card-meta {
        display: flex;
        gap: 12px;
        margin-top: 6px;
        font-size: 10px;
        color: #555;
      }
      #dsh-market-detail {
        color: #e0e0e0;
      }
      #dsh-market-detail .detail-icon {
        width: 64px; height: 64px;
        border-radius: 14px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        margin-bottom: 16px;
      }
      #dsh-market-detail .detail-name {
        font-size: 22px;
        font-weight: 700;
        color: #fff;
        margin-bottom: 4px;
      }
      #dsh-market-detail .detail-meta {
        font-size: 12px;
        color: #888;
        margin-bottom: 16px;
      }
      #dsh-market-detail .detail-btn {
        padding: 8px 20px;
        border-radius: 8px;
        border: none;
        background: #667eea;
        color: #fff;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        margin-right: 8px;
      }
      #dsh-market-detail .detail-btn.secondary {
        background: transparent;
        border: 1px solid #2a2a3e;
      }
      #dsh-market-detail .detail-section {
        margin-top: 20px;
      }
      #dsh-market-detail .detail-section h4 {
        font-size: 14px;
        color: #fff;
        margin: 0 0 8px 0;
      }
      #dsh-market-detail .detail-section p {
        font-size: 13px;
        color: #aaa;
        line-height: 1.7;
        margin: 0;
      }
      .market-empty {
        text-align: center;
        color: #555;
        padding: 40px;
      }
    </style>
  \`;

  const PLUGINS = [
    { id: '1', name: 'Code Assistant', desc: 'AI-powered code completion and generation', author: 'DSH Team', version: '1.2.0', downloads: '12.5k', icon: '💻', installed: true, rating: 4.8 },
    { id: '2', name: 'Knowledge Base', desc: 'Manage and search your knowledge base', author: 'Community', version: '2.0.1', downloads: '8.3k', icon: '📚', installed: false, rating: 4.5 },
    { id: '3', name: 'Data Analyzer', desc: 'Data visualization and analysis toolkit', author: 'DataTeam', version: '1.0.5', downloads: '15.2k', icon: '📊', installed: false, rating: 4.7 },
    { id: '4', name: 'API Tester', desc: 'API debugging and testing interface', author: 'DevTools', version: '1.1.0', downloads: '6.7k', icon: '🔧', installed: true, rating: 4.3 },
    { id: '5', name: 'Doc Generator', desc: 'Auto-generate project documentation', author: 'DocGen', version: '1.0.0', downloads: '4.1k', icon: '📝', installed: false, rating: 4.2 },
    { id: '6', name: 'Theme Engine', desc: 'Custom themes and appearance controls', author: 'UI Team', version: '1.3.0', downloads: '20.1k', icon: '🎨', installed: false, rating: 4.9 },
    { id: '7', name: 'Git Integration', desc: 'Git workflow with visual diff tools', author: 'DevTools', version: '2.1.0', downloads: '18.4k', icon: '🔀', installed: true, rating: 4.6 },
    { id: '8', name: 'Note Taking', desc: 'Rich note-taking with markdown support', author: 'Productivity', version: '1.0.2', downloads: '9.8k', icon: '📒', installed: false, rating: 4.4 },
  ];

  let selectedPlugin = PLUGINS[0];
  let activeTab = 'featured';

  function injectStyles() {
    if (document.querySelector('[data-plugin-market]')) return;
    const styleEl = document.createElement('div');
    styleEl.innerHTML = STYLES;
    document.head.appendChild(styleEl.firstElementChild);
  }

  function createButton() {
    if (document.getElementById('dsh-market-btn')) return;
    
    const sidebar = document.querySelector('[class*="sidebar"]') || document.querySelector('[class*="Sidebar"]');
    if (!sidebar) return;

    const btn = document.createElement('button');
    btn.id = 'dsh-market-btn';
    btn.innerHTML = '🧩 <span>Market</span>';
    btn.title = 'Plugin Market';
    btn.addEventListener('click', openMarket);
    
    sidebar.style.position = 'relative';
    sidebar.appendChild(btn);
  }

  function createModal() {
    if (document.getElementById('dsh-market-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'dsh-market-modal';
    modal.innerHTML = \`
      <div id="dsh-market-panel">
        <div id="dsh-market-header">
          <h2>🧩 Plugin Market</h2>
          <button id="dsh-market-close" title="Close">✕</button>
        </div>
        <div id="dsh-market-body">
          <div id="dsh-market-list"></div>
          <div id="dsh-market-detail"></div>
        </div>
      </div>
    \`;
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeMarket();
    });
    
    document.body.appendChild(modal);
    
    document.getElementById('dsh-market-close').addEventListener('click', closeMarket);
    
    renderList();
    renderDetail();
  }

  function renderList() {
    const list = document.getElementById('dsh-market-list');
    if (!list) return;

    const filtered = PLUGINS.filter(p => {
      if (activeTab === 'installed') return p.installed;
      return true;
    });

    list.innerHTML = \`
      <input class="market-search" type="text" placeholder="Search plugins..." id="dsh-market-search" />
      <div class="market-tabs">
        <button class="market-tab \${activeTab === 'featured' ? 'active' : ''}" data-tab="featured">Featured</button>
        <button class="market-tab \${activeTab === 'installed' ? 'active' : ''}" data-tab="installed">Installed</button>
      </div>
      <div id="dsh-market-plugin-cards">
        \${filtered.length === 0 ? '<div class="market-empty">No plugins found</div>' : ''}
        \${filtered.map(p => \`
          <div class="market-plugin-card \${selectedPlugin?.id === p.id ? 'selected' : ''}" data-id="\${p.id}">
            <div class="card-header">
              <div class="card-icon">\${p.icon}</div>
              <div>
                <div class="card-name">\${p.name} \${p.installed ? '<span style="font-size:10px;color:#4caf50;background:#1a2e1a;padding:1px 5px;border-radius:6px;margin-left:4px;">Installed</span>' : ''}</div>
                <div class="card-desc">\${p.desc}</div>
              </div>
            </div>
            <div class="card-meta">
              <span>⭐ \${p.rating}</span>
              <span>⬇️ \${p.downloads}</span>
              <span>v\${p.version}</span>
            </div>
          </div>
        \`).join('')}
      </div>
    \`;

    // Search
    const search = document.getElementById('dsh-market-search');
    if (search) {
      search.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        list.querySelectorAll('.market-plugin-card').forEach(card => {
          const name = card.querySelector('.card-name')?.textContent?.toLowerCase() || '';
          const desc = card.querySelector('.card-desc')?.textContent?.toLowerCase() || '';
          card.style.display = (name.includes(q) || desc.includes(q)) ? '' : 'none';
        });
      });
    }

    // Tabs
    list.querySelectorAll('.market-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeTab = tab.dataset.tab;
        renderList();
      });
    });

    // Plugin selection
    list.querySelectorAll('.market-plugin-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        selectedPlugin = PLUGINS.find(p => p.id === id) || PLUGINS[0];
        renderList();
        renderDetail();
      });
    });
  }

  function renderDetail() {
    const detail = document.getElementById('dsh-market-detail');
    if (!detail || !selectedPlugin) return;

    const p = selectedPlugin;
    detail.innerHTML = \`
      <div class="detail-icon">\${p.icon}</div>
      <div class="detail-name">\${p.name}</div>
      <div class="detail-meta">By \${p.author} · v\${p.version} · ⬇️ \${p.downloads} · ⭐ \${p.rating}</div>
      <div>
        <button class="detail-btn" id="dsh-market-install">\${p.installed ? 'Reinstall' : 'Install'}</button>
        <button class="detail-btn secondary">View Source</button>
      </div>
      <div class="detail-section">
        <h4>About</h4>
        <p>\${p.desc}. This plugin enhances your DSH experience with powerful features and seamless integration.</p>
      </div>
      <div class="detail-section">
        <h4>Statistics</h4>
        <p>Rating: ⭐ \${p.rating}/5.0 · Downloads: \${p.downloads} · Version: v\${p.version}</p>
      </div>
    \`;

    const installBtn = document.getElementById('dsh-market-install');
    if (installBtn) {
      installBtn.addEventListener('click', () => {
        installBtn.textContent = 'Installing...';
        installBtn.disabled = true;
        setTimeout(() => {
          installBtn.textContent = 'Installed ✓';
          installBtn.style.background = '#4caf50';
        }, 1500);
      });
    }
  }

  function openMarket() {
    const modal = document.getElementById('dsh-market-modal');
    if (modal) {
      modal.classList.add('open');
      renderList();
      renderDetail();
    }
  }

  function closeMarket() {
    const modal = document.getElementById('dsh-market-modal');
    if (modal) modal.classList.remove('open');
  }

  function init() {
    injectStyles();
    
    const observer = new MutationObserver(() => {
      createButton();
      createModal();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    createButton();
    createModal();
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMarket();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
`;

const server = http.createServer(async (req, res) => {
  const isRoot = req.url === '/' || req.url === '/index.html';
  const isMarket = req.url === '/market' || req.url === '/market.html';

  if (isMarket && MARKET_HTML) {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(MARKET_HTML);
    return;
  }

  const proxyReq = http.request({
    host: DSH_HOST,
    port: DSH_PORT,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: `${DSH_HOST}:${DSH_PORT}` }
  }, (proxyRes) => {
    const isHtml = (proxyRes.headers['content-type'] || '').includes('text/html');
    
    if (isHtml && proxyRes.statusCode === 200) {
      let body = '';
      proxyRes.on('data', chunk => body += chunk);
      proxyRes.on('end', () => {
        if (body.includes('</body>')) {
          body = body.replace('</body>', INJECTION_SCRIPT + '\n</body>');
        } else {
          body += INJECTION_SCRIPT;
        }
        const headers = { ...proxyRes.headers };
        delete headers['content-length'];
        headers['content-length'] = Buffer.byteLength(body);
        res.writeHead(proxyRes.statusCode, headers);
        res.end(body);
      });
    } else {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    }
  });

  proxyReq.on('error', (err) => {
    res.writeHead(502, { 'content-type': 'text/plain' });
    res.end(`Proxy error: ${err.message}`);
  });

  req.pipe(proxyReq);
});

server.listen(PROXY_PORT, '127.0.0.1', () => {
  console.log(`\n  DSH Plugin Market Proxy running at http://127.0.0.1:${PROXY_PORT}`);
  console.log(`  Proxying DSH from http://${DSH_HOST}:${DSH_PORT}`);
  console.log(`\n  Open http://127.0.0.1:${PROXY_PORT} in your browser or DSH`);
  console.log(`  Press Ctrl+C to stop\n`);
});
