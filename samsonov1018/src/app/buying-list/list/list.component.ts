import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { list, IsPurchased } from 'src/app/shared/models/list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  lists: list[];
  isPurchased = IsPurchased;
  searchStr = '';

  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  onAddObject() {
    this.router.navigate([this.router.url, 'profile']);
  }

}
