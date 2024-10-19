import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { ThrottleService } from 'src/throttle/throttle.service';
import { FirebaseAdminService } from 'src/firebase/firebase-admin.service';

@Module({
  providers: [ManagerService,ThrottleService,FirebaseAdminService],
  controllers: [ManagerController]
})
export class ManagerModule {}
