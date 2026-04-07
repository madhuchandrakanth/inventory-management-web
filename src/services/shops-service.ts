import { ApiService } from './api-service';

export interface ShopPayload {
  owner_id?: string;
  name: string;
  type: string;
  address: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
}

export class ShopsService extends ApiService {
  public static async getShops(userId: string): Promise<unknown> {
    return this.get(`/shops/${userId}`);
  }

  public static async createShop(shopData: ShopPayload): Promise<unknown> {
    return this.post('/shops', shopData);
  }

  public static async updateShop(shopId: string, shopData: ShopPayload): Promise<unknown> {
    return this.put(`/shops/${shopId}`, shopData);
  }
}
