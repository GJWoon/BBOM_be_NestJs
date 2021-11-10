import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ClothesInfo } from "./clothes-info";

@Entity({ name: 'clothes_info_images' })
export class ClothesInfoImage {

    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @ManyToOne(() => ClothesInfo, (clothesInfo) => clothesInfo.clothesInfoImage)
    @JoinColumn([{ name: 'clothesInfo_id', referencedColumnName: 'id' }])
    clothesInfo: ClothesInfo; s

    @Column('varchar', { name: 'path' })
    path: string;


}