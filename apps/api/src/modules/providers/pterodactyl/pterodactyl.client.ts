import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PterodactylApiClient {
  constructor(private readonly http: HttpService) {}

  private get baseUrl() {
    return process.env.PTERODACTYL_BASE_URL as string;
  }

  private get headers() {
    return {
      Authorization: `Bearer ${process.env.PTERODACTYL_APP_API_KEY}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  async createServer(payload: Record<string, unknown>) {
    const { data } = await firstValueFrom(
      this.http.post(`${this.baseUrl}/api/application/servers`, payload, { headers: this.headers }),
    );
    return data;
  }

  async patchServerBuild(externalServerId: string, payload: Record<string, unknown>) {
    await firstValueFrom(
      this.http.patch(`${this.baseUrl}/api/application/servers/${externalServerId}/build`, payload, { headers: this.headers }),
    );
  }

  async postPowerAction(externalServerId: string, signal: 'start' | 'stop' | 'restart' | 'kill') {
    await firstValueFrom(
      this.http.post(
        `${this.baseUrl}/api/client/servers/${externalServerId}/power`,
        { signal },
        { headers: { ...this.headers, Authorization: `Bearer ${process.env.PTERODACTYL_CLIENT_API_KEY}` } },
      ),
    );
  }
}
