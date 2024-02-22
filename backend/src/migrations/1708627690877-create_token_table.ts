import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTokenTable1708627690877 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'token',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                    length: '500',
                },
                {
                    name: 'hash',
                    type: 'varchar',
                    isUnique: true,
                    length: '500',
                },
                {
                    name: 'userId',
                    type: 'int',
                },
            ],
        }), true)

        await queryRunner.createForeignKey('token', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('token');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
        await queryRunner.dropForeignKey('token', foreignKey);
        await queryRunner.dropTable('token');
    }


}
