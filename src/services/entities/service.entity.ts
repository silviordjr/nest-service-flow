import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";

@Entity({name: 'services'})
export class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    client_id: string

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
