import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Content } from "./content";

@Entity({name:'content_like'})
export class ContentLike{


    @PrimaryGeneratedColumn({type:'int',name:'id'})
    id:number;

    @ManyToOne(()=>Content,(content)=>content.contentLikes)
    @JoinColumn([{name:'content_id',referencedColumnName:'id'}])
    content:Content;



}