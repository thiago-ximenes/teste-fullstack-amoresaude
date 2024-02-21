import {Component, OnInit} from '@angular/core';
import {MutableEntityService} from "./mutable-entity.service";
import Regional from "../../../interfaces/regional.interface";
import AttendedMedicalSpecialties from "../../../interfaces/attended_medical_specialties.interface";
import {BehaviorSubject} from "rxjs";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import Entity from "../../../interfaces/entity.interface";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../component/error-dialog/error-dialog.component";
import DialogData from "../../../interfaces/dialog-data.interface";
import {HttpErrorResponse} from "@angular/common/http";

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

  constructor(
    private readonly mutableEntityService: MutableEntityService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly dialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.entityForm = new FormGroup({
        corporateName: new FormControl('', [Validators.required, Validators.max(10)]),
        tradeName: new FormControl('', [Validators.required]),
        cnpj: new FormControl('', [Validators.required, this.validateCNPJ()]),
        regionalId: new FormControl('', [Validators.required]),
        attendedMedicalSpecialties: new FormControl('', [Validators.required]),
        openingDate: new FormControl('', [Validators.required]),
        active: new FormControl(false, [Validators.required]),
      },
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

  getBackToHome() {
    this.router.navigate(['/home'])
  }

  onSubmit() {
    this.entityForm = new FormGroup({
        corporateName: new FormControl(this.entityForm.value.corporateName, [Validators.required, Validators.maxLength(10)]),
        tradeName: new FormControl(this.entityForm.value.tradeName, [Validators.required]),
        cnpj: new FormControl(this.entityForm.value.cnpj, [Validators.required, this.validateCNPJ()]),
        regionalId: new FormControl(this.entityForm.value.regionalId, [Validators.required]),
        attendedMedicalSpecialties: new FormControl(this.entityForm.value.attendedMedicalSpecialties, [Validators.required, Validators.maxLength(5)]),
        openingDate: new FormControl(this.entityForm.value.openingDate, [Validators.required]),
        active: new FormControl(this.entityForm.value.active, [Validators.required]),
      },
      {updateOn: 'change'}
    )

    if (this.entityForm.valid) {
      this.loading.next(true)
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

  get hasAttendedMedicalSpecialtiesMaxLengthError() {
    return this.entityForm.get('attendedMedicalSpecialties')?.hasError('maxlength')
  }

  get hasOpeningDateRequiredError() {
    return this.entityForm.get('openingDate')?.hasError('required')
  }

  get isSelectionFull(): boolean {
    return this.entityForm.get('attendedMedicalSpecialties')?.value.length === 5
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
          cnpj: new FormControl(entity.cnpj, [Validators.required, this.validateCNPJ()]),
          regionalId: new FormControl(entity.regional.value, [Validators.required]),
          attendedMedicalSpecialties: new FormControl(mappedAttendedMedicalSpecialties, [Validators.required, Validators.maxLength(5)]),
          openingDate: new FormControl(entity.openingDate, [Validators.required]),
          active: new FormControl(entity.active, [Validators.required]),
        },
        {updateOn: 'submit'}
      )
    })
  }

  validateCNPJ(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let cnpj = control.value;
      cnpj = cnpj.replace(/\D+/g, '');

      if (cnpj.length != 14)
        return {invalid: true};

      if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return {invalid: true};

      // Valida DVs
      let length = cnpj.length - 2
      let numbers = cnpj.substring(0, length);
      let digits = cnpj.substring(length);
      let sum = 0;
      let position = length - 7;
      for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * position--;
        if (position < 2)
          position = 9;
      }
      let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
      if (result != digits.charAt(0))
        return {invalid: true};

      length = length + 1;
      numbers = cnpj.substring(0, length);
      sum = 0;
      position = length - 7;
      for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * position--;
        if (position < 2)
          position = 9;
      }
      result = sum % 11 < 2 ? 0 : 11 - sum % 11;

      return result == digits.charAt(1) ? null : {invalid: true};
    }
  }
}
