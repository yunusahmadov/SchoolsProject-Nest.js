import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { Classes } from "./Classes";
import { Subjects } from "./Subject";

@Entity({name: 'classes_subject'})
export class ClassesSubjects{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number

    @ManyToOne(()=>Classes)
    @JoinColumn()
    subjclasses: Classes

    @ManyToOne(()=>Subjects)
    @JoinColumn()
    subjects: Subjects
}