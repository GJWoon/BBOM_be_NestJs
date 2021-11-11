import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {


    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @Column('varchar', { name: 'nickName' })
    nickName: string;

    @Column('varchar', { name: 'email', unique: true })
    email: string;

    @Column('varchar', { name: 'phone' })
    phone: string;

    @Column('varchar', { name: 'password' })
    password: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
    
    constructor(nickName: string, email: string, phone: string, hashpassword: string) {
        this.email = email;
        this.nickName = nickName;
        this.phone = phone;
        this.password = hashpassword;
    }


}