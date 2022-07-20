import { MigrationInterface, QueryRunner } from "typeorm";

export class userInfoColumnsAndRestaurantVenderM2m1658325498238 implements MigrationInterface {
    name = 'userInfoColumnsAndRestaurantVenderM2m1658325498238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "restaurants" DROP CONSTRAINT "FK_f15e63c1240bb4460cd8342fbe2"
        `);
        await queryRunner.query(`
            CREATE TABLE "restaurant_vendors" (
                "restaurant_id" integer NOT NULL,
                "vendor_id" character varying NOT NULL,
                CONSTRAINT "PK_3c830ec8f9113babd372bbcb8cd" PRIMARY KEY ("restaurant_id", "vendor_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_7b3eea4758cfe1589012236f3a" ON "restaurant_vendors" ("restaurant_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a77d567e09e742029bfa790f7b" ON "restaurant_vendors" ("vendor_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "verified"
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurants" DROP COLUMN "cover_img"
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurants" DROP COLUMN "vendor_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "first_name" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "last_name" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "photo_url" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "is_verified" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurants"
            ADD "cover_image_urls" character varying array
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurants"
            ADD "logo_image_url" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurant_vendors"
            ADD CONSTRAINT "FK_7b3eea4758cfe1589012236f3a9" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurant_vendors"
            ADD CONSTRAINT "FK_a77d567e09e742029bfa790f7b2" FOREIGN KEY ("vendor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "restaurant_vendors" DROP CONSTRAINT "FK_a77d567e09e742029bfa790f7b2"
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurant_vendors" DROP CONSTRAINT "FK_7b3eea4758cfe1589012236f3a9"
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurants" DROP COLUMN "logo_image_url"
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurants" DROP COLUMN "cover_image_urls"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "is_verified"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "photo_url"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "last_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "first_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurants"
            ADD "vendor_id" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurants"
            ADD "cover_img" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "verified" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_a77d567e09e742029bfa790f7b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_7b3eea4758cfe1589012236f3a"
        `);
        await queryRunner.query(`
            DROP TABLE "restaurant_vendors"
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurants"
            ADD CONSTRAINT "FK_f15e63c1240bb4460cd8342fbe2" FOREIGN KEY ("vendor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
