-- CreateTable
CREATE TABLE "Prospect" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "sector" TEXT,
    "country" TEXT,
    "source" TEXT NOT NULL,
    "assignedTo" TEXT NOT NULL,
    "fitScore" INTEGER,
    "signalScore" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstContactDate" TIMESTAMP(3),
    "followUp1Date" TIMESTAMP(3),
    "followUp1Done" BOOLEAN NOT NULL DEFAULT false,
    "followUp2Date" TIMESTAMP(3),
    "followUp2Done" BOOLEAN NOT NULL DEFAULT false,
    "breakupDate" TIMESTAMP(3),
    "breakupDone" BOOLEAN NOT NULL DEFAULT false,
    "replied" BOOLEAN NOT NULL DEFAULT false,
    "meetingDate" TIMESTAMP(3),
    "meetingTime" TIMESTAMP(3),
    "meetingType" TEXT,
    "meetingLocation" TEXT,
    "meetingDone" BOOLEAN NOT NULL DEFAULT false,
    "outcome" TEXT,
    "agentDescription" TEXT,
    "notes" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prospect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "prospectId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "invoiced" BOOLEAN NOT NULL DEFAULT false,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "Prospect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
