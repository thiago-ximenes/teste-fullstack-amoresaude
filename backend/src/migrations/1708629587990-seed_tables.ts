import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcryptjs";

export class SeedTables1708629587990 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
        const encryptedPassword = await bcrypt.hash('123123123', 10);

        await queryRunner.manager.insert('user', {
            name: 'admin',
            email: 'test@example.com',
            password: encryptedPassword
        });

        const specialties = [
            { label: 'Nefrologia' },
            { label: 'Cardiologia' },
            { label: 'Otorrinolaringologia' },
            { label: 'Anestesiologia' },
            { label: 'Ginecologia' },
            { label: 'Oftalmologia' },
            { label: 'Gastroenterologia' },
            { label: 'Endocrinologia' },
            { label: 'Dermatologia' },
            { label: 'Alergologia' },
            { label: 'Hematologia' },
            { label: 'Geriatria' },
            { label: 'Urologia' },
            { label: 'Mastologia' },
            { label: 'Infectologia' },
            { label: 'Clínica Médica' },
            { label: 'Neurologia' },
            { label: 'Ortopedia' },
            { label: 'Pediatria' },
            { label: 'Angiologia' }
        ];

        for (const specialty of specialties) {
            await queryRunner.manager.insert('attended_medical_specialties', specialty);
        }

        const regions = [
            { label: 'SUL' },
            { label: 'Nacional' },
            { label: 'RJ' },
            { label: 'NE1' },
            { label: 'NE2' },
            { label: 'ES' },
            { label: 'SP Interior' },
            { label: 'MG' },
            { label: 'Alto tietê' },
            { label: 'SP1' },
            { label: 'SP2' },
            { label: 'SP CAV' },
            { label: 'Interior' },
            { label: 'Norte' },
            { label: 'SP2' },
            { label: 'SP' }
        ];

        for (const region of regions) {
            await queryRunner.manager.insert('regional', region);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

