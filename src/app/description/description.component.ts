import { Component, OnInit } from '@angular/core';
import { Description } from './description';
import { Token } from './token';
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent implements OnInit {
	token:Token = {
		token_text: 'orange',
    token_type: 'unlabeled',
		token_start: 0,
    token_end: 5,
		token_labels: ['color'],
		token_selected_label: 'color',
	}

	description = new Description('1', 'orange truck carries orange', ['orange'])


  // description:Description = {
  // 	item_id: 1,
  // 	content: 'orange truck carries orange',
 	//   input_tokens: [this.token.token_text]
  // }

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  selected_item = this.foods[1].value;
  constructor() { }

  segs = [
    {value:'apple', id:0},
    {value:'pear', id:1},
    {value:'pineapple', id:2},
  ];

  /* Convert the description into tokens, render all the */
  // function parse_description(){
  //
  // }

  ngOnInit() {
  }

}
