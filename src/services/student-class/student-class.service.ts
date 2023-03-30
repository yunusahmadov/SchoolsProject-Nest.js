import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentClasses } from 'src/tables/StudentClasses';
import { Repository } from 'typeorm';


@Injectable()
export class StudentClassService {
    constructor (@InjectRepository(StudentClasses) private studClassrepo:Repository<StudentClasses>){}
    insertData(data){
        const newData=this.studClassrepo.create(data);
        this.studClassrepo.save(newData)
        return 'ok'
    }
    getStudentClasses(classId){
        return this.studClassrepo.find({where:{class:{id: classId}},relations: ['student']})
    }
}
