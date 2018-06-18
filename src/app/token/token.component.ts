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


  attributes = [
    {value: 'capacity-0', viewValue: 'Capacity Blah Blah Blah'},
    {value: 'color-1', viewValue: 'Color'},
    {value: 'weight-2', viewValue: 'Weight'}
  ];

  selected_item = this.attributes[0].value;



  ngOnInit() {
  }

}
