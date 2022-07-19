import { MigrationInterface, QueryRunner } from "typeorm"

export class categoryM2m1658254949560 implements MigrationInterface {
  name = "categoryM2m1658254949560"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP CONSTRAINT "FK_9583badca4402f01779423b53f6"
          `)
    await queryRunner.query(`
              CREATE TABLE "restaurant_categories" (
                  "restaurant_id" integer NOT NULL,
                  "category_id" integer NOT NULL,
                  CONSTRAINT "PK_bd328522c1774ba2c90c9528161" PRIMARY KEY ("restaurant_id", "category_id")
              )
          `)
    await queryRunner.query(`
              CREATE INDEX "IDX_58d6d92d6ed0c45e64dea53820" ON "restaurant_categories" ("restaurant_id")
          `)
    await queryRunner.query(`
              CREATE INDEX "IDX_0614424df3d0d9faf8a79cb49d" ON "restaurant_categories" ("category_id")
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP COLUMN "category_id"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurant_categories"
              ADD CONSTRAINT "FK_58d6d92d6ed0c45e64dea538204" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE
              SET NULL ON UPDATE CASCADE
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurant_categories"
              ADD CONSTRAINT "FK_0614424df3d0d9faf8a79cb49df" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE
          `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "restaurant_categories" DROP CONSTRAINT "FK_0614424df3d0d9faf8a79cb49df"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurant_categories" DROP CONSTRAINT "FK_58d6d92d6ed0c45e64dea538204"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD "category_id" integer
          `)
    await queryRunner.query(`
              DROP INDEX "public"."IDX_0614424df3d0d9faf8a79cb49d"
          `)
    await queryRunner.query(`
              DROP INDEX "public"."IDX_58d6d92d6ed0c45e64dea53820"
          `)
    await queryRunner.query(`
              DROP TABLE "restaurant_categories"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD CONSTRAINT "FK_9583badca4402f01779423b53f6" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE
              SET NULL ON UPDATE NO ACTION
          `)
  }
}
