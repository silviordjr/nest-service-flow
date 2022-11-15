import { Service } from "src/services/entities/service.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";

export enum Role {
    Client = 'CLIENT',
    Professional = 'PROFESSIONAL'
}

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(type => Service, user => User )
    service: Service;

    @Column()
    name: string;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    role: Role
}

export type authenticationData = {
    id: string;
    role: Role;
}
