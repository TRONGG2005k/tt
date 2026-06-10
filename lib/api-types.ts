export type ApiSuccessResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  success?: false;
  message?: string;
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
  path?: string;
  timestamp?: string;
  request_id?: string | null;
};

export type RoleInfo = {
  id: string;
  name: string;
};

export type LoginResponseData = {
  access_token: string;
  roles: RoleInfo[];
};

export type RefreshResponseData = {
  access_token: string;
  refresh_token: string;
  roles: RoleInfo[];
};

export type GoogleConnectResponseData = {
  auth_url: string;
};

export type UserProfile = {
  id: string;
  email: string;
  full_name: string | null;
  status: string;
  roles: string[];
  created_at: string;
  updated_at: string;
};
