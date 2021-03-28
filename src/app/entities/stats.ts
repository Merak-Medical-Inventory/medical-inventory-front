export interface PostDeviceAgeStats {
  asc: boolean;
}

export interface DeviceAgeStatsTable {
  id: number;
  serial_code: string;
  date: Date;
  production_year: number;
  generalDevice: string;
}
