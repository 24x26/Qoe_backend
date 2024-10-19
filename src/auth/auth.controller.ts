import { Controller,Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}
    
    
    @Post("/registerClient")
    async registerClient(@Body() data){
        return await this.authService.createUser(data)
    }

    @Post("/loginClient")
    async login(@Body() data){
        return await this.authService.loginUser(data.username)
    }

    @Post("/logoutClient")
    async logout(@Body() data){
        return await this.authService.logoutUser(data.userId)
    }

    @Post("/loginAdmin")
    async loginAdmin(@Body() data){
        return await this.authService.loginAdmin(data.username,data.password)
    }

    

}
