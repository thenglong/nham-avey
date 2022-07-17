import { MigrationInterface, QueryRunner } from "typeorm";

export class init1658085113278 implements MigrationInterface {
    name = 'init1658085113278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "payments" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" SERIAL NOT NULL,
                "transaction_id" character varying NOT NULL,
                "user_id" character varying,
                "restaurant_id" integer,
                CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."user_role" AS ENUM('Admin', 'Customer', 'Vendor', 'Driver')
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" character varying NOT NULL,
                "email" character varying NOT NULL,
                "roles" "public"."user_role" array NOT NULL DEFAULT '{Customer}',
                "verified" boolean NOT NULL DEFAULT false,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."order_status" AS ENUM(
                'Pending',
                'Cooking',
                'Cooked',
                'PickedUp',
                'Delivered'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "orders" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" SERIAL NOT NULL,
                "total" integer,
                "status" "public"."order_status" NOT NULL DEFAULT 'Pending',
                "customer_id" character varying,
                "driver_id" character varying,
                "restaurant_id" integer,
                CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "categories" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "cover_image_url" character varying,
                "slug" character varying NOT NULL,
                CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"),
                CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug"),
                CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "restaurants" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "cover_img" character varying NOT NULL,
                "address" character varying NOT NULL,
                "is_promoted" boolean NOT NULL DEFAULT false,
                "promoted_until" TIMESTAMP WITH TIME ZONE,
                "category_id" integer,
                "vendor_id" character varying NOT NULL,
                CONSTRAINT "PK_e2133a72eb1cc8f588f7b503e68" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "dishes" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "price" integer NOT NULL,
                "photo" character varying,
                "description" character varying NOT NULL,
                "options" json,
                "restaurant_id" integer,
                CONSTRAINT "PK_f4748c8e8382ad34ef517520b7b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "order_items" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" SERIAL NOT NULL,
                "options" json,
                "dish_id" integer,
                CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "order_order_items" (
                "orders_id" integer NOT NULL,
                "order_items_id" integer NOT NULL,
                CONSTRAINT "PK_2d32789a9eaa1a196f0cb9861bb" PRIMARY KEY ("orders_id", "order_items_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_af2561c7ac6fdb6b941ecdd296" ON "order_order_items" ("orders_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_77531c30b00e2f3095ffec840c" ON "order_order_items" ("order_items_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "payments"
            ADD CONSTRAINT "FK_427785468fb7d2733f59e7d7d39" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "payments"
            ADD CONSTRAINT "FK_d19273a0dd01a303a5d8fcba583" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD CONSTRAINT "FK_222cd7bf166a2d7a6aad9cdebee" FOREIGN KEY ("driver_id") REFERENCES "users"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD CONSTRAINT "FK_85fdda5fcce2f397ef8f117a2c6" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurants"
            ADD CONSTRAINT "FK_9583badca4402f01779423b53f6" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurants"
            ADD CONSTRAINT "FK_f15e63c1240bb4460cd8342fbe2" FOREIGN KEY ("vendor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "dishes"
            ADD CONSTRAINT "FK_70771174ec44463b0478c85915b" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order_items"
            ADD CONSTRAINT "FK_ee9bb257017dd6202e7c95ef5fe" FOREIGN KEY ("dish_id") REFERENCES "dishes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order_order_items"
            ADD CONSTRAINT "FK_af2561c7ac6fdb6b941ecdd2965" FOREIGN KEY ("orders_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "order_order_items"
            ADD CONSTRAINT "FK_77531c30b00e2f3095ffec840ce" FOREIGN KEY ("order_items_id") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order_order_items" DROP CONSTRAINT "FK_77531c30b00e2f3095ffec840ce"
        `);
        await queryRunner.query(`
            ALTER TABLE "order_order_items" DROP CONSTRAINT "FK_af2561c7ac6fdb6b941ecdd2965"
        `);
        await queryRunner.query(`
            ALTER TABLE "order_items" DROP CONSTRAINT "FK_ee9bb257017dd6202e7c95ef5fe"
        `);
        await queryRunner.query(`
            ALTER TABLE "dishes" DROP CONSTRAINT "FK_70771174ec44463b0478c85915b"
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurants" DROP CONSTRAINT "FK_f15e63c1240bb4460cd8342fbe2"
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurants" DROP CONSTRAINT "FK_9583badca4402f01779423b53f6"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" DROP CONSTRAINT "FK_85fdda5fcce2f397ef8f117a2c6"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" DROP CONSTRAINT "FK_222cd7bf166a2d7a6aad9cdebee"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" DROP CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9"
        `);
        await queryRunner.query(`
            ALTER TABLE "payments" DROP CONSTRAINT "FK_d19273a0dd01a303a5d8fcba583"
        `);
        await queryRunner.query(`
            ALTER TABLE "payments" DROP CONSTRAINT "FK_427785468fb7d2733f59e7d7d39"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_77531c30b00e2f3095ffec840c"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_af2561c7ac6fdb6b941ecdd296"
        `);
        await queryRunner.query(`
            DROP TABLE "order_order_items"
        `);
        await queryRunner.query(`
            DROP TABLE "order_items"
        `);
        await queryRunner.query(`
            DROP TABLE "dishes"
        `);
        await queryRunner.query(`
            DROP TABLE "restaurants"
        `);
        await queryRunner.query(`
            DROP TABLE "categories"
        `);
        await queryRunner.query(`
            DROP TABLE "orders"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."order_status"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_role"
        `);
        await queryRunner.query(`
            DROP TABLE "payments"
        `);
    }

}
