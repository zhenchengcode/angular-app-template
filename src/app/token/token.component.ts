import { Component, OnInit, Input } from '@angular/core';
import { Description } from '../description/description';
import { Token } from './token';



@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  @Input displayToken: Token;

  attributes = [
    {value: 'capacity-0', viewValue: 'Capacity'},
    {value: 'color-1', viewValue: 'Color'},
    {value: 'weight-2', viewValue: 'Weight'}
  ];

  selected_item = this.attributes[1].value;
  constructor() { console.log('abc'); };

  constructor() { }

  ngOnInit() {
  }

}
