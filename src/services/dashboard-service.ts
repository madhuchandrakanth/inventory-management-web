import { ApiService } from './api-service';

export interface DashboardSummary {
  title: string;
  value: string;
  trend: string;
  trendText: string;
  isPositive: boolean;
}

export interface DashboardData {
  summary: DashboardSummary[];
  revenueAndProfit: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
}

export class DashboardService extends ApiService {
  static async getDashboardData(signal?: AbortSignal): Promise<DashboardData> {
    return this.get<DashboardData>('/dashboard', signal);
  }
}
