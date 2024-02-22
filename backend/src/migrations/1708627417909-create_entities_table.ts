import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateEntitiesTable1708627417909 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'entity',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'corporateName',
                    type: 'varchar',
                },
                {
                    name: 'tradeName',
                    type: 'varchar',
                },
                {
                    name: 'cnpj',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'regionalValue',
                    type: 'varchar',
                },
                {
                    name: 'openingDate',
                    type: 'timestamp',
                },
                {
                    name: 'active',
                    type: 'boolean',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }), true)

        await queryRunner.createForeignKey('entity', new TableForeignKey({
            columnNames: ['regionalValue'],
            referencedColumnNames: ['value'],
            referencedTableName: 'regional',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
