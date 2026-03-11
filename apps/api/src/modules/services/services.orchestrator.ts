import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class LifecycleOrchestratorService {
  private readonly logger = new Logger(LifecycleOrchestratorService.name);

  constructor(@InjectQueue('provisioning') private readonly provisioningQueue: Queue) {}

  async enqueueMinecraftProvisioning(serviceId: string) {
    await this.provisioningQueue.add(
      'minecraft.provision',
      { serviceId },
      { attempts: 10, backoff: { type: 'exponential', delay: 5000 }, removeOnComplete: 500 },
    );
    this.logger.log(`Provisioning enqueued: ${serviceId}`);
  }

  async enqueueStateSync(serviceId: string) {
    await this.provisioningQueue.add('minecraft.sync', { serviceId }, { attempts: 5, backoff: { type: 'fixed', delay: 2000 } });
  }

  async manualRetry(jobId: string) {
    const job = await this.provisioningQueue.getJob(jobId);
    if (!job) throw new Error('Job not found');
    await job.retry();
  }
}
