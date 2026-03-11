import { Injectable } from '@nestjs/common';
import { CreateVmDto, VmProvider } from '../../services/provider.interfaces';

@Injectable()
export class VmManagerAdapter implements VmProvider {
  async createVm(payload: CreateVmDto): Promise<{ externalVmId: string; state: string }> {
    void payload;
    throw new Error('VMmanager adapter is planned for phase 2');
  }
  async suspendVm(): Promise<void> { throw new Error('Not implemented'); }
  async unsuspendVm(): Promise<void> { throw new Error('Not implemented'); }
  async terminateVm(): Promise<void> { throw new Error('Not implemented'); }
  async rebuildVm(): Promise<void> { throw new Error('Not implemented'); }
  async powerAction(): Promise<void> { throw new Error('Not implemented'); }
  async syncState(): Promise<{ state: string }> { return { state: 'pending' }; }
}
