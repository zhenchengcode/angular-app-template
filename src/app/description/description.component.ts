import {AfterViewInit, Component, OnInit, ViewChild, ElementRef, ViewChildren, HostListener} from '@angular/core';
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
    token_picker_id: ''
	}

	description = new Description('1', 'orange truck carries orange and another zip for a zebra blueberry truck carries melon and another ship for a fish', ['orange truck', 'zip', 'zebra', 'melon', 'ship'])


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

  eventCounter: number = 1;
  @HostListener('window:keyup', ['$event']) // selector is the 'app-token', so if there are 10 tokens, showMessage will get called 10 times on single keyup event
  showMessage(event: KeyboardEvent){
    console.log('captured')
    this.eventCounter += 1;
    console.log('after increase')
    console.log(this.eventCounter)
    // if (event.keyCode === 65 && this.eventCounter==1) {
    //   console.log('Hotkey Test');
    // }
  }




  ngOnInit() {
    console.log(this.description.tokens)
  }

}
