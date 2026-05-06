export interface PBPEValue {
  id: string;
  intentId: string;
  amount: number;
  unit: string; // e.g. "PBPE"
}

export interface PBPERegistryEntry extends PBPEValue {
  source: "AGRIX" | "HealthBook" | "MBT55" | "Other";
  createdAt: string;
}

export interface PBPEClientConfig {
  baseUrl: string;
  apiKey?: string;
}

export class PBPEClient {
  constructor(private config: PBPEClientConfig) {}

  async getRegistryEntry(pbpeId: string): Promise<PBPERegistryEntry> {
    const res = await fetch(`${this.config.baseUrl}/registry/${pbpeId}`, {
      headers: this.config.apiKey
        ? { Authorization: `Bearer ${this.config.apiKey}` }
        : {},
    });
    if (!res.ok) throw new Error(`Failed to fetch PBPE registry: ${res.status}`);
    return res.json();
  }
}
