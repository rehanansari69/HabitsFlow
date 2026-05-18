import { pgTable, text, timestamp, integer, boolean, jsonb, uuid, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table - integrated with Netlify Identity
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  netlifyId: text('netlify_id').unique(),
  email: text('email').unique().notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  lastLoginAt: timestamp('last_login_at'),
  isAdmin: boolean('is_admin').default(false),
  isPremium: boolean('is_premium').default(false),
  premiumExpiresAt: timestamp('premium_expires_at'),
});

// Habits table
export const habits = pgTable('habits', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  emoji: text('emoji'),
  category: text('category'), // e.g., 'fitness', 'learning', 'health', 'productivity'
  unit: text('unit'), // e.g., 'km', 'hours', 'pages', 'reps'
  targetValue: integer('target_value'),
  frequency: text('frequency').notNull(), // 'daily', 'weekly', 'monthly'
  color: text('color'),
  isArchived: boolean('is_archived').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Habit logs table - tracks daily completions
export const habitLogs = pgTable('habit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  habitId: uuid('habit_id').notNull().references(() => habits.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: timestamp('date').notNull(),
  value: integer('value'), // e.g., 5 km, 8 hours
  notes: text('notes'),
  completed: boolean('completed').notNull().default(false),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Streaks table - tracks current streak for each habit
export const streaks = pgTable('streaks', {
  id: uuid('id').primaryKey().defaultRandom(),
  habitId: uuid('habit_id').notNull().unique().references(() => habits.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  currentStreak: integer('current_streak').default(0),
  longestStreak: integer('longest_streak').default(0),
  lastCompletedDate: timestamp('last_completed_date'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Goals table - for weekly, monthly, yearly goals
export const goals = pgTable('goals', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  habitId: uuid('habit_id').notNull().references(() => habits.id, { onDelete: 'cascade' }),
  goalType: text('goal_type').notNull(), // 'weekly', 'monthly', 'yearly'
  targetValue: integer('target_value').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  progress: integer('progress').default(0),
  completed: boolean('completed').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Analytics snapshots table - for performance tracking
export const analyticsSnapshots = pgTable('analytics_snapshots', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: timestamp('date').notNull(),
  totalHabits: integer('total_habits'),
  completedToday: integer('completed_today'),
  completionRate: integer('completion_rate'), // percentage
  totalStreakSum: integer('total_streak_sum'),
  averageStreak: integer('average_streak'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Admin activity log
export const adminLogs = pgTable('admin_logs', {
  id: serial('id').primaryKey(),
  adminId: uuid('admin_id').notNull().references(() => users.id),
  action: text('action').notNull(),
  targetUserId: uuid('target_user_id'),
  targetType: text('target_type'), // 'user', 'habit', 'subscription'
  details: jsonb('details'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  habits: many(habits),
  habitLogs: many(habitLogs),
  streaks: many(streaks),
  goals: many(goals),
  analyticsSnapshots: many(analyticsSnapshots),
}));

export const habitsRelations = relations(habits, ({ one, many }) => ({
  user: one(users, { fields: [habits.userId], references: [users.id] }),
  logs: many(habitLogs),
  streaks: many(streaks),
  goals: many(goals),
}));

export const habitLogsRelations = relations(habitLogs, ({ one }) => ({
  habit: one(habits, { fields: [habitLogs.habitId], references: [habits.id] }),
  user: one(users, { fields: [habitLogs.userId], references: [users.id] }),
}));

export const streaksRelations = relations(streaks, ({ one }) => ({
  habit: one(habits, { fields: [streaks.habitId], references: [habits.id] }),
  user: one(users, { fields: [streaks.userId], references: [users.id] }),
}));

export const goalsRelations = relations(goals, ({ one }) => ({
  user: one(users, { fields: [goals.userId], references: [users.id] }),
  habit: one(habits, { fields: [goals.habitId], references: [habits.id] }),
}));
