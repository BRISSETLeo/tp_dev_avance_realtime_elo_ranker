import { BaseEntity } from "typeorm";
export declare class Match extends BaseEntity {
    id: number;
    winner: string;
    loser: string;
}
