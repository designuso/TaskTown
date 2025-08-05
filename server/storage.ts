import {
  users,
  tasks,
  categories,
  performanceStats,
  type User,
  type UpsertUser,
  type InsertTask,
  type Task,
  type TaskWithCategory,
  type InsertCategory,
  type Category,
  type InsertPerformanceStats,
  type PerformanceStats,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, gte, lte, count, avg, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Task operations
  createTask(task: InsertTask): Promise<Task>;
  getUserTasks(userId: string, limit?: number): Promise<TaskWithCategory[]>;
  getTasksByDate(userId: string, date: string): Promise<TaskWithCategory[]>;
  updateTask(taskId: string, updates: Partial<InsertTask>): Promise<Task>;
  deleteTask(taskId: string): Promise<void>;
  completeTask(taskId: string): Promise<Task>;
  
  // Category operations
  createCategory(category: InsertCategory): Promise<Category>;
  getUserCategories(userId: string): Promise<Category[]>;
  updateCategory(categoryId: string, updates: Partial<InsertCategory>): Promise<Category>;
  deleteCategory(categoryId: string): Promise<void>;
  
  // Performance operations
  upsertPerformanceStats(stats: InsertPerformanceStats): Promise<PerformanceStats>;
  getUserPerformanceStats(userId: string, days: number): Promise<PerformanceStats[]>;
  getLeaderboard(limit: number): Promise<Array<{
    user: User;
    totalTasks: number;
    completionRate: number;
  }>>;
  
  // Analytics
  getUserStats(userId: string): Promise<{
    todayTasks: number;
    completedToday: number;
    weekTasks: number;
    currentStreak: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async updateUser(userId: string, updates: Partial<UpsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUser(userId: string, updates: Partial<UpsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Task operations
  async createTask(task: InsertTask): Promise<Task> {
    const [newTask] = await db.insert(tasks).values(task).returning();
    return newTask;
  }

  async getUserTasks(userId: string, limit = 50): Promise<TaskWithCategory[]> {
    const result = await db
      .select({
        id: tasks.id,
        title: tasks.title,
        description: tasks.description,
        userId: tasks.userId,
        categoryId: tasks.categoryId,
        priority: tasks.priority,
        status: tasks.status,
        dueDate: tasks.dueDate,
        completedAt: tasks.completedAt,
        createdAt: tasks.createdAt,
        updatedAt: tasks.updatedAt,
        category: categories,
      })
      .from(tasks)
      .leftJoin(categories, eq(tasks.categoryId, categories.id))
      .where(eq(tasks.userId, userId))
      .orderBy(desc(tasks.createdAt))
      .limit(limit);
    
    return result.map(row => ({
      ...row,
      category: row.category || null,
    }));
  }

  async getTasksByDate(userId: string, date: string): Promise<TaskWithCategory[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const result = await db
      .select({
        id: tasks.id,
        title: tasks.title,
        description: tasks.description,
        userId: tasks.userId,
        categoryId: tasks.categoryId,
        priority: tasks.priority,
        status: tasks.status,
        dueDate: tasks.dueDate,
        completedAt: tasks.completedAt,
        createdAt: tasks.createdAt,
        updatedAt: tasks.updatedAt,
        category: categories,
      })
      .from(tasks)
      .leftJoin(categories, eq(tasks.categoryId, categories.id))
      .where(
        and(
          eq(tasks.userId, userId),
          gte(tasks.createdAt, startOfDay),
          lte(tasks.createdAt, endOfDay)
        )
      )
      .orderBy(desc(tasks.createdAt));
    
    return result.map(row => ({
      ...row,
      category: row.category || null,
    }));
  }

  async updateTask(taskId: string, updates: Partial<InsertTask>): Promise<Task> {
    const [updatedTask] = await db
      .update(tasks)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(tasks.id, taskId))
      .returning();
    return updatedTask;
  }

  async deleteTask(taskId: string): Promise<void> {
    await db.delete(tasks).where(eq(tasks.id, taskId));
  }

  async completeTask(taskId: string): Promise<Task> {
    const [completedTask] = await db
      .update(tasks)
      .set({ 
        status: 'completed',
        completedAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(tasks.id, taskId))
      .returning();
    return completedTask;
  }

  // Category operations
  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  async getUserCategories(userId: string): Promise<Category[]> {
    return await db
      .select()
      .from(categories)
      .where(eq(categories.userId, userId))
      .orderBy(categories.name);
  }

  async updateCategory(categoryId: string, updates: Partial<InsertCategory>): Promise<Category> {
    const [updatedCategory] = await db
      .update(categories)
      .set(updates)
      .where(eq(categories.id, categoryId))
      .returning();
    return updatedCategory;
  }

  async deleteCategory(categoryId: string): Promise<void> {
    await db.delete(categories).where(eq(categories.id, categoryId));
  }

  // Performance operations
  async upsertPerformanceStats(stats: InsertPerformanceStats): Promise<PerformanceStats> {
    const [performanceStat] = await db
      .insert(performanceStats)
      .values(stats)
      .onConflictDoUpdate({
        target: [performanceStats.userId, performanceStats.date],
        set: stats,
      })
      .returning();
    return performanceStat;
  }

  async getUserPerformanceStats(userId: string, days: number): Promise<PerformanceStats[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    return await db
      .select()
      .from(performanceStats)
      .where(
        and(
          eq(performanceStats.userId, userId),
          gte(performanceStats.date, startDate)
        )
      )
      .orderBy(performanceStats.date);
  }

  async getLeaderboard(limit: number): Promise<Array<{
    user: User;
    totalTasks: number;
    completionRate: number;
  }>> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await db
      .select({
        user: users,
        totalTasks: count(tasks.id),
        completedTasks: sql<number>`count(case when ${tasks.status} = 'completed' then 1 end)`,
      })
      .from(users)
      .leftJoin(tasks, eq(users.id, tasks.userId))
      .where(gte(tasks.createdAt, thirtyDaysAgo))
      .groupBy(users.id)
      .orderBy(sql`count(case when ${tasks.status} = 'completed' then 1 end) DESC`)
      .limit(limit);

    return result.map(row => ({
      user: row.user,
      totalTasks: row.totalTasks,
      completionRate: row.totalTasks > 0 ? Math.round((row.completedTasks / row.totalTasks) * 100) : 0,
    }));
  }

  async getUserStats(userId: string): Promise<{
    todayTasks: number;
    completedToday: number;
    weekTasks: number;
    currentStreak: number;
  }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    // Today's tasks
    const [todayStats] = await db
      .select({
        total: count(tasks.id),
        completed: sql<number>`count(case when ${tasks.status} = 'completed' then 1 end)`,
      })
      .from(tasks)
      .where(
        and(
          eq(tasks.userId, userId),
          gte(tasks.createdAt, today),
          lte(tasks.createdAt, tomorrow)
        )
      );

    // Week tasks
    const [weekStats] = await db
      .select({
        total: count(tasks.id),
      })
      .from(tasks)
      .where(
        and(
          eq(tasks.userId, userId),
          gte(tasks.createdAt, weekAgo)
        )
      );

    // Calculate streak (simplified - count consecutive days with completed tasks)
    const recentStats = await db
      .select()
      .from(performanceStats)
      .where(eq(performanceStats.userId, userId))
      .orderBy(desc(performanceStats.date))
      .limit(30);

    let streak = 0;
    for (const stat of recentStats) {
      if (stat.tasksCompleted && stat.tasksCompleted > 0) {
        streak++;
      } else {
        break;
      }
    }

    return {
      todayTasks: todayStats?.total || 0,
      completedToday: todayStats?.completed || 0,
      weekTasks: weekStats?.total || 0,
      currentStreak: streak,
    };
  }
}

export const storage = new DatabaseStorage();
