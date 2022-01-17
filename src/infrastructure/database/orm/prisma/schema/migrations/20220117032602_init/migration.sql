/*
  Warnings:

  - Added the required column `descricao` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "descricao" TEXT NOT NULL;
