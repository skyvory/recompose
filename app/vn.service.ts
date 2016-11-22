import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/toPromise';

import { contentHeaders } from './common/headers';
import { AuthHttp } from 'angular2-jwt';
import { AuthenticationService } from './authentication.service';
import { Constant } from './const.config';

@Injectable()
export class VnService {
	constructor(
		public authHttp: AuthHttp,
		private http: Http,
		private authenticationService:AuthenticationService
	) {}

	getThreads(): Promise<any[]> {
		return this.http.get('http://localhost/replication-dimension/public/api/thread')
			.toPromise()
			.then(response => response.json().data as any[])
			.catch(this.handleError);
	}

	getVns():Observable<any> {
		if(Constant.USE_ANGULAR2JWT) {
			return this.authHttp.get('http://localhost/record/public/api/vn', {headers: contentHeaders})
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
		else {
			return this.http.get('http://localhost/record/public/api/vn', this.authenticationService.option)
				.map(
					(response:Response) => response.json()
				)
			;
		}

	}

	getVn(vnId:number):Observable<any> {
		if(Constant.USE_ANGULAR2JWT) {
			return this.authHttp.get(`http://localhost/record/public/api/vn/${vnId}`, {headers:contentHeaders})
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
		else {
			return this.http.get(`http://localhost/record/public/api/vn/${vnId}`, this.authenticationService.option)
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
	}

	createVn(vn:any):Observable<any> {
		let data = JSON.stringify({
			title_jp: vn.title_jp,
			title_en: vn.title_en,
			hashtag: vn.hashtag,
			developer_id: vn.developer_id,
			date_release: vn.date_release,
			vndb_vn_id: vn.vndb_vn_id,
			image: vn.image
		});

		if(Constant.USE_ANGULAR2JWT) {
			return this.authHttp.post('http://localhost/record/public/api/vn', data, {headers: contentHeaders})
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
		else {
			return this.http.post('http://localhost/record/public/api/vn', data, this.authenticationService.option)
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
	}

	updateVn(vn:any):Observable<any> {
		let data = JSON.stringify({
			id: vn.id,
			title_jp: vn.title_jp,
			title_en: vn.title_en,
			hashtag: vn.hashtag,
			developer_id: vn.developer_id,
			date_release: vn.date_release,
			vndb_vn_id: vn.vndb_vn_id,
			image: vn.image
		});

		if(Constant.USE_ANGULAR2JWT) {
			return this.authHttp.put(`http://localhost/record/public/api/vn/${vn.id}`, data, {headers:contentHeaders})
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
		else {
			return this.http.put(`http://localhost/record/public/api/vn/${vn.id}`, data, this.authenticationService.option)
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
	} 

	private handleError(error:any) {
		if (error instanceof Response) {
			return Observable.throw(error.json().error || 'backend server error');
		}

		console.warn("Error occurred" + error);
		console.warn("this error is handled in private handleError");
		return Observable.throw(error);
	}
}