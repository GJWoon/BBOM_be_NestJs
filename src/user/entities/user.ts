import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'user'})
export class User{

    @PrimaryGeneratedColumn({name:'id',type:'int'})
    id:number;

    @Column('varchar',{name:'nickName'})
    nickName:string;
    
    @Column('varchar',{name:'email',unique:true})
    email:string;

    @Column('varchar',{name:'phone'})
    phone:string;

    
}