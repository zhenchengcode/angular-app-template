import {AfterViewInit, Component, OnInit, ViewChild, ElementRef, ViewChildren} from '@angular/core';
import { Description } from './description';
import { Token } from '../token/token';
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent implements OnInit, AfterViewInit {
  @ViewChild("tref", {read: ElementRef}) tref: ElementRef;
  @ViewChildren('seg_dom') seg_doms;
  ngAfterViewInit(): void {
    console.log(this.tref.nativeElement); //
    console.log(this.seg_doms.toArray().filter(x => x.nativeElement.className.includes('highlightText')).map(x => x.nativeElement));
  }

	token:Token = {
		token_text: 'orange',
    // token_type: 'unlabeled',
		token_start: 0,
    token_end: 5,
		token_labels: ['color'],
		token_selected_label: 'color',
	}

	description = new Description('1', 'orange truck carries orange and another zip', ['orange', 'carries', 'zip'])


  // description:Description = {
  // 	item_id: 1,
  // 	content: 'orange truck carries orange',
 	//   input_tokens: [this.token.token_text]
  // }




  token_segs = this.description.parse_description(this.description.content, this.description.tokens);
  displayTokens = this.token_segs;
  // segs = [
  //   {value:'apple', id:0},
  //   {value:'pear', id:1},
  //   {value:'pineapple', id:2},
  // ];



  ngOnInit() {
    console.log(this.description.tokens)
  }

}
