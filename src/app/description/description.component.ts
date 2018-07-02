import {AfterViewInit, Component, OnInit, ViewChild, ElementRef, ViewChildren, HostListener} from '@angular/core';
import { Description } from './description';
import { Token } from '../token/token';
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent implements OnInit {
  // @ViewChild("tref", {read: ElementRef}) tref: ElementRef;
  // @ViewChildren('seg_dom') seg_doms;
  // ngAfterViewInit(): void {
  //   console.log(this.tref.nativeElement); //
  //   console.log(this.seg_doms.toArray().filter(x => x.nativeElement.className.includes('highlightText')).map(x => x.nativeElement));
  // }

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
  prevTime: number = NaN;// last time a key is pressed
  keyStrokes : Array<string> = new Array();
  @HostListener('window:keyup', ['$event']) // selector is the 'app-token', so if there are 10 tokens, showMessage will get called 10 times on single keyup event
  showMessage(event: KeyboardEvent){

    // when a special key is pressed, print out keyStrokes
    // console.log(Date.now() - this.prevTime)

    // && (Date.now() - this.prevTime)/1000 > 1
    if( !isNaN(this.prevTime) && event.keyCode === 13) { // &&  event.keyCode===188
      // console.log(this.keyStrokes);
      let keyStrokes:string = this.keyStrokes.join('');
      keyStrokes = keyStrokes.toLowerCase();

      console.log(keyStrokes); // need to put here, after the following loop won't work
      let dropDownElement = document.getElementsByClassName(keyStrokes)[0];
      
      console.log(dropDownElement)
      if (dropDownElement!==null && dropDownElement!==undefined) {
        dropDownElement.click();
      }

      this.prevTime = NaN;
      this.keyStrokes = [];
    }

    // fill in an existing keyStrokes array
    else {
      this.keyStrokes.push(String.fromCharCode(event.keyCode));
      this.prevTime = Date.now();
    }



    console.log(this.eventCounter);
    this.eventCounter += 1;

  }

  /*
  * Send keystrokes captured */
  // @HostListener('window:keyup', ['$event'])
  // sendKeystrokes(event: KeyboardEvent){
  //   // currentTime - prevTime > interval, send key strokes, clear this.prevTime and this.keyStrokes
  //
  // }




  ngOnInit() {
    console.log(this.description.tokens)
  }

}
