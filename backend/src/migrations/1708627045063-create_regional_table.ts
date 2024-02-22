import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRegionalTable1708627045063 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'regional',
            columns: [
                {
                    name: 'value',
                    type: 'varchar',
                    isPrimary: true,
                    length: '38',
                },
                {
                    name: 'label',
                    type: 'varchar',
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

        await queryRunner.query(`
            CREATE TRIGGER generate_uuid_for_regional
            BEFORE INSERT ON regional
            FOR EACH ROW
            SET NEW.value = UUID();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('entity');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('regionalId') !== -1);
        await queryRunner.dropForeignKey('entity', foreignKey);
        await queryRunner.dropColumn('entity', 'regionalId');
        await queryRunner.dropTable('entity');
    }

}
