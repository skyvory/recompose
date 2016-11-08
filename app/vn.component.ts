import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VnService } from './vn.service';

import { AuthHttp } from 'angular2-jwt';

export class Vn {
	id: number;
	title_jp: string;
	title_en: string;
	hashtag: string;
	developer_id: number;
	date_release: string;
	vndb_vn_id: number;
	image: string;
}

@Component({
	moduleId: module.id,
	selector: 'vn-selector',
	templateUrl: 'vn.component.html'
})

export class VnComponent implements OnInit{
	constructor(
		// public router:Router,
		private vnService: VnService,
		public authHttp: AuthHttp
	) {}

	vn: any = {
		id: 1,
		title_en: 'Chaod Head',
	};

	vns: Vn[] = [];
	ngOnInit() {
		this.vnService.getVns().subscribe(response => {
			this.vns = response.data;
		});

		// this.authHttp.get('http://localhost/record/public/api/vn')
		// 	.subscribe(data => {
		// 		console.log(data);
		// 	});
	}
}