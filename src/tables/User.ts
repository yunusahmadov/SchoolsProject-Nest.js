import {Entity, Column,PrimaryGeneratedColumn, OneToOne, ManyToOne, OneToMany} from 'typeorm'
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn';
import { Schools } from './Schools';
import { StudentClasses } from './StudentClasses';
import { TeacherClasses } from './TeacherClasses';
import { TeacherSubjects } from './TeacherSubject';
@Entity({name: 'users'})
export class User{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column({nullable: true})
    phoneNumber: string;

    @Column()
    password: string;

    @Column({default: 'student'})
    role: string;

    @Column({nullable: true})
    image: string;

    @ManyToOne(()=>Schools, (school)=> school.user)
    @JoinColumn()
    schools: Schools

    @OneToMany(()=>TeacherSubjects, (teacherSubjects)=> teacherSubjects.teacher, {onDelete:'CASCADE'})
    teacher: TeacherSubjects
  
    @OneToMany(()=>StudentClasses, (studentClasses)=>studentClasses.student, {onDelete:'CASCADE'})
    class:StudentClasses

    @OneToMany(()=>TeacherClasses, (teacherClasses)=> teacherClasses.teachers, {onDelete:'CASCADE'})
    teachers: TeacherClasses;

    
}