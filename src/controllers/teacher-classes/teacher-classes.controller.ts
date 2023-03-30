import { Controller, Post, Req, Put, Delete, Get, Query, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TeacherClassesService } from 'src/services/teacher-classes/teacher-classes.service';


@Controller('teacher-classes')
export class TeacherClassesController {
    constructor(private teachClassService:TeacherClassesService,
                private jwtServices: JwtService
               ){}

        @Post()
        insertData(@Query() data:string, @Req() req:Request){
            try {
                const check=this.jwtServices.verify(req.headers.authorization.split(' ')[1])
                if (check.user.role == 'admin' || check.user.role == 'director') {
                    this.teachClassService.insertData(data)
                    return 'Enrolled Succesfuly'
                }else{
                    return 'Un Auth'
                }
            } catch (err) {
                return 'Un Auth'
            }
        }
    @Get('class-by-teacher')
    getTeacherClasses(@Query() data: any, @Req() req: Request) {
        try {
            const check = this.jwtServices.verify(req.headers.authorization.split(' ')[1]);
            if (check.user.role == 'admin' || check.user.role == 'director') {
                return this.teachClassService.getTeacherClasses(data.teacher_id)

            } else if (check.user.role == 'teacher') {
                return this.teachClassService.getTeacherClasses(check.user.id)
            }
        } catch(err){
            return 'un auth'
        }


}
}