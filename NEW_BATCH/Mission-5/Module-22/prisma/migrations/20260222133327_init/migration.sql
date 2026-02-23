-- DropIndex
DROP INDEX "UserPostRelation_userId_key";

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "dateOfBirth" TIMESTAMP(3),

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfileRelation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "UserProfileRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPostRelationManyToMany" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "UserPostRelationManyToMany_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfileRelation_userId_key" ON "UserProfileRelation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfileRelation_profileId_key" ON "UserProfileRelation"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPostRelationManyToMany_userId_postId_key" ON "UserPostRelationManyToMany"("userId", "postId");

-- AddForeignKey
ALTER TABLE "UserProfileRelation" ADD CONSTRAINT "UserProfileRelation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfileRelation" ADD CONSTRAINT "UserProfileRelation_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPostRelationManyToMany" ADD CONSTRAINT "UserPostRelationManyToMany_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPostRelationManyToMany" ADD CONSTRAINT "UserPostRelationManyToMany_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
