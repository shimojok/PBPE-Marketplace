export interface Settlement {
  id: string;
  productId: string;
  pbpeId: string;
  amount: number;
  currency: string;
  settledAt: string;
}

export class SettlementsClient {
  constructor(private baseUrl: string) {}

  async listByProduct(productId: string): Promise<Settlement[]> {
    const res = await fetch(`${this.baseUrl}/settlements/${productId}`);
    if (!res.ok) throw new Error(`Failed to list settlements: ${res.status}`);
    return res.json();
  }
}
