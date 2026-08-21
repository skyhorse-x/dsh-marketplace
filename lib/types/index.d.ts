/**
 * dsh-marketplace — DSH 插件市场
 *
 * 服务端：通过 webserver fallback 提供构建好的 marketplace 前端静态资源
 * 浏览器端：通过 lib/client.js 注册侧边栏入口和面板
 *
 * @module dsh-marketplace
 */
import type { Context } from "@deepseek-ai/cordis";
import type { z } from "@deepseek-ai/schemastery";

/** Plugin configuration schema */
export const Config: z.ZodObject<{
	distIndex: z.ZodString;
}>;

/** Required services */
export const inject: readonly ["webServer"];

/** Plugin name */
export const name: "marketplace";

/**
 * Claim the webserver fallback seat and serve the marketplace dist.
 * @param ctx - plugin context carrying the webServer service.
 * @param config - validated configuration.
 */
export function apply(ctx: Context, config: z.infer<typeof Config>): void;
