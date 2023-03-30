import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subjects } from 'src/tables/Subject';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectsService {
    constructor( @InjectRepository(Subjects) private subRepo:Repository<Subjects> ){}

    insertSubject(data){
        const newSub = this.subRepo.create(data);
        this.subRepo.save(newSub);
        return 'ok'
    }
    deleteSubject(id){
        this.subRepo.delete(id)
        return 'ok'
    }
    updateSubject(id,data){
        this.subRepo.update({id},data)
        return 'ok'
    }
    getSubjects(){
        return this.subRepo.find()
    }
}
