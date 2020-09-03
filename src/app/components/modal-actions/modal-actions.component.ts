import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-actions',
  templateUrl: './modal-actions.component.html',
  styleUrls: ['./modal-actions.component.scss']
})
export class ModalActionsComponent implements OnInit {
  
  @Input() public product;

  constructor() { }

  ngOnInit(): void {
  }

}
