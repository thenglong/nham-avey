import { MigrationInterface, QueryRunner } from "typeorm"

export class init1654421277377 implements MigrationInterface {
  name = "init1654421277377"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "category" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "coverImg" character varying,
                "slug" character varying NOT NULL,
                CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"),
                CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70" UNIQUE ("slug"),
                CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "payment" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "transactionId" character varying NOT NULL,
                "userId" integer,
                "restaurantId" integer,
                CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum" AS ENUM('Client', 'Owner', 'Delivery')
        `)
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "role" "public"."user_role_enum" NOT NULL,
                "verified" boolean NOT NULL DEFAULT false,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "restaurant" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "coverImg" character varying NOT NULL,
                "address" character varying NOT NULL,
                "isPromoted" boolean NOT NULL DEFAULT false,
                "promotedUntil" TIMESTAMP WITH TIME ZONE,
                "categoryId" integer,
                "ownerId" integer,
                CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "dish" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "price" integer NOT NULL,
                "photo" character varying,
                "description" character varying NOT NULL,
                "options" json,
                "restaurantId" integer,
                CONSTRAINT "PK_59ac7b35af39b231276bfc4c00c" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "order_item" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "options" json,
                "dishId" integer,
                CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id")
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
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "total" integer,
                "status" "public"."order_status_enum" NOT NULL DEFAULT 'Pending',
                "customerId" integer,
                "driverId" integer,
                "restaurantId" integer,
                CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "verification" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "code" character varying NOT NULL,
                "userId" integer,
                CONSTRAINT "REL_8300048608d8721aea27747b07" UNIQUE ("userId"),
                CONSTRAINT "PK_f7e3a90ca384e71d6e2e93bb340" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "order_items_order_item" (
                "orderId" integer NOT NULL,
                "orderItemId" integer NOT NULL,
                CONSTRAINT "PK_47e772f9eee1a381c1ac49a5493" PRIMARY KEY ("orderId", "orderItemId")
            )
        `)
    await queryRunner.query(`
            CREATE INDEX "IDX_92da8ddb745c9937cb97e74f56" ON "order_items_order_item" ("orderId")
        `)
    await queryRunner.query(`
            CREATE INDEX "IDX_a25840cab46360d68745e42231" ON "order_items_order_item" ("orderItemId")
        `)
    await queryRunner.query(`
            ALTER TABLE "payment"
            ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "payment"
            ADD CONSTRAINT "FK_2ae1a39e01661d5b476e87c7e5b" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "restaurant"
            ADD CONSTRAINT "FK_735a127e301c95ee77eb7ff83f1" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "restaurant"
            ADD CONSTRAINT "FK_315af20ce2dd3e52d28fba79fab" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "dish"
            ADD CONSTRAINT "FK_3bf1369e81b12358ba268f7f689" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "order_item"
            ADD CONSTRAINT "FK_409cece64e6551e947e4a9df47b" FOREIGN KEY ("dishId") REFERENCES "dish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_8cbf856839ddca842f21b804a91" FOREIGN KEY ("driverId") REFERENCES "user"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_c93f22720c77241d2476c07cabf" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "verification"
            ADD CONSTRAINT "FK_8300048608d8721aea27747b07a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "order_items_order_item"
            ADD CONSTRAINT "FK_92da8ddb745c9937cb97e74f56c" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `)
    await queryRunner.query(`
            ALTER TABLE "order_items_order_item"
            ADD CONSTRAINT "FK_a25840cab46360d68745e42231d" FOREIGN KEY ("orderItemId") REFERENCES "order_item"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "order_items_order_item" DROP CONSTRAINT "FK_a25840cab46360d68745e42231d"
        `)
    await queryRunner.query(`
            ALTER TABLE "order_items_order_item" DROP CONSTRAINT "FK_92da8ddb745c9937cb97e74f56c"
        `)
    await queryRunner.query(`
            ALTER TABLE "verification" DROP CONSTRAINT "FK_8300048608d8721aea27747b07a"
        `)
    await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_c93f22720c77241d2476c07cabf"
        `)
    await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_8cbf856839ddca842f21b804a91"
        `)
    await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"
        `)
    await queryRunner.query(`
            ALTER TABLE "order_item" DROP CONSTRAINT "FK_409cece64e6551e947e4a9df47b"
        `)
    await queryRunner.query(`
            ALTER TABLE "dish" DROP CONSTRAINT "FK_3bf1369e81b12358ba268f7f689"
        `)
    await queryRunner.query(`
            ALTER TABLE "restaurant" DROP CONSTRAINT "FK_315af20ce2dd3e52d28fba79fab"
        `)
    await queryRunner.query(`
            ALTER TABLE "restaurant" DROP CONSTRAINT "FK_735a127e301c95ee77eb7ff83f1"
        `)
    await queryRunner.query(`
            ALTER TABLE "payment" DROP CONSTRAINT "FK_2ae1a39e01661d5b476e87c7e5b"
        `)
    await queryRunner.query(`
            ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"
        `)
    await queryRunner.query(`
            DROP INDEX "public"."IDX_a25840cab46360d68745e42231"
        `)
    await queryRunner.query(`
            DROP INDEX "public"."IDX_92da8ddb745c9937cb97e74f56"
        `)
    await queryRunner.query(`
            DROP TABLE "order_items_order_item"
        `)
    await queryRunner.query(`
            DROP TABLE "verification"
        `)
    await queryRunner.query(`
            DROP TABLE "order"
        `)
    await queryRunner.query(`
            DROP TYPE "public"."order_status_enum"
        `)
    await queryRunner.query(`
            DROP TABLE "order_item"
        `)
    await queryRunner.query(`
            DROP TABLE "dish"
        `)
    await queryRunner.query(`
            DROP TABLE "restaurant"
        `)
    await queryRunner.query(`
            DROP TABLE "user"
        `)
    await queryRunner.query(`
            DROP TYPE "public"."user_role_enum"
        `)
    await queryRunner.query(`
            DROP TABLE "payment"
        `)
    await queryRunner.query(`
            DROP TABLE "category"
        `)
  }
}
