/*
  Warnings:

  - A unique constraint covering the columns `[userId,movieId]` on the table `WachingListItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WachingListItem_userId_movieId_key" ON "WachingListItem"("userId", "movieId");
