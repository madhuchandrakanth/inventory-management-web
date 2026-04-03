import { ApiService } from './api-service';

export class AuthService extends ApiService {
  public static async login(credentials: Record<string, string>): Promise<unknown> {
    return this.post('/users/login', credentials);
  }

  public static async signup(userData: Record<string, string>): Promise<unknown> {
    return this.post('/users/signup', userData);
  }

  public static async forgotPassword(emailData: Record<string, string>): Promise<unknown> {
    return this.post('/users/forgot-password', emailData);
  }
}
