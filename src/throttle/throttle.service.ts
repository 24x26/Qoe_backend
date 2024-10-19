import { Injectable } from '@nestjs/common';
import { FirebaseAdminService } from 'src/firebase/firebase-admin.service';
import {Throttle} from "stream-throttle" 
@Injectable()
export class ThrottleService {
    constructor(private db:FirebaseAdminService){}
    private userThrottles : Map<string,Throttle> = new Map()

    // function to get user throttle
    getUserThrottle(userId:string){
        if(this.userThrottles.has(userId)){
            return this.userThrottles.get(userId)
        }

        // if not we create default throttle
        const userThrottle = new Throttle({rate : 1024})
        this.userThrottles.set(userId,userThrottle)
        return userThrottle
    }

    setUserThrottle(userId:string,bandwidth:number){
        const existingThrottle = this.userThrottles.has(userId)
        if(!existingThrottle){
            const newThrottle = new Throttle({rate : bandwidth})
            this.userThrottles.set(userId,newThrottle)
            return;
        }
        else{
            this.userThrottles.set(userId,new Throttle(bandwidth))
        }
    }

    trackBandWidth(userId : string,speedLogs:{timestamp:number,value:number}[]){
        this.db.saveUserBandWidth(userId,speedLogs)
    }
}
