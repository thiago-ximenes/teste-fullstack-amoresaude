import {Component, OnInit} from '@angular/core';
import {MutableEntityService} from "../mutable-entity/mutable-entity.service";
import {ActivatedRoute, Router} from "@angular/router";
import Entity from "../../../interfaces/entity.interface";
import {format} from "extended-format";
import {MatDialog} from "@angular/material/dialog";
import {
  ListAttendSpecialtiesDialogComponent
} from "../../component/list-attend-specialties-dialog/list-attend-specialties-dialog.component";
import * as moment from "moment";

@Component({
  selector: 'app-view-entity',
  templateUrl: './view-entity.component.html',
})
export class ViewEntityComponent implements OnInit {
  id: string | null = null;

  entity: Entity | null = null;

  constructor(
    private readonly mutableEntityService: MutableEntityService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getEntity();
    });
  }

  navigateToEdit(): void {
    this.router.navigate([`/entity/edit/${this.id}`]);
  }

  getEntity() {
    this.mutableEntityService.getEntity(this.id!).subscribe(entity => {
      this.entity = entity;
    });
  }

  get tradeName(): string {
    return this.entity?.tradeName || '';
  }

  get corporateName(): string {
    return this.entity?.corporateName || '';
  }

  get cnpj(): string {
    return this.entity?.cnpj ? format.cnpj(this.entity?.cnpj!) : '';
  }

  get specialties(): string {
    const specialties = this.entity?.attendedMedicalSpecialties

    if (!specialties) return '';

    if (specialties.length > 2) {
      return `${specialties[0].label}, ${specialties[1].label}`;
    }

    return specialties.map((specialty) => specialty.label).join(', ');
  }

  get specialtiesPlusLength(): number {
    const specialties = this.entity?.attendedMedicalSpecialties
    if (!specialties || specialties.length <= 2) return 0;

    return specialties.length - 2;
  }

  get regional(): string {
    return this.entity?.regional?.label || '';
  }

  get openingDate(): Date | undefined | string {
    return this.entity?.openingDate ? moment(this.entity?.openingDate).utc().format('DD/MM/YYYY') : '';
  }

  get active(): string {
    return this.entity?.active ? 'Sim' : 'Não';
  }

  openDialog(): void {
    this.dialog.open(ListAttendSpecialtiesDialogComponent, {
      data: this.entity?.attendedMedicalSpecialties
    });
  }

  backToHome(): void {
    this.router.navigate(['/home']);
  }
}
