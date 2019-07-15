export class Gt {
  id: number;
  year: number;
  tShirtColor: string;
  days: number;
  members: number;
  ready: boolean;
  createrId: number;
  creater: string;
  isLocked: boolean;
  greeny: number;
  greenyCost: number;
}

export class GtMember {
  gt: number;
  userId: number;
  username: string;
  user: string;
  roleId: number;
  role: string;
  accessLevel: number;
  connectionDate: Date;
}

export class GtClass {
  id: number;
  name: string;
  tShirtColor: string;
  gt: number;
  members: number;
}

export class GtClassMember {
  userId: number;
  user: string;
  username: string;
  classId: number;
  class: string;
}

export class GtWork {
  id: number;
  name: string;
  day: number;
  startHour: number;
  endHour: number;
  workerCount: number;
  gt: number;
}

export class GtWorker {
  id: number;
  name: string;
  username: string;
  gt: number;
}

export class GtWorkerTable {
  workerId: number;
  worker: string;
  username: string;
  day: number;
  hour: number;
  workId: number;
  work: string;
  gt: number;
}

export class GtWorkTable {
  workerId: number;
  worker: string;
  username: string;
  workId: number;
  work: string;
  gt: number;
}

export class GtWorkStatus {
  workerId: number;
  worker: string;
  username: string;
  workId: number;
  work: string;
  isActive: boolean;
  isBoss: boolean;
}
