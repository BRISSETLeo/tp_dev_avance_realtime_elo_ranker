import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm"

@Entity()
export class Player extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    rank: number;
}