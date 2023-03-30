import { Controller, Post, Query, Get, Res, Delete, Param,UsePipes, Req, Put,ValidationPipe,ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/services/users/users.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
export class UsersController {
    constructor(private UserService:UsersService,private jwtServices: JwtService){}
    @Post('/register')
    @UseInterceptors(FileInterceptor('image',{
        storage: diskStorage({
            destination: "./uploads/images",
            filename: (req, file, callBack) => {
                const uniqueName = Date.now()+"-"+Math.round(Math.random()*1000000);
                const ext = extname(file.originalname);
                const filename = `${uniqueName}${ext}`;
                callBack(null, filename)
            }
        })
    }))
    async insertUser(@UploadedFile() image: Express.Multer.File, @Query() userData:string){
        console.log(image)
        console.log(userData)
        this.UserService.insertUser(userData, `${image.destination.substring(2, image.destination.length)}/${image.filename}`)
        return 'User Created Successfully'
    }

    @Post('/login')
    loginUser(@Query() loginData:string, @Res() res: Response){
       
        this.UserService.loginUser(loginData)
        .then(resp=>{
            if(resp.status == 'Invalid credints'){
                res.status(401).send('Invalid')
            }else{
                res.status(200).send(resp)
            }
        })
    }
    @Get('/users')
    getUsers(@Req()req: Request){
        return this.UserService.getUsers(req)
    }
    @Get('/teachers')
    getTeachers(){
        return this.UserService.getTeachers()
    }

    @Delete(':id')
    deleteUser(@Param('id') id:string, @Req() req: Request){
        this.UserService.deleteUser(id)
        return 'User deleted successfully'
        // try {
        //     const check= this.jwtServices.verify(req.headers.authorization.split(' ')[1]);
        //     if (check.user.role == 'admin') {
        //         this.UserService.deleteUser(id)
        //         return 'User deleted successfully'
        //     }else{
        //         return 'Un Auth'
        //     }
        // } catch (err) {
        //     return 'Un Auth'
        // }
    }

    @Put('/update-user/:id')
    updateUser(@Param('id') id:string, @Query() userData:string, @Req() req: Request){
        try{
            const check =this.jwtServices.verify(req.headers.authorization.split(' ')[1]);
            if (check.user.role == 'admin') {
                this.UserService.updateUser(id, userData)
                return 'User updated succesfuly'
            }else{
                return 'Un Auth'
            }
        }catch(err){
            return 'Un Auth'
        }
    }

    //Get User By Id
    @Get(':id')
    @UsePipes(new ValidationPipe())
    showUser(@Param('id', ParseIntPipe) id:string){
        return this.UserService.getUserById(id)
    }
}
//npm i @nestjs/passport passport passport-local passport-jwt @nestjs/jwt mongoose @nestjs/mongoose