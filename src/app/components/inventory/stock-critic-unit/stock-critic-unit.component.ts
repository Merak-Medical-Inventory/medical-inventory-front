import { Component, OnInit, Input } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stock-critic-unit',
  templateUrl: './stock-critic-unit.component.html',
  styleUrls: ['./stock-critic-unit.component.css']
})
export class StockCriticUnitComponent implements OnInit {
  criticForm = new FormGroup({
    unit: new FormControl('')
  });
  @Input() item: any = '';
  @Input() unit: any;
  submitted = false;
  isLoading = true;
  unitResult: number;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    if (this.unit) {
      this.f.unit.setValue(this.unit);
    }
  }

  get f() {
    return this.criticForm.controls;
  }

  onSubmit() {
    this.unitResult = this.criticForm.value.unit;
    this.activeModal.close(this.unitResult);
  }

}
