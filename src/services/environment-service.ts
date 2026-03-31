export class EnvironmentService {
  /**
   * Gets the API Base URL from the runtime environment injected in `env.js`.
   * Fallback to 'http://localhost:8000' if not present during development.
   */
  static getApiBaseUrl(): string {
    // @ts-ignore
    const envUrl = window.__env__?.API_BASE_URL;
    return envUrl || 'http://localhost:8000';
  }
}
