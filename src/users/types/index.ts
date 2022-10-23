/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-interface */

import { Exclude } from 'class-transformer';
/* eslint-disable prettier/prettier */
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export class SerializedUser{
    id: string;
    name: string;
    email: string;

    @Exclude()
    password: string;


    constructor(partial: Partial<SerializedUser>) {
        Object.assign(this, partial);
    }
}