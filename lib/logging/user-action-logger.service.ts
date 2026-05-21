import { UserActionLogger, UserActionLog } from './UserActionLogger';

export interface UserActionLoggerServiceConfig {
  logDirectory?: string;
}

export class UserActionLoggerService {
  private userActionLogger: UserActionLogger;

  constructor(config?: UserActionLoggerServiceConfig) {
    const logDirectory = config?.logDirectory || process.env.USER_ACTION_LOG_DIR || './logs';
    this.userActionLogger = new UserActionLogger(logDirectory);
  }

  async logUserAction(
    userId: string,
    deviceId: string,
    ipAddress: string,
    action: string,
    module: string,
    status: 'SUCCESS' | 'FAILED',
    detail: string
  ): Promise<void> {
    try {
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
      
      this.userActionLogger.logAction(log);
    } catch (error) {
      console.error('Failed to log user action:', error);
    }
  }

  async logActionWithMetadata(
    action: string,
    module: string,
    status: 'SUCCESS' | 'FAILED',
    detail: string,
    userId?: string,
    deviceId?: string,
    ipAddress?: string
  ): Promise<void> {
    const log: UserActionLog = {
      timestamp: new Date(),
      userId: userId || 'UNKNOWN',
      deviceId: deviceId || 'UNKNOWN',
      ipAddress: ipAddress || 'UNKNOWN',
      action: action,
      module: module,
      status: status,
      detail: detail
    };

    this.userActionLogger.logAction(log);
  }
}

// Create singleton instance
export const userActionLoggerService = new UserActionLoggerService();
