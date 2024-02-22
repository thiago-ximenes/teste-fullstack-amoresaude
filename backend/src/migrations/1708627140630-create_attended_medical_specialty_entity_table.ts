import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAttendedMedicalSpecialtyEntityTable1708627140630 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'attended_medical_specialties',
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
            CREATE TRIGGER generate_uuid_for_attended_medical_specialties
            BEFORE INSERT ON attended_medical_specialties
            FOR EACH ROW
            SET NEW.value = UUID();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('attended_medical_specialties');
    }

}
