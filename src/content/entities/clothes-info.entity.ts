import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClothesInfoDto } from "../dto/clothes-info.dto";
import { ClothesInfoImage } from "./clothes-info-image.entity";
import { Content } from "./content";





@Entity({ name: 'clothes_info' })
export class ClothesInfo {


    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'brand_name' })
    brandName: string;

    @Column('varchar', { name: 'name' })
    name: string;

    @Column('int', { name: 'price' })
    price: number;

    @Column('varchar', { name: 'size' })
    size: string;

    @Column('varchar', { name: 'comment' })
    comment: string;

    @ManyToOne(() => Content, (content) => content.clohtesInfos)
    @JoinColumn({ name: 'content_id', referencedColumnName: 'id' })
    content: Content;

    @ManyToOne(() => ClothesInfoImage,{cascade:true})
    @JoinColumn({ name: 'image_id', referencedColumnName: 'id', })
    clothesInfoImage: ClothesInfoImage;

    static create(dto: ClothesInfoDto, content: Content, clothesInfoImage: ClothesInfoImage) {
        let clotheInfo = new ClothesInfo;
        clotheInfo.brandName = dto.brandName;
        clotheInfo.comment = dto.comment;
        clotheInfo.price = dto.price;
        clotheInfo.size = dto.size;
        clotheInfo.clothesInfoImage = clothesInfoImage;
        clotheInfo.name = dto.name;
        clotheInfo.content = content;
        return clotheInfo;
    }

}