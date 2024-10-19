import { Controller,Put,Body,Get,Post } from '@nestjs/common';
import { ManagerService } from './manager.service';

@Controller('manager')
export class ManagerController {
    constructor(private manager : ManagerService){}

    @Put("/limitBandwidth")
    async limitBandwidth(@Body() data){
        console.log(data)
        return this.manager.limitBandWidth(data.userId,data.bandwidth)
    }

    @Get("/users")
    async getUsers(){
        return this.manager.getUsers()
    }

    @Post("/setMaxBandWidth")
    async setMaxBandWidth(@Body() data){
        return await this.manager.setMaximumBW(data.maxBandWidth)
    }

    @Get("/getMaxBandWidth")
    async getMaxBandWidth(){
        return await this.manager.getMAxBandWidth()
    }

    @Post("/getBandWidthHistory")
    async getBandWidthHistory(@Body() data){
        return await this.manager.getBandWidthHistory(data.userId)
    }
}
