import type { ClientConfig, PlatformSpec } from "./types";

// Tenant + platform config loading. Configs are JSON validated with zod at load
// time (see docs/reference/tech-decisions.md). Implementation lands later.

/** Load a tenant config bundle from clients/<id>/*.json. */
export async function loadClientConfig(_clientId: string): Promise<ClientConfig> {
  throw new Error("loadClientConfig: not implemented yet");
}

/** Load the universal platform spec from platform/<name>.json. */
export async function loadPlatformSpec(_name = "meta"): Promise<PlatformSpec> {
  throw new Error("loadPlatformSpec: not implemented yet");
}
