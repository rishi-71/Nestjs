/* eslint-disable prettier/prettier */
import { Body, Controller,Get,Post } from '@nestjs/common';
import { UppercasePipe } from 'src/common/pipes/uppercase/uppercase.pipe';

@Controller('myname')
export class MynameController {
    @Get()
    get(){
        return "Hello MyName";
    }
    @Post('custom')
    transformName(@Body('name', new UppercasePipe()) name:string){
        return {message : `Received name :  ${name}`}
    }
}
