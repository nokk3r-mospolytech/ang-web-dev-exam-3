import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { list, IsPurchased } from 'src/app/shared/models/list.model';
import { ListService } from 'src/app/shared/services/list.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.css']
})
export class ListTableComponent implements OnInit {

  lists: list[] = [];
  Object: list;
  id: number | undefined;
  isPurchased = IsPurchased;
  isBought;

  @Input() typeS = null;
  @Input() title = '';
  @Input() searchStroke = '';


  constructor(
              private activatedRoute: ActivatedRoute,
              private listService: ListService,
              private router: Router) {}
  sort = null;

  ngOnInit(): void {
    this.getData().then(r => {});
  }

  async changeTheme(ObjId: number){
    try {
      let list = await this.listService.getOneById(ObjId);
      console.log(ObjId);
      if(list.bought == '1') {
        await this.listService.putOneById(ObjId, {"name": list.name, "count": list.count, "bought": "0"})
        // console.log((await this.MpurchaseService.getOneById(id)).status)
      }else {
        await this.listService.putOneById(ObjId, {"name": list.name, "count": list.count, "bought": "1"})
      }
      this.getData();

    } catch(err) {
      console.error(err);
    }
  }

  sortTable(sortType: number){
    if (sortType == 0 ){
      console.log("Сортировка");
      this.sort = 0;
      let i = 0
      this.lists.sort(function(a, b) {
        return a.bought - b.bought;
      });
    }
    else
      if (this.sort != 1){
        console.log("Наименование в порядке возрастания");
        this.sort = 1;
        this.lists.sort(function(a, b) {
          return Date.parse(a.name) - Date.parse(b.name);
        });
      }
      else {
        console.log("Наименование в порядке убывания");
        this.sort = 2;
        //console.log(this.buying-list);
        this.lists.sort(function(a, b) {
          return Date.parse(b.name) - Date.parse(a.name);
        });
      }
  }

  onLinkProfile(id: number) {
    this.router.navigate([this.router.url, 'profile', id]);
  }

  async getData() {
    try {
      let list = this.listService.getAll();
      this.lists = isNullOrUndefined(await list) ? [] : await list;
      //this.buying-list = await buying-list;
    } catch(err) {
      console.error(err);
    }
  }
  async onDelete(id: number) {
    try {
        await this.listService.deleteOneById(id);
        await this.getData();
      //await this.muserSevice.deleteOneById(this.id);
    } catch(err) {
      console.error(err);
    }
  }
}
