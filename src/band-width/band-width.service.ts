import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseAdminService } from 'src/firebase/firebase-admin.service';
import { ThrottleService } from 'src/throttle/throttle.service';
import { Response } from 'express';
import {join} from "path"
import fs from "fs"
@Injectable()
export class BandWidthService {
    constructor(private throttleService : ThrottleService,private db : FirebaseAdminService){}

    async downloadFile(userId:string,res){
        try {
            const user = await this.db.getUserById(userId)
            if(!user){
                throw new UnauthorizedException("not authorized to download file")
            }
            // get user throttle
            const userThrottle = this.throttleService.getUserThrottle(userId)
            console.log(userThrottle)
            const filePath = join(__dirname,"test.pdf")
            const fileStream = fs.createReadStream(filePath)
            // Step 4: Set headers for response
            // Step 2: Set appropriate headers for the response
    res.writeHead(200, {
        'Content-Type': 'application/pdf', // Set correct mime type for PDF
        'Content-Disposition': 'attachment; filename="test.pdf"', // Changed file name to match PDF
      });
      const speedLogs = []
      var totalBytesSent = 0
      const startTime = Date.now();
      // step 3 : listen to throttle chunks and save the network speed in each moment
      userThrottle.on('data', (chunk:any) => {
        totalBytesSent += chunk.length;
        console.log(totalBytesSent)
        //const speed = (totalBytesSent / elapsedTime) / 1024; // in KB/s
      });

      const interval = setInterval(()=>{
        const elapsedTime = (Date.now() - startTime) / 1000;
        const speed = (totalBytesSent / elapsedTime) / 1024
        speedLogs.push({
            timestamp: elapsedTime,
            value : speed
        })
        // call the function from throttle service 
        this.throttleService.trackBandWidth(userId,speedLogs)

      },1000)
  
      // Step 3: Pipe the file stream through the throttle and to the response
      fileStream.pipe(userThrottle).pipe(res);
      return ()=>clearInterval(interval)
        } catch (error) {
            throw error
        }
    }
}
