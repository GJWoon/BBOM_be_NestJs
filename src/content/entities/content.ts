import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ContentImage } from "./content-image";
import { ContentLike } from "./content-like";




@Entity({ name: 'content', schema: 'BBOM' })
export class Content {

    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'content' })
    content: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column('boolean', { name: 'isBodyStyleShow' })
    isBodyStyleShow: boolean;

    @OneToMany(() => ContentImage, (contentImages) => contentImages.content)
    contentImages: ContentImage[];

    @OneToMany(() => ContentLike, (contentLikes) => contentLikes.content)
    contentLikes: ContentLike[];



}