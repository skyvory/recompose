import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { contentHeaders } from './common/headers';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CharacterService {
	constructor(
		private authHttp: AuthHttp
	) {}

	getCharacters(vn_id:number):Observable<any> {
		let params:URLSearchParams = new URLSearchParams();
		params.set('vn_id', vn_id.toString());

		return this.authHttp.get(`http://localhost/record/public/api/character`, {headers: contentHeaders, search: params})
			.map(
				(response:Response) => {
					return response.json();
				}
			)
			.catch(this.handleError)
		;
	}

	saveCharacter(character:any):Observable<any> {
		let data = {
			id: character.id,
			kanji: character.kanji,
			yobikata: character.yobikata,
			betsumyou: character.betsumyou,
			birthmonth: character.birthmonth,
			birthday: character.birthday,
			height: character.height,
			bust: character.bust,
			hip: character.hip,
			image: character.image,
			vndb_character_id: character.vndb_character_id
		};

		if(character.id) {
			return this.authHttp.put(`http://localhost/record/public/api/character/${character.id}`, data, {headers: contentHeaders})
				.map(
					(response:Response) => {
						return response.json();
					}
				)
				.catch(this.handleError)
			;
		}
		else {
			return this.authHttp.post(`http://localhost/record/public/api/character`, data, {headers: contentHeaders})
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
		console.error("Error occured", error);
		console.warn("this error is handled in private handleError");
		return Observable.throw(error.json().error || error);
	}
}