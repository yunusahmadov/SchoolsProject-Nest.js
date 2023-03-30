import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherSubjects } from 'src/tables/TeacherSubject';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherSubjectService {
    constructor(  @InjectRepository(TeacherSubjects) private repo:Repository<TeacherSubjects> ){}
    insertData(data){
        const newData = this.repo.create(data);
        this.repo.save(newData);
        return 'ok';
    }

    getTeacherSubjects(teacherId){
        return this.repo.find({where:{teacher:{id:teacherId}},relations: ['teacher', 'subject']})
    }
    deleteTeacherSubject(id){
        this.repo.delete(id)
        return 'ok'
    }

}
