import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schools } from './tables/Schools';
import { User } from './tables/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { SchoolsController } from './controllers/schools/schools.controller';
import { SchoolsService } from './services/schools/schools.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './auth/auth.middleware';
import { Classes } from './tables/Classes';
import { ClassesController } from './controllers/classes/classes.controller';
import { ClassesService } from './services/classes/classes.service';
import { Subjects } from './tables/Subject';
import { SubjectsController } from './controllers/subjects/subjects.controller';
import { SubjectsService } from './services/subjects/subjects.service';
import { StaffController } from './controllers/staff/staff.controller';
import { TeacherSubjects } from './tables/TeacherSubject';
import { TeacherSubjectController } from './controllers/teacher-subject/teacher-subject.controller';
import { TeacherSubjectService } from './services/teacher-subject/teacher-subject.service';
import { StudentClassController } from './controllers/student-class/student-class.controller';
import { StudentClassService } from './services/student-class/student-class.service';
import { StudentClasses } from './tables/StudentClasses';
import { TeacherClassesController } from './controllers/teacher-classes/teacher-classes.controller';
import { TeacherClassesService } from './services/teacher-classes/teacher-classes.service';
import { TeacherClasses } from './tables/TeacherClasses';
import { ClassesSubjectsController } from './controllers/classes-subjects/classes-subjects.controller';
import { ClassesSubjectsService } from './services/classes-subjects/classes-subjects.service';
import { ClassesSubjects } from './tables/ClassesSubjects';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'uploads'),
    // }),
    MulterModule.register({dest: "./uploads"}),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: "localhost",
    port: 3306,
    username: 'root',
    password:'',
    database: 'yunus_school',
    synchronize: true,
    entities: [User, Schools, Classes,Subjects, TeacherSubjects,StudentClasses,TeacherClasses,ClassesSubjects]
  }),
  TypeOrmModule.forFeature([User, Schools, Classes, Subjects, TeacherSubjects,StudentClasses,TeacherClasses,ClassesSubjects]),
  JwtModule.register({
    secret: 'YUNUSSECRET',
    signOptions: {expiresIn: '7d'}
  })
],
  controllers: [UsersController, SchoolsController, ClassesController, SubjectsController, StaffController, TeacherSubjectController, StudentClassController, TeacherClassesController, ClassesSubjectsController],
  providers: [UsersService, SchoolsService, ClassesService, SubjectsService, TeacherSubjectService, StudentClassService, TeacherClassesService, ClassesSubjectsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer
    // .apply(AuthMiddleware).forRoutes(UsersController)
    .apply(AuthMiddleware).forRoutes(SchoolsController)
    .apply(AuthMiddleware).forRoutes(ClassesController)
    .apply(AuthMiddleware).forRoutes(SubjectsController)
    .apply(AuthMiddleware).forRoutes(StaffController)
    .apply(AuthMiddleware).forRoutes(TeacherSubjectController)
    // .apply(AuthMiddleware).forRoutes(StudentClassController)
    .apply(AuthMiddleware).forRoutes(TeacherClassesController)
    .apply(AuthMiddleware).forRoutes(ClassesSubjectsController)


  }
}
