/*
  Warnings:

  - You are about to drop the `event_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "event_users" DROP CONSTRAINT "event_users_event_id_fkey";

-- DropForeignKey
ALTER TABLE "event_users" DROP CONSTRAINT "event_users_user_id_fkey";

-- DropTable
DROP TABLE "event_users";

-- CreateTable
CREATE TABLE "registers" (
    "id" UUID NOT NULL,
    "moderator" BOOLEAN NOT NULL DEFAULT false,
    "event_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "registers" ADD CONSTRAINT "registers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registers" ADD CONSTRAINT "registers_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
