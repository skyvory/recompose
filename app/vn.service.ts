import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';

import { contentHeaders } from './common/headers';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class VnService {
	constructor(
		public authHttp: AuthHttp,
		private http: Http,
	) {}

	getVns(): Observable<any> {
		return this.authHttp.get('http://localhost/record/public/api/vn', { headers: contentHeaders })
			.map(
				(response:Response) => {
					return response.json();
				},
				err => console.warn(err)
			)
			.catch(this.handleError)
		;
	}

	private handleError(error: any) {
		console.error("Error occurred", error);
		console.warn("this error is handled in private handleError");
		return Observable.throw(error.json().error || error);
	}
}