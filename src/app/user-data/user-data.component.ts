import { Component, Input } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {
  @Input() usuario: User | null = null;

  constructor() { }
}