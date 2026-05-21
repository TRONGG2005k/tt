export const ExceptionCode = {
    // ==================== GENERAL ERRORS ====================
    INTERNAL_ERROR: {
        code: "INTERNAL_ERROR",
        message: "Internal server error",
        statusCode: 500,
    },
    NOT_FOUND: {
        code: "NOT_FOUND",
        message: "Resource not found",
        statusCode: 404,
    },
    BAD_REQUEST: {
        code: "BAD_REQUEST",
        message: "Bad request",
        statusCode: 400,
    },
    UNAUTHORIZED: {
        code: "UNAUTHORIZED",
        message: "Unauthorized",
        statusCode: 401,
    },
    FORBIDDEN: {
        code: "FORBIDDEN",
        message: "Forbidden",
        statusCode: 403,
    },
    VALIDATION_ERROR: {
        code: "VALIDATION_ERROR",
        message: "Validation error",
        statusCode: 400,
    },
    DATABASE_ERROR: {
        code: "DATABASE_ERROR",
        message: "Database error",
        statusCode: 500,
    },
    NETWORK_ERROR: {
        code: "NETWORK_ERROR",
        message: "Network error",
        statusCode: 500,
    },
    TIMEOUT_ERROR: {
        code: "TIMEOUT_ERROR",
        message: "Timeout error",
        statusCode: 500,
    },
    RATE_LIMIT_ERROR: {
        code: "RATE_LIMIT_ERROR",
        message: "Rate limit exceeded",
        statusCode: 429,
    },
    UNKNOWN_ERROR: {
        code: "UNKNOWN_ERROR",
        message: "Unknown error",
        statusCode: 500,
    },

    // ==================== USER / AUTH ====================
    USER_NOT_FOUND: {
        code: "USER_NOT_FOUND",
        message: "User not found",
        statusCode: 404,
    },
    USER_ALREADY_EXISTS: {
        code: "USER_ALREADY_EXISTS",
        message: "User already exists",
        statusCode: 409,
    },
    USER_ACCOUNT_NOT_FOUND: {
        code: "USER_ACCOUNT_NOT_FOUND",
        message: "User account not found",
        statusCode: 404,
    },
    USER_ACCOUNT_USERNAME_EXISTS: {
        code: "USER_ACCOUNT_USERNAME_EXISTS",
        message: "Username already exists",
        statusCode: 409,
    },
    USER_ACCOUNT_EMPLOYEE_ALREADY_EXISTS: {
        code: "USER_ACCOUNT_EMPLOYEE_ALREADY_EXISTS",
        message: "Employee already has an account",
        statusCode: 409,
    },
    USER_ACCOUNT_ALREADY_EXISTS: {
        code: "USER_ACCOUNT_ALREADY_EXISTS",
        message: "User account already exists",
        statusCode: 409,
    },
    USER_ACCOUNT_DELETED: {
        code: "USER_ACCOUNT_DELETED",
        message: "User account has been deleted",
        statusCode: 403,
    },
    USER_ACCOUNT_ALREADY_DELETED: {
        code: "USER_ACCOUNT_ALREADY_DELETED",
        message: "User account is already deleted",
        statusCode: 409,
    },
    USER_ACCOUNT_NOT_DELETED: {
        code: "USER_ACCOUNT_NOT_DELETED",
        message: "User account is not deleted",
        statusCode: 400,
    },
    INVALID_CREDENTIALS: {
        code: "INVALID_CREDENTIALS",
        message: "Invalid username or password",
        statusCode: 401,
    },
    ACCOUNT_LOCKED: {
        code: "ACCOUNT_LOCKED",
        message: "Account is locked",
        statusCode: 403,
    },
    ACCOUNT_DISABLED: {
        code: "ACCOUNT_DISABLED",
        message: "Account is disabled",
        statusCode: 403,
    },

    // ==================== ROLE & PERMISSION ====================
    ROLE_NOT_FOUND: {
        code: "ROLE_NOT_FOUND",
        message: "Role not found",
        statusCode: 404,
    },
    ROLE_ALREADY_EXISTS: {
        code: "ROLE_ALREADY_EXISTS",
        message: "Role already exists",
        statusCode: 409,
    },
    ROLE_NAME_EXISTS: {
        code: "ROLE_NAME_EXISTS",
        message: "Role name already exists",
        statusCode: 409,
    },
    PERMISSION_NOT_FOUND: {
        code: "PERMISSION_NOT_FOUND",
        message: "Permission not found",
        statusCode: 404,
    },
    PERMISSION_DENIED: {
        code: "PERMISSION_DENIED",
        message: "Permission denied",
        statusCode: 403,
    },
    PERMISSION_NAME_EXISTS: {
        code: "PERMISSION_NAME_EXISTS",
        message: "Permission name already exists",
        statusCode: 409,
    },

    // ==================== EMPLOYEE ====================
    EMPLOYEE_NOT_FOUND: {
        code: "EMPLOYEE_NOT_FOUND",
        message: "Employee not found",
        statusCode: 404,
    },
    EMPLOYEE_ALREADY_EXISTS: {
        code: "EMPLOYEE_ALREADY_EXISTS",
        message: "Employee already exists",
        statusCode: 409,
    },
    EMPLOYEE_CODE_EXISTS: {
        code: "EMPLOYEE_CODE_EXISTS",
        message: "Employee code already exists",
        statusCode: 409,
    },
    EMPLOYEE_EMAIL_EXISTS: {
        code: "EMPLOYEE_EMAIL_EXISTS",
        message: "Employee email already exists",
        statusCode: 409,
    },
    EMPLOYEE_PHONE_EXISTS: {
        code: "EMPLOYEE_PHONE_EXISTS",
        message: "Employee phone number already exists",
        statusCode: 409,
    },

    // ==================== DEPARTMENT ====================
    DEPARTMENT_NOT_FOUND: {
        code: "DEPARTMENT_NOT_FOUND",
        message: "Department not found",
        statusCode: 404,
    },
    DEPARTMENT_ALREADY_EXISTS: {
        code: "DEPARTMENT_ALREADY_EXISTS",
        message: "Department already exists",
        statusCode: 409,
    },
    SUB_DEPARTMENT_NOT_FOUND: {
        code: "SUB_DEPARTMENT_NOT_FOUND",
        message: "Sub-department not found",
        statusCode: 404,
    },
    SUB_DEPARTMENT_ALREADY_EXISTS: {
        code: "SUB_DEPARTMENT_ALREADY_EXISTS",
        message: "Sub-department already exists",
        statusCode: 409,
    },

    // ==================== POSITION ====================
    POSITION_NOT_FOUND: {
        code: "POSITION_NOT_FOUND",
        message: "Position not found",
        statusCode: 404,
    },
    POSITION_ALREADY_EXISTS: {
        code: "POSITION_ALREADY_EXISTS",
        message: "Position already exists",
        statusCode: 409,
    },
    POSITION_CODE_EXISTS: {
        code: "POSITION_CODE_EXISTS",
        message: "Position code already exists",
        statusCode: 409,
    },

    // ==================== CONTRACT ====================
    CONTRACT_NOT_FOUND: {
        code: "CONTRACT_NOT_FOUND",
        message: "Contract not found",
        statusCode: 404,
    },
    CONTRACT_ALREADY_EXISTS: {
        code: "CONTRACT_ALREADY_EXISTS",
        message: "Contract already exists",
        statusCode: 409,
    },
    CONTRACT_CODE_EXISTS: {
        code: "CONTRACT_CODE_EXISTS",
        message: "Contract code already exists",
        statusCode: 409,
    },
    SALARY_CONTRACT_NOT_FOUND: {
        code: "SALARY_CONTRACT_NOT_FOUND",
        message: "Salary contract not found",
        statusCode: 404,
    },

    // ==================== ALLOWANCE ====================
    ALLOWANCE_NOT_FOUND: {
        code: "ALLOWANCE_NOT_FOUND",
        message: "Allowance not found",
        statusCode: 404,
    },
    ALLOWANCE_ALREADY_EXISTS: {
        code: "ALLOWANCE_ALREADY_EXISTS",
        message: "Allowance already exists",
        statusCode: 409,
    },
    ALLOWANCE_CODE_EXISTS: {
        code: "ALLOWANCE_CODE_EXISTS",
        message: "Allowance code already exists",
        statusCode: 409,
    },
    ALLOWANCE_RULE_NOT_FOUND: {
        code: "ALLOWANCE_RULE_NOT_FOUND",
        message: "Allowance rule not found",
        statusCode: 404,
    },

    // ==================== ATTENDANCE ====================
    ATTENDANCE_NOT_FOUND: {
        code: "ATTENDANCE_NOT_FOUND",
        message: "Attendance record not found",
        statusCode: 404,
    },
    ATTENDANCE_ALREADY_EXISTS: {
        code: "ATTENDANCE_ALREADY_EXISTS",
        message: "Attendance record already exists for this date",
        statusCode: 409,
    },
    ATTENDANCE_PENALTY_NOT_FOUND: {
        code: "ATTENDANCE_PENALTY_NOT_FOUND",
        message: "Attendance penalty not found",
        statusCode: 404,
    },

    // ==================== SHIFT ====================
    SHIFT_NOT_FOUND: {
        code: "SHIFT_NOT_FOUND",
        message: "Shift not found",
        statusCode: 404,
    },
    SHIFT_ALREADY_EXISTS: {
        code: "SHIFT_ALREADY_EXISTS",
        message: "Shift already exists",
        statusCode: 409,
    },
    SHIFT_CODE_EXISTS: {
        code: "SHIFT_CODE_EXISTS",
        message: "Shift code already exists",
        statusCode: 409,
    },
    EMPLOYEE_SHIFT_NOT_FOUND: {
        code: "EMPLOYEE_SHIFT_NOT_FOUND",
        message: "Employee shift assignment not found",
        statusCode: 404,
    },

    // ==================== LEAVE ====================
    LEAVE_REQUEST_NOT_FOUND: {
        code: "LEAVE_REQUEST_NOT_FOUND",
        message: "Leave request not found",
        statusCode: 404,
    },
    LEAVE_BALANCE_NOT_FOUND: {
        code: "LEAVE_BALANCE_NOT_FOUND",
        message: "Leave balance not found",
        statusCode: 404,
    },
    INSUFFICIENT_LEAVE_BALANCE: {
        code: "INSUFFICIENT_LEAVE_BALANCE",
        message: "Insufficient leave balance",
        statusCode: 400,
    },
    LEAVE_REQUEST_ALREADY_APPROVED: {
        code: "LEAVE_REQUEST_ALREADY_APPROVED",
        message: "Leave request has already been approved",
        statusCode: 409,
    },
    LEAVE_REQUEST_ALREADY_REJECTED: {
        code: "LEAVE_REQUEST_ALREADY_REJECTED",
        message: "Leave request has already been rejected",
        statusCode: 409,
    },

    // ==================== PAYROLL ====================
    PAYROLL_NOT_FOUND: {
        code: "PAYROLL_NOT_FOUND",
        message: "Payroll record not found",
        statusCode: 404,
    },
    PAYROLL_ALREADY_EXISTS: {
        code: "PAYROLL_ALREADY_EXISTS",
        message: "Payroll record already exists for this month",
        statusCode: 409,
    },
    PAYROLL_CYCLE_NOT_FOUND: {
        code: "PAYROLL_CYCLE_NOT_FOUND",
        message: "Payroll cycle not found",
        statusCode: 404,
    },
    PAYROLL_APPROVAL_HISTORY_NOT_FOUND: {
        code: "PAYROLL_APPROVAL_HISTORY_NOT_FOUND",
        message: "Payroll approval history not found",
        statusCode: 404,
    },
    SALARY_ADJUSTMENT_NOT_FOUND: {
        code: "SALARY_ADJUSTMENT_NOT_FOUND",
        message: "Salary adjustment not found",
        statusCode: 404,
    },

    // ==================== OT (Overtime) ====================
    OT_RATE_NOT_FOUND: {
        code: "OT_RATE_NOT_FOUND",
        message: "Overtime rate not found",
        statusCode: 404,
    },
    OT_RATE_ALREADY_EXISTS: {
        code: "OT_RATE_ALREADY_EXISTS",
        message: "Overtime rate already exists for this date",
        statusCode: 409,
    },

    // ==================== PENALTY ====================
    PENALTY_RULE_NOT_FOUND: {
        code: "PENALTY_RULE_NOT_FOUND",
        message: "Penalty rule not found",
        statusCode: 404,
    },
    PENALTY_RULE_ALREADY_EXISTS: {
        code: "PENALTY_RULE_ALREADY_EXISTS",
        message: "Penalty rule already exists",
        statusCode: 409,
    },
    PENALTY_RULE_CODE_EXISTS: {
        code: "PENALTY_RULE_CODE_EXISTS",
        message: "Penalty rule code already exists",
        statusCode: 409,
    },

    // ==================== HOLIDAY ====================
    HOLIDAY_NOT_FOUND: {
        code: "HOLIDAY_NOT_FOUND",
        message: "Holiday not found",
        statusCode: 404,
    },
    HOLIDAY_ALREADY_EXISTS: {
        code: "HOLIDAY_ALREADY_EXISTS",
        message: "Holiday already exists for this date",
        statusCode: 409,
    },

    // ==================== ADDRESS & CONTACT ====================
    ADDRESS_NOT_FOUND: {
        code: "ADDRESS_NOT_FOUND",
        message: "Address not found",
        statusCode: 404,
    },
    CONTACT_NOT_FOUND: {
        code: "CONTACT_NOT_FOUND",
        message: "Contact not found",
        statusCode: 404,
    },

    // ==================== FILE ====================
    FILE_NOT_FOUND: {
        code: "FILE_NOT_FOUND",
        message: "File not found",
        statusCode: 404,
    },
    FILE_UPLOAD_ERROR: {
        code: "FILE_UPLOAD_ERROR",
        message: "File upload failed",
        statusCode: 500,
    },
    FILE_TOO_LARGE: {
        code: "FILE_TOO_LARGE",
        message: "File size exceeds the allowed limit",
        statusCode: 400,
    },
    INVALID_FILE_TYPE: {
        code: "INVALID_FILE_TYPE",
        message: "Invalid file type",
        statusCode: 400,
    },

    // ==================== AUTH ====================
    LOGIN_FAILED: {
        code: "LOGIN_FAILED",
        message: "Invalid username or password",
        statusCode: 401,
    },
    INVALID_TOKEN: {
        code: "INVALID_TOKEN",
        message: "Invalid or expired token",
        statusCode: 401,
    },
    TOKEN_REVOKED: {
        code: "TOKEN_REVOKED",
        message: "Token has been revoked",
        statusCode: 401,
    },
    INVALID_TOKEN_TYPE: {
        code: "INVALID_TOKEN_TYPE",
        message: "Invalid token type",
        statusCode: 401,
    },
    ACCOUNT_NOT_FOUND: {
        code: "ACCOUNT_NOT_FOUND",
        message: "Account not found",
        statusCode: 404,
    },
    ACCOUNT_ALREADY_ACTIVATED: {
        code: "ACCOUNT_ALREADY_ACTIVATED",
        message: "Account has already been activated",
        statusCode: 409,
    },
    INVALID_PASSWORD: {
        code: "INVALID_PASSWORD",
        message: "Invalid password",
        statusCode: 401,
    },
    TOKEN_REUSE_DETECTED: {
        code: "TOKEN_REUSE_DETECTED",
        message: "Token reuse detected",
        statusCode: 401,
    },
    INVALID_INPUT: {
        code: "INVALID_INPUT",
        message: "Invalid input data",
        statusCode: 400,
    },
    ALREADY_CHECKED_IN: {
        code: "ALREADY_CHECKED_IN",
        message: "Already checked in today",
        statusCode: 409,
    },
    ATTENDANCE_COMPLETED: {
        code: "ATTENDANCE_COMPLETED",
        message: "Attendance already completed for today",
        statusCode: 409,
    },
    ALREADY_APPLIED: {
        code: "ALREADY_APPLIED",
        message: "Already applied",
        statusCode: 409,
    },
    NO_ACTIVE_PAYROLL_CYCLE: {
        code: "NO_ACTIVE_PAYROLL_CYCLE",
        message: "No active payroll cycle found",
        statusCode: 400,
    },
    NO_ACTIVE_CONTRACT_FOUND: {
        code: "NO_ACTIVE_CONTRACT_FOUND",
        message: "No active contract found for this employee",
        statusCode: 400,
    },
    NO_SALARY_CONTRACT_FOUND: {
        code: "NO_SALARY_CONTRACT_FOUND",
        message: "No salary contract found",
        statusCode: 404,
    },
    CALCULATION_ERROR: {
        code: "CALCULATION_ERROR",
        message: "Calculation error",
        statusCode: 500,
    },
    MISMATCH_OVERTIME: {
        code: "MISMATCH_OVERTIME",
        message: "Mismatch overtime",
        statusCode: 500,
    },
    MISMATCH_ALLOWANCE: {
        code: "MISMATCH_ALLOWANCE",
        message: "Mismatch allowance",
        statusCode: 500,
    },
    MISMATCH_DEDUCTION: {
        code: "MISMATCH_DEDUCTION",
        message: "Mismatch deduction",
        statusCode: 500,
    },
    NO_PAYROLLS_TO_APPROVE: {
        code: "NO_PAYROLLS_TO_APPROVE",
        message: "No payrolls to approve",
        statusCode: 400,
    },
    ONLY_DRAFT_PAYROLL_CAN_BE_DELETED: {
        code: "ONLY_DRAFT_PAYROLL_CAN_BE_DELETED",
        message: "Only draft payroll can be deleted",
        statusCode: 400,
    }
} as const
