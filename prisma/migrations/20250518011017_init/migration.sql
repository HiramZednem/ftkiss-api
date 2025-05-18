-- CreateTable
CREATE TABLE "daily_log" (
    "id_daily_log" SERIAL NOT NULL,
    "id_habit" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "status" BOOLEAN,

    CONSTRAINT "daily_log_pkey" PRIMARY KEY ("id_daily_log")
);

-- CreateTable
CREATE TABLE "habits" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_habit" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "habits_pkey" PRIMARY KEY ("id_habit")
);

-- CreateTable
CREATE TABLE "users" (
    "id_user" SERIAL NOT NULL,
    "name" VARCHAR,
    "lastname" VARCHAR,
    "email" VARCHAR,
    "password" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "daily_log_id_habit_date_idx" ON "daily_log"("id_habit", "date");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "daily_log" ADD CONSTRAINT "daily_log_id_habit_fkey" FOREIGN KEY ("id_habit") REFERENCES "habits"("id_habit") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "habits" ADD CONSTRAINT "habits_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;
