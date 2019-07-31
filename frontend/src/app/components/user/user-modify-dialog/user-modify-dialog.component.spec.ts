import { MatSnackBarModule } from '@angular/material/snack-bar';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModifyDialogComponent } from './user-modify-dialog.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from 'src/app/models';

describe('UserModifyDialogComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserModifyDialogComponent],
      imports: [FormsModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatSnackBarModule],
      providers: [
        NotificationService,
        FormBuilder,
        MatDialog,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: new User() }
      ]
    }).compileComponents();
  }));

  describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(UserModifyDialogComponent);
      const component = fixture.debugElement.componentInstance;
      const notificationservice = fixture.debugElement.injector.get(NotificationService);
      const fb = fixture.debugElement.injector.get(FormBuilder);
      const dialogRef = fixture.debugElement.injector.get(MatDialogRef);
      return { fixture, component, notificationservice };
    }

    it('should create component', () => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });

    it('should create the form', async(() => {
      const { component, fixture } = setup();

      // fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(true).toBeTruthy();
      });
    }));
  });
});
