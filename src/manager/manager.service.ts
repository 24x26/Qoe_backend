import { Injectable, UnauthorizedException } from '@nestjs/common';
import { bytesToSpeed } from 'src/constants';
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
            console.log("here",e.message)
            throw e
        }
    }

    // manager get users
    async getUsers(){
        try {
            const users = await this.db.getUsers()
            return users
        } catch (error) {
            throw error
        }
    }
    // manager set Maximum bandwidth
    async setMaximumBW(value:number){
        try{
            await this.db.setMaxBand(value)
            return {success : true}
        }catch(e){
            throw e
        }
    }

    async getMAxBandWidth(){
        try{
            const {bandMaxWidth}=await this.db.getMaxBandWidth()
            return bytesToSpeed(bandMaxWidth)
        }catch(e){
            throw e
        }
    }

    async getBandWidthHistory(userId:string){
        try {
            const bandWidthHistory = await this.db.getBandHistory(userId)
            return bandWidthHistory.bandwidthHistory ? bandWidthHistory.bandwidthHistory.map((log:any) => (
                {
                    ...log,
                    bandwidth : Math.floor(log.bandwidth / 1024)
                }
            )) : []
        } catch (error) {
            throw error
        }
    }
}
