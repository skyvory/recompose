import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { VnService } from '../vn.service';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { AssessmentListDialog } from '../vn/assessment-list-dialog';

@Component({
	// moduleId: module.id,
	selector: 'search-selector',
	templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private vnService: VnService,
		public dialog: MdDialog
	) {}

	ngOnInit() {
		this.route.params.forEach((params:Params) => {
			this.query.filter = params['query'];
			if(params['page'])
				this.query.page = parseInt(params['page']);
			this.loadVns();
		});
	}

	vns:any = [];
	query:any = {
		limit: 10,
		page: 1,
		filter: '',
		total: 0
	}; 

	changePage(page) {
		this.query.page = page;
		this.loadVns();
	}

	nextPage = ():number => {
		let next = this.query.page + 1;
		return next;
	}

	loadVns():void {
		this.vnService.getVns(this.query.limit, this.query.page, this.query.filter).subscribe(response => {
			this.vns = response.data;
			this.query.total = response.total;
		});
	}

	popAssessments(vn_id):void {
		console.log("id", vn_id);
		let dialogRef = this.dialog.open(AssessmentListDialog);
		dialogRef.componentInstance.vn_id = vn_id;
	}

	debugDump(): any {
		return JSON.stringify(this.vns.length);
	}
}