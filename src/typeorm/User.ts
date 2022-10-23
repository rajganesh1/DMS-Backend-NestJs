/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryColumn({
        nullable: false,
        unique: true
    })
    id: string;


    @Column({
        nullable: false,
        unique: false,
    })
    name: string;


    @Column({
        nullable: false,
        unique: true,
    })
    email: string;


    @Column({
        nullable: false,
        unique: false,
    })
    password: string;
}


