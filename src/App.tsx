import React, { useState, useEffect } from 'react'
import {
  Home, MessageCircle, Puzzle, FolderOpen, Settings, Search, Star, Download,
  Tag, Check, RefreshCw, Eye, Brain, PenTool, Store, Bot, Palette,
  Smartphone, Wrench, Globe, Lock, Image, Shield, Radio, Glasses,
  ChevronRight, ChevronLeft, Loader2, Folder, Sparkles, Zap, Code,
  Package, TrendingUp, Clock, User, Hash, ArrowUpCircle
} from 'lucide-react'

interface Plugin {
  id: string
  name: string
  description: string
  author: string
  version: string
  latestVersion: string
  downloads: string
  monthlyDownloads: string
  stars: string
  installed: boolean
  rating: number
  category: string
  tags: string[]
  icon: React.ReactNode
  changelog?: string
}

function compareVersions(v1: string, v2: string): number {
  const p1 = v1.replace(/[^0-9.]/g, '').split('.').map(Number)
  const p2 = v2.replace(/[^0-9.]/g, '').split('.').map(Number)
  for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
    const a = p1[i] || 0, b = p2[i] || 0
    if (a > b) return 1
    if (a < b) return -1
  }
  return 0
}

function hasUpdate(current: string, latest: string): boolean {
  return compareVersions(latest, current) > 0
}

