ALTER TABLE "questions" ADD COLUMN "answer_choices" text[] DEFAULT array[]::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" DROP COLUMN "answer";
