export class Event {
  id: number;
  name: string;
  isLocked: boolean;
  isDisabled: boolean;
  createrId: number;
  creater: string;
  creationDate: Date;
  currentPlayers: number;
  injured: number;
  visitors: number;
  visitorLimit: number;
  playerCost: number;
  visitorCost: number;
  playerDeposit: number;
  days: number;
  startHour: number;
  endHour: number;
  length: number;
  ready: boolean;
  members: number;
  startDate: Date;
  lastUpdate: Date;
  lastUpdater: string;
  lastUpdaterId: number;
  fixTeamCost: number;
  fixTeamDeposit: number;
}
