import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Classes } from "./Classes";


@Entity({name: 'teacher_classes'})
export class TeacherClasses{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number

    @ManyToOne(()=>User)
    @JoinColumn()
    teachers: number

    @ManyToOne(()=>Classes)
    @JoinColumn()
    classes: number
}