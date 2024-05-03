-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "idTable" INTEGER NOT NULL,
    "idHour" INTEGER NOT NULL,
    "idCupom" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "table" (
    "id" SERIAL NOT NULL,
    "tableNumber" INTEGER NOT NULL,
    "qtPeople" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hours" (
    "id" SERIAL NOT NULL,
    "hour" INTEGER NOT NULL DEFAULT 0,
    "day" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cupom" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "cupom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_idTable_fkey" FOREIGN KEY ("idTable") REFERENCES "table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_idHour_fkey" FOREIGN KEY ("idHour") REFERENCES "hours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_idCupom_fkey" FOREIGN KEY ("idCupom") REFERENCES "cupom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
