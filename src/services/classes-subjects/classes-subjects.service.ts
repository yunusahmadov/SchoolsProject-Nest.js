import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassesSubjects } from 'src/tables/ClassesSubjects';
import { Repository } from 'typeorm';

@Injectable()
export class ClassesSubjectsService {
    constructor(@InjectRepository(ClassesSubjects)private clasSubjectRepo:Repository<ClassesSubjects>){}
    insertData(data){
        const newData=this.clasSubjectRepo.create(data)
        this.clasSubjectRepo.save(newData)
        return 'ok'
    }
    getClassesSubject(classId){
        return this.clasSubjectRepo.find({where:{subjclasses:{id: classId}},relations: ['subjects']})
    }
}
