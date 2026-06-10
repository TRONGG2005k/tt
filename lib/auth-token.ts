const ACCESS_TOKEN_STORAGE_KEY = "access_token";
const ACCESS_TOKEN_STORAGE_EVENT = "access-token-changed";
const LOGIN_PATH = "/login";

function canUseLocalStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function notifyAccessTokenChanged(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(ACCESS_TOKEN_STORAGE_EVENT));
}

export function getAccessToken(): string | null {
  if (!canUseLocalStorage()) {
    return null;
  }

  return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
}

export function setAccessToken(accessToken: string): void {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
  notifyAccessTokenChanged();
}

export function clearAccessToken(): void {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  notifyAccessTokenChanged();
}

export function subscribeToAccessToken(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleChange = () => {
    onStoreChange();
  };

  window.addEventListener("storage", handleChange);
  window.addEventListener(ACCESS_TOKEN_STORAGE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(ACCESS_TOKEN_STORAGE_EVENT, handleChange);
  };
}

export function getAccessTokenSnapshot(): string | null {
  return getAccessToken();
}

export function getServerAccessTokenSnapshot(): string | null {
  return null;
}

export function hasAccessToken(): boolean {
  return Boolean(getAccessToken());
}

export function redirectToLogin(): void {
  if (typeof window === "undefined") {
    return;
  }

  if (window.location.pathname !== LOGIN_PATH) {
    window.location.assign(LOGIN_PATH);
  }
}

export function clearSessionAndRedirect(): void {
  clearAccessToken();
  redirectToLogin();
}
