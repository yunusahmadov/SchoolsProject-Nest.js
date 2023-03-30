import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { Classes } from "./Classes";
import { User } from "./User";


@Entity({name: 'student_classes'})
export class StudentClasses{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number

    @ManyToOne(()=>User)
    @JoinColumn()
    student: User

    @ManyToOne(()=>Classes)
    @JoinColumn()
    class: Classes

}