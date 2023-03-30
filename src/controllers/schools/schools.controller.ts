import { Controller, Get, Post, Query, Req, Delete, Put } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { SchoolsService } from 'src/services/schools/schools.service';

@Controller('schools')
export class SchoolsController {
    constructor(private schServices:SchoolsService,
        private jwtServices: JwtService){}
    @Get()
    getSchools(@Query() schData:string){
        return this.schServices.getSchools()
    }

    @Post()
    insertSchool(@Query() schData:string, @Req() req: Request){
        try{
            const check = this.jwtServices.verify(req.headers.authorization.split(' ')[1]);
            if(check.user.role == 'admin'){
                this.schServices.insertSchol(schData)
                return 'School added successfully.';
            }else{
                return 'Un Auth'
            }
        }catch(err){
            return 'Un Auth'
        }
    }

    @Delete(':id')
    deleteSch(@Param('id') id:string,  @Req() req: Request){
        try{
            const check = this.jwtServices.verify(req.headers.authorization.split(' ')[1]);
            if(check.user.role == 'admin'){
                this.schServices.deleteSch(id)
                return 'School deleted successfully.';
            }else{
                return 'Un Auth'
            }
        }catch(err){
            return 'Un Auth'
        }
    }

    @Put(':id')
    updateSch(@Param('id') id:string, @Query() schData:string, @Req() req: Request){
        try{
            const check = this.jwtServices.verify(req.headers.authorization.split(' ')[1]);
            if(check.user.role == 'admin'){
                this.schServices.updateSch(id, schData)
                return 'School updated successfully.';
            }else{
                return 'Un Auth'
            }
        }catch(err){
            return 'Un Auth'
        }
    }
}
