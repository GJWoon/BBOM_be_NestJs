import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ContentDto } from "../dto/content.dto";
import { ClothesInfo } from "./clothes-info.entity";
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

    @OneToMany(() => ContentImage, (contentImages) => contentImages.content, { cascade: true, onUpdate: 'RESTRICT' })
    contentImages: ContentImage[];

    @OneToMany(() => ContentLike, (contentLikes) => contentLikes.content)
    contentLikes: ContentLike[];


    @OneToMany(() => ClothesInfo, (clothesInfo) => clothesInfo.content, { cascade: true, onUpdate: 'CASCADE' })
    clohtesInfos: ClothesInfo[];


    static create(dto: ContentDto) {

        let content: Content = new Content;

        content.content = dto.content;
        content.isBodyStyleShow = dto.isBodyStyleShow;
        return content;

    }

}