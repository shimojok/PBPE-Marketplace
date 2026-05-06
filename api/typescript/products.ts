export interface Product {
  id: string;
  type: "BOND" | "CREDIT" | "INSURANCE" | "PROTECTION";
  name: string;
  description?: string;
  currency: string;
}

export class ProductsClient {
  constructor(private baseUrl: string) {}

  async listProducts(): Promise<Product[]> {
    const res = await fetch(`${this.baseUrl}/products`);
    if (!res.ok) throw new Error(`Failed to list products: ${res.status}`);
    return res.json();
  }
}
