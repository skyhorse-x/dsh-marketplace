import React from 'react'

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* 侧边栏 */}
      <Sidebar />
      {/* 主内容区 */}
      <MainContent />
    </div>
  )
}

// 侧边栏组件
const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState<string>('home')

  const menuItems = [
    { id: 'home', label: '首页', icon: '🏠' },
    { id: 'chat', label: '对话', icon: '💬' },
    { id: 'plugins', label: '插件市场', icon: '🧩' },
    { id: 'settings', label: '设置', icon: '⚙️' },
  ]

  return (
    <div style={{
      width: '56px',
      backgroundColor: '#1a1a2e',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '12px',
      gap: '4px',
      borderRight: '1px solid #2a2a3e'
    }}>
      {/* Logo */}
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
        fontSize: '18px'
      }}>
        D
      </div>

      {/* 菜单项 */}
      {menuItems.map(item => (
        <button
          key={item.id}
          onClick={() => setActiveItem(item.id)}
          title={item.label}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: activeItem === item.id ? '#2a2a4e' : 'transparent',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            transition: 'all 0.2s'
          }}
        >
          {item.icon}
        </button>
      ))}
    </div>
  )
}

// 主内容区组件
const MainContent: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>('featured')

  return (
    <div style={{
      flex: 1,
      backgroundColor: '#0f0f1a',
      color: '#e0e0e0',
      overflow: 'hidden',
      display: 'flex'
    }}>
      {/* 左侧面板 - 插件列表 */}
      <div style={{
        width: '320px',
        borderRight: '1px solid #2a2a3e',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* 头部 */}
        <div style={{ padding: '16px', borderBottom: '1px solid #2a2a3e' }}>
          <h2 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#fff' }}>🧩 DSH Market</h2>
          
          {/* 搜索框 */}
          <input
            type="text"
            placeholder="搜索插件..."
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #2a2a3e',
              backgroundColor: '#1a1a2e',
              color: '#e0e0e0',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        {/* 标签页 */}
        <div style={{ display: 'flex', gap: '4px', padding: '8px 16px', borderBottom: '1px solid #2a2a3e' }}>
          {[
            { id: 'featured', label: '推荐' },
            { id: 'installed', label: '已安装' },
            { id: 'updates', label: '更新' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: activeTab === tab.id ? '#667eea' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#888',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 插件列表 */}
        <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>
          {plugins.map(plugin => (
            <PluginCard key={plugin.id} plugin={plugin} />
          ))}
        </div>
      </div>

      {/* 右侧面板 - 插件详情 */}
      <div style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
        <PluginDetail />
      </div>
    </div>
  )
}

// 插件卡片组件
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
}

const plugins: Plugin[] = [
  { id: '1', name: '代码助手', description: '智能代码补全和生成，支持多种编程语言', author: 'DSH Team', version: '1.2.0', downloads: '12.5k', icon: '💻', installed: true, rating: 4.8 },
  { id: '2', name: '知识库管理', description: '管理和搜索您的知识库文档', author: 'Community', version: '2.0.1', downloads: '8.3k', icon: '📚', installed: false, rating: 4.5 },
  { id: '3', name: '数据分析', description: '强大的数据可视化与分析工具', author: 'DataTeam', version: '1.0.5', downloads: '15.2k', icon: '📊', installed: false, rating: 4.7 },
  { id: '4', name: 'API 测试', description: '便捷的API调试和测试工具', author: 'DevTools', version: '1.1.0', downloads: '6.7k', icon: '🔧', installed: true, rating: 4.3 },
  { id: '5', name: '文档生成', description: '自动生成项目文档和注释', author: 'DocGen', version: '1.0.0', downloads: '4.1k', icon: '📝', installed: false, rating: 4.2 },
]

const PluginCard: React.FC<{ plugin: Plugin }> = ({ plugin }) => {
  const [selected, setSelected] = React.useState(false)

  return (
    <div
      onClick={() => setSelected(!selected)}
      style={{
        padding: '12px',
        borderRadius: '8px',
        backgroundColor: selected ? '#2a2a4e' : '#1a1a2e',
        border: selected ? '1px solid #667eea' : '1px solid transparent',
        marginBottom: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          backgroundColor: '#2a2a3e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px'
        }}>
          {plugin.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: '14px', color: '#fff', marginBottom: '2px' }}>
            {plugin.name}
            {plugin.installed && <span style={{ fontSize: '11px', color: '#4caf50', marginLeft: '6px' }}>已安装</span>}
          </div>
          <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.4 }}>
            {plugin.description}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: '#666' }}>
        <span>⭐ {plugin.rating}</span>
        <span>⬇️ {plugin.downloads}</span>
        <span>v{plugin.version}</span>
      </div>
    </div>
  )
}

// 插件详情组件
const PluginDetail: React.FC = () => {
  return (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '36px'
        }}>
          💻
        </div>
        <div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', color: '#fff' }}>代码助手</h1>
          <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>由 DSH Team 开发</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button style={{
          padding: '10px 24px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: '#667eea',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 600
        }}>
          安装插件
        </button>
        <button style={{
          padding: '10px 24px',
          borderRadius: '6px',
          border: '1px solid #2a2a3e',
          backgroundColor: 'transparent',
          color: '#e0e0e0',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          查看源代码
        </button>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#fff' }}>功能介绍</h3>
        <p style={{ margin: 0, color: '#aaa', lineHeight: 1.8, fontSize: '14px' }}>
          代码助手是一个强大的开发工具，提供智能代码补全、代码生成、错误检测等功能。
          支持多种编程语言包括 TypeScript、Python、Go、Rust 等。
          通过深度学习模型，能够理解代码上下文，提供准确的建议。
        </p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#fff' }}>版本信息</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <InfoItem label="当前版本" value="1.2.0" />
          <InfoItem label="更新时间" value="2025-01-15" />
          <InfoItem label="下载次数" value="12,543" />
          <InfoItem label="评分" value="4.8 / 5.0" />
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#fff' }}>用户评价</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <ReviewItem user="张三" comment="非常好用的插件，大大提高了我的开发效率！" rating={5} />
          <ReviewItem user="李四" comment="功能很全面，但有时候会有点慢。" rating={4} />
        </div>
      </div>
    </div>
  )
}

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ padding: '12px', backgroundColor: '#1a1a2e', borderRadius: '6px' }}>
    <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{label}</div>
    <div style={{ fontSize: '14px', color: '#fff', fontWeight: 600 }}>{value}</div>
  </div>
)

const ReviewItem: React.FC<{ user: string; comment: string; rating: number }> = ({ user, comment, rating }) => (
  <div style={{ padding: '12px', backgroundColor: '#1a1a2e', borderRadius: '6px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
      <span style={{ fontWeight: 600, fontSize: '13px', color: '#fff' }}>{user}</span>
      <span style={{ fontSize: '12px', color: '#ffa726' }}>{"⭐".repeat(rating)}</span>
    </div>
    <p style={{ margin: 0, fontSize: '13px', color: '#aaa', lineHeight: 1.5 }}>{comment}</p>
  </div>
)

export default App
