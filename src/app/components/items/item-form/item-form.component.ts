import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {Item, PostItem} from '../../../entities/item';
import {ItemService} from '../../../services/item/item.service';
import {CategoryService} from '../../../services/category/category.service';
import {BrandService} from '../../../services/brand/brand.service';
import {PresentationService} from '../../../services/presentation/presentation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../../../entities/category';
import {Brand} from '../../../entities/brand';
import {Presentation} from '../../../entities/presentation';
import {CategoryFormComponent} from '../../categories/category-form/category-form.component';
import {BrandFormComponent} from '../../brands/brand-form/brand-form.component';
import {PresentationFormComponent} from '../../presentations/presentation-form/presentation-form.component';
import {AlertService} from '../../../services/alert/alert.service';
import {GeneralItem} from '../../../entities/generalItem';
import {GeneralItemService} from '../../../services/generalItem/general-item.service';
import {GeneralItemFormComponent} from '../../generalItems/general-item-form/general-item-form.component';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  itemForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    brand_code:  new FormControl('', [Validators.required, Validators.maxLength(20)]),
    generalItem: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    presentation: new FormControl('', [Validators.required])
  });
  generalItemOptions: Options;
  generalItems: Select2OptionData[] = [];
  generalItemsData: GeneralItem[] = [];
  categoryOptions: Options;
  categories: Select2OptionData[] = [];
  categoriesData: Category[] = [];
  brandOptions: Options;
  brands: Select2OptionData[] = [];
  brandsData: Brand[] = [];
  presentationOptions: Options;
  presentations: Select2OptionData[] = [];
  presentationsData: Presentation[] = [];
  itemId: number;
  submitted = false;
  buttonDisabled = false;
  isLoading = true;
  item: Item;

  constructor(private service: ItemService, private generalItemService: GeneralItemService,
              private categoryService: CategoryService, private brandService: BrandService,
              private presentationService: PresentationService, private alertService: AlertService, private modalService: NgbModal,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.generalItemOptions = {
      width: '100%',
      placeholder: {id: '', text: 'Seleccione el Insumo General...'}
    };
    this.categoryOptions = {
      width: '100%',
      placeholder: {id: '', text: 'Seleccione la Categoría...'}
    };
    this.brandOptions = {
      width: '100%',
      placeholder: {id: '', text: 'Seleccione la Marca...'}
    };
    this.presentationOptions = {
      width: '100%',
      placeholder: {id: '', text: 'Seleccione la Presentación...'}
    };
    this.route.params.subscribe(params => {
      this.itemId = parseInt(params.itemId, 0);
    });
    this.getSelectGeneralItem().then(() => {
      this.getSelectCategories().then(() => {
        this.getSelectBrands().then(() => {
          this.getSelectPresentations().then(() => {
            if (this.itemId) {
              this.service.getItemById(this.itemId).subscribe(response => {
                this.item = response.body['data'];
                console.log(response);
                this.f.code.setValue(this.item.code);
                this.f.brand_code.setValue(this.item.brand_code);
                this.f.generalItem.setValue(this.item.generalItem.id);
                this.f.category.setValue(this.item.category.id);
                this.f.brand.setValue(this.item.brand.id);
                this.f.presentation.setValue(this.item.presentation.id);
              });
            }
            this.isLoading = false;
            console.log(this.categories);
            console.log(this.brands);
            console.log(this.presentations);
          });
        });
      });
    });
  }

  get f() {
    return this.itemForm.controls;
  }

  async getSelectGeneralItem() {
    this.alertService.clear();
    const array: Select2OptionData[] = [];
    this.generalItems = await this.generalItemService.getGeneralItems().toPromise().then(value => {
      this.generalItemsData = value.body['data'];
      for (const generalItem of this.generalItemsData) {
        const data: Select2OptionData = {
          id: generalItem.id.toString(),
          text: generalItem.name
        };
        array.push(data);
      }
      return array;
    })
      .catch( error => {
        this.alertService.error('Error al Obtener los Insumos Generales', false);
        return array;
      });
  }

  generalItemChanged(data: { value: string }) {
    this.f.generalItem.setValue(data.value);
  }

  async getSelectCategories() {
    this.alertService.clear();
    const array: Select2OptionData[] = [];
    this.categories = await this.categoryService.getCategories().toPromise().then(value => {
      this.categoriesData = value.body['data'];
      for (const category of this.categoriesData) {
        const data: Select2OptionData = {
          id: category.id.toString(),
          text: category.name
        };
        array.push(data);
      }
      return array;
    })
      .catch( error => {
        this.alertService.error('Error al Obtener las Categorías', false);
        return array;
      });
  }

  categoryChanged(data: { value: string }) {
    this.f.category.setValue(data.value);
  }

  async getSelectBrands() {
    this.alertService.clear();
    const array: Select2OptionData[] = [];
    this.brands = await this.brandService.getBrands().toPromise().then(value => {
      this.brandsData = value.body['data'];
      for (const brand of this.brandsData) {
        const data: Select2OptionData = {
          id: brand.id.toString(),
          text: brand.name
        };
        array.push(data);
      }
      return array;
    })
      .catch( error => {
        this.alertService.error('Error al Obtener las Marcas', false);
        return array;
      });
  }

  brandChanged(data: { value: string }) {
    this.f.brand.setValue(data.value);
  }

  async getSelectPresentations() {
    this.alertService.clear();
    const array: Select2OptionData[] = [];
    this.presentations = await this.presentationService.getPresentations().toPromise().then(value => {
      this.presentationsData = value.body['data'];
      for (const presentation of this.presentationsData) {
        const data: Select2OptionData = {
          id: presentation.id.toString(),
          text: presentation.quantity + ' ' + presentation.name + ' ' +
            presentation.measure_value + ' ' + presentation.measure
        };
        array.push(data);
      }
      return array;
    })
      .catch( error => {
        this.alertService.error('Error al Obtener las Presentaciones', false);
        return array;
      });
  }

  presentationChanged(data: { value: string }) {
    this.f.presentation.setValue(data.value);
  }

  addGeneralItem() {
    localStorage.setItem('modal', 'true');
    const modalRef: NgbModalRef = this.modalService.open(GeneralItemFormComponent, { centered: true });
    modalRef.componentInstance.isClient = true;
    modalRef.result.then(() => {
      localStorage.removeItem('modal');
    }, () => {
      this.isLoading = true;
      this.getSelectGeneralItem().then(() => {
        this.isLoading = false;
      });
    });
  }

  addCategory() {
    localStorage.setItem('modal', 'true');
    const modalRef: NgbModalRef = this.modalService.open(CategoryFormComponent, { centered: true });
    modalRef.componentInstance.isClient = true;
    modalRef.result.then(() => {
      localStorage.removeItem('modal');
    }, () => {
      this.isLoading = true;
      this.getSelectCategories().then(() => {
        this.isLoading = false;
      });
    });
  }

  addBrand() {
    localStorage.setItem('modal', 'true');
    const modalRef: NgbModalRef = this.modalService.open(BrandFormComponent, { centered: true });
    modalRef.componentInstance.isClient = true;
    modalRef.result.then(() => {
      localStorage.removeItem('modal');
    }, () => {
      this.isLoading = true;
      this.getSelectBrands().then(() => {
        this.isLoading = false;
      });
    });
  }

  addPresentation() {
    localStorage.setItem('modal', 'true');
    const modalRef: NgbModalRef = this.modalService.open(PresentationFormComponent, { centered: true });
    modalRef.componentInstance.isClient = true;
    modalRef.result.then(() => {
      localStorage.removeItem('modal');
    }, () => {
      this.isLoading = true;
      this.getSelectPresentations().then(() => {
        this.isLoading = false;
      });
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.itemForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.alertService.clear();
    this.buttonDisabled = true;
    const body: PostItem = {
      code: this.itemForm.value.code,
      brand_code: this.itemForm.value.brand_code,
      generalItem: Number(this.itemForm.value.generalItem),
      category: Number(this.itemForm.value.category),
      brand: Number(this.itemForm.value.brand),
      presentation: Number(this.itemForm.value.presentation)
    };
    console.log(body);
    if (!this.itemId) {
      this.service.postItem(body)
        .subscribe(response => {
          this.router.navigate(['/items']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Insumo se ha Agregado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          this.alertService.error('Error al Agregar el Insumo', false);
        });
    } else {
      this.service.updateItem(body, this.itemId)
        .subscribe(response => {
          this.router.navigate(['/items']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Insumo se ha Editado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          this.alertService.error('Error al Editar el Insumo', false);
        });
    }
  }

}
