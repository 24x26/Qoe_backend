import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ManagerModule } from './manager/manager.module';
//import { ThrottleService } from './throttle/throttle.service';
import { BandWidthModule } from './band-width/band-width.module';
@Module({
  imports: [AuthModule, ManagerModule, BandWidthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
