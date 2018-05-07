import { Component, OnInit } from '@angular/core';
import { Description } from './description'
import { Token } from './token'
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
	token:Token = {
		token_text: 'orange',
		token_loc: 0,
		token_labels: ['color'],
		token_selected_label: 'color'
	}
	
  description:Description = {
  	item_id: 1,
  	text: 'orange truck carries orange',
 	tokens: [this.token]
  } 
  constructor() { }

  ngOnInit() {
  }

}
