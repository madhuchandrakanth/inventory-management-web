import { EnvironmentService } from './environment-service';
import { SessionService } from './session-service';

export class ApiService {
  protected static get baseUrl(): string {
    return EnvironmentService.getApiBaseUrl();
  }

  protected static async get<T>(path: string, signal?: AbortSignal): Promise<T> {
    const token = SessionService.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers,
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  protected static async post<T>(path: string, body: unknown, signal?: AbortSignal): Promise<T> {
    const token = SessionService.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal,
    });

    if (!response.ok) {
      // Try to parse error message if JSON is present
      try {
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.message || `HTTP error! status: ${response.status}`);
      } catch (err: unknown) {
        const e = err as Error;
        throw new Error(e.message || `HTTP error! status: ${response.status}`);
      }
    }

    return response.json();
  }

  protected static async put<T>(path: string, body: unknown, signal?: AbortSignal): Promise<T> {
    const token = SessionService.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
      signal,
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.message || `HTTP error! status: ${response.status}`);
      } catch (err: unknown) {
        const e = err as Error;
        throw new Error(e.message || `HTTP error! status: ${response.status}`);
      }
    }

    return response.json();
  }
}

