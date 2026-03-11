import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { AuthModule } from './auth/auth.module';
import { BillingModule } from './billing/billing.module';
import { CatalogModule } from './catalog/catalog.module';
import { ServicesModule } from './services/services.module';
import { PterodactylModule } from './providers/pterodactyl/pterodactyl.module';
import { PaymentsModule } from './payments/payments.module';
import { GeoModule } from './geo/geo.module';
import { SupportModule } from './support/support.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CmsModule } from './cms/cms.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      connection: { url: process.env.REDIS_URL },
    }),
    AuthModule,
    BillingModule,
    CatalogModule,
    ServicesModule,
    PterodactylModule,
    PaymentsModule,
    GeoModule,
    SupportModule,
    NotificationsModule,
    CmsModule,
    AdminModule,
  ],
})
export class AppModule {}
