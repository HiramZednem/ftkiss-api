/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `habits` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "habits_uuid_key" ON "habits"("uuid");
