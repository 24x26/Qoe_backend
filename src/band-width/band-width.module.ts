import { Module } from '@nestjs/common';
import { BandWidthService } from './band-width.service';
import { BandWidthController } from './band-width.controller';
import { ThrottleService } from 'src/throttle/throttle.service';
import { FirebaseAdminService } from 'src/firebase/firebase-admin.service';

@Module({
  providers: [BandWidthService,ThrottleService,FirebaseAdminService],
  controllers: [BandWidthController]
})
export class BandWidthModule {}
