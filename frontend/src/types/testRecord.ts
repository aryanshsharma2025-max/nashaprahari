export type PresumptiveResult = 'presumptive_positive' | 'presumptive_negative' | 'inconclusive';

export type SyncStatus = 'synced' | 'pending';

export interface ChainOfCustody {
  tamperBagId: string;
  sealedAt: string;
  dispatchStatus: string;
  custodyOfficer: string;
}

export interface TestRecord {
  id: string;
  timestamp: string;
  date: string;
  location: string;
  subLocation: string;
  testType: string;
  lotNumber: string;
  result: PresumptiveResult;
  syncStatus: SyncStatus;
  officerName: string;
  officerBadge: string;
  suspectIdentifier?: string;
  reagentColorObserved?: string;
  notes?: string;
  chainOfCustody?: ChainOfCustody;
}

export interface OfficerSession {
  officerName: string;
  officerBadge: string;
  zone: string;
  location: string;
  shift: string;
  shiftTiming: string;
  sector: string;
  appVersion: string;
  terminalSessionId: string;
  batteryLevel: number;
  batteryStatus: string;
  storageAvailablePercent: number;
  connectionStatus: 'online_cellular' | 'online_wifi' | 'offline';
}

export interface OperationalMetrics {
  todayTestsLogged: number;
  syncedCount: number;
  pendingCount: number;
  availableKits: number;
  activeLot: string;
}
