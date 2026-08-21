 # 关于 `duplicate loader entry id: dsh-market` 的说明
 
 ## 本项目不是 DSH 插件
 
 本项目是一个 **React + TypeScript + Vite Web 前端应用**，用于展示 DSH 插件市场的界面原型。
 它**不包含** DeepSeek-Harness 的插件注册清单，也不会被 DSH 桌面端作为插件加载。
 
 ## 报错原因
 
 如果你在 DSH 桌面端看到 `duplicate loader entry id: dsh-market` 错误，原因是在**运行 DSH 客户端的机器上**：
 
 - `%LOCALAPPDATA%\DeepSeek Harness\plugins\` 目录下存在**同名文件夹重复**（如 `dsh-market` 和 `dsh-market-backup`）
 - 或 DSH 插件配置 JSON 中 `dsh-market` 被**注册了两次**
 
 ## 修复步骤（在运行 DSH 客户端的机器上执行）
 
 1. 关闭 DeepSeek-Harness 软件
 2. 打开 `%LOCALAPPDATA%\DeepSeek Harness\plugins\`
 3. 检查是否有两个名字相似的 market 插件文件夹（如 `dsh-market` 和 `dsh-market-backup`），删除多余的副本
 4. 如果文件夹只有一份，则是配置 JSON 重复：打开用户配置文件，搜索 `dsh-market`，删除重复条目
 5. 删除 `plugins-cache` 整个文件夹，重启软件
 
 ## 快速修复脚本（PowerShell，在 DSH 机器上以管理员运行）
 
 ```powershell
 # 关闭 DSH
 Get-Process | Where-Object { $_.ProcessName -like '*DeepSeek*' } | Stop-Process -Force
 
 # 清理缓存
 $cachePath = "$env:LOCALAPPDATA\DeepSeek Harness\plugins-cache"
 if (Test-Path $cachePath) { Remove-Item $cachePath -Recurse -Force }
 
 # 检查重复插件文件夹
 $pluginsPath = "$env:LOCALAPPDATA\DeepSeek Harness\plugins"
 Get-ChildItem $pluginsPath -Directory | Where-Object { $_.Name -like '*market*' } | Select-Object Name, FullName
 
 # 重启 DSH（请手动操作）
 Write-Host "请重新启动 DeepSeek-Harness"
 ```
