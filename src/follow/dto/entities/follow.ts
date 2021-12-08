import { User } from "src/user/entities/user";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity({ name: 'Follow' })
export class Follow {

    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @ManyToOne(() => User)
    @Column({ name: 'user_id' })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User

    @ManyToOne(() => User)
    @JoinColumn({ name: 'follower_id', referencedColumnName: 'id' })
    follower: User


}