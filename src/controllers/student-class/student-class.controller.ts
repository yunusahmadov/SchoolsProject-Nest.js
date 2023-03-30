import { JwtService } from '@nestjs/jwt';
import { Controller, Post, Req, Put, Delete, Get, Query, Param } from '@nestjs/common';
import { Request } from 'express';
import { StudentClassService } from 'src/services/student-class/student-class.service';

@Controller('student-class')
export class StudentClassController {
    constructor (private studClassService:StudentClassService,
        private jwtServices: JwtService){}


    @Post()
    insertData(@Query() data: string, @Req() req:Request) {
    try {
        const check=this.jwtServices.verify(req.headers.authorization.split(' ')[1])
        if (check.user.role == 'admin' || check.user.role == 'director') {
            this.studClassService.insertData(data)
            return 'Enrolled'
        }else{
            return 'Un Auth'
        }
    } catch (err) {
        return 'Un Auth'
    }
}

    @Get('student-by-class')
    getStudentClasses(@Query() data: any, @Req() req: Request) {
        try {
            const check = this.jwtServices.verify(req.headers.authorization.split(' ')[1]);
            return this.studClassService.getStudentClasses(data.classId)
        } catch (err) {
            return 'Un Auth'
        }
    }
    
}


// getStudentClasses