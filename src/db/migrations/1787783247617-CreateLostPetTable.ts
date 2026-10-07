import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLostPetTable1787783247617 implements MigrationInterface {
    name = 'CreateLostPetTable1787783247617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lostpet" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "race" character varying NOT NULL, "age" integer NOT NULL, "color" character varying NOT NULL, "location" geometry(Point,4326) NOT NULL, CONSTRAINT "PK_edfb3c78db14dd60b1c818ece6a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "lostpet"`);
    }

}
