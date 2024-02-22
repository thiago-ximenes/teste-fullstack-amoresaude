import {Component, OnInit} from '@angular/core';
import {MutableEntityService} from "./mutable-entity.service";
import Regional from "../../../interfaces/regional.interface";
import AttendedMedicalSpecialties from "../../../interfaces/attended_medical_specialties.interface";
import {BehaviorSubject} from "rxjs";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import Entity from "../../../interfaces/entity.interface";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../component/error-dialog/error-dialog.component";
import DialogData from "../../../interfaces/dialog-data.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {validateCNPJ} from "../../validators/cnpj.validator";
import {Location} from "@angular/common";

@Component({
  selector: 'app-mutable-entity',
  templateUrl: './mutable-entity.component.html',
})
export class MutableEntityComponent implements OnInit {
  loading = new BehaviorSubject(false);

  title = ''
  isEdit = false
  id = ''
  actionButtonLabel = ''
  regionals!: Regional[]
  attendedMedicalSpecialties!: AttendedMedicalSpecialties[]

  entityForm: FormGroup;

  controls: {[p: string]: AbstractControl}

  constructor(
    private readonly mutableEntityService: MutableEntityService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly dialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location,
  ) {

    this.entityForm = new FormGroup({})
    this.controls = {
      corporateName: new FormControl(this.entityForm?.value?.corporateName || '', [Validators.required, Validators.maxLength(10)]),
      tradeName: new FormControl(this.entityForm?.value?.tradeName || '', [Validators.required]),
      cnpj: new FormControl(this.entityForm?.value?.cnpj || '', [Validators.required, validateCNPJ()]),
      regionalId: new FormControl(this.entityForm?.value?.regionalId || '', [Validators.required]),
      attendedMedicalSpecialties: new FormControl(this.entityForm?.value?.attendedMedicalSpecialties || '', [Validators.required, Validators.minLength(5)]),
      openingDate: new FormControl(this.entityForm?.value?.openingDate || '', [Validators.required]),
      active: new FormControl(this.entityForm?.value?.active || false, [Validators.required]),
    }

    this.entityForm = new FormGroup(this.controls,
      {updateOn: 'submit'}
    )
  }

  ngOnInit(): void {
    this.loading.next(true)
    this.mutableEntityService.getRegionals().subscribe((regional) => {
      this.regionals = regional
    })

    this.mutableEntityService.getAttendedMedicalSpecialties().subscribe((attendedMedicalSpecialties) => {
      this.attendedMedicalSpecialties = attendedMedicalSpecialties
    })

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id')

      if (id) {
        this.id = id
        this.isEdit = true
        this.title = 'Editar entidade'
        this.actionButtonLabel = 'editar'

        this.mountEditForm(id)
        return
      }

      this.title = 'Criar entidade'
      this.actionButtonLabel = 'salvar'
    });

    this.loading.next(false)

  }

  deleteEntity() {
    if (this.isEdit && this.id) {
      this.mutableEntityService.deleteEntity(this.id).subscribe({
        next: () => {
          this.toastr.success('Entidade deletada com sucesso!')
          this.router.navigate(['/home'])
        },
        error: (error: HttpErrorResponse) => {
          this.openDialog(error.error)
        }
      })
    }
  }

  back() {
    this.location.back()
  }

  onSubmit() {
    if (this.entityForm.valid) {
      this.loading.next(true)
      this.entityForm.get('cnpj')?.setValue(this.entityForm.get('cnpj')?.value.replace(/\D+/g, ''), {emitEvent: false})
      if (this.isEdit) {
        this.mutableEntityService.updateEntity(this.id, this.entityForm.value).subscribe({
          next: (response: Entity) => {
            this.loading.next(false);
            this.toastr.success('Entidade editada com sucesso!')
            this.router.navigate([`entity/view/${response.id}`])
          },
          error: (error: HttpErrorResponse) => {
            this.loading.next(false);
            this.openDialog(error.error)
          }
        })
      } else {
        this.entityForm = new FormGroup(this.controls,
          {updateOn: 'change'}
        )
        this.mutableEntityService.createEntity(this.entityForm.value).subscribe({
          next: (response: Entity) => {
            this.loading.next(false);
            this.toastr.success('Entidade criada com sucesso!')
            this.router.navigate([`entity/view/${response.id}`])
          },
          error: (error: HttpErrorResponse) => {
            this.loading.next(false);
            this.openDialog(error.error)
          }
        });
      }
    }
  }

  get hasCorporateNameRequiredError() {
    return this.entityForm.get('corporateName')?.hasError('required')
  }

  get hasCorporateNameMaxLengthError() {
    return this.entityForm.get('corporateName')?.hasError('maxlength')
  }

  get hasTradeNameRequiredError() {
    return this.entityForm.get('tradeName')?.hasError('required')
  }

  get hasCnpjRequiredError() {
    return this.entityForm.get('cnpj')?.hasError('required')
  }

  get hasCnpjPatternError() {
    return this.entityForm.get('cnpj')?.hasError('invalid')
  }

  get hasRegionalRequiredError() {
    return this.entityForm.get('regionalId')?.hasError('required')
  }

  get hasAttendedMedicalSpecialtiesRequiredError() {
    return this.entityForm.get('attendedMedicalSpecialties')?.hasError('required')
  }

  get hasAttendedMedicalSpecialtiesMinLengthError() {
    return this.entityForm.get('attendedMedicalSpecialties')?.hasError('minlength')
  }

  get hasOpeningDateRequiredError() {
    return this.entityForm.get('openingDate')?.hasError('required')
  }

  openDialog(data: DialogData) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        ...data,
        title: this.isEdit ? 'editar' : 'salvar'
      }
    });
  }

  mountEditForm(id: string) {
    this.mutableEntityService.getEntity(id).subscribe((entity: Entity) => {
      const mappedAttendedMedicalSpecialties = entity.attendedMedicalSpecialties.map((specialty) => specialty.value)

      this.entityForm = new FormGroup({
          corporateName: new FormControl(entity.corporateName, [Validators.required, Validators.maxLength(10)]),
          tradeName: new FormControl(entity.tradeName, [Validators.required]),
          cnpj: new FormControl(entity.cnpj, [Validators.required, validateCNPJ()]),
          regionalId: new FormControl(entity.regional.value, [Validators.required]),
          attendedMedicalSpecialties: new FormControl(mappedAttendedMedicalSpecialties, [Validators.required, Validators.minLength(5)]),
          openingDate: new FormControl(entity.openingDate, [Validators.required]),
          active: new FormControl(entity.active, [Validators.required]),
        },
        {updateOn: 'submit'}
      )
    })
  }
}
