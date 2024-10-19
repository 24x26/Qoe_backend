import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseAdminService } from 'src/firebase/firebase-admin.service';
@Module({
  providers: [AuthService,FirebaseAdminService],
  controllers: [AuthController]
})
export class AuthModule {}
