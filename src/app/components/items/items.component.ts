import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/Item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  //set as property as below
  items: Item[];
  editState: boolean = false;
  itemToEdit: Item;

  constructor(private itemService: ItemService) { }



  ngOnInit() {
    console.log('ngOnInit running');
    this.itemService.getItems().subscribe(items => {
    //console.log(items);
    this.items = items;
  });
  }

  editItem(event, item: Item) {
    this.editState = true;
    this.itemToEdit = item;
  }

  deleteItem(event, item: Item){
    this.clearState();
    this.itemService.deleteItem(item);
  }

  updateItem(item: Item) {
    this.itemService.updateItem(item);
    this.clearState();

  }

  clearState() {
    this.editState = false;
    this.itemToEdit = null;
  }


}
