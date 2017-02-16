import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { VnComponent } from './vn.component';
import { VnFillComponent } from './vn-fill/vn-fill.component';
import { VnResolve } from '../vn.resolve';

@NgModule({
	imports: [RouterModule.forChild([
		{
			path: 'vn',
			component: VnComponent,
			canActivate: [AuthGuard],
			resolve: {
				vns: VnResolve
			}
		},
		{
			path: 'vn/new',
			component: VnFillComponent,
			canActivate: [AuthGuard],
		},
		{
			path: 'vn/:id/edit',
			component: VnFillComponent,
			canActivate: [AuthGuard],
		},
	])],
	exports: [RouterModule]
})
export class VnRoutingModule { }