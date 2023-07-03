-- CreateTable
CREATE TABLE "SharedTodo" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "authorId" INT8 NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedTodo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SharedTodo" ADD CONSTRAINT "SharedTodo_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
