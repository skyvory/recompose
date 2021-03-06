import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { AssessmentComponent } from './assessment.component';
import { AssessmentFillComponent } from './assessment-fill.component';
import { AssessmentCharacterComponent } from './assessment-character/assessment-character.component';
import { AssessmentWrapperComponent } from './assessment-wrapper/assessment-wrapper.component';
import { AssessmentFillWrapperComponent } from './assessment-fill-wrapper/assessment-fill-wrapper.component';
import { AssessmentCharacterWrapperComponent } from './assessment-character-wrapper/assessment-character-wrapper.component';
import { AssessmentResolve } from './assessment.resolve';
import { AssessmentPlayWrapperComponent } from './assessment-play-wrapper/assessment-play-wrapper.component';
import { AssessmentPlayComponent } from './assessment-play/assessment-play.component';

@NgModule({
	imports: [RouterModule.forChild([
		{
			path: 'assessment',
			component: AssessmentWrapperComponent,
			canActivate: [AuthGuard]
		},
		{
			path: 'assessment/p/:page',
			component: AssessmentWrapperComponent,
			canActivate: [AuthGuard]
		},
		{
			path: 'assessment/:assessmentId/fill',
			component: AssessmentFillWrapperComponent,
			canActivate: [AuthGuard],
			resolve: {
				assessment: AssessmentResolve
			}
		},
		{
			path: 'assessment/:assessmentId/character',
			component: AssessmentCharacterWrapperComponent,
			canActivate: [AuthGuard]
		},
		{
			path: 'assessment/:assessmentId/play',
			component: AssessmentPlayWrapperComponent,
			canActivate: [AuthGuard]
		}
	])],
	exports: [RouterModule]
})
export class AssessmentRoutingModule {}