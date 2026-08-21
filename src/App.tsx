import React, { useState, useEffect, useMemo } from 'react'
import {
  Home, MessageCircle, Puzzle, FolderOpen, Settings, Search, Star, Download,
  Calendar, Tag, Check, RefreshCw, Eye, Brain, PenTool, Store, Bot, Palette,
  Smartphone, Wrench, Globe, Lock, Image, Shield, Radio, Glasses,
  ChevronRight, ChevronLeft, Loader2, Folder, Flag, Sparkles, Zap, Code,
  Package, TrendingUp, Clock, User, Hash, ArrowUpCircle, AlertCircle,
  X, ExternalLink, Heart, Info
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
  const parts1 = v1.replace(/[^0-9.]/g, '').split('.').map(Number)
  const parts2 = v2.replace(/[^0-9.]/g, '').split('.').map(Number)
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const a = parts1[i] || 0
    const b = parts2[i] || 0
    if (a > b) return 1
    if (a < b) return -1
  }
  return 0
}

function hasUpdate(current: string, latest: string): boolean {
  return compareVersions(latest, current) > 0
}

const plugins: Plugin[] = [
  { id: '1', name: 'dsh-vision-router', description: 'Eyes for text-only DeepSeek Harness agents: built-in free vision chain (no key) + pixel-level vision tools (Q&A, grounding, crop, pixel diff, colors, OCR, SVG trace, cutout, screenshots).', author: 'Community', version: '1.7.3', latestVersion: '1.8.0', downloads: '26.4k', monthlyDownloads: '914', stars: '26.4k', installed: false, rating: 4.9, category: 'ai', tags: ['vision', 'ocr', 'image'], icon: <Eye size={24} />, changelog: 'Added SVG trace tool, improved OCR accuracy, fixed crop coordinate bug.' },
  { id: '2', name: 'dsh-context', description: 'A DeepSeek Harness plugin for context insight and management, with context dashboard and context command.', author: 'Community', version: '0.19.2', latestVersion: '0.20.0', downloads: '9.9k', monthlyDownloads: '626', stars: '9.9k', installed: false, rating: 4.7, category: 'productivity', tags: ['context', 'dashboard'], icon: <Brain size={24} />, changelog: 'New context evolution timeline, export to JSON, dark mode support.' },
  { id: '3', name: '@zseven-w/dsh-openpencil', description: 'OpenPencil plugin for DSH with exact multi-frame previews, an interactive canvas, and managed editor workbenches.', author: 'zseven-w', version: '0.1.0-rc.1', latestVersion: '0.1.0-rc.1', downloads: '132', monthlyDownloads: '132', stars: '132', installed: false, rating: 4.5, category: 'creative', tags: ['canvas', 'editor'], icon: <PenTool size={24} /> },
  { id: '4', name: '@sanqi-normal/dsh-webui-market-plugin', description: 'In-harness community plugin market for the dsh web GUI.', author: 'sanqi-normal', version: '0.5.5', latestVersion: '0.6.0', downloads: '96', monthlyDownloads: '96', stars: '96', installed: false, rating: 4.3, category: 'utility', tags: ['market', 'browser'], icon: <Store size={24} />, changelog: 'UI refresh, batch install support.' },
  { id: '5', name: '@mars-sea/dsh-commandcode-provider', description: 'Unofficial DeepSeek Harness LLM provider plugin for Command Code.', author: 'mars-sea', version: '0.6.0', latestVersion: '0.6.0', downloads: '77', monthlyDownloads: '77', stars: '77', installed: false, rating: 4.4, category: 'ai', tags: ['llm', 'provider'], icon: <Bot size={24} /> },
  { id: '6', name: 'dsh-dream-skin', description: 'DeepSeek Harness 换肤插件: 8 套 iOS / Linear 式清冷色调的高质感主题 + 流光光效带 + 每皮智能背景 + 强调色 + 主题包分享', author: 'Community', version: '0.4.1', latestVersion: '0.5.0', downloads: '5.5k', monthlyDownloads: '70', stars: '5.5k', installed: false, rating: 4.8, category: 'theme', tags: ['skin', 'theme', 'ui'], icon: <Palette size={24} />, changelog: '3 new skins (Midnight, Aurora, Sakura), improved blur performance.' },
  { id: '7', name: 'dsh-mobile', description: 'DeepSeek Harness 移动端适配与安全域网访问插件，支持 Android App 和手机浏览器。', author: 'Community', version: '0.1.0-alpha.24', latestVersion: '0.1.0-alpha.25', downloads: '5.7k', monthlyDownloads: '67', stars: '5.7k', installed: false, rating: 4.6, category: 'utility', tags: ['mobile', 'android'], icon: <Smartphone size={24} />, changelog: 'Fixed iOS Safari layout issues, improved touch handling.' },
  { id: '8', name: 'dsh-web-plugin-manager', description: 'Manage DeepSeek Harness (DSH) plugins from the Web UI.', author: 'Community', version: '0.4.6', latestVersion: '0.4.6', downloads: '62', monthlyDownloads: '62', stars: '62', installed: false, rating: 4.2, category: 'utility', tags: ['manager', 'plugins'], icon: <Wrench size={24} /> },
  { id: '9', name: 'dsh-client-auto-continue', description: 'DSH Web UI plugin: automatically sends continue when a request is interrupted.', author: 'Community', version: '0.7.5', latestVersion: '0.8.0', downloads: '4.7k', monthlyDownloads: '34', stars: '4.7k', installed: true, rating: 4.5, category: 'productivity', tags: ['auto', 'continue'], icon: <RefreshCw size={24} />, changelog: 'Smart retry with exponential backoff, configurable trigger conditions.' },
  { id: '10', name: 'dsh-remote', description: 'Remote-work assistant for DeepSeek Harness: connect SSH, pick a remote workspace, operate on it with 21 rw_* tools.', author: 'Community', version: '0.8.6', latestVersion: '0.9.0', downloads: '30', monthlyDownloads: '30', stars: '30', installed: false, rating: 4.7, category: 'development', tags: ['ssh', 'remote'], icon: <Globe size={24} />, changelog: 'Added SFTP browser, tunnel manager, session persistence.' },
  { id: '11', name: 'dsh-passwords', description: 'dsh-passwords: a server-grade gateway that turns DeepSeek Harness into a multi-tenant platform.', author: 'Community', version: '2.5.4', latestVersion: '2.6.0', downloads: '15', monthlyDownloads: '15', stars: '15', installed: false, rating: 4.4, category: 'security', tags: ['auth', 'multi-tenant'], icon: <Lock size={24} />, changelog: 'OAuth2 SSO integration, improved rate limiting.' },
  { id: '12', name: 'dsh-any-background', description: 'Appearance plugin for DeepSeek Harness: custom theme color, background wallpaper with opacity/blur controls.', author: 'Community', version: '0.1.9', latestVersion: '0.2.0', downloads: '15', monthlyDownloads: '15', stars: '15', installed: false, rating: 4.3, category: 'theme', tags: ['background', 'wallpaper'], icon: <Image size={24} />, changelog: 'Gradient backgrounds, per-profile wallpaper presets.' },
  { id: '13', name: 'dsh-config-manager', description: 'DSH Config Manager: backup / export / import / migrate DSH configuration.', author: 'Community', version: '0.1.40', latestVersion: '0.1.41', downloads: '5.2k', monthlyDownloads: '7', stars: '5.2k', installed: false, rating: 4.6, category: 'utility', tags: ['config', 'backup'], icon: <Settings size={24} />, changelog: 'Added config diff viewer, scheduled auto-backup.' },
  { id: '14', name: 'upstream-radar', description: 'Always-on dependency security monitoring for DeepSeek Harness (DSH) plugins.', author: 'Community', version: '0.38.0', latestVersion: '0.39.0', downloads: '10.3k', monthlyDownloads: '6', stars: '10.3k', installed: false, rating: 4.8, category: 'security', tags: ['security', 'monitor'], icon: <Radio size={24} />, changelog: 'Faster vulnerability scanning, Slack notifications.' },
  { id: '15', name: 'dsh-free-vision', description: 'Free vision plugin for DeepSeek Harness: image understanding for text-only models with free-tier providers.', author: 'Community', version: '1.0.8', latestVersion: '1.1.0', downloads: '5.3k', monthlyDownloads: '6', stars: '5.3k', installed: false, rating: 4.7, category: 'ai', tags: ['vision', 'free'], icon: <Glasses size={24} />, changelog: 'Added Doubao provider, batch image processing.' },
]

