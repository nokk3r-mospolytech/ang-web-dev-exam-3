import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { list, IsPurchased } from 'src/app/shared/models/list.model';
import { ListService } from 'src/app/shared/services/list.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {
  id: number;
  list: list;
  formGroup: FormGroup;
  isPurchased = IsPurchased;


  constructor(private activatedRoute: ActivatedRoute,
    private listService: ListService,
    private router: Router) {
    this.activatedRoute.params.subscribe(params =>{
      if(!isNullOrUndefined(params.id)) {
        this.id = +params.id;
      } else {
        this.id = null;
      }
    })
   }

  ngOnInit(): void {
    this.formGroup = new FormGroup ({
      name: new FormControl(null, [Validators.required]),
      count: new FormControl(null, [Validators.required]),
      bought: new FormControl(0),

    })
    this.getData().then(r =>{});
  }

  async getData() {
    if(!isNullOrUndefined(this.id)) {
      try {
        let list = this.listService.getOneById(this.id);
        this.list = await list;
      }catch(err) {
        console.error(err);
      }
      this.formGroup.patchValue({
        name: this.list.name,
        count: this.list.count,
        bought: this.list.bought,
      })
    }
  }

  async onDelete() {
    try {
      await this.listService.deleteOneById(this.id);
    } catch(err) {
      console.error(err);
    }
    await this.router.navigate(['/buying-list']);
  }

  async onSave() {
    console.log('1');
    if(!isNullOrUndefined(this.id)){
      try {
        await this.listService.putOneById(this.id, this.formGroup.value);
        console.log(this.formGroup.value);
      } catch(err) {
        console.error(err);
      }
    } else {
      try {
        let res = await this.listService.postOne(this.formGroup.value);
        console.log(res);
        await this.router.navigate([this.router.url, res.id]);
        await this.getData();
      } catch(err) {
        console.error(err);
      }
    }
  }
}
