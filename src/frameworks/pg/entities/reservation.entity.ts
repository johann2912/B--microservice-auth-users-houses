import { Timestamp } from "./timestamp.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { House } from "./house.entity";

@Entity()
export class Reservation extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({type: Date})
    dateStart?: Date;
    @Column({type: Date})
    dateEnd?: Date;
    @Column({type:String})
    discountCode?:string
    @ManyToOne(
        (_type) => User, user => user.reservation
    )
    user?: User;
    @ManyToOne(
        (_type) => House, house => house.reservation
    )
    house?: House;
 
};