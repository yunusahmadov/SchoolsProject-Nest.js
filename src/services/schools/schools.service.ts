import { Injectable } from '@nestjs/common';
import { Schools } from 'src/tables/Schools';
import {Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class SchoolsService {
    constructor(
        @InjectRepository(Schools) private SchRepo:Repository<Schools>,
       
        ){}
    getSchools(){
        return this.SchRepo.find({relations: ['user']});
    }
    insertSchol(data){

       const newSch =  this.SchRepo.create(data);
       this.SchRepo.save(newSch);
        return 'ok';
    }

    deleteSch(id){
        this.SchRepo.delete(id)
        return 'ok'
    }
    updateSch(id, data){
        this.SchRepo.update({id},data)
        return 'ok'
    }
}