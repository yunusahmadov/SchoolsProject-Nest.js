import { Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { ClassesSubjects } from "./ClassesSubjects";
import { TeacherSubjects } from "./TeacherSubject";


@Entity({name: 'subjects'})
export class Subjects{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    name: string;

    @OneToMany(()=>TeacherSubjects, (teacherSubjects)=> teacherSubjects.subject, {onDelete:'CASCADE'})
    teacher: TeacherSubjects

    @OneToMany(()=>ClassesSubjects, (classesSubjects)=> classesSubjects.subjects, {onDelete:'CASCADE'})
    subjects: ClassesSubjects
   
}