import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBaseTables1746389506311 implements MigrationInterface {
  name = 'AddBaseTables1746389506311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."feedbacks_type_enum" AS ENUM('BUG', 'FEATURE_REQUEST', 'GENERAL', 'SUPPORT')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."feedbacks_status_enum" AS ENUM('PENDING', 'IN_PROGRESS', 'RESOLVED', 'DECLINED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "feedbacks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subject" text NOT NULL, "type" "public"."feedbacks_type_enum" NOT NULL, "message" text NOT NULL, "status" "public"."feedbacks_status_enum" NOT NULL DEFAULT 'PENDING', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "PK_79affc530fdd838a9f1e0cc30be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question_answers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "test_attempt_id" uuid NOT NULL, "question_id" uuid NOT NULL, "answers" jsonb NOT NULL, "is_correct" boolean NOT NULL, "points_earned" integer NOT NULL, CONSTRAINT "PK_5257525a7773e5159714a3eb13c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."questions_type_enum" AS ENUM('MULTIPLE_CHOICE', 'CORRECT_INCORRECT', 'SINGLE_CHOICE', 'TEXT_MATCH')`,
    );
    await queryRunner.query(
      `CREATE TABLE "questions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "test_id" uuid NOT NULL, "type" "public"."questions_type_enum" NOT NULL, "question" text NOT NULL, "options" jsonb, "correct_answers" jsonb NOT NULL, "points" integer NOT NULL DEFAULT '1', "question_order" integer NOT NULL, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "course_id" uuid NOT NULL, "title" text NOT NULL, "min_pass_percentage" integer NOT NULL, "content_order" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_4301ca51edf839623386860aed2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "test_attempts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "test_id" uuid NOT NULL, "user_id" uuid NOT NULL, "score" integer NOT NULL, "max_score" integer NOT NULL, "is_passed" boolean NOT NULL, "completed_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d40272f8162c607f12e76c0a18e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lessons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "course_id" uuid NOT NULL, "title" text NOT NULL, "content" text NOT NULL, "lesson_order" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson_completions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lesson_id" uuid NOT NULL, "user_id" uuid NOT NULL, "completed_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2e5c1e7d0882eafd013035f5430" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'TEACHER', 'STUDENT')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "password" text NOT NULL, "is_banned" boolean NOT NULL DEFAULT false, "full_name" text NOT NULL, "role" "public"."users_role_enum" NOT NULL, "last_active" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "image_url" text, "created_by_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course_enrollments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "course_id" uuid NOT NULL, "user_id" uuid NOT NULL, "enrolled_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_609f6e4f0fc9a6149a35211b380" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "feedbacks" ADD CONSTRAINT "FK_4334f6be2d7d841a9d5205a100e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_answers" ADD CONSTRAINT "FK_7be2950078ac3d57f9d34a682fd" FOREIGN KEY ("test_attempt_id") REFERENCES "test_attempts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_answers" ADD CONSTRAINT "FK_941b909bd831f96c46d389ccde4" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "questions" ADD CONSTRAINT "FK_b1f107600ed9ed81aba56edfcea" FOREIGN KEY ("test_id") REFERENCES "tests"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tests" ADD CONSTRAINT "FK_52bc024ee22a89e4c40f1668790" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_attempts" ADD CONSTRAINT "FK_88b08b09eb90ae8d6afb2147b5e" FOREIGN KEY ("test_id") REFERENCES "tests"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_attempts" ADD CONSTRAINT "FK_193bbf9a4f34822e0aa41fefc92" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD CONSTRAINT "FK_3c4e299cf8ed04093935e2e22fe" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_completions" ADD CONSTRAINT "FK_bdcedea316987f7483035423e9a" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_completions" ADD CONSTRAINT "FK_1fc9a8f84304a421c1b0aa2d15a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_5ddfd7dc6bf96ce236cd9359282" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_enrollments" ADD CONSTRAINT "FK_ac52967707330a4fedfc361f72e" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_enrollments" ADD CONSTRAINT "FK_9d12f69999cde26f955139a5fd6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_enrollments" DROP CONSTRAINT "FK_9d12f69999cde26f955139a5fd6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_enrollments" DROP CONSTRAINT "FK_ac52967707330a4fedfc361f72e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "FK_5ddfd7dc6bf96ce236cd9359282"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_completions" DROP CONSTRAINT "FK_1fc9a8f84304a421c1b0aa2d15a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_completions" DROP CONSTRAINT "FK_bdcedea316987f7483035423e9a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons" DROP CONSTRAINT "FK_3c4e299cf8ed04093935e2e22fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_attempts" DROP CONSTRAINT "FK_193bbf9a4f34822e0aa41fefc92"`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_attempts" DROP CONSTRAINT "FK_88b08b09eb90ae8d6afb2147b5e"`,
    );
    await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_52bc024ee22a89e4c40f1668790"`);
    await queryRunner.query(
      `ALTER TABLE "questions" DROP CONSTRAINT "FK_b1f107600ed9ed81aba56edfcea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_answers" DROP CONSTRAINT "FK_941b909bd831f96c46d389ccde4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_answers" DROP CONSTRAINT "FK_7be2950078ac3d57f9d34a682fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "feedbacks" DROP CONSTRAINT "FK_4334f6be2d7d841a9d5205a100e"`,
    );
    await queryRunner.query(`DROP TABLE "course_enrollments"`);
    await queryRunner.query(`DROP TABLE "courses"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "lesson_completions"`);
    await queryRunner.query(`DROP TABLE "lessons"`);
    await queryRunner.query(`DROP TABLE "test_attempts"`);
    await queryRunner.query(`DROP TABLE "tests"`);
    await queryRunner.query(`DROP TABLE "questions"`);
    await queryRunner.query(`DROP TYPE "public"."questions_type_enum"`);
    await queryRunner.query(`DROP TABLE "question_answers"`);
    await queryRunner.query(`DROP TABLE "feedbacks"`);
    await queryRunner.query(`DROP TYPE "public"."feedbacks_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."feedbacks_type_enum"`);
  }
}
