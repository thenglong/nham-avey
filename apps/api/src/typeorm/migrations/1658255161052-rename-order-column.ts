import { MigrationInterface, QueryRunner } from "typeorm"

export class renameOrderColumn1658255161052 implements MigrationInterface {
  name = "renameOrderColumn1658255161052"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "order_order_items" DROP CONSTRAINT "FK_af2561c7ac6fdb6b941ecdd2965"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items" DROP CONSTRAINT "FK_77531c30b00e2f3095ffec840ce"
          `)
    await queryRunner.query(`
              DROP INDEX "public"."IDX_af2561c7ac6fdb6b941ecdd296"
          `)
    await queryRunner.query(`
              DROP INDEX "public"."IDX_77531c30b00e2f3095ffec840c"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items" DROP CONSTRAINT "PK_2d32789a9eaa1a196f0cb9861bb"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items"
              ADD CONSTRAINT "PK_77531c30b00e2f3095ffec840ce" PRIMARY KEY ("order_items_id")
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items" DROP COLUMN "orders_id"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items" DROP CONSTRAINT "PK_77531c30b00e2f3095ffec840ce"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items" DROP COLUMN "order_items_id"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items"
              ADD "order_id" integer NOT NULL
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items"
              ADD CONSTRAINT "PK_b8de50eae8b76e02a14782da30b" PRIMARY KEY ("order_id")
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items"
              ADD "order_item_id" integer NOT NULL
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items" DROP CONSTRAINT "PK_b8de50eae8b76e02a14782da30b"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items"
              ADD CONSTRAINT "PK_fe13cf4e57f2ce1c1747fcfe7f3" PRIMARY KEY ("order_id", "order_item_id")
          `)
    await queryRunner.query(`
              CREATE INDEX "IDX_b8de50eae8b76e02a14782da30" ON "order_order_items" ("order_id")
          `)
    await queryRunner.query(`
              CREATE INDEX "IDX_800aa63d0f4dfdc8396be33e38" ON "order_order_items" ("order_item_id")
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items"
              ADD CONSTRAINT "FK_b8de50eae8b76e02a14782da30b" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items"
              ADD CONSTRAINT "FK_800aa63d0f4dfdc8396be33e384" FOREIGN KEY ("order_item_id") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE
          `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "order_order_items" DROP CONSTRAINT "FK_800aa63d0f4dfdc8396be33e384"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items" DROP CONSTRAINT "FK_b8de50eae8b76e02a14782da30b"
          `)
    await queryRunner.query(`
              DROP INDEX "public"."IDX_800aa63d0f4dfdc8396be33e38"
          `)
    await queryRunner.query(`
              DROP INDEX "public"."IDX_b8de50eae8b76e02a14782da30"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items" DROP CONSTRAINT "PK_fe13cf4e57f2ce1c1747fcfe7f3"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items"
              ADD CONSTRAINT "PK_b8de50eae8b76e02a14782da30b" PRIMARY KEY ("order_id")
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items" DROP COLUMN "order_item_id"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items" DROP CONSTRAINT "PK_b8de50eae8b76e02a14782da30b"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items" DROP COLUMN "order_id"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items"
              ADD "order_items_id" integer NOT NULL
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items"
              ADD CONSTRAINT "PK_77531c30b00e2f3095ffec840ce" PRIMARY KEY ("order_items_id")
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items"
              ADD "orders_id" integer NOT NULL
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items" DROP CONSTRAINT "PK_77531c30b00e2f3095ffec840ce"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items"
              ADD CONSTRAINT "PK_2d32789a9eaa1a196f0cb9861bb" PRIMARY KEY ("orders_id", "order_items_id")
          `)
    await queryRunner.query(`
              CREATE INDEX "IDX_77531c30b00e2f3095ffec840c" ON "order_order_items" ("order_items_id")
          `)
    await queryRunner.query(`
              CREATE INDEX "IDX_af2561c7ac6fdb6b941ecdd296" ON "order_order_items" ("orders_id")
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items"
              ADD CONSTRAINT "FK_77531c30b00e2f3095ffec840ce" FOREIGN KEY ("order_items_id") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items"
              ADD CONSTRAINT "FK_af2561c7ac6fdb6b941ecdd2965" FOREIGN KEY ("orders_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE
          `)
  }
}
