import { MigrationInterface, QueryRunner } from "typeorm"

export class addRestaurantDetailColumns1658606014015 implements MigrationInterface {
  name = "addRestaurantDetailColumns1658606014015"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              CREATE TABLE "locations" (
                  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                  "deleted_at" TIMESTAMP WITH TIME ZONE,
                  "created_by" character varying(255),
                  "updated_by" character varying(255),
                  "deleted_by" character varying(255),
                  "id" SERIAL NOT NULL,
                  "latitude" integer NOT NULL,
                  "longitude" integer NOT NULL,
                  CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id")
              )
          `)
    await queryRunner.query(`
              CREATE TABLE "cities" (
                  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                  "deleted_at" TIMESTAMP WITH TIME ZONE,
                  "created_by" character varying(255),
                  "updated_by" character varying(255),
                  "deleted_by" character varying(255),
                  "id" SERIAL NOT NULL,
                  "name" character varying NOT NULL,
                  "name_in_khmer" character varying NOT NULL,
                  "location_id" integer,
                  CONSTRAINT "REL_6dc840c57fe076d3bb23dddcf1" UNIQUE ("location_id"),
                  CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id")
              )
          `)
    await queryRunner.query(`
              CREATE TABLE "opening_hours" (
                  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                  "deleted_at" TIMESTAMP WITH TIME ZONE,
                  "created_by" character varying(255),
                  "updated_by" character varying(255),
                  "deleted_by" character varying(255),
                  "id" SERIAL NOT NULL,
                  "monday_hours" character varying,
                  "tuesday_hours" character varying,
                  "wednesday_hours" character varying,
                  "thursday_hours" character varying,
                  "friday_hours" character varying,
                  "saturday_hours" character varying,
                  "sunday_hours" character varying,
                  CONSTRAINT "PK_09415e2b345103b1f5971464f85" PRIMARY KEY ("id")
              )
          `)
    await queryRunner.query(`
              CREATE TABLE "reviews" (
                  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                  "deleted_at" TIMESTAMP WITH TIME ZONE,
                  "created_by" character varying(255),
                  "updated_by" character varying(255),
                  "deleted_by" character varying(255),
                  "id" SERIAL NOT NULL,
                  "name" character varying NOT NULL,
                  "stars" integer NOT NULL,
                  "text" character varying,
                  "customer_id" integer NOT NULL,
                  "restaurant_id" integer,
                  CONSTRAINT "REL_4dd42f48aa60ad8c0d5d5c4ea5" UNIQUE ("customer_id"),
                  CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id")
              )
          `)
    await queryRunner.query(`
              ALTER TABLE "categories"
              ADD "icon_url" character varying
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD "slug" character varying NOT NULL DEFAULT ''
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD "neighborhood" character varying
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD "street" character varying
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD "website" character varying
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD "city_id" integer
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD "location_id" integer
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD CONSTRAINT "UQ_2a011b00d912f08e65cb10d46fe" UNIQUE ("location_id")
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD "opening_hours_id" integer
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD CONSTRAINT "UQ_f01e40603039b0ea7afdb8f9064" UNIQUE ("opening_hours_id")
          `)
    await queryRunner.query(`
              ALTER TABLE "categories" DROP CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878"
          `)
    await queryRunner.query(`
              ALTER TABLE "categories" DROP CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ALTER COLUMN "address" DROP NOT NULL
          `)
    await queryRunner.query(`
              ALTER TABLE "cities"
              ADD CONSTRAINT "FK_6dc840c57fe076d3bb23dddcf15" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "reviews"
              ADD CONSTRAINT "FK_4dd42f48aa60ad8c0d5d5c4ea5b" FOREIGN KEY ("customer_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "reviews"
              ADD CONSTRAINT "FK_2269110d10df8d494b99e1381d2" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD CONSTRAINT "FK_60f31869e557e8d6d49aaa1b1a1" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD CONSTRAINT "FK_2a011b00d912f08e65cb10d46fe" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD CONSTRAINT "FK_f01e40603039b0ea7afdb8f9064" FOREIGN KEY ("opening_hours_id") REFERENCES "opening_hours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP CONSTRAINT "FK_f01e40603039b0ea7afdb8f9064"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP CONSTRAINT "FK_2a011b00d912f08e65cb10d46fe"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP CONSTRAINT "FK_60f31869e557e8d6d49aaa1b1a1"
          `)
    await queryRunner.query(`
              ALTER TABLE "reviews" DROP CONSTRAINT "FK_2269110d10df8d494b99e1381d2"
          `)
    await queryRunner.query(`
              ALTER TABLE "reviews" DROP CONSTRAINT "FK_4dd42f48aa60ad8c0d5d5c4ea5b"
          `)
    await queryRunner.query(`
              ALTER TABLE "cities" DROP CONSTRAINT "FK_6dc840c57fe076d3bb23dddcf15"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ALTER COLUMN "address"
              SET NOT NULL
          `)
    await queryRunner.query(`
              ALTER TABLE "categories"
              ADD CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug")
          `)
    await queryRunner.query(`
              ALTER TABLE "categories"
              ADD CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name")
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP CONSTRAINT "UQ_f01e40603039b0ea7afdb8f9064"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP COLUMN "opening_hours_id"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP CONSTRAINT "UQ_2a011b00d912f08e65cb10d46fe"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP COLUMN "location_id"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP COLUMN "city_id"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP COLUMN "website"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP COLUMN "street"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP COLUMN "neighborhood"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP COLUMN "slug"
          `)
    await queryRunner.query(`
              ALTER TABLE "categories" DROP COLUMN "icon_url"
          `)
    await queryRunner.query(`
              DROP TABLE "reviews"
          `)
    await queryRunner.query(`
              DROP TABLE "opening_hours"
          `)
    await queryRunner.query(`
              DROP TABLE "cities"
          `)
    await queryRunner.query(`
              DROP TABLE "locations"
          `)
  }
}
