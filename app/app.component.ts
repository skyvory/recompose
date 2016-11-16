import { Component } from '@angular/core';
// import { ROUTER_DIRECTIVES } from '@angular/router';

// import { LoginComponent } from './login.component';

@Component({
	selector: 'my-app',
	template: `
	<md-sidenav-layout>
		<md-sidenav #start (open)="closeStartButton.focus()">
			Navigation Menu
			<br>
			<button md-button routerLink="/home" routerLinkActive="active">Home</button>
			<br>
			<button md-button routerLink="/vn" routerLinkActive="active">VN</button>
			<br>
			<button md-button #closeStartButton (click)="start.close()">Close</button>

		</md-sidenav>
	   
		<button md-button (click)="start.open()">Menu</button>

		<router-outlet></router-outlet>
	  </md-sidenav-layout>
	`,
	// directives: [ROUTER_DIRECTIVES]
})

export class AppComponent{
	title = "Recomposition";
}