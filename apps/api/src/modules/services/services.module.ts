import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { LifecycleOrchestratorService } from './services.orchestrator';

@Module({
  imports: [BullModule.registerQueue({ name: 'provisioning' })],
  providers: [LifecycleOrchestratorService],
  exports: [LifecycleOrchestratorService],
})
export class ServicesModule {}
