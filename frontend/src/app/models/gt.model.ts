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
  startDate: Date;
  creationDate: Date;
  lastUpdater: string;
  lastUpdaterId: number;
  lastUpdate: Date;
  isDisabled: boolean;
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
  tShirtSize: string;
  class: string;
  email: string;
}

export class GtClass {
  id: number;
  name: string;
  tShirtColor: string;
  gt: number;
  members: number;
  classMaster: string;
}

export class GtClassMember {
  id: number;
  name: string;
  isPaid: boolean;
  classId: number;
  class: string;
  description: string;
  allergy: string;
  tShirtSize: string;
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
  accessLevel: number;
  isGeneratable: boolean;
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
  isFixed: boolean;
}

export class GtPayout {
  id: number;
  name: string;
  gt: number;
  typeId: number;
  type: string;
  isOut: boolean;
  cost: number;
  from: string;
  to: string;
}

export class GtMessage {
  id: number;
  senderId: number;
  sender: string;
  gt: number;
  dateOfSent: Date;
  message: string;
}

export class GtTodo {
  id: number;
  gt: number;
  date: Date;
  text: number;
  importance: number;
  isSolved: boolean;
  expirationDate: Date;
}

export class GtMeeting {
  id: number;
  date: Date;
  creater: string;
  createrId: number;
  gt: number;
  members?: GtMeetingMember[] = [];
}

export class GtMeetingMember {
  user: string;
  userId: number;
  meeting: number;
  isThere: boolean;
}

export class GtPresenting {
  presenter: string;
  presenterId: number;
  presented: string;
  presentedId: number;
  gt: number;
  isLicensed: boolean;
  answer: string;
}

export class GtQuestion {
  id: number;
  question: string;
  creationDate: Date;
  creater: string;
  createrId: number;
  lastUpdate: Date;
  lastUpdater: string;
  lastUpdaterId: number;
  gt: number;
}

export class GtAnswer {
  id: number;
  answer: string;
  question: number;
  creationDate: Date;
  creater: string;
}
