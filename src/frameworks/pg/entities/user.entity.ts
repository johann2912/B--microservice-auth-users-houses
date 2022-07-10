import { Timestamp } from "./timestamp.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "src/lib/enum/roles/roles.enum";
import { Document } from "src/lib/enum/document/documents.enum";
import { Reservation } from "./reservation.entity";

@Entity()
export class User extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({type: String})
    name: string;
    @Column({type: String})
    lastname: string;
    @Column({type: 'enum', enum: Document})
    documentType: Document
    @Column({type: String, unique:true})
    documentNumber: string;
    @Column({type: String, unique:true})
    email: string;
    @Column({type: String})
    password: string;
    @Column({type: String, nullable:true})
    phone?: string;
    @Column({type: 'enum', enum: Roles})
    role: Roles;
    @OneToMany(
        (_type) => Reservation, reservation => reservation.user
    )
    reservation: Reservation;
};