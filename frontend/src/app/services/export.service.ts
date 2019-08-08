import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  Response,
  GtWorker,
  GtWorkerTable,
  GtWork,
  GtWorkTable,
  Gt,
  GtMember,
  GtClass,
  GtClassMember
} from '../models';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { GtGeneratorService } from './gt-generator.service';
import { GtMembersService } from './gt-members.service';
import { GtClassesService } from './gt-classes.service';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

const GT_PERSONAL_HEADERS = ['Nap', 'Óra', 'Poszt'];
const GT_WORK_HEADERS = ['Sorszám', 'Személy'];
const GT_MEMBERS_HEADERS = ['Sorszám', 'Név', 'Osztály', 'E-mail cím', 'Poló méret'];
const GT_CLASS_MEMBERS_HEADERS = ['Sorszám', 'Név', 'Osztály', 'Státusz', 'Poló méret'];

const CSV_OPTIONS = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalseparator: '.',
  showLabels: true,
  showTitle: true,
  title: '',
  useBom: true,
  noDownload: false,
  headers: []
};

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  url = URL + '/gt/export';
  csvOptions = CSV_OPTIONS;

  constructor(
    private http: HttpClient,
    private gtgeneratorservice: GtGeneratorService,
    private gtmembersservice: GtMembersService,
    private gtclassesservice: GtClassesService
  ) {}

  exportPersonal(worker: GtWorker): void {
    let tables: GtWorkerTable[] = [];
    const array = [];
    const options = this.csvOptions;
    options.headers = GT_PERSONAL_HEADERS;
    options.title = worker.name;
    this.gtgeneratorservice.getGtWorkerTables(worker.id, worker.gt).then(res => {
      tables = res;
      for (const i of tables) {
        array.push({ day: `${i.day}. nap`, hour: `${i.hour} óra - ${i.hour + 1} óra`, work: i.work ? i.work : '-' });
      }
      // tslint:disable-next-line: no-unused-expression
      new AngularCsv(array, `${worker.name}_${new Date().toDateString()}`, options);
    });
  }

  exportWork(work: GtWork): void {
    let tables: GtWorkTable[] = [];
    const array = [];
    const options = this.csvOptions;
    options.headers = GT_WORK_HEADERS;
    options.title = work.name;
    this.gtgeneratorservice.getGtWorkTables(work.id).then(res => {
      tables = res;
      let index = 0;
      for (const i of tables) {
        index++;
        array.push({ row: `${index}.`, worker: i.worker });
      }
      // tslint:disable-next-line: no-unused-expression
      new AngularCsv(array, `${work.name}_${new Date().toDateString()}`, options);
    });
  }

  exportGtMembers(gt: Gt) {
    let members: GtMember[] = [];
    const array = [];
    const options = this.csvOptions;
    options.headers = GT_MEMBERS_HEADERS;
    options.title = 'Gólyatábor tagok';
    this.gtmembersservice.getGtMembers(gt.id).then(res => {
      members = res;
      let index = 0;
      for (const i of members) {
        index++;
        array.push({ row: `${index}.`, name: i.user, class: i.class, email: i.email, size: i.tShirtSize });
      }
      // tslint:disable-next-line: no-unused-expression
      new AngularCsv(array, `${gt.year}_${new Date().toDateString()}`, options);
    });
  }

  exportClass(claass: GtClass) {
    let members: GtClassMember[] = [];
    const array = [];
    const options = this.csvOptions;
    options.headers = GT_CLASS_MEMBERS_HEADERS;
    options.title = claass.name;
    this.gtclassesservice.getGtClassMembers(claass.id).then(res => {
      members = res;
      let index = 0;
      for (const i of members) {
        index++;
        array.push({
          row: `${index}.`,
          name: i.name,
          class: i.class,
          status: i.isPaid ? 'Fizetett' : 'Nem fizetett',
          size: i.tShirtSize
        });
      }
      // tslint:disable-next-line: no-unused-expression
      new AngularCsv(array, `${claass.name}_${new Date().toDateString()}`, options);
    });
  }
}
