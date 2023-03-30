import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/tables/User';
import { Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtUser: JwtService
        ){}
    async insertUser(data, image){
        const salt = bcrypt.genSaltSync();
        return bcrypt.hash(data.password, salt)
            .then(psw=>{
                const newUser = this.userRepository.create({...data, password: psw, image: image});
                this.userRepository.save(newUser)
                .then((result) => { 
                    return 'success'
            })
        })
    }
    async loginUser(data){
        return await this.userRepository.find({where: {email: data.email}})
        .then(email=>{
            if(email.length == 0){
                return {status: 'Invalid credints'}
            }else{
                const checkPassword = bcrypt.compareSync(data.password, email[0].password);
                if(checkPassword){
                    const token =  this.jwtUser.sign({user: email[0]})
                    return {token: token, user: email[0], status: ''}
                }else{
                    return {status: 'Invalid credints'}
                }
            }
            
        })
    }
    getUsers(req){
       if (req.query.search != '') {
        // return this.userRepository.find({where:{firstName:req.query.search}})
        return this.userRepository.find({
            where: { firstName: Like(`%${req.query.search}%`) },
      });

       }else{
        return this.userRepository.find({relations:['schools']})
       }
    }

    updateUser(id, data){
        this.userRepository.update({id}, data);
        return 'ok'
    }

    deleteUser(id){
        this.userRepository.delete({id});
        return 'ok'
    }

    getUserById(id){
        return  this.userRepository.findOneBy({id})
    }

    getStudentById(id){
        // return this.userRepository.find({where:{id: id}, relations: ['class.class.subjclasses.subjects.teacher.teacher']})
        return this.userRepository.findOne({where: {id:id},relations: ['class.class.subjclasses.subjects.teacher.teacher']});
    }
    getLoginUser(id){
    
        return this.userRepository.findOneBy({id})
    }


    getTeachers(){
        return  this.userRepository.find({where:{role:'teacher'}})
    }
    getStudents(){
        return  this.userRepository.find({where:{role:'student'}})
    }
}
