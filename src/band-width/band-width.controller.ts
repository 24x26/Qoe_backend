import { Controller,Post,Get,Query,Res } from '@nestjs/common';
//import { ThrottleService } from 'src/throttle/throttle.service';
import { BandWidthService } from './band-width.service';

@Controller('bandTest')
export class BandWidthController {
    constructor(private bandwidthService : BandWidthService){}

    @Get("/download")
    async testBandWidth(@Query("userId") userId : string,@Res() res: Response){
        console.log(userId)
        return this.bandwidthService.downloadFile(userId,res)
    }
}
