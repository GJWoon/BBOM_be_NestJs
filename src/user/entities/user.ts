import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'user', synchronize: true })
export class User {


    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @Column({ name: 'nickName' })
    nickName: string;

    @Column('varchar', { name: 'email', unique: true })
    email: string;

    @Column('varchar', { name: 'phone' })
    phone: string;

    @Column({ name: 'password', type: 'varchar' })
    password: string;

    @Column()
    profileImage: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    constructor(email: string, nickName: string, phone: string, hashpassword: string) {
        this.email = email;
        this.nickName = nickName;
        this.phone = phone;
        this.password = hashpassword;
    }


}