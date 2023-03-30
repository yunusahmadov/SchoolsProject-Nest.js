import { Controller,Delete,Param,Post, Query, Req ,Put,Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { SubjectsService } from 'src/services/subjects/subjects.service';

@Controller('subjects')
export class SubjectsController {
    constructor(private subServices:SubjectsService,
        private jwtServices: JwtService){}
    @Post()
    insertSubject(@Query() subData:string, @Req() req: Request){
        try{
            const check = this.jwtServices.verify(req.headers.authorization.split(' ')[1]);
            if(check.user.role == 'admin' || check.user.role == 'director'){
                this.subServices.insertSubject(subData)
                return 'Subject added successfully.';
            }else{
                return 'Un Auth'
            }
        }catch(err){
            return 'Un Auth'
        }
    }
    @Delete(':id')
    deleteSubject(@Param('id') id:string , @Req() req:Request){
        try {
            const check=this.jwtServices.verify(req.headers.authorization.split(' ')[1])
            if (check.user.role == 'admin') {
                this.subServices.deleteSubject(id)
                return 'Subject deleted succesfully'
            }
            else{
                return 'Un Auth'
            }
        } catch (error) {   
            return 'Un Auth'
        }
    }

    @Put(':id')
    updateSubject(@Param('id') id:string, @Query() subData:string,@Req() req:Request ){
        try {
            const check =this.jwtServices.verify(req.headers.authorization.split(' ')[1])
            if (check.user.role == 'admin') {
                this.subServices.updateSubject(id,subData)
                return 'Subject updated succesfully'
            }else{
                return 'Un Auth'
            }
        } catch (error) {
            return 'Un Auth'
        }
    }

    @Get('/subjects')
    getSubjects(@Query() schData:string){
        return this.subServices.getSubjects()
    }
    // @Get('/subjects')
    // getSubjects(){
    //     return this.subServices.getSubjects()
    // }
}
