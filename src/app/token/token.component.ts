import { Component, OnInit, Input, ViewEncapsulation, HostListener} from '@angular/core';
import { Description } from '../description/description';
import { Token } from './token';



@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css'],
  encapsulation: ViewEncapsulation.None,
  // host: {'(window:keyup)': 'hotkeys($event)'}
})
export class TokenComponent implements OnInit {
  @Input() displayToken: Token;
  eventCounter: number = 1;

  attributes = [
    {value: 'capacity-0', viewValue: 'Capacity Blah Blah Blah'},
    {value: 'color-1', viewValue: 'Color'},
    {value: 'weight-2', viewValue: 'Weight'}
  ];

  selected_item = this.attributes[0].value;

  // hotkeys(event){
  //   if (event.keyCode == 65 && event.keyCode == 65){
  //     this.showMessage();
  //   }
  // }

  @HostListener('window:keyup', ['$event'])
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
  }

}
