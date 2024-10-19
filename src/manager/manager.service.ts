import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseAdminService } from 'src/firebase/firebase-admin.service';
import { ThrottleService } from 'src/throttle/throttle.service';

@Injectable()
export class ManagerService {
    constructor(private db : FirebaseAdminService,private throttleService: ThrottleService){}
    async limitBandWidth(userId :string, bandwidth:number){
        try{
            const user = await this.db.getUserById(userId)
            if(!user){
                throw new UnauthorizedException("something went wrong")
            }

            // update user bandwidth
            this.db.updateUser(userId,bandwidth)
            // call the throll service
            this.throttleService.setUserThrottle(userId,bandwidth)
            return {
                message : "bandwidth limit is successufully setted"
            }
        }catch(e){
            throw e
        }
    }
}
