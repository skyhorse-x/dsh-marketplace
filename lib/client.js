window.__ModuleLoader__.load({
	id: "dsh-marketplace",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let _deepseek_ai_dsh_client_ui_slots = require("@deepseek-ai/dsh-client-ui-slots");

		//#region lib/types/client/MarketplacePanel.js
		/**
		 * Marketplace panel content — the main UI shown when the sidebar entry is clicked.
		 * Renders a plugin browser with search, categories, and detail view.
		 */
		/** Plugin data */
		const PLUGINS = [
			{ id: '1', name: 'dsh-vision-router', description: 'Eyes for text-only DeepSeek Harness agents: built-in free vision chain + pixel-level vision tools (Q&A, grounding, crop, OCR, SVG trace, screenshots).', author: 'Community', version: '1.7.3', latestVersion: '1.8.0', downloads: '26.4k', monthlyDownloads: '914', stars: '26.4k', installed: false, rating: 4.9, category: 'ai', tags: ['vision', 'ocr', 'image'], icon: '👁️' },
			{ id: '2', name: 'dsh-context', description: 'Context insight and management plugin with context dashboard and context command.', author: 'Community', version: '0.19.2', latestVersion: '0.20.0', downloads: '9.9k', monthlyDownloads: '626', stars: '9.9k', installed: false, rating: 4.7, category: 'productivity', tags: ['context', 'dashboard'], icon: '🧠' },
			{ id: '3', name: '@zseven-w/dsh-openpencil', description: 'OpenPencil plugin with multi-frame previews, interactive canvas, and editor workbenches.', author: 'zseven-w', version: '0.1.0-rc.1', latestVersion: '0.1.0-rc.1', downloads: '132', monthlyDownloads: '132', stars: '132', installed: false, rating: 4.5, category: 'creative', tags: ['canvas', 'editor'], icon: '✏️' },
			{ id: '4', name: '@sanqi-normal/dsh-webui-market-plugin', description: 'In-harness community plugin market for the dsh web GUI.', author: 'sanqi-normal', version: '0.5.5', latestVersion: '0.6.0', downloads: '96', monthlyDownloads: '96', stars: '96', installed: false, rating: 4.3, category: 'utility', tags: ['market', 'browser'], icon: '🏪' },
			{ id: '5', name: '@mars-sea/dsh-commandcode-provider', description: 'Unofficial LLM provider plugin for Command Code.', author: 'mars-sea', version: '0.6.0', latestVersion: '0.6.0', downloads: '77', monthlyDownloads: '77', stars: '77', installed: false, rating: 4.4, category: 'ai', tags: ['llm', 'provider'], icon: '🤖' },
			{ id: '6', name: 'dsh-dream-skin', description: '8 套 iOS / Linear 式清冷色调高质感主题 + 流光光效 + 智能背景 + 强调色 + 主题包分享', author: 'Community', version: '0.4.1', latestVersion: '0.5.0', downloads: '5.5k', monthlyDownloads: '70', stars: '5.5k', installed: false, rating: 4.8, category: 'theme', tags: ['skin', 'theme', 'ui'], icon: '🎨' },
			{ id: '7', name: 'dsh-mobile', description: '移动端适配与安全域网访问插件，支持 Android App 和手机浏览器。', author: 'Community', version: '0.1.0-alpha.24', latestVersion: '0.1.0-alpha.25', downloads: '5.7k', monthlyDownloads: '67', stars: '5.7k', installed: false, rating: 4.6, category: 'utility', tags: ['mobile', 'android'], icon: '📱' },
			{ id: '8', name: 'dsh-web-plugin-manager', description: 'Manage DSH plugins from the Web UI: list, enable/disable, install/remove.', author: 'Community', version: '0.4.6', latestVersion: '0.4.6', downloads: '62', monthlyDownloads: '62', stars: '62', installed: false, rating: 4.2, category: 'utility', tags: ['manager', 'plugins'], icon: '🔧' },
			{ id: '9', name: 'dsh-client-auto-continue', description: 'Automatically sends continue when a request is interrupted by network errors.', author: 'Community', version: '0.7.5', latestVersion: '0.8.0', downloads: '4.7k', monthlyDownloads: '34', stars: '4.7k', installed: true, rating: 4.5, category: 'productivity', tags: ['auto', 'continue'], icon: '🔄' },
			{ id: '10', name: 'dsh-remote', description: 'Remote-work assistant: connect SSH, pick a remote workspace, 21 rw_* tools.', author: 'Community', version: '0.8.6', latestVersion: '0.9.0', downloads: '30', monthlyDownloads: '30', stars: '30', installed: false, rating: 4.7, category: 'development', tags: ['ssh', 'remote'], icon: '🌐' },
			{ id: '11', name: 'dsh-passwords', description: 'Server-grade gateway: multi-tenant platform with HTTPS, permissions & quotas.', author: 'Community', version: '2.5.4', latestVersion: '2.6.0', downloads: '15', monthlyDownloads: '15', stars: '15', installed: false, rating: 4.4, category: 'security', tags: ['auth', 'multi-tenant'], icon: '🔒' },
			{ id: '12', name: 'dsh-any-background', description: 'Custom theme color, background wallpaper with opacity/blur controls.', author: 'Community', version: '0.1.9', latestVersion: '0.2.0', downloads: '15', monthlyDownloads: '15', stars: '15', installed: false, rating: 4.3, category: 'theme', tags: ['background', 'wallpaper'], icon: '🖼️' },
			{ id: '13', name: 'dsh-config-manager', description: 'Backup / export / import / migrate DSH configuration.', author: 'Community', version: '0.1.40', latestVersion: '0.1.41', downloads: '5.2k', monthlyDownloads: '7', stars: '5.2k', installed: false, rating: 4.6, category: 'utility', tags: ['config', 'backup'], icon: '⚙️' },
			{ id: '14', name: 'upstream-radar', description: 'Dependency security monitoring: find vulnerable paths, breaking updates.', author: 'Community', version: '0.38.0', latestVersion: '0.39.0', downloads: '10.3k', monthlyDownloads: '6', stars: '10.3k', installed: false, rating: 4.8, category: 'security', tags: ['security', 'monitor'], icon: '📡' },
			{ id: '15', name: 'dsh-free-vision', description: 'Free vision plugin: image understanding for text-only models with free-tier providers.', author: 'Community', version: '1.0.8', latestVersion: '1.1.0', downloads: '5.3k', monthlyDownloads: '6', stars: '5.3k', installed: false, rating: 4.7, category: 'ai', tags: ['vision', 'free'], icon: '👓' }
		];

		const CATEGORIES = [
			{ id: 'all', label: 'All' },
			{ id: 'ai', label: 'AI & Vision' },
			{ id: 'development', label: 'Development' },
			{ id: 'productivity', label: 'Productivity' },
			{ id: 'theme', label: 'Themes' },
			{ id: 'security', label: 'Security' },
			{ id: 'utility', label: 'Utility' },
			{ id: 'creative', label: 'Creative' }
		];

		function compareVersions(v1, v2) {
			const p1 = v1.replace(/[^0-9.]/g, '').split('.').map(Number);
			const p2 = v2.replace(/[^0-9.]/g, '').split('.').map(Number);
			for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
				const a = p1[i] || 0, b = p2[i] || 0;
				if (a > b) return 1;
				if (a < b) return -1;
			}
			return 0;
		}

		function hasUpdate(current, latest) {
			return compareVersions(latest, current) > 0;
		}

		/** Marketplace panel component */
		function MarketplacePanel({ t }) {
			const [selectedPlugin, setSelectedPlugin] = react.useState(PLUGINS[0]);
			const [searchQuery, setSearchQuery] = react.useState("");
			const [activeTab, setActiveTab] = react.useState("featured");
			const [activeCategory, setActiveCategory] = react.useState("all");
			const [installingId, setInstallingId] = react.useState(null);
			const [updatingId, setUpdatingId] = react.useState(null);
			const [installProgress, setInstallProgress] = react.useState(0);
			const [installedIds, setInstalledIds] = react.useState(new Set(["9"]));
			const [pluginVersions, setPluginVersions] = react.useState({ "9": "0.7.5" });

			const getPluginCurrentVersion = (plugin) => {
				if (installedIds.has(plugin.id) && pluginVersions[plugin.id]) return pluginVersions[plugin.id];
				return plugin.version;
			};

			const getPluginUpdateAvailable = (plugin) => {
				if (!installedIds.has(plugin.id)) return false;
				return hasUpdate(getPluginCurrentVersion(plugin), plugin.latestVersion);
			};

			const updateCount = PLUGINS.filter(p => getPluginUpdateAvailable(p)).length;

			const filteredPlugins = PLUGINS.filter(p => {
				const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
					p.author.toLowerCase().includes(searchQuery.toLowerCase());
				const matchesCategory = activeCategory === "all" || p.category === activeCategory;
				const matchesTab = activeTab === "featured" ||
					(activeTab === "installed" && installedIds.has(p.id)) ||
					(activeTab === "updates" && getPluginUpdateAvailable(p));
				return matchesSearch && matchesCategory && matchesTab;
			});

			const handleInstall = (plugin) => {
				if (installingId || updatingId) return;
				setInstallingId(plugin.id);
				setInstallProgress(0);
			};

			const handleUpdate = (plugin) => {
				if (installingId || updatingId) return;
				setUpdatingId(plugin.id);
				setInstallProgress(0);
			};

			react.useEffect(() => {
				const activeId = installingId || updatingId;
				if (!activeId) return;
				const isUpdate = !!updatingId;
				const interval = setInterval(() => {
					setInstallProgress(prev => {
						if (prev >= 100) {
							clearInterval(interval);
							if (isUpdate) {
								setPluginVersions(v => ({ ...v, [activeId]: PLUGINS.find(p => p.id === activeId).latestVersion }));
								setUpdatingId(null);
							} else {
								setInstalledIds(prev => new Set([...prev, activeId]));
								setPluginVersions(v => ({ ...v, [activeId]: PLUGINS.find(p => p.id === activeId).version }));
								setInstallingId(null);
							}
							return 0;
						}
						return prev + Math.random() * 15 + 5;
					});
				}, 200);
				return () => clearInterval(interval);
			}, [installingId, updatingId]);

			return (0, react_jsx_runtime.jsxs)("div", {
				style: { display: "flex", height: "100%", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif", background: "#0a0a14", color: "#e8e8f0", overflow: "hidden" },
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						width: "380px", borderRight: "1px solid #1e1e35", display: "flex", flexDirection: "column", background: "#0d0d1a", flexShrink: 0,
						children: [
							(0, react_jsx_runtime.jsxs)("div", { style: { padding: "20px 20px 16px", borderBottom: "1px solid #1e1e35" }, children: [
								(0, react_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }, children: [
									(0, react_jsx_runtime.jsx)("h2", { style: { margin: 0, fontSize: 20, color: "#fff", fontWeight: 700 }, children: "Marketplace" }),
									(0, react_jsx_runtime.jsxs)("span", { style: { fontSize: 12, color: "#7878a0", background: "#1a1a2e", padding: "5px 10px", borderRadius: 20, fontWeight: 500 }, children: [filteredPlugins.length, " plugins"] })
								]}),
								(0, react_jsx_runtime.jsxs)("div", { style: { position: "relative" }, children: [
									(0, react_jsx_runtime.jsx)("input", {
										type: "text", placeholder: "Search plugins...", value: searchQuery,
										onChange: (e) => setSearchQuery(e.target.value),
										style: { width: "100%", padding: "10px 14px 10px 38px", borderRadius: 10, border: "1px solid #2a2a45", background: "#14142a", color: "#e8e8f0", fontSize: 14, outline: "none", boxSizing: "border-box" }
									}),
									(0, react_jsx_runtime.jsx)("span", { style: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.5, color: "#7878a0" }, children: "🔍" })
								]})
							]}),
							(0, react_jsx_runtime.jsx)("div", { style: { display: "flex", gap: 6, padding: "12px 20px", borderBottom: "1px solid #1e1e35" }, children: [
								{ id: "featured", label: "Featured", badge: 0 },
								{ id: "installed", label: "Installed", badge: 0 },
								{ id: "updates", label: "Updates", badge: updateCount }
							].map(tab => (0, react_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveTab(tab.id),
								style: { padding: "7px 16px", borderRadius: 8, border: "none", display: "flex", alignItems: "center", gap: 6, background: activeTab === tab.id ? "linear-gradient(135deg, #667eea, #764ba2)" : "transparent", color: activeTab === tab.id ? "#fff" : "#7878a0", cursor: "pointer", fontSize: 13, fontWeight: 600 },
								children: [tab.label, tab.badge > 0 && (0, react_jsx_runtime.jsx)("span", { style: { marginLeft: 4, background: activeTab === tab.id ? "rgba(255,255,255,0.25)" : "#43e97b", color: activeTab === tab.id ? "#fff" : "#0a0a14", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 10 }, children: tab.badge })]
							}, tab.id))}),
							(0, react_jsx_runtime.jsx)("div", { style: { display: "flex", gap: 6, padding: "10px 20px", borderBottom: "1px solid #1e1e35", flexWrap: "wrap" }, children: CATEGORIES.map(cat => (0, react_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveCategory(cat.id),
								style: { padding: "5px 12px", borderRadius: 20, border: "none", display: "flex", alignItems: "center", gap: 5, background: activeCategory === cat.id ? "rgba(102, 126, 234, 0.2)" : "#1a1a2e", color: activeCategory === cat.id ? "#a5b4fc" : "#7878a0", cursor: "pointer", fontSize: 12, fontWeight: 500 },
								children: cat.label
							}, cat.id))}),
							(0, react_jsx_runtime.jsx)("div", { style: { flex: 1, overflow: "auto", padding: "14px 16px" }, children: filteredPlugins.length === 0 ? (0, react_jsx_runtime.jsxs)("div", { style: { textAlign: "center", color: "#555570", padding: 60 }, children: [
								(0, react_jsx_runtime.jsx)("div", { style: { fontSize: 32, marginBottom: 12, opacity: 0.5 }, children: "🔍" }),
								(0, react_jsx_runtime.jsx)("div", { style: { fontSize: 15 }, children: "No plugins found" })
							]}) : filteredPlugins.map((plugin, idx) => {
								const isInstalled = installedIds.has(plugin.id);
								const updateAvailable = getPluginUpdateAvailable(plugin);
								const currentVersion = getPluginCurrentVersion(plugin);
								const isProcessing = (installingId === plugin.id || updatingId === plugin.id);
								return (0, react_jsx_runtime.jsxs)("div", {
									onClick: () => setSelectedPlugin(plugin),
									style: { padding: 16, borderRadius: 14, background: selectedPlugin?.id === plugin.id ? "#16162d" : "#111122", border: selectedPlugin?.id === plugin.id ? "1px solid #667eea" : "1px solid #1e1e35", marginBottom: 10, cursor: "pointer", transition: "all 0.2s" },
									children: [
										(0, react_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "flex-start", gap: 14 }, children: [
											(0, react_jsx_runtime.jsx)("div", { style: { width: 48, height: 48, borderRadius: 12, flexShrink: 0, background: "#667eea18", border: "1px solid #667eea30", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }, children: plugin.icon }),
											(0, react_jsx_runtime.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
												(0, react_jsx_runtime.jsxs)("div", { style: { fontWeight: 600, fontSize: 14, color: "#fff", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }, children: [
													(0, react_jsx_runtime.jsx)("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: plugin.name }),
													isInstalled && !updateAvailable && (0, react_jsx_runtime.jsx)("span", { style: { fontSize: 10, color: "#43e97b", background: "rgba(67, 233, 123, 0.12)", padding: "2px 8px", borderRadius: 10, flexShrink: 0, fontWeight: 600 }, children: "✓ Installed" }),
													updateAvailable && (0, react_jsx_runtime.jsx)("span", { style: { fontSize: 10, color: "#0a0a14", background: "#43e97b", padding: "2px 8px", borderRadius: 10, flexShrink: 0, fontWeight: 700 }, children: "↑ New" })
												]}),
												(0, react_jsx_runtime.jsx)("div", { style: { fontSize: 12, color: "#7878a0", lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", marginBottom: 8 }, children: plugin.description }),
												(0, react_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 12, fontSize: 11, color: "#555570" }, children: [
													(0, react_jsx_runtime.jsxs)("span", { children: ["⭐ ", plugin.stars] }),
													(0, react_jsx_runtime.jsxs)("span", { children: ["⬇️ ", plugin.downloads] }),
													(0, react_jsx_runtime.jsx)("span", { style: { marginLeft: "auto", color: updateAvailable ? "#43e97b" : "#667eea", fontWeight: 500 }, children: updateAvailable ? `v${currentVersion} → v${plugin.latestVersion}` : `v${currentVersion}` })
												]})
											]})
										]}),
										isProcessing && (0, react_jsx_runtime.jsxs)("div", { style: { marginTop: 12 }, children: [
											(0, react_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 11, color: "#a5b4fc" }, children: [
												(0, react_jsx_runtime.jsxs)("span", { children: [updatingId ? "Updating..." : "Installing..."] }),
												(0, react_jsx_runtime.jsx)("span", { children: `${Math.min(Math.round(installProgress), 100)}%` })
											]}),
											(0, react_jsx_runtime.jsx)("div", { style: { height: 4, background: "#1e1e35", borderRadius: 2, overflow: "hidden" }, children: (0, react_jsx_runtime.jsx)("div", { style: { height: "100%", width: `${Math.min(installProgress, 100)}%`, background: updatingId ? "linear-gradient(90deg, #43e97b, #26c6da)" : "linear-gradient(90deg, #667eea, #764ba2)", borderRadius: 2 } }) })
										]})
									]
								}, plugin.id);
							})})
						]
					}),
					(0, react_jsx_runtime.jsx)("div", { style: { flex: 1, overflow: "auto", background: "#0a0a14" }, children: selectedPlugin ? (0, react_jsx_runtime.jsxs)("div", { style: { maxWidth: 680, margin: "0 auto", padding: "36px 40px" }, children: [
						(0, react_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "flex-start", gap: 24, marginBottom: 32 }, children: [
							(0, react_jsx_runtime.jsx)("div", { style: { width: 88, height: 88, borderRadius: 20, color: "#fff", background: "linear-gradient(135deg, #667eea, #764ba2cc)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, boxShadow: "0 8px 30px #667eea40" }, children: selectedPlugin.icon }),
							(0, react_jsx_runtime.jsxs)("div", { style: { flex: 1 }, children: [
								(0, react_jsx_runtime.jsx)("h1", { style: { margin: "0 0 8px", fontSize: 28, color: "#fff", fontWeight: 700 }, children: selectedPlugin.name }),
								(0, react_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 16, fontSize: 13, color: "#7878a0", flexWrap: "wrap", alignItems: "center" }, children: [
									(0, react_jsx_runtime.jsxs)("span", { children: ["By ", (0, react_jsx_runtime.jsx)("strong", { style: { color: "#a5b4fc" }, children: selectedPlugin.author })] }),
									(0, react_jsx_runtime.jsxs)("span", { children: ["v", getPluginCurrentVersion(selectedPlugin)] }),
									(0, react_jsx_runtime.jsxs)("span", { children: ["⬇️ ", selectedPlugin.downloads] }),
									(0, react_jsx_runtime.jsxs)("span", { children: ["⭐ ", selectedPlugin.stars] })
								]})
							]})
						]}),
						(0, react_jsx_runtime.jsxs)("div", { style: { background: "#111122", borderRadius: 16, padding: 24, marginBottom: 20, border: "1px solid #1e1e35" }, children: [
							(0, react_jsx_runtime.jsx)("h3", { style: { margin: "0 0 14px", fontSize: 16, color: "#fff", fontWeight: 600 }, children: "About" }),
							(0, react_jsx_runtime.jsx)("p", { style: { margin: 0, fontSize: 14, color: "#a0a0c0", lineHeight: 1.7 }, children: selectedPlugin.description })
						]}),
						(0, react_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 12, marginBottom: 20 }, children: [
							(() => {
								const isInstalled = installedIds.has(selectedPlugin.id);
								const updateAvailable = getPluginUpdateAvailable(selectedPlugin);
								const isProcessing = (installingId === selectedPlugin.id || updatingId === selectedPlugin.id);
								if (isInstalled && !updateAvailable) return (0, react_jsx_runtime.jsx)("button", { disabled: true, style: { padding: "12px 28px", borderRadius: 12, border: "none", background: "#1a2a1e", color: "#43e97b", fontSize: 14, fontWeight: 600, cursor: "default" }, children: "✓ Installed" });
								if (updateAvailable) return (0, react_jsx_runtime.jsxs)("button", { onClick: () => handleUpdate(selectedPlugin), disabled: isProcessing, style: { padding: "12px 28px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #43e97b, #26c6da)", color: "#0a0a14", fontSize: 14, fontWeight: 600, cursor: isProcessing ? "default" : "pointer" }, children: [isProcessing ? "Updating..." : `Update to v${selectedPlugin.latestVersion}`] });
								return (0, react_jsx_runtime.jsxs)("button", { onClick: () => handleInstall(selectedPlugin), disabled: isProcessing, style: { padding: "12px 28px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #667eea, #764ba2)", color: "#fff", fontSize: 14, fontWeight: 600, cursor: isProcessing ? "default" : "pointer" }, children: [isProcessing ? "Installing..." : "Install"] });
							})()
						]})
					]}) : (0, react_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#555570", flexDirection: "column", gap: 12 }, children: [
						(0, react_jsx_runtime.jsx)("div", { style: { fontSize: 48, opacity: 0.5 }, children: "🧩" }),
						(0, react_jsx_runtime.jsx)("div", { style: { fontSize: 16 }, children: "Select a plugin to view details" })
					]})})
				]
			});
		}
		//#endregion

		//#region lib/types/client/index.js
		/**
		 * dsh-marketplace — browser half.
		 *
		 * Registers a sidebar entry "Marketplace" that opens a panel with the
		 * plugin browser UI. Uses the official DSH slots system.
		 */
		/** Dictionary namespace owned by this plugin. */
		const NS = "marketplace";
		/** Required services (cordis fiber inject). */
		const inject = [
			"slots",
			"locale",
			"connection"
		];

		/** Locale bundles. */
		const en = {
			nav: "Marketplace",
			title: "Marketplace",
			intro: "Discover, install, and manage DSH plugins."
		};
		const zh = {
			nav: "插件市场",
			title: "插件市场",
			intro: "发现、安装和管理 DSH 插件。"
		};

		/**
		 * Mount the marketplace sidebar entry and panel.
		 * @param ctx - the browser plugin context.
		 */
		function apply(ctx) {
			const t = ctx.locale.bind(NS);
			ctx.effect(() => ctx.locale.register(NS, { zh, en }), "marketplace: section dictionaries");

			// Register a sidebar entry that opens the marketplace panel
			ctx.slots.inject("sidebar.entry", () => ctx.slots.register({
				name: "sidebar.entry",
				id: "marketplace",
				order: 20,
				label: () => t("nav"),
				locale: NS,
				icon: "🧩",
				inject: () => ({}),
				onClick: () => {
					// Open the marketplace panel
					const panel = ctx.slots.entries("settings.section").find(e => e.options.id === "marketplace");
					if (panel) {
						// Activate the marketplace panel
						ctx.slots.activate("settings.section", "marketplace");
					}
				}
			}, () => null));

			// Register a settings section for the marketplace panel
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "marketplace",
				order: 20,
				label: () => t("nav"),
				locale: NS,
				inject: () => ({}),
				children: { "marketplace.content": { kind: "single", scope: "root" } }
			}, MarketplacePanel));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
