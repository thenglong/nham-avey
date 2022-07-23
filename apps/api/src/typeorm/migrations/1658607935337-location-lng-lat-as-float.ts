import { MigrationInterface, QueryRunner } from "typeorm"

export class locationLngLatAsFloat1658607935337 implements MigrationInterface {
  name = "locationLngLatAsFloat1658607935337"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "locations" DROP COLUMN "latitude"
          `)
    await queryRunner.query(`
              ALTER TABLE "locations"
              ADD "latitude" double precision NOT NULL
          `)
    await queryRunner.query(`
              ALTER TABLE "locations" DROP COLUMN "longitude"
          `)
    await queryRunner.query(`
              ALTER TABLE "locations"
              ADD "longitude" double precision NOT NULL
          `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "locations" DROP COLUMN "longitude"
          `)
    await queryRunner.query(`
              ALTER TABLE "locations"
              ADD "longitude" integer NOT NULL
          `)
    await queryRunner.query(`
              ALTER TABLE "locations" DROP COLUMN "latitude"
          `)
    await queryRunner.query(`
              ALTER TABLE "locations"
              ADD "latitude" integer NOT NULL
          `)
  }
}
