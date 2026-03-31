import { EnvironmentService } from './environment-service';

export class ApiService {
  protected static get baseUrl(): string {
    return EnvironmentService.getApiBaseUrl();
  }

  protected static async get<T>(path: string, signal?: AbortSignal): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}
