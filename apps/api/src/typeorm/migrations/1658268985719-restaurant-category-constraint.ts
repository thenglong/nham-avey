import { MigrationInterface, QueryRunner } from "typeorm"

export class restaurantCategoryConstraint1658268985719 implements MigrationInterface {
  name = "restaurantCategoryConstraint1658268985719"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "restaurant_categories" DROP CONSTRAINT "FK_0614424df3d0d9faf8a79cb49df"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurant_categories"
              ADD CONSTRAINT "FK_0614424df3d0d9faf8a79cb49df" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "restaurant_categories" DROP CONSTRAINT "FK_0614424df3d0d9faf8a79cb49df"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurant_categories"
              ADD CONSTRAINT "FK_0614424df3d0d9faf8a79cb49df" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE
          `)
  }
}
