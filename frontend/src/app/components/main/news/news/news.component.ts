import { NewsDialogComponent } from './../news-dialog/news-dialog.component';
import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models';
import { NewsService, NotificationService, UserService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: News[] = [];
  accessLevel = 0;

  constructor(
    private newservice: NewsService,
    private notificationservice: NotificationService,
    public dialog: MatDialog,
    private userservice: UserService
  ) {}

  ngOnInit() {
    this.getNews();
    this.getAccessLevel();
  }

  getNews() {
    this.newservice
      .getNews()
      .then(res => {
        this.news = res;
      })
      .catch(() => {
        this.news = [];
      });
  }

  getAccessLevel() {
    this.userservice
      .getAccessLevel()
      .then(res => {
        this.accessLevel = res;
      })
      .catch(() => {
        this.accessLevel = 0;
      });
  }

  deleteNews(event) {
    this.newservice
      .deleteNews(event.id)
      .then(res => {
        if (res.response === 'success') {
          this.getNews();
          this.notificationservice.success(res.message);
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A hír törlése közben hiba lépett fel. Kérjük próbálja újra késöbb!');
      });
  }

  openNewsDialog(event?) {
    const dialogRef = this.dialog.open(NewsDialogComponent, { data: event ? event.news : null, minWidth: '50%' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (event) {
          this.newservice
            .updateNews(event.news.id, result.text)
            .then(res => {
              if (res.response === 'success') {
                this.getNews();
                this.notificationservice.success(res.message);
              } else {
                this.notificationservice.error(res.message);
              }
            })
            .catch(() => {
              this.notificationservice.error('A hír frissítése közben hiba lépett fel. Kérjük próbálja újra késöbb!');
            });
        } else {
          this.newservice
            .addNews(result.text)
            .then(res => {
              if (res.response === 'success') {
                this.getNews();
                this.notificationservice.success(res.message);
              } else {
                this.notificationservice.error(res.message);
              }
            })
            .catch(() => {
              this.notificationservice.error('A hír létrehozása közben hiba lépett fel. Kérjük próbálja újra késöbb!');
            });
        }
      }
    });
  }
}
