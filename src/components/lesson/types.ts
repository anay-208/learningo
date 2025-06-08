import { questionsTable } from "@/db/schema";

export type QuestionType = typeof questionsTable.$inferSelect;
