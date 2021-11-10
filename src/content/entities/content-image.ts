import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Content } from "./content";



@Entity({name:'content_image'})
export class ContentImage{

    @PrimaryGeneratedColumn({type:'int',name:'id'})
    id:number;

    @Column({name:'path',nullable: false})
    path:string;

    @ManyToOne(()=> Content,(content) => content.contentImages)
    @JoinColumn([{name:'content_id',referencedColumnName:'id'}])
    content:Content;

}