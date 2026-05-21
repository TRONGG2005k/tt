import { UserActionLogger } from './UserActionLogger';

// Ví dụ sử dụng hệ thống logging trong thực tế

export class UserActionLoggerExample {
  private logger: UserActionLogger;

  constructor() {
    // Khởi tạo logger với thư mục log cụ thể
    this.logger = new UserActionLogger('./logs/user-actions');
  }

  // Ví dụ 1: Ghi log khi người dùng tạo nhân viên mới
  public logCreateEmployee(userId: string, deviceId: string, ipAddress: string, employeeName: string): void {
    this.logger.logUserAction(
      userId,
      deviceId,
      ipAddress,
      'CREATE_EMPLOYEE',
      'HRM',
      'SUCCESS',
      `Tạo nhân viên ${employeeName}`
    );
  }

  // Ví dụ 2: Ghi log khi người dùng cập nhật thông tin nhân viên
  public logUpdateEmployee(userId: string, deviceId: string, ipAddress: string, employeeId: string, status: 'SUCCESS' | 'FAILED' = 'SUCCESS'): void {
    this.logger.logUserAction(
      userId,
      deviceId,
      ipAddress,
      'UPDATE_EMPLOYEE',
      'HRM',
      status,
      `Cập nhật thông tin nhân viên ID: ${employeeId}`
    );
  }

  // Ví dụ 3: Ghi log khi người dùng xóa nhân viên
  public logDeleteEmployee(userId: string, deviceId: string, ipAddress: string, employeeName: string, status: 'SUCCESS' | 'FAILED' = 'SUCCESS'): void {
    this.logger.logUserAction(
      userId,
      deviceId,
      ipAddress,
      'DELETE_EMPLOYEE',
      'HRM',
      status,
      `Xóa nhân viên ${employeeName}`
    );
  }

  // Ví dụ 4: Ghi log khi có lỗi
  public logErrorAction(userId: string, deviceId: string, ipAddress: string, errorMessage: string): void {
    this.logger.logUserAction(
      userId,
      deviceId,
      ipAddress,
      'ERROR_ACTION',
      'SYSTEM',
      'FAILED',
      `Lỗi hệ thống: ${errorMessage}`
    );
  }
}

// Cách sử dụng trong thực tế:

/*
// Khởi tạo logger
const userLogger = new UserActionLogger('./logs/user-actions');

// Ghi log khi người dùng thực hiện các hành động
userLogger.logUserAction(
  'user123',           // userId
  'DESKTOP-ABC123',       // deviceId
  '192.168.1.100',        // ipAddress
  'CREATE_EMPLOYEE',     // action
  'HRM',                  // module
  'SUCCESS',              // status
  'Tạo nhân viên Nguyễn Văn A'  // detail
);

// Hoặc sử dụng cách trực tiếp
const logData = {
  timestamp: new Date(),
  userId: 'user123',
  deviceId: 'DESKTOP-ABC123',
  ipAddress: '192.168.1.100',
  action: 'CREATE_EMPLOYEE',
  module: 'HRM',
  status: 'SUCCESS' as const,
  detail: 'Tạo nhân viên Nguyễn Văn A'
};

userLogger.logAction(logData);
*/