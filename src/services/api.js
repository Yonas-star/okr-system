import db from '../db/db.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ApiService {
  // Organization Plans
  static async getOrganizationalPlan(year, quarter) {
    await delay(300);
    return db.organizational_plans.find(p => p.year === year && p.quarter === quarter);
  }

  static async createOrganizationalPlan(plan) {
    await delay(500);
    const newPlan = {
      id: db.organizational_plans.length + 1,
      ...plan,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    db.organizational_plans.push(newPlan);
    return newPlan;
  }

  // Directorate Plans
  static async getDirectoratePlan(directorateId, year, quarter) {
    await delay(300);
    return db.directorate_plans.find(
      p => p.directorateId === directorateId && p.year === year && p.quarter === quarter
    );
  }

  static async getDirectoratePlansByDirector(directorId) {
    await delay(300);
    const director = db.users.find(u => u.id === directorId);
    if (!director) return [];
    return db.directorate_plans.filter(p => p.directorate === director.directorate);
  }

  // Division Plans
  static async getDivisionPlan(divisionId, year, quarter) {
    await delay(300);
    return db.division_plans.find(
      p => p.divisionId === divisionId && p.year === year && p.quarter === quarter
    );
  }

  static async getDivisionPlansByHead(headId) {
    await delay(300);
    const head = db.users.find(u => u.id === headId);
    if (!head) return [];
    return db.division_plans.filter(p => p.division === head.division);
  }

  // Employee Plans
  static async getEmployeePlan(employeeId, year, quarter) {
    await delay(300);
    return db.employee_plans.find(
      p => p.employeeId === employeeId && p.year === year && p.quarter === quarter
    );
  }

  static async createEmployeePlan(plan) {
    await delay(500);
    const newPlan = {
      id: db.employee_plans.length + 1,
      ...plan,
      status: 'active'
    };
    db.employee_plans.push(newPlan);
    return newPlan;
  }

  static async updateEmployeePlan(planId, updates) {
    await delay(300);
    const index = db.employee_plans.findIndex(p => p.id === planId);
    if (index !== -1) {
      db.employee_plans[index] = { ...db.employee_plans[index], ...updates };
      return db.employee_plans[index];
    }
    return null;
  }

  // Tasks
  static async getTasksByEmployee(employeeId) {
    await delay(200);
    const plan = db.employee_plans.find(p => p.employeeId === employeeId);
    return plan?.tasks || [];
  }

  static async updateTaskStatus(employeeId, taskId, status, progress) {
    await delay(300);
    const plan = db.employee_plans.find(p => p.employeeId === employeeId);
    if (plan) {
      const task = plan.tasks.find(t => t.id === taskId);
      if (task) {
        task.status = status;
        if (progress !== undefined) task.progress = progress;
        if (status === 'completed') task.completedAt = new Date().toISOString().split('T')[0];
        return task;
      }
    }
    return null;
  }

  // Key Results
  static async updateKeyResultProgress(employeeId, keyResultId, progress) {
    await delay(300);
    const plan = db.employee_plans.find(p => p.employeeId === employeeId);
    if (plan) {
      const kr = plan.keyResults.find(k => k.id === keyResultId);
      if (kr) {
        kr.progress = progress;
        kr.status = progress >= 100 ? 'completed' : progress < 30 ? 'behind' : 'on-track';
        return kr;
      }
    }
    return null;
  }

  // Reports
  static async getReportsByUser(userId, role) {
    await delay(300);
    if (role === 'general_director') {
      return db.reports.filter(r => r.to === userId);
    } else if (role === 'director') {
      return db.reports.filter(r => r.to === userId || r.from === userId);
    } else if (role === 'division_head') {
      return db.reports.filter(r => r.to === userId || r.from === userId);
    } else {
      return db.reports.filter(r => r.from === userId);
    }
  }

  static async submitReport(report) {
    await delay(500);
    const newReport = {
      id: db.reports.length + 1,
      ...report,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'submitted'
    };
    db.reports.push(newReport);
    return newReport;
  }

  // Notifications
  static async getNotifications(userId) {
    await delay(200);
    return db.notifications.filter(n => n.userId === userId);
  }

  static async markNotificationAsRead(notificationId) {
    await delay(200);
    const notification = db.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      return notification;
    }
    return null;
  }

  // BSC (Balanced Scorecard)
  static async getEmployeeBSC(employeeId) {
    await delay(300);
    const plan = db.employee_plans.find(p => p.employeeId === employeeId);
    return plan?.bsc || null;
  }

  static async evaluateBSC(employeeId, bscData) {
    await delay(500);
    const plan = db.employee_plans.find(p => p.employeeId === employeeId);
    if (plan) {
      plan.bsc = {
        ...plan.bsc,
        ...bscData,
        evaluatedAt: new Date().toISOString().split('T')[0],
        status: 'completed'
      };
      return plan.bsc;
    }
    return null;
  }

  // Users
  static async getUsersByRole(role) {
    await delay(200);
    return db.users.filter(u => u.role === role);
  }

  static async getSubordinates(userId) {
    await delay(200);
    return db.users.filter(u => u.reportsTo === userId);
  }

  static async getTeamMembers(divisionHeadId) {
    await delay(200);
    const head = db.users.find(u => u.id === divisionHeadId);
    if (!head) return [];
    return db.users.filter(u => u.reportsTo === divisionHeadId);
  }
}

export default ApiService;