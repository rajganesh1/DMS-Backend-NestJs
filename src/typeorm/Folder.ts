/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Folder{
    @PrimaryColumn({
        nullable: false,
    })
    id: string;


    @Column({
        nullable: false,
        unique: true,
    })
    name: string;


    @Column({
        nullable: false,
    })
    owner_id: string;


    @Column('date',{
        nullable: true,
    })
    created_at: Date;
}