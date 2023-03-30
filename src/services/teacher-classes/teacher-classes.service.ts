import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherClasses } from 'src/tables/TeacherClasses';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherClassesService {
 constructor (@InjectRepository(TeacherClasses) private teachClassRepo:Repository<TeacherClasses>){}
    insertData(data){
        const newData=this.teachClassRepo.create(data);
            this.teachClassRepo.save(newData)
            return 'ok'
    }
    getTeacherClasses(teacherID){
        return this.teachClassRepo.find({relations: ['teachers', 'classes']})
    }


}
