import { Component, OnInit } from '@angular/core';
import { Gt } from 'src/app/models';
import { NotificationService } from 'src/app/services';
import { Router, ActivatedRoute } from '@angular/router';
import { GtService } from 'src/app/services';

@Component({
  selector: 'app-gts',
  templateUrl: './gts.component.html',
  styleUrls: ['./gts.component.scss']
})
export class GtsComponent implements OnInit {
  gts: Gt[] = [];

  menuItems = [
    { name: 'Adatok', link: 'details', accessLevel: 1 },
    { name: 'Beállítások', link: 'settings', accessLevel: 3 },
    { name: 'Generátor', link: 'generator', accessLevel: 3 },
    { name: 'Csömör', link: 'csomor', accessLevel: 1 },
    { name: 'Áttekintés', link: 'summary', accessLevel: 3 },
    { name: 'ToDo', link: 'todo', accessLevel: 2 },
    { name: 'Chat', link: 'chat', accessLevel: 1 },
    { name: 'Tagok', link: 'members', accessLevel: 1 },
    { name: 'Osztályok', link: 'classes', accessLevel: 2 },
    { name: 'Gyűlések', link: 'meetings', accessLevel: 3 }
  ];

  currentGtId = 0;
  currentGt = new Gt();
  currentPage = 'details';
  accessLevel = 0;

  constructor(
    private gtservice: GtService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      console.log(data);
      this.gtservice
        .getGts()
        .then(res => {
          this.gts = res;
          if (data.id && data.page) {
            this.currentGtId = data.id;
            this.currentPage = data.page;
            this.currentGt = this.gts.find(x => x.id === +this.currentGtId);
            this.gtservice
              .getAccessLevel(this.currentGtId)
              .then(acl => {
                this.accessLevel = acl;
              })
              .catch(() => {
                this.accessLevel = 0;
              });
            console.log(this.currentGtId);
          } else {
            this.router.navigateByUrl(`/gts/${this.gts[0].id}/details`);
          }
        })
        .catch(() => {
          this.gts = [];
        });
    });
    this.getGts();
  }

  lockGt(event) {
    this.gtservice
      .lockGt(event.id)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
          const old = this.gts.findIndex(x => x.id === +event.id);
          this.gts[old].isLocked = this.gts[old].isLocked ? false : true;
          this.currentGt = this.gts.find(x => x.id === +this.currentGtId);
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error(
          'Az esemény zárolása/feloldása közben hiba történt! Kérjük próbálja újra késöbb!'
        );
      });
  }

  getGts() {
    this.gtservice
      .getGts()
      .then(res => {
        this.gts = res;
      })
      .catch(() => {
        this.gts = [];
      });
  }
}
