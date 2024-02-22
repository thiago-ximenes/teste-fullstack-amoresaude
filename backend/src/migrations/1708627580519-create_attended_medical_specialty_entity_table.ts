import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAttendedMedicalSpecialtyEntityTable1708627580519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'attendedMedicalSpecialtiesEntity',
            columns: [
                {
                    name: 'entityId',
                    type: 'int',
                },
                {
                    name: 'attendedMedicalSpecialtiesId',
                    type: 'varchar',
                    length: '38',
                },
            ],
        }), true)

        await queryRunner.createForeignKeys('attendedMedicalSpecialtiesEntity', [
            new TableForeignKey({
                columnNames: ['entityId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'entity',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['attendedMedicalSpecialtiesId'],
                referencedColumnNames: ['value'],
                referencedTableName: 'attended_medical_specialties',
                onDelete: 'CASCADE',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('attendedMedicalSpecialtiesEntity');
        const foreignKeys = table.foreignKeys.filter(fk => fk.columnNames.indexOf('entityId') !== -1 || fk.columnNames.indexOf('attendedMedicalSpecialtiesId') !== -1);
        for (const foreignKey of foreignKeys) {
            await queryRunner.dropForeignKey('attendedMedicalSpecialtiesEntity', foreignKey);
        }
        await queryRunner.dropTable('attendedMedicalSpecialtiesEntity');
    }

}
