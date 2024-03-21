import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1710387514829 implements MigrationInterface {
    name = 'NewMigration1710387514829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courses" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "courseId" varchar NOT NULL, "startTime" integer NOT NULL, "endTime" integer NOT NULL, "date" varchar NOT NULL, "teacherId" varchar NOT NULL, "quantity" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "student_course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "studentId" varchar NOT NULL, "courseId" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" varchar NOT NULL, "roleId" integer NOT NULL, "fullName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "address" varchar NOT NULL, "phoneNumber" integer NOT NULL, "gender" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fullName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_student_course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "studentId" varchar NOT NULL, "courseId" integer NOT NULL, "userId" integer, CONSTRAINT "FK_10a2e930120da62230ad8edafe9" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_01b917cdbb6a420e3857788da1b" FOREIGN KEY ("courseId") REFERENCES "courses" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_student_course"("id", "studentId", "courseId", "userId") SELECT "id", "studentId", "courseId", "userId" FROM "student_course"`);
        await queryRunner.query(`DROP TABLE "student_course"`);
        await queryRunner.query(`ALTER TABLE "temporary_student_course" RENAME TO "student_course"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_course" RENAME TO "temporary_student_course"`);
        await queryRunner.query(`CREATE TABLE "student_course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "studentId" varchar NOT NULL, "courseId" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "student_course"("id", "studentId", "courseId", "userId") SELECT "id", "studentId", "courseId", "userId" FROM "temporary_student_course"`);
        await queryRunner.query(`DROP TABLE "temporary_student_course"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "student_course"`);
        await queryRunner.query(`DROP TABLE "courses"`);
    }

}
