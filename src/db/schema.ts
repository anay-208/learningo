import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, integer, uuid } from "drizzle-orm/pg-core";

// user table
export const user = pgTable("user", {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  streak: integer('streak').default(0),
  lastPracticed: timestamp('last_practiced')
});


// Course Table
export const courseTable = pgTable("course", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  completed: boolean("completed").$defaultFn(() => false).notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull()
});

// Lesson Table
export const lessonTable = pgTable("lesson", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  questionsGenerated: boolean("questions_generated").$defaultFn(() => false).notNull(),
  completed: boolean("completed").$defaultFn(() => false).notNull(),
  lessonNo: integer("lesson_no").notNull(),
  courseId: uuid("course_id").notNull().references(() => courseTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull()
});

// Questions Table
export const questionsTable = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  questionNo: integer("question_number").notNull(),
  question: text("question").notNull(),
  answerChoices: text("answer_choices").array().notNull().default(sql`array[]::text[]`),
  answer: integer("answer").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  lessonId: uuid("lesson_id").notNull().references(() => lessonTable.id, { onDelete: "cascade" }),
});

// Session Table
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" })
});

// Account Table
export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull()
});

// Verification Table
export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date())
});
