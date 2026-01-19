export interface HeaderUser {
  name: string;
  department: string;
  currentFactory: string;
  canSwitchFactory: boolean;
}

export interface SystemInfo {
  version: string;
  publishDate: string;
  environment: string;
  apiVersion: string;
  apiPublishDate: string;
}
