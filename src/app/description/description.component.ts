import {AfterViewInit, Component, OnInit, ViewChild, ElementRef, ViewChildren, HostListener} from '@angular/core';
import { Description } from './description';
import { Token } from '../token/token';
import {TokenComponent} from "../token/token.component";
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent implements OnInit {
  @ViewChildren(TokenComponent) tokenComponents;
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

  token_segs = this.description.parse_description(this.description.content, this.description.tokens);
  displayTokens = this.token_segs;


  eventCounter: number = 1;
  prevTime: number = NaN;// last time a key is pressed
  keyStrokes : Array<string> = new Array();
  @HostListener('window:keyup', ['$event']) // selector is the 'app-token', so if there are 10 tokens, showMessage will get called 10 times on single keyup event
  captureKeyStroke(event: KeyboardEvent){

    if( !isNaN(this.prevTime) && event.keyCode === 13) {

      let keyStrokes:string = this.keyStrokes.join('');
      keyStrokes = keyStrokes.toLowerCase();

      /* if keyStrokes contains only '(' and '&': means 'up' and 'down' in dropdown menu */
      if (keyStrokes.includes('(') || keyStrokes.includes('&')){
        // document.getElementsByClassName('title')[0].focus();  doesn't change document.activeElment
        (document.activeElement as HTMLElement).blur(); // reset document.activeElement
      }
      else {
        let dropDownElement = document.getElementsByClassName(keyStrokes)[0];

        if (dropDownElement!==null && dropDownElement!==undefined) {
          (dropDownElement as HTMLElement).click();
        }
      }
      this.prevTime = NaN;
      this.keyStrokes = [];
    }

    // fill in an existing keyStrokes array
    else {
      this.keyStrokes.push(String.fromCharCode(event.keyCode));
      this.prevTime = Date.now();
    }

    this.eventCounter += 1;

  }

  /* Serialize the token-label pairs into a JSON object for the back end */
  submitLabels() {
    console.log(this.tokenComponents);
    // for (let tokenComponentIndex in this.tokenComponents) {
    //   // if (this.tokenComponents[tokenComponentIndex].displayToken.token_labels.length!=0) {
    //   console.log('.........')
    //     console.log(this.tokenComponents[tokenComponentIndex].displayToken);
    //     console.log(this.tokenComponents[tokenComponentIndex].selected_item);
    //   console.log('.........')
    //   // }
    // }
  }



  ngOnInit() {
  }

}
