/**
 * dsh-marketplace — browser half.
 *
 * Registers a sidebar entry "Marketplace" that opens a panel with the
 * plugin browser UI. Uses the official DSH slots system.
 */
import type { Context } from "@deepseek-ai/cordis";

/** Dictionary namespace owned by this plugin. */
export const NS: "marketplace";

/** Required services (cordis fiber inject). */
export const inject: readonly ["slots", "locale", "connection"];

/**
 * Mount the marketplace sidebar entry and panel.
 * @param ctx - the browser plugin context.
 */
export function apply(ctx: Context): void;
