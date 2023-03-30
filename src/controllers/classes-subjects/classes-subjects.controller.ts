import { Controller, Post, Req, Put, Delete, Get, Query, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ClassesSubjectsService } from 'src/services/classes-subjects/classes-subjects.service';

@Controller('classes-subjects')
export class ClassesSubjectsController {
    constructor(private classSubjectService:ClassesSubjectsService,
        private jwtServices: JwtService){}

        @Post()
        insertData(@Query() data:string, @Req() req:Request){
            try {
                const check=this.jwtServices.verify(req.headers.authorization.split(' ')[1])
                if (check.user.role == 'admin' || check.user.role == 'director') {
                    this.classSubjectService.insertData(data)
                    return 'Enrolled'
                }else{
                    return 'Un Auth'
                }
            } catch (err) {
                return 'Un Auth'
            }
        }

        @Get('subject-by-class')
        getClassesSubject(@Query() data: any, @Req() req: Request) {
            try {
                const check = this.jwtServices.verify(req.headers.authorization.split(' ')[1]);
                return this.classSubjectService.getClassesSubject(data.classId)
            } catch (err) {
                return 'Un Auth'
            }
        }

}
