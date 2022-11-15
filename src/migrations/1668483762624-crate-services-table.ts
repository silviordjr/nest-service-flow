import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class crateServicesTable1668483762624 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'services',
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
                        name: 'amount',
                        type: 'float',
                      },
                      {
                        name: 'commission',
                        type: 'float'
                      },
                      {
                        name: 'created_at',
                        type: 'datetime'
                      },
                      {
                        name: 'updated_at',
                        type: 'datetime'
                      },
                      {
                        name: 'client_id',
                        type: 'varchar',
                        length: '255',
                      },
                      {
                        name: 'professional_id',
                        type: 'varchar',
                        length: '255',
                      }
                ]
            })
        )

        const foreignKey = new TableForeignKey({
            columnNames:['client_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'cascade'
        })

        await queryRunner.createForeignKey('services', foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('services');
    }

}
