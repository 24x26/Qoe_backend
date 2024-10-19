import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { plansToCIR } from 'src/constants';
import { FirebaseAdminService } from 'src/firebase/firebase-admin.service';
import {v4 as uuidv4} from "uuid"
@Injectable()
export class AuthService {
    constructor(private db : FirebaseAdminService){}

    private connectedClients = []
    async mapToCIR(planValue:string){
        return plansToCIR[planValue]
    }
    async createUser(user:any){
        try{
const userData = {
    username:user.username,
    plan:user.plan,
    bandWidth : await  this.mapToCIR(user.plan),
    bandwidthHistory:[{
        timestamp:Date.now(),
        bandwidth : await this.mapToCIR(user.plan)
    }],
    cir : await this.mapToCIR(user.plan),
    mir:await this.mapToCIR(user.plan)
}
const isUserExist = await this.db.getUserByUsername(user.username)
if(isUserExist){
    throw new UnauthorizedException("client already exist")
}
const userId = uuidv4()


await this.db.saveUser(userId,userData)
return {
    message : "User created successufully"
}
        }catch(e){
            throw e
        }
    }

    async loginUser(userName:string){
        try{
            const user = await this.db.getUserByUsername(userName)
            if(typeof user== "object"){
                const userId=Object.keys(user)[0] 
                return {userId,username:user[userId].username}
            }
            throw new UnauthorizedException("no account match this client")
        }catch(e){
            throw e
        }
    }

    async logoutUser(userId:string){
        try{
            const userRef= this.db.getUserById(userId)
            if(!userRef){
                throw new NotFoundException("user not found")
            }
            await this.db.changeStatus(userId,false)
            return {
                message : "client logout successfully"
            }
        }catch(e){
            throw e
        }
    }

    async loginAdmin(username:string,password:string){
        try{
            const isAdminFound = this.db.getAdmin(username)
            if(!isAdminFound){
                throw new UnauthorizedException("admin not found")
            }
            return {
                success : true,
                message : "login success"
            }
        }catch(e){
            throw e
        }
    }
}
