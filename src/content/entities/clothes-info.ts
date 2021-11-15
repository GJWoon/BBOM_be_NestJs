import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClothesInfoImage } from "./clothes-info-image";
import { Content } from "./content";





@Entity({name:'clothes_info'})
export  class ClothesInfo{


    @PrimaryGeneratedColumn({type:'int',name:'id'})
    id:number;

    @Column('varchar',{name:'brand_name'})
    brandName:string;

    @Column('varchar',{name:'name'})
    name:string;

    @Column('int',{name:'price'})
    price:number;

    @Column('varchar',{name:'size'})
    size:string;

    @Column('varchar',{name:'comment'})
    comment:string;

    @ManyToOne(()=> Content)
    @JoinColumn({name:'content_id',referencedColumnName:'id'}   )
    content:Content;

    @OneToMany(()=>ClothesInfoImage,(clothesInfoImage)=> clothesInfoImage.clothesInfo )
    clothesInfoImage:ClothesInfoImage;

}