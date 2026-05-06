export type PBPERating = "PBPE-A" | "PBPE-B" | "PBPE-C" | "PBPE-D";

export interface Rating {
  productId: string;
  rating: PBPERating;
  irs: number;
  dqs: number;
  rrs: number;
  pvi: number;
  pdp: number;
}

export class RatingClient {
  constructor(private baseUrl: string) {}

  async getRating(productId: string): Promise<Rating> {
    const res = await fetch(`${this.baseUrl}/products/${productId}/rating`);
    if (!res.ok) throw new Error(`Failed to fetch rating: ${res.status}`);
    return res.json();
  }
}
