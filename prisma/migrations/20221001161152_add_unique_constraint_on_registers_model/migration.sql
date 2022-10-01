/*
  Warnings:

  - A unique constraint covering the columns `[event_id,user_id]` on the table `registers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "registers" DROP CONSTRAINT "registers_event_id_fkey";

-- DropForeignKey
ALTER TABLE "registers" DROP CONSTRAINT "registers_user_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "registers_event_id_user_id_key" ON "registers"("event_id", "user_id");

-- AddForeignKey
ALTER TABLE "registers" ADD CONSTRAINT "registers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registers" ADD CONSTRAINT "registers_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
