import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ClassesSubjects } from "./ClassesSubjects";
import { StudentClasses } from "./StudentClasses";
import { TeacherClasses } from "./TeacherClasses";


@Entity({name: 'classes'})
export class Classes{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    name: string;

    @OneToMany(()=>StudentClasses, (studentClasses)=>studentClasses.class, {onDelete:'CASCADE'})
    class:StudentClasses

    @OneToMany(()=>TeacherClasses, (teacherClasses)=>teacherClasses.classes, {onDelete:'CASCADE'})
    classes:TeacherClasses

    @OneToMany(()=>ClassesSubjects, (classesSubjects)=>classesSubjects.subjclasses, {onDelete:'CASCADE'})
    subjclasses:ClassesSubjects
   
}