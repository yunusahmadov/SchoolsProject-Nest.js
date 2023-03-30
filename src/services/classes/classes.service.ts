import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classes } from 'src/tables/Classes';
import { Repository } from 'typeorm';

@Injectable()
export class ClassesService {
    constructor(  @InjectRepository(Classes) private classRepo:Repository<Classes> ){}

    insertClass(data){
        const newClass = this.classRepo.create(data);
        this.classRepo.save(newClass);
        return 'ok'
    }
    deleteClass(id){
        this.classRepo.delete(id)
        return 'ok'
    }
    updateClass(id,data){
        this.classRepo.update({id},data)
        return 'ok'
    }
    getClasses(){
        return this.classRepo.find()
    }

}
