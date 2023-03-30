import { Controller,Delete,Get,Param,Post, Put, Query, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ClassesService } from 'src/services/classes/classes.service';

@Controller('classes')
export class ClassesController {
    constructor(private classesServices:ClassesService,
        private jwtServices: JwtService){}
    
    @Post()
    insertClass(@Query() classData:string, @Req() req: Request){
        try{
            const check = this.jwtServices.verify(req.headers.authorization.split(' ')[1]);
            if(check.user.role == 'admin' || check.user.role == 'director'){
                this.classesServices.insertClass(classData)
                return 'Class added successfully.';
            }else{
                return 'Un Auth'
            }
        }catch(err){
            return 'Un Auth'
        }
    }
    @Delete(':id')
    deleteClass(@Param('id') id:string, @Req() req:Request){
        try {
            const check=this.jwtServices.verify(req.headers.authorization.split(' ')[1])
            if (check.user.role == 'admin') {
                this.classesServices.deleteClass(id)
                return 'Class Deleted succesfuly'
            }else{
                return 'Un Auth'
            }
        } catch (error) {
            return 'Un Auth'
        }
    }
    @Put(':id')
    updateClass(@Param('id') id:string, @Query() classData:string,@Req() req:Request){
        try {
            const check=this.jwtServices.verify(req.headers.authorization.split(' ')[1])
            if (check.user.role == 'admin') {
                this.classesServices.updateClass(id,classData)
                return 'Class updated succesfuly'
            }else{
                return 'Un Auth'
            }
        } catch (error) {
            return 'Un Auth'
        }
    }
    // @Get('/classes')
    // getClasses(@Query() classData:string){
    //     return this.classesServices.getClasses()
    // }
    @Get('/classes')
    getClasses(){
        return this.classesServices.getClasses()
    }
}
