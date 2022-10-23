/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class File{
    @PrimaryColumn({
        nullable: false,
        unique: true
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
    folder_id: string;


    @Column({
        nullable: false,
    })
    owner_id: string;


    @Column({
        nullable: false,
    })
    extension: string;


    @Column({
        nullable: true,
        unique: false,
    })
    content: string;


    @Column('date',{
        nullable: false,
        unique: false,
    })
    created_at: Date;
}


