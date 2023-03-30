import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity({name: 'schools'})
export class Schools{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    name: string;

    @OneToMany(()=>User, (user)=> user.schools, {onDelete:'CASCADE'})
    user: User
}