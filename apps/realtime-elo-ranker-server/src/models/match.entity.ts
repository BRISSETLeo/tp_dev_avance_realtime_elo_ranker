import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from "typeorm"

@Entity()
export class Match extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    winner: string

    @Column()
    loser: string
}