import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from './create-task/create-task.component';
import { DashboardComponent } from './dashboard.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { dashboardGuard } from '../dashboard.guard';
import { OverviewComponent } from './overview/overview.component';
import { StatsComponent } from './stats/stats.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CreateTaskComponent,
    TaskDetailsComponent,
    OverviewComponent,
    StatsComponent,
  ],
  exports: [
    OverviewComponent,
    SharedModule,
    RouterModule,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [dashboardGuard],
        children: [
          { path: 'overview', component: OverviewComponent },
          { path: 'stats', component: StatsComponent },
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
        ],
      },
    ]),
  ],
})
export class DashboardModule {}
