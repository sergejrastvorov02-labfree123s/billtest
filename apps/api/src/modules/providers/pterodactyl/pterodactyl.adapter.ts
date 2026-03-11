import { Injectable } from '@nestjs/common';
import {
  ChangeGameServerResourcesDto,
  CreateGameServerDto,
  GameServerProvider,
} from '../../services/provider.interfaces';
import { PterodactylApiClient } from './pterodactyl.client';

@Injectable()
export class PterodactylProviderAdapter implements GameServerProvider {
  constructor(private readonly client: PterodactylApiClient) {}

  async createServer(payload: CreateGameServerDto): Promise<{ externalServerId: string; state: string }> {
    const response = await this.client.createServer({
      name: payload.name,
      user: Number(payload.externalUserId),
      egg: payload.eggId,
      nest: payload.nestId,
      startup: payload.startup,
      environment: payload.environment,
      docker_image: payload.dockerImage,
      limits: {
        memory: payload.memoryMb,
        swap: payload.swapMb,
        disk: payload.diskMb,
        io: payload.ioWeight,
        cpu: payload.cpuPercent,
      },
      feature_limits: {
        databases: payload.databaseLimit,
        allocations: payload.allocationLimit,
        backups: payload.backupLimit,
      },
      deploy: { locations: [payload.locationId], dedicated_ip: false, port_range: [] },
    });

    return { externalServerId: String(response.attributes.identifier), state: String(response.attributes.status ?? 'installing') };
  }

  async suspendServer(externalServerId: string): Promise<void> {
    await this.client.postPowerAction(externalServerId, 'stop');
  }
  async unsuspendServer(externalServerId: string): Promise<void> {
    await this.client.postPowerAction(externalServerId, 'start');
  }
  async deleteServer(externalServerId: string): Promise<void> { await this.client.postPowerAction(externalServerId, 'kill'); }
  async reinstallServer(externalServerId: string): Promise<void> { await this.client.postPowerAction(externalServerId, 'restart'); }
  async changeResources(payload: ChangeGameServerResourcesDto): Promise<void> {
    await this.client.patchServerBuild(payload.externalServerId, {
      memory: payload.memoryMb,
      swap: payload.swapMb,
      disk: payload.diskMb,
      cpu: payload.cpuPercent,
    });
  }
  async getServerStatus(externalServerId: string): Promise<{ state: string; online: boolean }> {
    return { state: 'unknown', online: !!externalServerId };
  }
  async getServerUsage(): Promise<Record<string, string | number>> { return {}; }
  async syncServerState(externalServerId: string): Promise<{ state: string; online: boolean }> {
    return this.getServerStatus(externalServerId);
  }
}