const plugins: Plugin[] = [
  { id: '1', name: 'dsh-vision-router', description: 'Eyes for text-only DeepSeek Harness agents: built-in free vision chain + pixel-level vision tools (Q&A, grounding, crop, OCR, SVG trace, screenshots).', author: 'Community', version: '1.7.3', latestVersion: '1.8.0', downloads: '26.4k', monthlyDownloads: '914', stars: '26.4k', installed: false, rating: 4.9, category: 'ai', tags: ['vision', 'ocr', 'image'], icon: <Eye size={24} />, changelog: 'Added SVG trace tool, improved OCR accuracy.' },
  { id: '2', name: 'dsh-context', description: 'Context insight and management plugin with context dashboard and context command.', author: 'Community', version: '0.19.2', latestVersion: '0.20.0', downloads: '9.9k', monthlyDownloads: '626', stars: '9.9k', installed: false, rating: 4.7, category: 'productivity', tags: ['context', 'dashboard'], icon: <Brain size={24} />, changelog: 'New context evolution timeline, export to JSON.' },
  { id: '3', name: '@zseven-w/dsh-openpencil', description: 'OpenPencil plugin with multi-frame previews, interactive canvas, and editor workbenches.', author: 'zseven-w', version: '0.1.0-rc.1', latestVersion: '0.1.0-rc.1', downloads: '132', monthlyDownloads: '132', stars: '132', installed: false, rating: 4.5, category: 'creative', tags: ['canvas', 'editor'], icon: <PenTool size={24} /> },
  { id: '4', name: '@sanqi-normal/dsh-webui-market-plugin', description: 'In-harness community plugin market for the dsh web GUI.', author: 'sanqi-normal', version: '0.5.5', latestVersion: '0.6.0', downloads: '96', monthlyDownloads: '96', stars: '96', installed: false, rating: 4.3, category: 'utility', tags: ['market', 'browser'], icon: <Store size={24} />, changelog: 'UI refresh, batch install support.' },
  { id: '5', name: '@mars-sea/dsh-commandcode-provider', description: 'Unofficial LLM provider plugin for Command Code.', author: 'mars-sea', version: '0.6.0', latestVersion: '0.6.0', downloads: '77', monthlyDownloads: '77', stars: '77', installed: false, rating: 4.4, category: 'ai', tags: ['llm', 'provider'], icon: <Bot size={24} /> },
  { id: '6', name: 'dsh-dream-skin', description: '8 套 iOS / Linear 式清冷色调高质感主题 + 流光光效 + 智能背景 + 强调色 + 主题包分享', author: 'Community', version: '0.4.1', latestVersion: '0.5.0', downloads: '5.5k', monthlyDownloads: '70', stars: '5.5k', installed: false, rating: 4.8, category: 'theme', tags: ['skin', 'theme', 'ui'], icon: <Palette size={24} />, changelog: '3 new skins (Midnight, Aurora, Sakura).' },
  { id: '7', name: 'dsh-mobile', description: '移动端适配与安全域网访问插件，支持 Android App 和手机浏览器。', author: 'Community', version: '0.1.0-alpha.24', latestVersion: '0.1.0-alpha.25', downloads: '5.7k', monthlyDownloads: '67', stars: '5.7k', installed: false, rating: 4.6, category: 'utility', tags: ['mobile', 'android'], icon: <Smartphone size={24} />, changelog: 'Fixed iOS Safari layout issues.' },
  { id: '8', name: 'dsh-web-plugin-manager', description: 'Manage DSH plugins from the Web UI: list, enable/disable, install/remove.', author: 'Community', version: '0.4.6', latestVersion: '0.4.6', downloads: '62', monthlyDownloads: '62', stars: '62', installed: false, rating: 4.2, category: 'utility', tags: ['manager', 'plugins'], icon: <Wrench size={24} /> },
  { id: '9', name: 'dsh-client-auto-continue', description: 'Automatically sends continue when a request is interrupted by network errors.', author: 'Community', version: '0.7.5', latestVersion: '0.8.0', downloads: '4.7k', monthlyDownloads: '34', stars: '4.7k', installed: true, rating: 4.5, category: 'productivity', tags: ['auto', 'continue'], icon: <RefreshCw size={24} />, changelog: 'Smart retry with exponential backoff.' },
  { id: '10', name: 'dsh-remote', description: 'Remote-work assistant: connect SSH, pick a remote workspace, 21 rw_* tools.', author: 'Community', version: '0.8.6', latestVersion: '0.9.0', downloads: '30', monthlyDownloads: '30', stars: '30', installed: false, rating: 4.7, category: 'development', tags: ['ssh', 'remote'], icon: <Globe size={24} />, changelog: 'Added SFTP browser, tunnel manager.' },
  { id: '11', name: 'dsh-passwords', description: 'Server-grade gateway: multi-tenant platform with HTTPS, permissions & quotas.', author: 'Community', version: '2.5.4', latestVersion: '2.6.0', downloads: '15', monthlyDownloads: '15', stars: '15', installed: false, rating: 4.4, category: 'security', tags: ['auth', 'multi-tenant'], icon: <Lock size={24} />, changelog: 'OAuth2 SSO integration.' },
  { id: '12', name: 'dsh-any-background', description: 'Custom theme color, background wallpaper with opacity/blur controls.', author: 'Community', version: '0.1.9', latestVersion: '0.2.0', downloads: '15', monthlyDownloads: '15', stars: '15', installed: false, rating: 4.3, category: 'theme', tags: ['background', 'wallpaper'], icon: <Image size={24} />, changelog: 'Gradient backgrounds, per-profile presets.' },
  { id: '13', name: 'dsh-config-manager', description: 'Backup / export / import / migrate DSH configuration.', author: 'Community', version: '0.1.40', latestVersion: '0.1.41', downloads: '5.2k', monthlyDownloads: '7', stars: '5.2k', installed: false, rating: 4.6, category: 'utility', tags: ['config', 'backup'], icon: <Settings size={24} />, changelog: 'Config diff viewer, scheduled auto-backup.' },
  { id: '14', name: 'upstream-radar', description: 'Dependency security monitoring: find vulnerable paths, breaking updates.', author: 'Community', version: '0.38.0', latestVersion: '0.39.0', downloads: '10.3k', monthlyDownloads: '6', stars: '10.3k', installed: false, rating: 4.8, category: 'security', tags: ['security', 'monitor'], icon: <Radio size={24} />, changelog: 'Faster scanning, Slack notifications.' },
  { id: '15', name: 'dsh-free-vision', description: 'Free vision plugin: image understanding for text-only models with free-tier providers.', author: 'Community', version: '1.0.8', latestVersion: '1.1.0', downloads: '5.3k', monthlyDownloads: '6', stars: '5.3k', installed: false, rating: 4.7, category: 'ai', tags: ['vision', 'free'], icon: <Glasses size={24} />, changelog: 'Added Doubao provider, batch processing.' },
]

