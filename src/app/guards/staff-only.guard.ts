import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class StaffOnlyGuard implements CanActivate {
	constructor(private authenticationService: AuthenticationService) { }

	canActivate() {
		if(this.authenticationService.activeUser().role == 'administrator') {
			return true;
		}
		else {
			return false;
		}
	
	}

}