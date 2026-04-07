import { ApiService } from './api-service';

export interface ProductPayload {
  name: string;
  sku: string;
  category: string;
  price: number;
  stock_quantity: number;
  status: string;
  shop_id?: string;
}

export class ProductsService extends ApiService {
  /**
   * Fetch all products from the backend. 
   * If a shopId is provided, you can filter them (assuming backend supports ?shop_id= queries)
   */
  public static async getProducts(shopId?: string): Promise<unknown> {
    const query = shopId ? `?shop_id=${shopId}` : '';
    return ApiService.get(`/products${query}`);
  }

  /**
   * Create a new product.
   */
  public static async createProduct(payload: ProductPayload): Promise<unknown> {
    return ApiService.post('/products', payload);
  }

  /**
   * Update an existing product.
   */
  public static async updateProduct(id: string, payload: ProductPayload): Promise<unknown> {
    return ApiService.put(`/products/${id}`, payload);
  }
}
