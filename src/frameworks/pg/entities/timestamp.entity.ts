import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class Timestamp {
    @CreateDateColumn()
    createAt?: Date;
    @UpdateDateColumn()
    updateAt?: Date;
    @DeleteDateColumn()
    deleteAt?: Date;
};