const categories = [
  { id: 'all', label: 'All', icon: <Sparkles size={14} /> },
  { id: 'ai', label: 'AI & Vision', icon: <Bot size={14} /> },
  { id: 'development', label: 'Development', icon: <Code size={14} /> },
  { id: 'productivity', label: 'Productivity', icon: <Zap size={14} /> },
  { id: 'theme', label: 'Themes', icon: <Palette size={14} /> },
  { id: 'security', label: 'Security', icon: <Shield size={14} /> },
  { id: 'utility', label: 'Utility', icon: <Wrench size={14} /> },
  { id: 'creative', label: 'Creative', icon: <PenTool size={14} /> },
]

const navItems = [
  { id: 'home', label: 'Home', icon: <Home size={18} /> },
  { id: 'chat', label: 'Chat', icon: <MessageCircle size={18} /> },
  { id: 'plugins', label: 'Marketplace', icon: <Puzzle size={18} /> },
  { id: 'workspace', label: 'Workspace', icon: <FolderOpen size={18} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
]
const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeNav, setActiveNav] = useState("plugins")
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(plugins[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("featured")
  const [activeCategory, setActiveCategory] = useState("all")
  const [installingId, setInstallingId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [installProgress, setInstallProgress] = useState(0)
  const [installedIds, setInstalledIds] = useState<Set<string>>(new Set(["9"]))
  const [pluginVersions, setPluginVersions] = useState<Record<string, string>>({ "9": "0.7.5" })

  const getPluginCurrentVersion = (plugin: Plugin): string => {
    if (installedIds.has(plugin.id) && pluginVersions[plugin.id]) return pluginVersions[plugin.id]
    return plugin.version
  }

  const getPluginUpdateAvailable = (plugin: Plugin): boolean => {
    if (!installedIds.has(plugin.id)) return false
    return hasUpdate(getPluginCurrentVersion(plugin), plugin.latestVersion)
  }

  const updateCount = plugins.filter(p => getPluginUpdateAvailable(p)).length

  const filteredPlugins = plugins.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || p.category === activeCategory
    const matchesTab = activeTab === "featured" ||
      (activeTab === "installed" && installedIds.has(p.id)) ||
      (activeTab === "updates" && getPluginUpdateAvailable(p))
    return matchesSearch && matchesCategory && matchesTab
  })

  const handleInstall = (plugin: Plugin) => {
    if (installingId || updatingId) return
    setInstallingId(plugin.id)
    setInstallProgress(0)
  }

  const handleUpdate = (plugin: Plugin) => {
    if (installingId || updatingId) return
    setUpdatingId(plugin.id)
    setInstallProgress(0)
  }

  useEffect(() => {
    const activeId = installingId || updatingId
    if (!activeId) return
    const isUpdate = !!updatingId
    const interval = setInterval(() => {
      setInstallProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          if (isUpdate) {
            setPluginVersions(v => ({ ...v, [activeId]: plugins.find(p => p.id === activeId)!.latestVersion }))
            setUpdatingId(null)
          } else {
            setInstalledIds(prev => new Set([...prev, activeId]))
            setPluginVersions(v => ({ ...v, [activeId]: plugins.find(p => p.id === activeId)!.version }))
            setInstallingId(null)
          }
          return 0
        }
        return prev + Math.random() * 15 + 5
      })
    }, 200)
    return () => clearInterval(interval)
  }, [installingId, updatingId])

  const sidebarWidth = sidebarCollapsed ? 64 : 260

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif", background: "#0a0a14", color: "#e8e8f0", overflow: "hidden" }}>
      <style>{`
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        .nav-item:hover { background: rgba(102, 126, 234, 0.12) !important; }
        .nav-item.active { background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.15)) !important; }
        .plugin-card:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15) !important; border-color: rgba(102, 126, 234, 0.4) !important; }
        .plugin-card.selected { border-color: #667eea !important; box-shadow: 0 0 0 1px #667eea, 0 8px 25px rgba(102, 126, 234, 0.2) !important; }
        .cat-btn:hover { background: rgba(102, 126, 234, 0.15) !important; }
        .tab-btn:hover { opacity: 0.9; }
        .install-btn:hover:not(:disabled) { transform: scale(1.03); box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4) !important; }
        .update-btn:hover:not(:disabled) { transform: scale(1.03); box-shadow: 0 4px 15px rgba(67, 233, 123, 0.4) !important; }
        .scroll-area::-webkit-scrollbar { width: 6px; }
        .scroll-area::-webkit-scrollbar-track { background: transparent; }
        .scroll-area::-webkit-scrollbar-thumb { background: #2a2a4a; border-radius: 3px; }
        .spin-anim { animation: spin 1s linear infinite; }
        .pulse-anim { animation: pulse 2s ease-in-out infinite; }
      `}</style>      <div style={{ width: `${sidebarWidth}px`, background: "linear-gradient(180deg, #12121f 0%, #0e0e1a 100%)", borderRight: "1px solid #1e1e35", display: "flex", flexDirection: "column", transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)", overflow: "hidden", flexShrink: 0 }}>
        <div style={{ padding: "16px", borderBottom: "1px solid #1e1e35", display: "flex", alignItems: "center", gap: "12px", minHeight: 60 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)" }}>
            <Package size={18} color="#fff" strokeWidth={2.5} />
          </div>
          {!sidebarCollapsed && <span style={{ fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: "-0.3px" }}>DSH Market</span>}
        </div>
        <div style={{ flex: 1, padding: "12px 10px" }}>
          {navItems.map(item => (
            <button key={item.id} className={`nav-item ${activeNav === item.id ? "active" : ""}`} onClick={() => setActiveNav(item.id)}
              style={{ width: "100%", padding: sidebarCollapsed ? "12px 0" : "11px 14px", borderRadius: 10, border: "none", background: "transparent", color: activeNav === item.id ? "#a5b4fc" : "#7878a0", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, fontSize: 14, fontWeight: 500, justifyContent: sidebarCollapsed ? "center" : "flex-start", transition: "all 0.15s", marginBottom: 3 }}>
              {item.icon}
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>
        <div style={{ padding: "12px 10px", borderTop: "1px solid #1e1e35" }}>
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{ width: "100%", padding: sidebarCollapsed ? "12px 0" : "11px 14px", borderRadius: 10, border: "none", background: "transparent", color: "#555570", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, fontSize: 13, justifyContent: sidebarCollapsed ? "center" : "flex-start", transition: "all 0.15s" }}>
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            {!sidebarCollapsed && <span>Collapse</span>}
          </button>
        </div>
      </div>      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div style={{ width: "380px", borderRight: "1px solid #1e1e35", display: "flex", flexDirection: "column", background: "#0d0d1a", flexShrink: 0 }}>
          <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #1e1e35" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ margin: 0, fontSize: 20, color: "#fff", fontWeight: 700, letterSpacing: "-0.3px" }}>Marketplace</h2>
              <span style={{ fontSize: 12, color: "#7878a0", background: "#1a1a2e", padding: "5px 10px", borderRadius: 20, fontWeight: 500 }}>{filteredPlugins.length} plugins</span>
            </div>
            <div style={{ position: "relative" }}>
              <input type="text" placeholder="Search plugins..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "100%", padding: "10px 14px 10px 38px", borderRadius: 10, border: "1px solid #2a2a45", background: "#14142a", color: "#e8e8f0", fontSize: 14, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = "#667eea"} onBlur={e => e.target.style.borderColor = "#2a2a45"} />
              <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.5, color: "#7878a0" }} />
            </div>
          </div>          <div style={{ display: "flex", gap: 6, padding: "12px 20px", borderBottom: "1px solid #1e1e35" }}>
            {[
              { id: "featured", label: "Featured", icon: <Star size={13} />, badge: 0 },
              { id: "installed", label: "Installed", icon: <Check size={13} />, badge: 0 },
              { id: "updates", label: "Updates", icon: <ArrowUpCircle size={13} />, badge: updateCount }
            ].map(tab => (
              <button key={tab.id} className="tab-btn" onClick={() => setActiveTab(tab.id)}
                style={{ padding: "7px 16px", borderRadius: 8, border: "none", display: "flex", alignItems: "center", gap: 6, background: activeTab === tab.id ? "linear-gradient(135deg, #667eea, #764ba2)" : "transparent", color: activeTab === tab.id ? "#fff" : "#7878a0", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s" }}>
                {tab.icon}{tab.label}
                {tab.badge > 0 && <span style={{ marginLeft: 4, background: activeTab === tab.id ? "rgba(255,255,255,0.25)" : "#43e97b", color: activeTab === tab.id ? "#fff" : "#0a0a14", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 10, minWidth: 18, textAlign: "center" }}>{tab.badge}</span>}
              </button>
            ))}
          </div>          <div style={{ display: "flex", gap: 6, padding: "10px 20px", borderBottom: "1px solid #1e1e35", flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button key={cat.id} className="cat-btn" onClick={() => setActiveCategory(cat.id)}
                style={{ padding: "5px 12px", borderRadius: 20, border: "none", display: "flex", alignItems: "center", gap: 5, background: activeCategory === cat.id ? "rgba(102, 126, 234, 0.2)" : "#1a1a2e", color: activeCategory === cat.id ? "#a5b4fc" : "#7878a0", cursor: "pointer", fontSize: 12, fontWeight: 500, transition: "all 0.15s" }}>
                {cat.icon}{cat.label}
              </button>
            ))}
          </div>          <div className="scroll-area" style={{ flex: 1, overflow: "auto", padding: "14px 16px" }}>
            {filteredPlugins.length === 0 ? (
              <div style={{ textAlign: "center", color: "#555570", padding: 60 }}>
                <Search size={32} style={{ marginBottom: 12, opacity: 0.5 }} />
                <div style={{ fontSize: 15 }}>No plugins found</div>
              </div>
            ) : (
              filteredPlugins.map((plugin, idx) => (
                <PluginCard key={plugin.id} plugin={plugin} selected={selectedPlugin?.id === plugin.id}
                  installing={installingId === plugin.id} updating={updatingId === plugin.id}
                  progress={(installingId === plugin.id || updatingId === plugin.id) ? Math.min(Math.round(installProgress), 100) : 0}
                  isInstalled={installedIds.has(plugin.id)} updateAvailable={getPluginUpdateAvailable(plugin)}
                  currentVersion={getPluginCurrentVersion(plugin)} onClick={() => setSelectedPlugin(plugin)}
                  onInstall={() => handleInstall(plugin)} onUpdate={() => handleUpdate(plugin)} index={idx} />
              ))
            )}
          </div>
        </div>        <div className="scroll-area" style={{ flex: 1, overflow: "auto", background: "#0a0a14" }}>
          {selectedPlugin ? (
            <PluginDetail plugin={selectedPlugin} installing={installingId === selectedPlugin.id} updating={updatingId === selectedPlugin.id}
              progress={(installingId === selectedPlugin.id || updatingId === selectedPlugin.id) ? Math.min(Math.round(installProgress), 100) : 0}
              isInstalled={installedIds.has(selectedPlugin.id)} updateAvailable={getPluginUpdateAvailable(selectedPlugin)}
              currentVersion={getPluginCurrentVersion(selectedPlugin)} onInstall={() => handleInstall(selectedPlugin)} onUpdate={() => handleUpdate(selectedPlugin)} />
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#555570", flexDirection: "column", gap: 12 }}>
              <Puzzle size={48} style={{ opacity: 0.5 }} />
              <div style={{ fontSize: 16 }}>Select a plugin to view details</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const PluginCard: React.FC<{ plugin: Plugin; selected: boolean; installing: boolean; updating: boolean; progress: number; isInstalled: boolean; updateAvailable: boolean; currentVersion: string; onClick: () => void; onInstall: () => void; onUpdate: () => void; index: number }> = ({
  plugin, selected, installing, updating, progress, isInstalled, updateAvailable, currentVersion, onClick, onInstall, onUpdate, index
}) => {
  const iconColors = ["#667eea", "#f093fb", "#4facfa", "#43e97b", "#fa709a", "#ffa726", "#26c6da", "#ab47bc"]
  const color = iconColors[index % iconColors.length]
  const isProcessing = installing || updating
  return (
    <div className={`plugin-card ${selected ? "selected" : ""}`} onClick={onClick}
      style={{ padding: 16, borderRadius: 14, background: selected ? "#16162d" : "#111122", border: selected ? "1px solid #667eea" : "1px solid #1e1e35", marginBottom: 10, cursor: "pointer", transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)", animation: `fadeIn 0.3s ease ${index * 0.03}s both` }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0, background: `${color}18`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: color }}>{plugin.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#fff", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{plugin.name}</span>
            {isInstalled && !updateAvailable && <span style={{ fontSize: 10, color: "#43e97b", background: "rgba(67, 233, 123, 0.12)", padding: "2px 8px", borderRadius: 10, flexShrink: 0, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}><Check size={10} /> Installed</span>}
            {updateAvailable && <span className="pulse-anim" style={{ fontSize: 10, color: "#0a0a14", background: "#43e97b", padding: "2px 8px", borderRadius: 10, flexShrink: 0, fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}><ArrowUpCircle size={10} /> New</span>}
          </div>
          <div style={{ fontSize: 12, color: "#7878a0", lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", marginBottom: 8 }}>{plugin.description}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11, color: "#555570" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Star size={11} /> {plugin.stars}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Download size={11} /> {plugin.downloads}</span>
            <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, color: updateAvailable ? "#43e97b" : "#667eea", fontWeight: 500 }}>
              {updateAvailable ? <><ArrowUpCircle size={11} /> v{currentVersion} → v{plugin.latestVersion}</> : <>v{currentVersion}</>}
            </span>
          </div>
        </div>
      </div>
      {isProcessing && (
        <div style={{ marginTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 11, color: "#a5b4fc" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Loader2 size={12} className="spin-anim" /> {updating ? "Updating..." : "Installing..."}</span>
            <span>{Math.min(Math.round(progress), 100)}%</span>
          </div>
          <div style={{ height: 4, background: "#1e1e35", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${Math.min(progress, 100)}%`, background: updating ? "linear-gradient(90deg, #43e97b, #26c6da)" : "linear-gradient(90deg, #667eea, #764ba2)", borderRadius: 2, transition: "width 0.2s ease", boxShadow: `0 0 8px ${updating ? "rgba(67, 233, 123, 0.5)" : "rgba(102, 126, 234, 0.5)"}` }} />
          </div>
        </div>
      )}
    </div>
  )
}

const PluginDetail: React.FC<{ plugin: Plugin; installing: boolean; updating: boolean; progress: number; isInstalled: boolean; updateAvailable: boolean; currentVersion: string; onInstall: () => void; onUpdate: () => void }> = ({
  plugin, installing, updating, progress, isInstalled, updateAvailable, currentVersion, onInstall, onUpdate
}) => {
  const iconColors = ["#667eea", "#f093fb", "#4facfa", "#43e97b", "#fa709a", "#ffa726", "#26c6da", "#ab47bc"]
  const color = iconColors[parseInt(plugin.id) % iconColors.length]
  const isProcessing = installing || updating
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "36px 40px", animation: "fadeIn 0.3s ease" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 24, marginBottom: 32 }}>
        <div style={{ width: 88, height: 88, borderRadius: 20, color: "#fff", background: `linear-gradient(135deg, ${color}, ${color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 30px ${color}40` }}>{React.cloneElement(plugin.icon as React.ReactElement, { size: 36 })}</div>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: "0 0 8px", fontSize: 28, color: "#fff", fontWeight: 700, letterSpacing: "-0.5px" }}>{plugin.name}</h1>
          <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#7878a0", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><User size={13} /> <strong style={{ color: "#a5b4fc" }}>{plugin.author}</strong></span>
            <span>?</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Tag size={13} /> v{currentVersion}</span>
            <span>?</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Download size={13} /> {plugin.downloads}</span>
            <span>?</span>
     <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={13} /> {plugin.stars}</span>
          </div>
        </div>
      </div>

      <div style={{ background: "#111122", borderRadius: 16, padding: 24, marginBottom: 20, border: "1px solid #1e1e35" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 16, color: "#fff", fontWeight: 600 }}>About</h3>
        <p style={{ margin: 0, fontSize: 14, color: "#a0a0c0", lineHeight: 1.7 }}>{plugin.description}</p>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 140px", background: "#111122", borderRadius: 14, padding: 18, border: "1px solid #1e1e35", textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>{plugin.stars}</div>
          <div style={{ fontSize: 12, color: "#7878a0", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}><Star size={12} /> Stars</div>
        </div>
        <div style={{ flex: "1 1 140px", background: "#111122", borderRadius: 14, padding: 18, border: "1px solid #1e1e35", textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>{plugin.downloads}</div>
          <div style={{ fontSize: 12, color: "#7878a0", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}><Download size={12} /> Downloads</div>
        </div>
        <div style={{ flex: "1 1 140px", background: "#111122", borderRadius: 14, padding: 18, border: "1px solid #1e1e35", textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>{plugin.monthlyDownloads}</div>
          <div style={{ fontSize: 12, color: "#7878a0", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}><TrendingUp size={12} /> Monthly</div>
        </div>
        <div style={{ flex: "1 1 140px", background: "#111122", borderRadius: 14, padding: 18, border: "1px solid #1e1e35", textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>{plugin.rating}</div>
          <div style={{ fontSize: 12, color: "#7878a0", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}><Star size={12} /> Rating</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#1a1a2e", padding: "8px 14px", borderRadius: 10, fontSize: 13, color: "#a5b4fc" }}>
          <Folder size={14} /> {categories.find(c => c.id === plugin.category)?.label || plugin.category}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#1a1a2e", padding: "8px 14px", borderRadius: 10, fontSize: 13, color: "#a5b4fc" }}>
          <Hash size={14} /> v{currentVersion}
        </div>
        {plugin.tags.map(tag => (
          <div key={tag} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(102, 126, 234, 0.1)", padding: "8px 14px", borderRadius: 10, fontSize: 12, color: "#7878a0" }}>
            <Tag size={14} /> {tag}
          </div>
        ))}
      </div>

      {plugin.changelog && (
        <div style={{ background: "#111122", borderRadius: 16, padding: 24, marginBottom: 20, border: "1px solid #1e1e35" }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 16, color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}><Clock size={16} /> Changelog</h3>
          <p style={{ margin: 0, fontSize: 14, color: "#a0a0c0", lineHeight: 1.7 }}>{plugin.changelog}</p>
        </div>
      )}

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        {isInstalled && !updateAvailable ? (
          <button disabled style={{ padding: "12px 28px", borderRadius: 12, border: "none", background: "#1a2a1e", color: "#43e97b", fontSize: 14, fontWeight: 600, cursor: "default", display: "flex", alignItems: "center", gap: 8 }}>
            <Check size={18} /> Installed
          </button>
        ) : updateAvailable ? (
          <button className="update-btn" onClick={onUpdate} disabled={isProcessing}
            style={{ padding: "12px 28px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #43e97b, #26c6da)", color: "#0a0a14", fontSize: 14, fontWeight: 600, cursor: isProcessing ? "default" : "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}>
            {isProcessing ? <><Loader2 size={18} className="spin-anim" /> Updating...</> : <><ArrowUpCircle size={18} /> Update to v{plugin.latestVersion}</>}
          </button>
        ) : (
          <button className="install-btn" onClick={onInstall} disabled={isProcessing}
            style={{ padding: "12px 28px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #667eea, #764ba2)", color: "#fff", fontSize: 14, fontWeight: 600, cursor: isProcessing ? "default" : "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}>
            {isProcessing ? <><Loader2 size={18} className="spin-anim" /> Installing...</> : <><Download size={18} /> Install</>}
          </button>
        )}
        {isProcessing && (
          <div style={{ flex: 1, maxWidth: 300 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "#a5b4fc" }}>
              <span>{Math.min(Math.round(progress), 100)}%</span>
            </div>
            <div style={{ height: 6, background: "#1e1e35", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.min(progress, 100)}%`, background: updating ? "linear-gradient(90deg, #43e97b, #26c6da)" : "linear-gradient(90deg, #667eea, #764ba2)", borderRadius: 3, transition: "width 0.2s ease", boxShadow: `0 0 10px ${updating ? "rgba(67, 233, 123, 0.5)" : "rgba(102, 126, 234, 0.5)"}` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App