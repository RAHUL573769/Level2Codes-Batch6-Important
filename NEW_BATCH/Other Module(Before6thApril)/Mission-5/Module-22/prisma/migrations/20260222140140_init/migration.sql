/*
  Warnings:

  - You are about to drop the `UserPostRelation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPostRelationManyToMany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserPostRelation" DROP CONSTRAINT "UserPostRelation_postId_fkey";

-- DropForeignKey
ALTER TABLE "UserPostRelation" DROP CONSTRAINT "UserPostRelation_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserPostRelationManyToMany" DROP CONSTRAINT "UserPostRelationManyToMany_postId_fkey";

-- DropForeignKey
ALTER TABLE "UserPostRelationManyToMany" DROP CONSTRAINT "UserPostRelationManyToMany_userId_fkey";

-- DropTable
DROP TABLE "UserPostRelation";

-- DropTable
DROP TABLE "UserPostRelationManyToMany";

-- CreateTable
CREATE TABLE "UserPostOneToManyRelation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "UserPostOneToManyRelation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPostOneToManyRelation_postId_key" ON "UserPostOneToManyRelation"("postId");

-- AddForeignKey
ALTER TABLE "UserPostOneToManyRelation" ADD CONSTRAINT "UserPostOneToManyRelation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPostOneToManyRelation" ADD CONSTRAINT "UserPostOneToManyRelation_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
