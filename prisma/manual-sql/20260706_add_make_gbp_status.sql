-- Manual SQL controlled change
-- Add Make / Google Business Profile status fields to GoogleBusinessPost

ALTER TABLE "GoogleBusinessPost"
  ADD COLUMN IF NOT EXISTS "makeStatus" TEXT;

ALTER TABLE "GoogleBusinessPost"
  ADD COLUMN IF NOT EXISTS "makeWebhookSentAt" TIMESTAMP(3);

ALTER TABLE "GoogleBusinessPost"
  ADD COLUMN IF NOT EXISTS "lastMakeError" TEXT;
