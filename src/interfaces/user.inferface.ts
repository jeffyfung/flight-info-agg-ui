export interface UserPublicInfo {
  email: string;
  provider: string;
  name: string;
  avatar_url: string;
}

export interface UserProfile extends UserPublicInfo {
  id: string;
  last_updated: string;
  last_login: string;
  selected_locations: LocationDisplay[];
  selected_airlines: AirlineDisplay[];
  notification: NotificationSetting;
}

export interface LocationDisplay {
  label: string;
  value: string;
}

export interface AirlineDisplay {
  label: string;
  value: string;
}

export enum NotificationSetting {
  OFF,
  DAILY,
}
