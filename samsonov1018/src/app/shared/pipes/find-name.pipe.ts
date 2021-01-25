import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findName'
})
export class FindNamePipe implements PipeTransform {

  transform(items: any[], searchStr: string): any[] {
    console.log(searchStr);
    if (searchStr =='' )
      return items;
    else{
      let ListItems = items.filter((item)=>
        ((item.name).toLowerCase().indexOf(searchStr.toLowerCase()) !== -1)||((item.surname + ' ' + item.name).toLowerCase().indexOf(searchStr.toLowerCase()) !== -1))
      return ListItems;
    }
  }

}
