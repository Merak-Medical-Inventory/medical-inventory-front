import { Component, OnInit, Input } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { getDateString } from 'src/app/util';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lot-form',
  templateUrl: './lot-form.component.html',
  styleUrls: ['./lot-form.component.css']
})
export class LotFormComponent implements OnInit {
  lotForm = new FormGroup({
    date: new FormControl('')
  });
  @Input() item: any = '';
  date: Date;
  submitted = false;
  isLoading = true;
  private now = new Date();

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.isLoading = false;
    console.log(this.item);
  }

  get f() {
    return this.lotForm.controls;
  }

  getMinDate() {
    return getDateString(this.now);
  }

  onSubmit() {
    this.date = this.lotForm.value.date;
    this.activeModal.close(this.date);
  }

}
