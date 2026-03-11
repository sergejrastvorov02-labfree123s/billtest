import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PterodactylApiClient } from './pterodactyl.client';
import { PterodactylProviderAdapter } from './pterodactyl.adapter';

@Module({
  imports: [HttpModule],
  providers: [PterodactylApiClient, PterodactylProviderAdapter],
  exports: [PterodactylProviderAdapter],
})
export class PterodactylModule {}
