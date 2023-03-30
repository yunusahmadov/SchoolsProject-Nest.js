import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { Subjects } from "./Subject";
import { User } from "./User";

@Entity({name: 'teacher_subjects'})
export class TeacherSubjects{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @ManyToOne(()=>User)
    @JoinColumn()
    teacher: User

  
    @ManyToOne(()=>Subjects)
    @JoinColumn()
    subject: Subjects


}