import { Component } from '@angular/core';
import { Avatar } from '../avatar/avatar';

@Component({
  selector: 'app-navbar',
  imports: [Avatar],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {}
