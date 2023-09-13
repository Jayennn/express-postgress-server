-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,

    CONSTRAINT "tb_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" VARCHAR(12) NOT NULL,
    "name" VARCHAR(25) NOT NULL,

    CONSTRAINT "tb_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" VARCHAR(25) NOT NULL,
    "tag" VARCHAR(25) NOT NULL,

    CONSTRAINT "tb_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(12) NOT NULL,
    "password" VARCHAR(110) NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(25) NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status_id" VARCHAR(12) NOT NULL,

    CONSTRAINT "tb_task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_tag" (
    "task_id" INTEGER NOT NULL,
    "tag_id" VARCHAR(25) NOT NULL,

    CONSTRAINT "tb_task_tag_pkey" PRIMARY KEY ("task_id","tag_id")
);

-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(25) NOT NULL,
    "status_id" VARCHAR NOT NULL,
    "task_id" INTEGER,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uniq_username" ON "user"("username");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "fk_role" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "fk_status_id" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task_tag" ADD CONSTRAINT "fk_tag_id" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task_tag" ADD CONSTRAINT "fk_task_id" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "fk_status_id" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "fk_task_id" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
