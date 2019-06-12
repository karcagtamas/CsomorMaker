export class Event {
  id: number;
  name: string;
  isLocked: boolean;
  isDisabled: boolean;
  createrId: number;
  creater: string;
  currentPlayers: number;
  playerLimit: number;
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
}
