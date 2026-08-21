# DSH Marketplace 插件说明

## 本项目是一个正式的 DSH 插件

本项目是一个 **DSH 插件**，使用 `dsh.bundle` 机制注册，通过 Cordis 插件系统加载。

## 安装说明

```bash
dsh plugin --profile web add github:skyhorse-x/dsh-marketplace
```

安装后重启 DSH 即可使用。

## 故障排除

### 如果安装后 DSH 无法启动

1. 完全退出 DeepSeek-Harness
2. 删除 `C:\Users\<用户名>\.dsh\profiles\web\` 文件夹
3. 重新启动 DSH
4. 重新安装插件：`dsh plugin --profile web add github:skyhorse-x/dsh-marketplace`

### 如果看到 "duplicate loader entry id" 错误

这通常是因为重复安装导致的配置冲突。按照上述步骤清理后重新安装即可。

## 技术架构

- 使用 `dsh.bundle` + `cordis.patch.yml` 注册服务端插件
- 使用 `dsh.client` + ModuleLoader 注册浏览器端 UI
- 遵循 DSH 官方插件规范
