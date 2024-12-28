import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditableGroceryItem } from '~/app/models/grocery-item.model';

@Component({
  selector: 'ns-editable-grocery-item',
  templateUrl: './editable-grocery-item.component.html',
  styleUrls: ['./editable-grocery-item.component.css']
})
export class EditableGroceryItemComponent {

  @Input()
  item: EditableGroceryItem;

  @Output()
  delete = new EventEmitter<EditableGroceryItem>();

  @Output()
  add = new EventEmitter<EditableGroceryItem>();

  @Output()
  edit = new EventEmitter<EditableGroceryItem>();

}
