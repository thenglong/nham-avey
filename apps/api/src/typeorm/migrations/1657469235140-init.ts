import { MigrationInterface, QueryRunner } from "typeorm"

export class init1657469235140 implements MigrationInterface {
  name = "init1657469235140"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              CREATE TABLE "dish" (
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
                  CONSTRAINT "PK_59ac7b35af39b231276bfc4c00c" PRIMARY KEY ("id")
              )
          `)
    await queryRunner.query(`
              CREATE TABLE "order_item" (
                  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                  "deleted_at" TIMESTAMP WITH TIME ZONE,
                  "id" SERIAL NOT NULL,
                  "options" json,
                  "dish_id" integer,
                  CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id")
              )
          `)
    await queryRunner.query(`
              CREATE TABLE "payment" (
                  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                  "deleted_at" TIMESTAMP WITH TIME ZONE,
                  "id" SERIAL NOT NULL,
                  "transaction_id" character varying NOT NULL,
                  "user_id" character varying,
                  "restaurant_id" integer,
                  CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id")
              )
          `)
    await queryRunner.query(`
              CREATE TYPE "public"."user_roles_enum" AS ENUM('Admin', 'Customer', 'Vendor', 'Driver')
          `)
    await queryRunner.query(`
              CREATE TABLE "user" (
                  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                  "deleted_at" TIMESTAMP WITH TIME ZONE,
                  "id" character varying NOT NULL,
                  "email" character varying NOT NULL,
                  "roles" "public"."user_roles_enum" array NOT NULL DEFAULT '{Customer}',
                  "verified" boolean NOT NULL DEFAULT false,
                  CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                  CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
              )
          `)
    await queryRunner.query(`
              CREATE TYPE "public"."order_status_enum" AS ENUM(
                  'Pending',
                  'Cooking',
                  'Cooked',
                  'PickedUp',
                  'Delivered'
              )
          `)
    await queryRunner.query(`
              CREATE TABLE "order" (
                  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                  "deleted_at" TIMESTAMP WITH TIME ZONE,
                  "id" SERIAL NOT NULL,
                  "total" integer,
                  "status" "public"."order_status_enum" NOT NULL DEFAULT 'Pending',
                  "customer_id" character varying,
                  "driver_id" character varying,
                  "restaurant_id" integer,
                  CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
              )
          `)
    await queryRunner.query(`
              CREATE TABLE "restaurant" (
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
                  "owner_id" character varying,
                  CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id")
              )
          `)
    await queryRunner.query(`
              CREATE TABLE "category" (
                  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                  "deleted_at" TIMESTAMP WITH TIME ZONE,
                  "id" SERIAL NOT NULL,
                  "name" character varying NOT NULL,
                  "cover_image_url" character varying,
                  "slug" character varying NOT NULL,
                  CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"),
                  CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70" UNIQUE ("slug"),
                  CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")
              )
          `)
    await queryRunner.query(`
              CREATE TABLE "order_items_order_item" (
                  "order_id" integer NOT NULL,
                  "order_item_id" integer NOT NULL,
                  CONSTRAINT "PK_ba394eb74a29ef7cb8b0e4ec216" PRIMARY KEY ("order_id", "order_item_id")
              )
          `)
    await queryRunner.query(`
              CREATE INDEX "IDX_94dad94f7a49b70ded8e477eae" ON "order_items_order_item" ("order_id")
          `)
    await queryRunner.query(`
              CREATE INDEX "IDX_3d6e0121c4c5a069a7512bec35" ON "order_items_order_item" ("order_item_id")
          `)
    await queryRunner.query(`
              ALTER TABLE "dish"
              ADD CONSTRAINT "FK_54a6dff62586657498ee29f83ce" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "order_item"
              ADD CONSTRAINT "FK_1c8211d2f1e3a0e3548b1d8af1c" FOREIGN KEY ("dish_id") REFERENCES "dish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "payment"
              ADD CONSTRAINT "FK_c66c60a17b56ec882fcd8ec770b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "payment"
              ADD CONSTRAINT "FK_ba8f7f44c7d060dc89c5118860c" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "order"
              ADD CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE
              SET NULL ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "order"
              ADD CONSTRAINT "FK_71e6299877e37f03f2a00527fff" FOREIGN KEY ("driver_id") REFERENCES "user"("id") ON DELETE
              SET NULL ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "order"
              ADD CONSTRAINT "FK_3edfcab660a53a1ac59e0e51911" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE
              SET NULL ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurant"
              ADD CONSTRAINT "FK_848ac5e4e3e511560d07e36a257" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE
              SET NULL ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurant"
              ADD CONSTRAINT "FK_fe7a22ecf454b7168b5a37fbdce" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "order_items_order_item"
              ADD CONSTRAINT "FK_94dad94f7a49b70ded8e477eae9" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE
          `)
    await queryRunner.query(`
              ALTER TABLE "order_items_order_item"
              ADD CONSTRAINT "FK_3d6e0121c4c5a069a7512bec35a" FOREIGN KEY ("order_item_id") REFERENCES "order_item"("id") ON DELETE CASCADE ON UPDATE CASCADE
          `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "order_items_order_item" DROP CONSTRAINT "FK_3d6e0121c4c5a069a7512bec35a"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_items_order_item" DROP CONSTRAINT "FK_94dad94f7a49b70ded8e477eae9"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurant" DROP CONSTRAINT "FK_fe7a22ecf454b7168b5a37fbdce"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurant" DROP CONSTRAINT "FK_848ac5e4e3e511560d07e36a257"
          `)
    await queryRunner.query(`
              ALTER TABLE "order" DROP CONSTRAINT "FK_3edfcab660a53a1ac59e0e51911"
          `)
    await queryRunner.query(`
              ALTER TABLE "order" DROP CONSTRAINT "FK_71e6299877e37f03f2a00527fff"
          `)
    await queryRunner.query(`
              ALTER TABLE "order" DROP CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0"
          `)
    await queryRunner.query(`
              ALTER TABLE "payment" DROP CONSTRAINT "FK_ba8f7f44c7d060dc89c5118860c"
          `)
    await queryRunner.query(`
              ALTER TABLE "payment" DROP CONSTRAINT "FK_c66c60a17b56ec882fcd8ec770b"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_item" DROP CONSTRAINT "FK_1c8211d2f1e3a0e3548b1d8af1c"
          `)
    await queryRunner.query(`
              ALTER TABLE "dish" DROP CONSTRAINT "FK_54a6dff62586657498ee29f83ce"
          `)
    await queryRunner.query(`
              DROP INDEX "public"."IDX_3d6e0121c4c5a069a7512bec35"
          `)
    await queryRunner.query(`
              DROP INDEX "public"."IDX_94dad94f7a49b70ded8e477eae"
          `)
    await queryRunner.query(`
              DROP TABLE "order_items_order_item"
          `)
    await queryRunner.query(`
              DROP TABLE "category"
          `)
    await queryRunner.query(`
              DROP TABLE "restaurant"
          `)
    await queryRunner.query(`
              DROP TABLE "order"
          `)
    await queryRunner.query(`
              DROP TYPE "public"."order_status_enum"
          `)
    await queryRunner.query(`
              DROP TABLE "user"
          `)
    await queryRunner.query(`
              DROP TYPE "public"."user_roles_enum"
          `)
    await queryRunner.query(`
              DROP TABLE "payment"
          `)
    await queryRunner.query(`
              DROP TABLE "order_item"
          `)
    await queryRunner.query(`
              DROP TABLE "dish"
          `)
  }
}
