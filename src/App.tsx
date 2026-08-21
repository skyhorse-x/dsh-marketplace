import React, { useState } from 'react'

interface Plugin {
  id: string
  name: string
  description: string
  author: string
  version: string
  downloads: string
  icon: string
  installed: boolean
  rating: number
  category: string
  tags: string[]
}

const plugins: Plugin[] = [
  { id: '1', name: 'Code Assistant', description: 'AI-powered code completion and generation for multiple languages', author: 'DSH Team', version: '1.2.0', downloads: '12.5k', icon: '💻', installed: true, rating: 4.8, category: 'development', tags: ['ai', 'code'] },
  { id: '2', name: 'Knowledge Base', description: 'Manage and search your knowledge base documents with AI', author: 'Community', version: '2.0.1', downloads: '8.3k', icon: '📚', installed: false, rating: 4.5, category: 'productivity', tags: ['docs', 'search'] },
  { id: '3', name: 'Data Analyzer', description: 'Powerful data visualization and analysis toolkit', author: 'DataTeam', version: '1.0.5', downloads: '15.2k', icon: '📊', installed: false, rating: 4.7, category: 'data', tags: ['charts', 'analytics'] },
  { id: '4', name: 'API Tester', description: 'Convenient API debugging and testing interface', author: 'DevTools', version: '1.1.0', downloads: '6.7k', icon: '🔧', installed: true, rating: 4.3, category: 'development', tags: ['api', 'testing'] },
  { id: '5', name: 'Doc Generator', description: 'Auto-generate project documentation and comments', author: 'DocGen', version: '1.0.0', downloads: '4.1k', icon: '📝', installed: false, rating: 4.2, category: 'productivity', tags: ['docs', 'auto'] },
  { id: '6', name: 'Theme Engine', description: 'Custom themes and appearance controls for DSH', author: 'UI Team', version: '1.3.0', downloads: '20.1k', icon: '🎨', installed: false, rating: 4.9, category: 'theme', tags: ['ui', 'customization'] },
  { id: '7', name: 'Git Integration', description: 'Seamless Git workflow with visual diff and commit tools', author: 'DevTools', version: '2.1.0', downloads: '18.4k', icon: '🔀', installed: true, rating: 4.6, category: 'development', tags: ['git', 'vcs'] },
  { id: '8', name: 'Note Taking', description: 'Rich note-taking with markdown and AI summarization', author: 'Productivity', version: '1.0.2', downloads: '9.8k', icon: '📒', installed: false, rating: 4.4, category: 'productivity', tags: ['notes', 'markdown'] },
]

