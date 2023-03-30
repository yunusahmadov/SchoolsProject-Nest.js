import { Controller, Post, Query, Req, Put,Param, Delete, Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/services/users/users.service';

@Controller('staff')
export class StaffController {
    constructor(private UserService:UsersService,
        private jwtServices: JwtService){}

    @Post()
    insertUser(@Query() userData:any, @Req() req: Request){
        try{
            const check = this.jwtServices.verify(req.headers.authorization.split(' ')[1]);
            if(check.user.role == 'admin' ){
                this.UserService.insertUser(userData, '')
                return 'User added successfully.';
            }else if(check.user.role == 'director'){
                if(userData.role == 'teacher' || userData.role == 'student'){
                    this.UserService.insertUser(userData, '')
                    return 'User added successfully.';
                }else{
                    return 'Un Auth'
                }
            }else{
                return 'Un Auth'
            }
        }catch(err){
            return 'Un Auth'
        }
    }
    @Put(':id')
    updateUser(@Param('id') id:number, @Query() userData:any, @Req() req: Request){
        try{
            const check = this.jwtServices.verify(req.headers.authorization.split(' ')[1]);
            if(check.user.role == 'admin' ){
                this.UserService.updateUser(id, userData)
                return 'User added successfully.';
            }else if(check.user.role == 'director'){
                if(userData.role == 'teacher' || userData.role == 'student'){
                    this.UserService.updateUser(id, userData)
                    return 'User added successfully.';
                }else{
                    return 'Un Auth'
                }
            }else{
                return 'Un Auth'
            }
        }catch(err){
            return 'Un Auth'
        }
    }

    @Delete(':id')
    deleteUser(@Param('id') id:number, @Req() req: Request){
        try{
            const check = this.jwtServices.verify(req.headers.authorization.split(' ')[1]);
            if(check.user.role == 'admin' ){
               this.UserService.deleteUser(id)
                return 'User added successfully.';
            }else{
                return 'Un Auth'
            }
        }catch(err){
            return 'Un Auth'
        }
    }

    @Get(':id')
    getStudentById(@Param('id') id:number, @Req() req: Request){
        return this.UserService.getStudentById(id)
    }
   
    @Get('/login/user')
    getLoginUser(@Req() req: Request){
        const check = this.jwtServices.verify(req.headers.authorization.split(' ')[1]);
       
        return this.UserService.getLoginUser(check.user.id)
    }
    @Get('/staff/teachers')
    getTeachers(){
        return this.UserService.getTeachers()
    }
    @Get('/staff/students')
    getStudents(){
        return this.UserService.getStudents()
    }


}