type TabType = 'recommended' | 'installed' | 'updates'
type NavPage = 'home' | 'chat' | 'plugins' | 'settings'

const categories = [
  { id: 'all', name: '全部', icon: <Folder size={16} /> },
  { id: 'ai', name: 'AI', icon: <Brain size={16} /> },
  { id: 'productivity', name: '效率', icon: <Zap size={16} /> },
  { id: 'creative', name: '创作', icon: <PenTool size={16} /> },
  { id: 'utility', name: '工具', icon: <Wrench size={16} /> },
  { id: 'theme', name: '主题', icon: <Palette size={16} /> },
  { id: 'development', name: '开发', icon: <Code size={16} /> },
  { id: 'security', name: '安全', icon: <Shield size={16} /> },
]

// 样式常量
const styles = {
  app: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#0f0f1a',
    color: '#e4e4e7',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    overflow: 'hidden' as const,
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#12121f',
    borderRight: '1px solid #1e1e30',
    display: 'flex',
    flexDirection: 'column' as const,
    flexShrink: 0,
    transition: 'width 0.3s ease',
  },
  sidebarCollapsed: {
    width: '64px',
  },
  sidebarHeader: {
    padding: '20px 16px',
    borderBottom: '1px solid #1e1e30',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logo: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logoText: {
    color: '#fff',
    fontWeight: 700,
    fontSize: '14px',
  },
  sidebarTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#e4e4e7',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
  },
  nav: {
    flex: 1,
    padding: '12px 8px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#9ca3af',
    fontSize: '14px',
    fontWeight: 500,
    border: 'none',
    background: 'transparent',
    width: '100%',
    textAlign: 'left' as const,
  },
  navItemActive: {
    backgroundColor: '#1e1e30',
    color: '#e4e4e7',
  },
  navItemHover: {
    backgroundColor: '#1a1a2a',
    color: '#e4e4e7',
  },
  navBadge: {
    marginLeft: 'auto',
    backgroundColor: '#667eea',
    color: '#fff',
    fontSize: '11px',
    fontWeight: 600,
    padding: '2px 8px',
    borderRadius: '10px',
    minWidth: '20px',
    textAlign: 'center' as const,
  },
  sidebarFooter: {
    padding: '12px 8px',
    borderTop: '1px solid #1e1e30',
  },
  collapseBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#9ca3af',
    fontSize: '14px',
    fontWeight: 500,
    border: 'none',
    background: 'transparent',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
  },
  header: {
    padding: '16px 24px',
    borderBottom: '1px solid #1e1e30',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#e4e4e7',
  },
  headerSubtitle: {
    fontSize: '13px',
    color: '#9ca3af',
    marginTop: '2px',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#1a1a2a',
    border: '1px solid #2a2a3e',
    borderRadius: '8px',
    padding: '8px 12px',
    width: '280px',
    transition: 'border-color 0.2s ease',
  },
  searchInput: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#e4e4e7',
    fontSize: '13px',
    width: '100%',
    placeholder: '#6b7280',
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    padding: '0 24px',
    borderBottom: '1px solid #1e1e30',
    flexShrink: 0,
  },
  tab: {
    padding: '12px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    color: '#9ca3af',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
  } as React.CSSProperties,
  tabActive: {
    color: '#667eea',
    borderBottomColor: '#667eea',
  },
  tabBadge: {
    backgroundColor: '#667eea',
    color: '#fff',
    fontSize: '11px',
    fontWeight: 600,
    padding: '1px 6px',
    borderRadius: '8px',
    minWidth: '18px',
    textAlign: 'center' as const,
  },
  tabBadgeGray: {
    backgroundColor: '#374151',
    color: '#9ca3af',
  },
  content: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
  pluginList: {
    flex: 1,
    overflow: 'auto',
    padding: '16px 24px',
  },
  categoryBar: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
    flexWrap: 'wrap' as const,
  },
  categoryChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid #2a2a3e',
    backgroundColor: '#1a1a2a',
    color: '#9ca3af',
  },
  categoryChipActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
    color: '#fff',
  },
  pluginGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '12px',
  },
  pluginCard: {
    backgroundColor: '#1a1a2a',
    border: '1px solid #2a2a3e',
    borderRadius: '12px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative' as const,
  },
  pluginCardHover: {
    borderColor: '#667eea',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.15)',
  },
  pluginCardSelected: {
    borderColor: '#667eea',
    backgroundColor: '#1e1e30',
  },
  updateIndicator: {
    position: 'absolute' as const,
    top: '12px',
    right: '12px',
    backgroundColor: '#f59e0b',
    color: '#fff',
    fontSize: '10px',
    fontWeight: 700,
    padding: '3px 8px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    zIndex: 1,
  },
  pluginHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '10px',
  },
  pluginIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: '#2a2a3e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#667eea',
    flexShrink: 0,
  },
  pluginInfo: {
    flex: 1,
    minWidth: 0,
  },
  pluginName: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#e4e4e7',
    marginBottom: '2px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  pluginAuthor: {
    fontSize: '12px',
    color: '#9ca3af',
  },
  pluginDescription: {
    fontSize: '13px',
    color: '#9ca3af',
    lineHeight: 1.5,
    marginBottom: '12px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
  },
  versionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px',
    fontSize: '12px',
  },
  versionCurrent: {
    color: '#9ca3af',
    backgroundColor: '#2a2a3e',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  versionArrow: {
    color: '#f59e0b',
    fontWeight: 700,
  },
  versionLatest: {
    color: '#f59e0b',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    padding: '2px 8px',
    borderRadius: '4px',
    fontWeight: 600,
  },
  versionUpToDate: {
    color: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    padding: '2px 8px',
    borderRadius: '4px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  pluginFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pluginStats: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '12px',
    color: '#6b7280',
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  starRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    color: '#f59e0b',
  },
  pluginActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  btnInstall: {
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 14px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    transition: 'all 0.2s ease',
  },
  btnInstalled: {
    backgroundColor: '#2a2a3e',
    color: '#10b981',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 14px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  btnUpdate: {
    backgroundColor: '#f59e0b',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 14px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    transition: 'all 0.2s ease',
  },
  detailPanel: {
    width: '360px',
    backgroundColor: '#12121f',
    borderLeft: '1px solid #1e1e30',
    overflow: 'auto',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  detailHeader: {
    padding: '20px',
    borderBottom: '1px solid #1e1e30',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
  },
  detailIcon: {
    width: '52px',
    height: '52px',
    borderRadius: '14px',
    backgroundColor: '#2a2a3e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#667eea',
    flexShrink: 0,
  },
  detailTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#e4e4e7',
    marginBottom: '4px',
  },
  detailAuthor: {
    fontSize: '13px',
    color: '#9ca3af',
    marginBottom: '8px',
  },
  detailRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: '#f59e0b',
    fontSize: '13px',
  },
  detailBody: {
    flex: 1,
    padding: '20px',
  },
  detailSection: {
    marginBottom: '20px',
  },
  detailSectionTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#9ca3af',
    marginBottom: '8px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  detailDescription: {
    fontSize: '14px',
    color: '#d1d5db',
    lineHeight: 1.6,
  },
  detailChangelog: {
    fontSize: '13px',
    color: '#d1d5db',
    lineHeight: 1.6,
    backgroundColor: '#1a1a2a',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #2a2a3e',
  },
  detailTags: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '6px',
  },
  detailTag: {
    backgroundColor: '#2a2a3e',
    color: '#9ca3af',
    fontSize: '11px',
    padding: '4px 10px',
    borderRadius: '12px',
  },
  detailStats: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  detailStatCard: {
    backgroundColor: '#1a1a2a',
    border: '1px solid #2a2a3e',
    borderRadius: '8px',
    padding: '12px',
    textAlign: 'center' as const,
  },
  detailStatValue: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#e4e4e7',
  },
  detailStatLabel: {
    fontSize: '11px',
    color: '#9ca3af',
    marginTop: '2px',
  },
  detailFooter: {
    padding: '16px 20px',
    borderTop: '1px solid #1e1e30',
    display: 'flex',
    gap: '10px',
  },
  detailBtnPrimary: {
    flex: 1,
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
  },
  detailBtnUpdate: {
    flex: 1,
    backgroundColor: '#f59e0b',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
  },
  detailBtnSecondary: {
    backgroundColor: '#2a2a3e',
    color: '#e4e4e7',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
  },
  detailBtnDanger: {
    backgroundColor: '#2a2a3e',
    color: '#ef4444',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#6b7280',
    gap: '12px',
  },
  emptyIcon: {
    opacity: 0.4,
  },
  emptyText: {
    fontSize: '14px',
    fontWeight: 500,
  },
  emptySubtext: {
    fontSize: '12px',
    color: '#6b7280',
  },
  pageContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
  },
  pageContent: {
    flex: 1,
    overflow: 'auto',
    padding: '24px',
  },
  comingSoon: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    color: '#6b7280',
    gap: '16px',
  },
}

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activePage, setActivePage] = useState<NavPage>('plugins')
  const [activeTab, setActiveTab] = useState<TabType>('recommended')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null)
  const [installedPlugins, setInstalledPlugins] = useState<Set<string>>(
    new Set(plugins.filter(p => p.installed).map(p => p.id))
  )
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [updatingPlugin, setUpdatingPlugin] = useState<string | null>(null)

  // 计算有更新的插件
  const pluginsWithUpdates = useMemo(() => {
    return plugins.filter(p => installedPlugins.has(p.id) && hasUpdate(p.version, p.latestVersion))
  }, [installedPlugins])

  // 已安装插件
  const installedPluginList = useMemo(() => {
    return plugins.filter(p => installedPlugins.has(p.id))
  }, [installedPlugins])

  // 推荐插件
  const recommendedPlugins = useMemo(() => {
    return [...plugins].sort((a, b) => b.rating - a.rating)
  }, [])

  // 根据标签页获取插件列表
  const getTabPlugins = (): Plugin[] => {
    switch (activeTab) {
      case 'installed':
        return installedPluginList
      case 'updates':
        return pluginsWithUpdates
      case 'recommended':
      default:
        return recommendedPlugins
    }
  }

  // 筛选插件
  const filteredPlugins = useMemo(() => {
    let result = getTabPlugins()

    // 分类筛选
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

    // 搜索筛选
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.author.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      )
    }

    return result
  }, [activeTab, selectedCategory, searchQuery, installedPlugins])

  // 安装/卸载插件
  const toggleInstall = (pluginId: string) => {
    setInstalledPlugins(prev => {
      const next = new Set(prev)
      if (next.has(pluginId)) {
        next.delete(pluginId)
      } else {
        next.add(pluginId)
      }
      return next
    })
  }

  // 更新插件
  const handleUpdate = (pluginId: string) => {
    setUpdatingPlugin(pluginId)
    // 模拟更新操作
    setTimeout(() => {
      setUpdatingPlugin(null)
      // 更新 version 为 latestVersion（在真实场景中这里会调用 API）
      const plugin = plugins.find(p => p.id === pluginId)
      if (plugin) {
        plugin.version = plugin.latestVersion
      }
    }, 1500)
  }

  // 获取当前选中插件是否有更新
  const selectedPluginHasUpdate = selectedPlugin && installedPlugins.has(selectedPlugin.id) && hasUpdate(selectedPlugin.version, selectedPlugin.latestVersion)

  return (
    <div style={styles.app}>
      {/* 侧边栏 */}
      <aside style={{ ...styles.sidebar, ...(sidebarCollapsed ? styles.sidebarCollapsed : {}) }}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>
            <Puzzle size={18} color="#fff" />
          </div>
          {!sidebarCollapsed && <span style={styles.sidebarTitle}>DSH Marketplace</span>}
        </div>

        <nav style={styles.nav}>
          <button
            style={{
              ...styles.navItem,
              ...(activePage === 'home' ? styles.navItemActive : {}),
            }}
            onClick={() => setActivePage('home')}
          >
            <Home size={18} />
            {!sidebarCollapsed && <span>首页</span>}
          </button>
          <button
            style={{
              ...styles.navItem,
              ...(activePage === 'chat' ? styles.navItemActive : {}),
            }}
            onClick={() => setActivePage('chat')}
          >
            <MessageCircle size={18} />
            {!sidebarCollapsed && <span>对话</span>}
          </button>
          <button
            style={{
              ...styles.navItem,
              ...(activePage === 'plugins' ? styles.navItemActive : {}),
            }}
            onClick={() => setActivePage('plugins')}
          >
            <Puzzle size={18} />
            {!sidebarCollapsed && <span>插件市场</span>}
            {!sidebarCollapsed && pluginsWithUpdates.length > 0 && (
              <span style={styles.navBadge}>{pluginsWithUpdates.length}</span>
            )}
          </button>
          <button
            style={{
              ...styles.navItem,
              ...(activePage === 'settings' ? styles.navItemActive : {}),
            }}
            onClick={() => setActivePage('settings')}
          >
            <Settings size={18} />
            {!sidebarCollapsed && <span>设置</span>}
          </button>
        </nav>

        <div style={styles.sidebarFooter}>
          <button
            style={styles.collapseBtn}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!sidebarCollapsed && <span style={{ marginLeft: '8px' }}>收起</span>}
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main style={styles.main}>
        {activePage === 'plugins' ? (
          <>
            {/* 头部 */}
            <header style={styles.header}>
              <div style={styles.headerLeft}>
                <div>
                  <h1 style={styles.headerTitle}>插件市场</h1>
                  <p style={styles.headerSubtitle}>发现、安装和管理 DeepSeek Harness 插件</p>
                </div>
              </div>
              <div style={styles.headerRight}>
                <div style={styles.searchBox}>
                  <Search size={16} color="#6b7280" />
                  <input
                    style={styles.searchInput}
                    placeholder="搜索插件名称、描述、作者..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </header>

            {/* 标签页 */}
            <div style={styles.tabs}>
              <button
                style={{
                  ...styles.tab,
                  ...(activeTab === 'recommended' ? styles.tabActive : {}),
                }}
                onClick={() => setActiveTab('recommended')}
              >
                <Sparkles size={14} />
                推荐
              </button>
              <button
                style={{
                  ...styles.tab,
                  ...(activeTab === 'installed' ? styles.tabActive : {}),
                }}
                onClick={() => setActiveTab('installed')}
              >
                <Check size={14} />
                已安装
                <span style={{ ...styles.tabBadge, ...(installedPluginList.length === 0 ? styles.tabBadgeGray : {}) }}>
                  {installedPluginList.length}
                </span>
              </button>
              <button
                style={{
                  ...styles.tab,
                  ...(activeTab === 'updates' ? styles.tabActive : {}),
                }}
                onClick={() => setActiveTab('updates')}
              >
                <ArrowUpCircle size={14} />
                更新
                {pluginsWithUpdates.length > 0 ? (
                  <span style={styles.tabBadge}>{pluginsWithUpdates.length}</span>
                ) : (
                  <span style={{ ...styles.tabBadge, ...styles.tabBadgeGray }}>0</span>
                )}
              </button>
            </div>

            {/* 内容区 */}
            <div style={styles.content}>
              {/* 插件列表 */}
              <div style={styles.pluginList}>
                {/* 分类筛选 */}
                <div style={styles.categoryBar}>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      style={{
                        ...styles.categoryChip,
                        ...(selectedCategory === cat.id ? styles.categoryChipActive : {}),
                      }}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.icon}
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* 插件网格 */}
                {filteredPlugins.length > 0 ? (
                  <div style={styles.pluginGrid}>
                    {filteredPlugins.map(plugin => {
                      const isInstalled = installedPlugins.has(plugin.id)
                      const pluginHasUpdate = isInstalled && hasUpdate(plugin.version, plugin.latestVersion)
                      const isSelected = selectedPlugin?.id === plugin.id
                      const isHovered = hoveredCard === plugin.id
                      const isUpdating = updatingPlugin === plugin.id

                      return (
                        <div
                          key={plugin.id}
                          style={{
                            ...styles.pluginCard,
                            ...(isHovered ? styles.pluginCardHover : {}),
                            ...(isSelected ? styles.pluginCardSelected : {}),
                          }}
                          onClick={() => setSelectedPlugin(plugin)}
                          onMouseEnter={() => setHoveredCard(plugin.id)}
                          onMouseLeave={() => setHoveredCard(null)}
                          className="fade-in"
                        >
                          {/* 更新指示器 */}
                          {pluginHasUpdate && (
                            <div style={styles.updateIndicator}>
                              <ArrowUpCircle size={10} />
                              新版本
                            </div>
                          )}

                          {/* 头部 */}
                          <div style={styles.pluginHeader}>
                            <div style={styles.pluginIcon}>
                              {plugin.icon}
                            </div>
                            <div style={styles.pluginInfo}>
                              <div style={styles.pluginName} title={plugin.name}>{plugin.name}</div>
                              <div style={styles.pluginAuthor}>by {plugin.author}</div>
                            </div>
                          </div>

                          {/* 描述 */}
                          <div style={styles.pluginDescription}>{plugin.description}</div>

                          {/* 版本信息 */}
                          <div style={styles.versionRow}>
                            {pluginHasUpdate ? (
                              <>
                                <span style={styles.versionCurrent}>v{plugin.version}</span>
                                <span style={styles.versionArrow}>→</span>
                                <span style={styles.versionLatest}>v{plugin.latestVersion}</span>
                              </>
                            ) : isInstalled ? (
                              <span style={styles.versionUpToDate}>
                                <Check size={12} />
                                v{plugin.version} 最新
                              </span>
                            ) : (
                              <span style={styles.versionCurrent}>v{plugin.latestVersion}</span>
                            )}
                          </div>

                          {/* 底部 */}
                          <div style={styles.pluginFooter}>
                            <div style={styles.pluginStats}>
                              <span style={styles.statItem}>
                                <Download size={12} />
                                {plugin.downloads}
                              </span>
                              <span style={styles.starRating}>
                                <Star size={12} fill="currentColor" />
                                {plugin.rating}
                              </span>
                            </div>
                            <div style={styles.pluginActions}>
                              {isUpdating ? (
                                <button style={styles.btnUpdate} disabled>
                                  <Loader2 size={12} className="spin" />
                                  更新中
                                </button>
                              ) : pluginHasUpdate ? (
                                <button
                                  style={styles.btnUpdate}
                                  onClick={(e) => { e.stopPropagation(); handleUpdate(plugin.id) }}
                                >
                                  <ArrowUpCircle size={12} />
                                  更新
                                </button>
                              ) : isInstalled ? (
                                <button style={styles.btnInstalled}>
                                  <Check size={12} />
                                  已安装
                                </button>
                              ) : (
                                <button
                                  style={styles.btnInstall}
                                  onClick={(e) => { e.stopPropagation(); toggleInstall(plugin.id) }}
                                >
                                  <Download size={12} />
                                  安装
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div style={styles.emptyState}>
                    <Package size={48} style={styles.emptyIcon} />
                    <span style={styles.emptyText}>
                      {activeTab === 'updates' ? '暂无可用更新' :
                       activeTab === 'installed' ? '尚未安装任何插件' :
                        searchQuery ? '未找到匹配的插件' : '暂无插件'}
                    </span>
                    <span style={styles.emptySubtext}>
                      {activeTab === 'updates' ? '所有插件均为最新版本' :
                       activeTab === 'installed' ? '去插件市场发现有用的工具' :
                       searchQuery ? '尝试使用不同的关键词搜索' : '敬请期待'}
                    </span>
                  </div>
                )}
              </div>

              {/* 详情面板 */}
              {selectedPlugin && (
                <div style={styles.detailPanel} className="fade-in">
                  <div style={styles.detailHeader}>
                    <div style={styles.detailIcon}>
                      {selectedPlugin.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={styles.detailTitle}>{selectedPlugin.name}</div>
                      <div style={styles.detailAuthor}>by {selectedPlugin.author}</div>
                      <div style={styles.detailRating}>
                        <Star size={14} fill="currentColor" />
                        <span>{selectedPlugin.rating}</span>
                        <span style={{ color: '#6b7280', marginLeft: '4px' }}>({selectedPlugin.stars} stars)</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedPlugin(null)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#6b7280',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                      }}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div style={styles.detailBody}>
                    {/* 描述 */}
                    <div style={styles.detailSection}>
                      <div style={styles.detailSectionTitle}>简介</div>
                      <div style={styles.detailDescription}>{selectedPlugin.description}</div>
                    </div>

                    {/* 版本信息 */}
                    <div style={styles.detailSection}>
                      <div style={styles.detailSectionTitle}>版本信息</div>
                      <div style={styles.versionRow}>
                        <span style={styles.versionCurrent}>当前: v{selectedPlugin.version}</span>
                        {selectedPluginHasUpdate && (
                          <>
                            <span style={styles.versionArrow}>→</span>
                            <span style={styles.versionLatest}>最新: v{selectedPlugin.latestVersion}</span>
                          </>
                        )}
                      </div>
                      {!selectedPluginHasUpdate && installedPlugins.has(selectedPlugin.id) && (
                        <div style={{ ...styles.versionUpToDate, marginTop: '6px', display: 'inline-flex' }}>
                          <Check size={12} />
                          已是最新版本
                        </div>
                      )}
                    </div>

                    {/* 更新日志 */}
                    {selectedPlugin.changelog && selectedPluginHasUpdate && (
                      <div style={styles.detailSection}>
                        <div style={styles.detailSectionTitle}>更新日志</div>
                        <div style={styles.detailChangelog}>{selectedPlugin.changelog}</div>
                      </div>
                    )}

                    {/* 统计 */}
                    <div style={styles.detailSection}>
                      <div style={styles.detailSectionTitle}>统计</div>
                      <div style={styles.detailStats}>
                        <div style={styles.detailStatCard}>
                          <div style={styles.detailStatValue}>{selectedPlugin.downloads}</div>
                          <div style={styles.detailStatLabel}>总下载量</div>
                        </div>
                        <div style={styles.detailStatCard}>
                          <div style={styles.detailStatValue}>{selectedPlugin.monthlyDownloads}</div>
                          <div style={styles.detailStatLabel}>月下载量</div>
                        </div>
                        <div style={styles.detailStatCard}>
                          <div style={styles.detailStatValue}>{selectedPlugin.stars}</div>
                          <div style={styles.detailStatLabel}>收藏数</div>
                        </div>
                        <div style={styles.detailStatCard}>
                          <div style={styles.detailStatValue}>{selectedPlugin.rating}</div>
                          <div style={styles.detailStatLabel}>评分</div>
                        </div>
                      </div>
                    </div>

                    {/* 标签 */}
                    <div style={styles.detailSection}>
                      <div style={styles.detailSectionTitle}>标签</div>
                      <div style={styles.detailTags}>
                        {selectedPlugin.tags.map(tag => (
                          <span key={tag} style={styles.detailTag}>#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 底部操作 */}
                  <div style={styles.detailFooter}>
                    {selectedPluginHasUpdate ? (
                      <button
                        style={styles.detailBtnUpdate}
                        onClick={() => handleUpdate(selectedPlugin.id)}
                        disabled={updatingPlugin === selectedPlugin.id}
                      >
                        {updatingPlugin === selectedPlugin.id ? (
                          <>
                            <Loader2 size={16} className="spin" />
                            更新中...
                          </>
                        ) : (
                          <>
                            <ArrowUpCircle size={16} />
                            更新到 v{selectedPlugin.latestVersion}
                          </>
                        )}
                      </button>
                    ) : installedPlugins.has(selectedPlugin.id) ? (
                      <>
                        <button style={styles.detailBtnSecondary} disabled>
                          <Check size={16} />
                          已安装
                        </button>
                        <button
                          style={styles.detailBtnDanger}
                          onClick={() => toggleInstall(selectedPlugin.id)}
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <button
                        style={styles.detailBtnPrimary}
                        onClick={() => toggleInstall(selectedPlugin.id)}
                      >
                        <Download size={16} />
                        安装插件
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : activePage === 'home' ? (
          <div style={styles.pageContainer}>
            <header style={styles.header}>
              <div style={styles.headerLeft}>
                <div>
                  <h1 style={styles.headerTitle}>首页</h1>
                  <p style={styles.headerSubtitle}>欢迎使用 DSH Marketplace</p>
                </div>
              </div>
            </header>
            <div style={styles.pageContent}>
              <div style={styles.comingSoon}>
                <Home size={48} style={styles.emptyIcon} />
                <span style={styles.emptyText}>首页功能开发中</span>
                <span style={styles.emptySubtext}>即将推出更多功能</span>
              </div>
            </div>
          </div>
        ) : activePage === 'chat' ? (
          <div style={styles.pageContainer}>
            <header style={styles.header}>
              <div style={styles.headerLeft}>
                <div>
                  <h1 style={styles.headerTitle}>对话</h1>
                  <p style={styles.headerSubtitle}>与 AI 助手交流</p>
                </div>
              </div>
            </header>
            <div style={styles.pageContent}>
              <div style={styles.comingSoon}>
                <MessageCircle size={48} style={styles.emptyIcon} />
                <span style={styles.emptyText}>对话功能开发中</span>
                <span style={styles.emptySubtext}>即将推出更多功能</span>
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.pageContainer}>
            <header style={styles.header}>
              <div style={styles.headerLeft}>
                <div>
                  <h1 style={styles.headerTitle}>设置</h1>
                  <p style={styles.headerSubtitle}>配置 Marketplace 选项</p>
                </div>
              </div>
            </header>
            <div style={styles.pageContent}>
              <div style={styles.comingSoon}>
                <Settings size={48} style={styles.emptyIcon} />
                <span style={styles.emptyText}>设置功能开发中</span>
                <span style={styles.emptySubtext}>即将推出更多功能</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
