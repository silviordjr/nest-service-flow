import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, JoinColumn } from "typeorm";

@Entity({name: 'services'})
export class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(type => User, service => Service)
    @JoinColumn({name: 'user_id'})
    user: User

    @Column()
    name: string;

    @Column()
    amount: number;

    @Column()
    commission: number

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @CreateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @Column({name: 'professional_id'})
    professionalId: string;
}
