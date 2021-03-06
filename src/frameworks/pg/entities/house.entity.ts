import { Timestamp } from "./timestamp.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StatusHouse } from "src/lib/enum/status-house/status-home.enum";
import { Reservation } from "./reservation.entity";

@Entity()
export class House extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({type: String})
    countryAndCity?: string;
    @Column({type: String})
    address?: string;
    @Column({type: String, nullable: true})
    area?: string;
    @Column({type: 'enum', enum: StatusHouse, nullable:true})
    statusHouse?: StatusHouse;
    @OneToMany(
        (_type) => Reservation, reservation => reservation.house
    )
    reservation?: Reservation;
};