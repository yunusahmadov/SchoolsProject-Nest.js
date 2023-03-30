import { Controller, Post, Req, Put, Delete, Get, Query, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TeacherSubjectService } from 'src/services/teacher-subject/teacher-subject.service';

@Controller('teacher-subject')
export class TeacherSubjectController {
    constructor(private teachSubService:TeacherSubjectService,
        private jwtServices: JwtService){}
    
    @Post()
    insertData(@Query() data:string, @Req() req: Request){
        try{
            const check = this.jwtServices.verify(req.headers.authorization.split(' ')[1]);
            if(check.user.role == 'admin' || check.user.role == 'director'){
                this.teachSubService.insertData(data)
                return 'Subject enrolled successfully.';
            }else{
                return 'Un Auth'
            }
        }catch(err){
            return 'Un Auh'
        }
    }

    @Get('subject-by-teacher')
    getTeacherSubjects(@Query() data:any, @Req() req: Request){
        try{
            const check = this.jwtServices.verify(req.headers.authorization.split(' ')[1]);
            if(check.user.role == 'admin' || check.user.role == 'director'){
               return this.teachSubService.getTeacherSubjects(data.teacher_id )
            }else if(check.user.role == 'teacher'){
                return this.teachSubService.getTeacherSubjects( check.user.id )
            }else{
                return 'Un Auth'
            }
        }catch(err){
            return 'Un Auth'
        }
    }
    @Delete(':id')
    deleteTeacherSubject(@Param('id') id:string, @Req() req: Request){
        try{
            const check = this.jwtServices.verify(req.headers.authorization.split(' ')[1]);
            if(check.user.role == 'admin' || check.user.role == 'director' ){
                this.teachSubService.deleteTeacherSubject(id)
                return 'School deleted successfully.';
            }else{
                return 'Un Auth'
            }
        }catch(err){
            return 'Un Auth'
        }
    }
}
