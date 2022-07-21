import { MigrationInterface, QueryRunner } from "typeorm"

export class audit1658372225036 implements MigrationInterface {
  name = "audit1658372225036"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "categories"
              ADD "created_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "categories"
              ADD "updated_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "categories"
              ADD "deleted_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "payments"
              ADD "created_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "payments"
              ADD "updated_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "payments"
              ADD "deleted_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "users"
              ADD "created_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "users"
              ADD "updated_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "users"
              ADD "deleted_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD "created_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD "updated_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD "deleted_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "dishes"
              ADD "created_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "dishes"
              ADD "updated_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "dishes"
              ADD "deleted_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "order_items"
              ADD "created_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "order_items"
              ADD "updated_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "order_items"
              ADD "deleted_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "orders"
              ADD "created_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "orders"
              ADD "updated_by" character varying(255)
          `)
    await queryRunner.query(`
              ALTER TABLE "orders"
              ADD "deleted_by" character varying(255)
          `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "orders" DROP COLUMN "deleted_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "orders" DROP COLUMN "updated_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "orders" DROP COLUMN "created_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_items" DROP COLUMN "deleted_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_items" DROP COLUMN "updated_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_items" DROP COLUMN "created_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "dishes" DROP COLUMN "deleted_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "dishes" DROP COLUMN "updated_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "dishes" DROP COLUMN "created_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP COLUMN "deleted_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP COLUMN "updated_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP COLUMN "created_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "users" DROP COLUMN "deleted_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "users" DROP COLUMN "updated_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "users" DROP COLUMN "created_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "payments" DROP COLUMN "deleted_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "payments" DROP COLUMN "updated_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "payments" DROP COLUMN "created_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "categories" DROP COLUMN "deleted_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "categories" DROP COLUMN "updated_by"
          `)
    await queryRunner.query(`
              ALTER TABLE "categories" DROP COLUMN "created_by"
          `)
  }
}
