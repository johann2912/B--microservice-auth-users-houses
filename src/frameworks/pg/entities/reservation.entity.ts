import { Timestamp } from "./timestamp.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StatusHouse } from "src/lib/enum/status-house/status-home.enum";
import { User } from "./user.entity";
import { House } from "./house.entity";

@Entity()
export class Reservation extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({type: String})
    dateStart: string;
    @Column({type: String})
    dateEnd: string;
    @OneToMany(
        (_type) => User, user => user.reservation
    )
    user: User[];
    @OneToMany(
        (_type) => House, house => house.reservation
    )
    house: House[];
 
};