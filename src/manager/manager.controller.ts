import { Controller,Put,Body } from '@nestjs/common';
import { ManagerService } from './manager.service';

@Controller('manager')
export class ManagerController {
    constructor(private manager : ManagerService){}

    @Put("/limitBandwidth")
    async limitBandwidth(@Body() data){
        return this.manager.limitBandWidth(data.userId,data.bandwidth)
    }
}
