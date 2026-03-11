export type ServiceLifecycleStatus =
  | 'pending'
  | 'provisioning'
  | 'active'
  | 'suspended'
  | 'expired'
  | 'canceled'
  | 'failed';

export interface CreateGameServerDto {
  serviceId: string;
  externalUserId: string;
  name: string;
  locationId: number;
  nestId: number;
  eggId: number;
  dockerImage: string;
  startup: string;
  environment: Record<string, string>;
  memoryMb: number;
  cpuPercent: number;
  diskMb: number;
  swapMb: number;
  ioWeight: number;
  databaseLimit: number;
  allocationLimit: number;
  backupLimit: number;
}

export interface ChangeGameServerResourcesDto {
  externalServerId: string;
  memoryMb: number;
  cpuPercent: number;
  diskMb: number;
  swapMb: number;
}

export interface GameServerProvider {
  createServer(payload: CreateGameServerDto): Promise<{ externalServerId: string; state: string }>;
  suspendServer(externalServerId: string): Promise<void>;
  unsuspendServer(externalServerId: string): Promise<void>;
  deleteServer(externalServerId: string): Promise<void>;
  reinstallServer(externalServerId: string): Promise<void>;
  changeResources(payload: ChangeGameServerResourcesDto): Promise<void>;
  getServerStatus(externalServerId: string): Promise<{ state: string; online: boolean }>;
  getServerUsage(externalServerId: string): Promise<Record<string, number | string>>;
  syncServerState(externalServerId: string): Promise<{ state: string; online: boolean }>;
}

export interface CreateVmDto {
  serviceId: string;
  name: string;
  cpu: number;
  ramMb: number;
  diskGb: number;
  ipCount: number;
  osTemplate: string;
}

export interface VmProvider {
  createVm(payload: CreateVmDto): Promise<{ externalVmId: string; state: string }>;
  suspendVm(externalVmId: string): Promise<void>;
  unsuspendVm(externalVmId: string): Promise<void>;
  terminateVm(externalVmId: string): Promise<void>;
  rebuildVm(externalVmId: string, osTemplate: string): Promise<void>;
  powerAction(externalVmId: string, action: 'start' | 'stop' | 'restart'): Promise<void>;
  syncState(externalVmId: string): Promise<{ state: string }>;
}
