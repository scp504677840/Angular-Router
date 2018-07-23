import {Component, HostBinding, OnInit} from '@angular/core';
import {slideInDownAnimation} from '../../animations';
import {Crisis} from '../crisis';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {CrisisService} from '../crisis.service';
import {Observable} from 'rxjs';
import {DialogService} from '../../dialog.service';
import {CanComponentDeactivate} from '../../can-deactivate-guard.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css'],
  animations: [slideInDownAnimation]
})
export class CrisisDetailComponent implements OnInit, CanComponentDeactivate {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  crisis: Crisis;
  editName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crisisService: CrisisService,
    public dialogService: DialogService
  ) {
  }

  ngOnInit() {
    /*this.route.data
      .subscribe((data: { crisis: Crisis }) => {
        this.editName = data.crisis.name;
        this.crisis = data.crisis;
      });*/
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.crisisService.getCrisis(params.get('id')))
      ).subscribe((data: Crisis) => {
      this.crisis = data;
      this.editName = data.name;
    });
  }

  cancel() {
    this.gotoCrises();
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  canDeactivate(): Observable<boolean> | boolean {
    console.log('CrisisDetailComponent#canDeactivate');

    // 如果没有危机或危机没有改变，允许同步导航（“true”）
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // 否则向用户询问对话服务并返回其observable，当用户决定时，该observable解析为true或false
    return this.dialogService.confirm('Discard changes?');
  }

  gotoCrises() {
    const crisisId = this.crisis ? this.crisis.id : null;
    this.router.navigate(['../', {id: crisisId, foo: 'foo'}], {relativeTo: this.route});
  }
}
