import  { Injectable, Logger, NotFoundException} from "@nestjs/common"
import * as admin from "firebase-admin"
import * as serviceAccount from "../constants/qsodevest-firebase.json"



@Injectable()
export class FirebaseAdminService{
    private readonly logger = new Logger(FirebaseAdminService.name)

    private readonly db: admin.database.Database

    constructor(){
        // initialize database using admin SDK
        if(!admin.apps.length){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
            databaseURL: "https://qosdevest-default-rtdb.firebaseio.com/"
        })
        this.logger.log('Firebase admin service initialized')
    }else{
        this.logger.log('Firebase admin service already initialized')
    }
    this.db=admin.database()
    }


    async getUsersRef(){
        return this.db.ref("users")
    }
    // function to get user ref from firebase server
    async getUserRef(userId : string){
        return this.db.ref("users").child(userId)
    }

    // function to save the user in firebase server
    async saveUser(userId: string, user: any){
        const userRef = await this.getUserRef(userId)
        await userRef.set(user)
        this.logger.log(`User ${userId} saved to firebase`)
    }

    // function to update brand-width of user
    async updateUser(userId:string,bandWidth : number){
        const userRef = await this.getUserRef(userId)
        await userRef.update({
            bandWidth:bandWidth
        })

        this.logger.log(`Brand width of user ${userId} updated to ${bandWidth}`)
    }
    // logout user
    async changeStatus(userId:string,isConnected:boolean){
        const userRef = await this.getUserRef(userId)
        await userRef.update({
            isConnected : isConnected
        })
    }

    // function to get User
    async getUserById(userId: string){
        const userRef = await this.getUserRef(userId)
        const snapshot = await userRef.once('value')
        const userData = snapshot.val()
        this.logger.log(`User ${userId} retrieved from firebase`)
        return userData
    }

    async getUserByUsername(name: string){
        const usersRef = await this.getUsersRef()
        // query users by username
        const snapshot = await usersRef.orderByChild("username").equalTo(name).once("value")
        if(snapshot.exists()){
            const userData = snapshot.val()
            const userId = Object.keys(userData)[0]
            const user = await this.getUserRef(userId)
            await user.update({
                isConnected : true
            })
            return userData
        }else{
            return false
        }
    }

    // save bandwidth to database
    async saveUserBandWidth(userId:string,speedLogs:{timestamp : number, value : number}[]){
        try{
            const userRef = await this.db.ref(`users/${userId}/speedLogs`).set(speedLogs)
        }catch(e){
            throw e
        }
    }
}
