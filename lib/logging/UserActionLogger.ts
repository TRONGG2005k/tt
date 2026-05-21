import fs from 'fs';
import path from 'path';
import os from 'os';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export interface UserActionLog {
  timestamp: Date;
  userId?: string;
  deviceId?: string;
  ipAddress?: string;
  action: string;
  module: string;
  status: 'SUCCESS' | 'FAILED';
  detail: string;
}

export class UserActionLogger {
  private logDirectory: string;
  private enabled = true;
  private warned = false;

  constructor(logDirectory: string = './logs') {
    this.logDirectory = logDirectory;
    this.ensureLogDirectory();
  }

  private ensureLogDirectory(): void {
    if (!this.enabled) return;

    try {
      if (!fs.existsSync(this.logDirectory)) {
        fs.mkdirSync(this.logDirectory, { recursive: true });
      }
      return;
    } catch (error) {
      // If we cannot create the directory (e.g. read-only FS on serverless),
      // fallback to OS temp. If that also fails, disable file logging.
      try {
        const tmpDir = path.join(os.tmpdir(), 'dn-hrm-logs');
        if (this.logDirectory !== tmpDir) {
          this.logDirectory = tmpDir;
          if (!fs.existsSync(this.logDirectory)) {
            fs.mkdirSync(this.logDirectory, { recursive: true });
          }
          if (!this.warned) {
            this.warned = true;
            console.warn(
              `[UserActionLogger] Cannot create log dir, falling back to temp: ${this.logDirectory}`,
              error
            );
          }
          return;
        }
      } catch {
        // ignore and disable below
      }

      this.enabled = false;
      if (!this.warned) {
        this.warned = true;
        console.warn('[UserActionLogger] File logging disabled (cannot create log directory).', error);
      }
    }
  }

  private getLogFileName(): string {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return path.join(this.logDirectory, `user-actions-${today}.log`);
  }

  public logAction(log: UserActionLog): void {
    try {
      if (!this.enabled) return;
      this.ensureLogDirectory();
      if (!this.enabled) return;

      const logEntry = this.formatLogEntry(log);
      const logFileName = this.getLogFileName();
      
      // Append to log file
      fs.appendFileSync(logFileName, logEntry + '\n', 'utf8');
    } catch (error) {
      console.error('Failed to write log:', error);
    }
  }

  private formatLogEntry(log: UserActionLog): string {
    const timestamp = format(log.timestamp, 'yyyy-MM-dd HH:mm:ss', { locale: vi });
    const userId = log.userId || 'UNKNOWN';
    const deviceId = log.deviceId || 'UNKNOWN';
    const ipAddress = log.ipAddress || 'UNKNOWN';
    
    return `[${timestamp}] USER_ID=${userId} DEVICE=${deviceId} IP=${ipAddress} ACTION=${log.action} MODULE=${log.module} STATUS=${log.status} DETAIL="${log.detail}"`;
  }

  public logUserAction(
    userId: string,
    deviceId: string,
    ipAddress: string,
    action: string,
    module: string,
    status: 'SUCCESS' | 'FAILED',
    detail: string
  ): void {
    const log: UserActionLog = {
      timestamp: new Date(),
      userId,
      deviceId,
      ipAddress,
      action,
      module,
      status,
      detail
    };
    
    this.logAction(log);
  }
}
