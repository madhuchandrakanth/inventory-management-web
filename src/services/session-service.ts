export interface UserData {
  user_id: string;
  email: string;
  full_name: string;
  phone: string;
}

const TOKEN_KEY = 'inventory_token';
const USER_KEY = 'inventory_user';

export class SessionService {
  static setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  static setUser(user: UserData) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  static getUser(): UserData | null {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  static clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  static isAuthenticated(): boolean {
    return !!this.getUser();
  }
}