const categories = [
  { id: 'all', label: 'All', icon: '🌐' },
  { id: 'development', label: 'Development', icon: '💻' },
  { id: 'productivity', label: 'Productivity', icon: '⚡' },
  { id: 'data', label: 'Data', icon: '📊' },
  { id: 'theme', label: 'Theme', icon: '🎨' },
  { id: 'integration', label: 'Integration', icon: '🔗' },
]

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeNav, setActiveNav] = useState('plugins')
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(plugins[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('featured')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredPlugins = plugins.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory
    const matchesTab = activeTab === 'featured' || (activeTab === 'installed' && p.installed) || (activeTab === 'updates' && p.installed)
    return matchesSearch && matchesCategory && matchesTab
  })

  const sidebarWidth = sidebarCollapsed ? 56 : 280

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: '#0f0f1a', color: '#e0e0e0' }}>
      {/* Sidebar */}
      <div style={{
        width: `${sidebarWidth}px`,
        background: '#1a1a2e',
        borderRight: '1px solid #2a2a3e',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s ease',
        overflow: 'hidden'
      }}>
        {/* Brand */}
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid #2a2a3e',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          minHeight: 56
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0
          }}>D</div>
          {!sidebarCollapsed && <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>DSH Plugin Market</span>}
        </div>

        {/* Nav Items */}
        <div style={{ flex: 1, padding: '8px 12px' }}>
          {[
            { id: 'home', label: 'Home', icon: '🏠' },
            { id: 'chat', label: 'Chat', icon: '💬' },
            { id: 'plugins', label: 'Plugin Market', icon: '🧩' },
            { id: 'workspace', label: 'Workspace', icon: '📁' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                width: '100%',
                padding: sidebarCollapsed ? '10px 0' : '10px 12px',
                borderRadius: 8,
                border: 'none',
                background: activeNav === item.id ? '#2a2a4e' : 'transparent',
                color: activeNav === item.id ? '#fff' : '#888',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 14,
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                transition: 'all 0.15s',
                marginBottom: 2
              }}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div style={{ padding: '8px 12px', borderTop: '1px solid #2a2a3e' }}>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{
              width: '100%',
              padding: sidebarCollapsed ? '10px 0' : '10px 12px',
              borderRadius: 8,
              border: 'none',
              background: 'transparent',
              color: '#666',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 13,
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
            }}
          >
            <span style={{ fontSize: 16 }}>{sidebarCollapsed ? '▶' : '◀'}</span>
            {!sidebarCollapsed && <span>Collapse</span>}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Plugin List Panel */}
        <div style={{
          width: '340px',
          borderRight: '1px solid #2a2a3e',
          display: 'flex',
          flexDirection: 'column',
          background: '#12121f'
        }}>
          {/* Header */}
          <div style={{ padding: '16px', borderBottom: '1px solid #2a2a3e' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#fff' }}>Plugin Market</h2>
              <span style={{ fontSize: 12, color: '#666', background: '#1a1a2e', padding: '4px 8px', borderRadius: 12 }}>
                {filteredPlugins.length} plugins
              </span>
            </div>
            <input
              type="text"
              placeholder="Search plugins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%', padding: '8px 12px', borderRadius: 8,
                border: '1px solid #2a2a3e', background: '#1a1a2e',
                color: '#e0e0e0', fontSize: 14, outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, padding: '8px 16px', borderBottom: '1px solid #2a2a3e' }}>
            {[
              { id: 'featured', label: 'Featured' },
              { id: 'installed', label: 'Installed' },
              { id: 'updates', label: 'Updates' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '6px 14px', borderRadius: 6, border: 'none',
                  background: activeTab === tab.id ? '#667eea' : 'transparent',
                  color: activeTab === tab.id ? '#fff' : '#888',
                  cursor: 'pointer', fontSize: 13, fontWeight: 500
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Categories */}
          <div style={{ display: 'flex', gap: 4, padding: '8px 16px', borderBottom: '1px solid #2a2a3e', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '4px 10px', borderRadius: 12, border: 'none',
                  background: activeCategory === cat.id ? '#2a2a4e' : '#1a1a2e',
                  color: activeCategory === cat.id ? '#fff' : '#888',
                  cursor: 'pointer', fontSize: 12
                }}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Plugin List */}
          <div style={{ flex: 1, overflow: 'auto', padding: 12 }}>
            {filteredPlugins.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#666', padding: 40 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
                <div>No plugins found</div>
              </div>
            ) : (
              filteredPlugins.map(plugin => (
                <PluginCard
                  key={plugin.id}
                  plugin={plugin}
                  selected={selectedPlugin?.id === plugin.id}
                  onClick={() => setSelectedPlugin(plugin)}
                />
              ))
            )}
          </div>
        </div>

        {/* Plugin Detail Panel */}
        <div style={{ flex: 1, overflow: 'auto', background: '#0f0f1a' }}>
          {selectedPlugin ? (
            <PluginDetail plugin={selectedPlugin} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 48 }}>🧩</div>
              <div>Select a plugin to view details</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const PluginCard: React.FC<{ plugin: Plugin; selected: boolean; onClick: () => void }> = ({ plugin, selected, onClick }) => (
  <div
    onClick={onClick}
    style={{
      padding: 14, borderRadius: 10,
      background: selected ? '#1e1e3a' : '#1a1a2e',
      border: selected ? '1px solid #667eea' : '1px solid transparent',
      marginBottom: 8, cursor: 'pointer', transition: 'all 0.15s'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10, background: '#2a2a3e',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, flexShrink: 0
      }}>{plugin.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
          {plugin.name}
          {plugin.installed && <span style={{ fontSize: 10, color: '#4caf50', background: '#1a2e1a', padding: '2px 6px', borderRadius: 8 }}>Installed</span>}
        </div>
        <div style={{ fontSize: 12, color: '#888', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {plugin.description}
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11, color: '#555' }}>
      <span>⭐ {plugin.rating}</span>
      <span>⬇️ {plugin.downloads}</span>
      <span style={{ color: '#666' }}>v{plugin.version}</span>
    </div>
  </div>
)

const PluginDetail: React.FC<{ plugin: Plugin }> = ({ plugin }) => {
  const [installing, setInstalling] = useState(false)

  const handleInstall = () => {
    setInstalling(true)
    setTimeout(() => setInstalling(false), 2000)
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: 32 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
        <div style={{
          width: 80, height: 80, borderRadius: 18,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36
        }}>{plugin.icon}</div>
        <div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: 28, color: '#fff' }}>{plugin.name}</h1>
          <div style={{ display: 'flex', gap: 12, fontSize: 13, color: '#888' }}>
            <span>By {plugin.author}</span>
            <span>•</span>
            <span>v{plugin.version}</span>
            <span>•</span>
            <span>{plugin.downloads} downloads</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
        <button
          onClick={handleInstall}
          disabled={installing}
          style={{
            padding: '10px 28px', borderRadius: 8, border: 'none',
            background: plugin.installed ? '#2a2a3e' : '#667eea',
            color: '#fff', cursor: installing ? 'wait' : 'pointer',
            fontSize: 14, fontWeight: 600,
            opacity: installing ? 0.7 : 1
          }}
        >
          {installing ? 'Installing...' : plugin.installed ? 'Reinstall' : 'Install Plugin'}
        </button>
        <button style={{
          padding: '10px 28px', borderRadius: 8, border: '1px solid #2a2a3e',
          background: 'transparent', color: '#e0e0e0', cursor: 'pointer', fontSize: 14
        }}>
          View Source
        </button>
        <button style={{
          padding: '10px 28px', borderRadius: 8, border: '1px solid #2a2a3e',
          background: 'transparent', color: '#e0e0e0', cursor: 'pointer', fontSize: 14
        }}>
          Report Issue
        </button>
      </div>

      {/* Description */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: 16, color: '#fff' }}>About</h3>
        <p style={{ margin: 0, color: '#aaa', lineHeight: 1.8, fontSize: 14 }}>
          {plugin.description}. This plugin enhances your DSH experience with powerful features
          and seamless integration. It supports multiple workflows and can be customized
          to fit your specific needs.
        </p>
      </div>

      {/* Tags */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: 16, color: '#fff' }}>Tags</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {plugin.tags.map(tag => (
            <span key={tag} style={{
              padding: '4px 12px', borderRadius: 12, fontSize: 12,
              background: '#1a1a2e', color: '#888', border: '1px solid #2a2a3e'
            }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: 16, color: '#fff' }}>Statistics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          <StatCard label="Rating" value={`${plugin.rating} / 5.0`} icon="⭐" />
          <StatCard label="Downloads" value={plugin.downloads} icon="⬇️" />
          <StatCard label="Version" value={plugin.version} icon="🏷️" />
          <StatCard label="Author" value={plugin.author} icon="👤" />
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: 16, color: '#fff' }}>Reviews</h3>
        {[
          { user: 'Alex C.', comment: 'Excellent plugin! Greatly improved my workflow.', rating: 5 },
          { user: 'Sarah L.', comment: 'Works well, but could use some performance improvements.', rating: 4 },
        ].map((review, i) => (
          <div key={i} style={{ padding: 14, background: '#1a1a2e', borderRadius: 8, marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontWeight: 600, fontSize: 13, color: '#fff' }}>{review.user}</span>
              <span style={{ fontSize: 12, color: '#ffa726' }}>{'⭐'.repeat(review.rating)}</span>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: '#aaa', lineHeight: 1.5 }}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const StatCard: React.FC<{ label: string; value: string; icon: string }> = ({ label, value, icon }) => (
  <div style={{ padding: 14, background: '#1a1a2e', borderRadius: 8 }}>
    <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>{icon} {label}</div>
    <div style={{ fontSize: 15, color: '#fff', fontWeight: 600 }}>{value}</div>
  </div>
)

export default App
