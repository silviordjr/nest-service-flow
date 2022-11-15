import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class crateUsersTable1668483749159 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        length: '255',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                      },
                      {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                      },
                      {
                        name: 'login',
                        type: 'varchar',
                        length: '255',
                        isUnique: true,
                      },
                      {
                        name: 'password',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                      },
                      {
                        name: 'role',
                        type: 'enum',
                        enum: ['CLIENT', 'PROFESSIONAL'],
                        default: '"CLIENT"',
                      },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
