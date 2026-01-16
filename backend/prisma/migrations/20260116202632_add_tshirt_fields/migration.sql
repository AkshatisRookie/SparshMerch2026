-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "admissionNo" TEXT,
ADD COLUMN     "year" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "committee" TEXT,
ADD COLUMN     "isCommitteeMember" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nameOnTshirt" TEXT,
ADD COLUMN     "size" TEXT;

-- CreateIndex
CREATE INDEX "Customer_admissionNo_idx" ON "Customer"("admissionNo");
