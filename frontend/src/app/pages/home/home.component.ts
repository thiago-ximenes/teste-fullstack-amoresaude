import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import Entity from "../../../interfaces/entity.interface";
import AttendedMedicalSpecialties from "../../../interfaces/attended_medical_specialties.interface";
import {Router} from "@angular/router";

const ELEMENT_DATA: Entity[] = [
  {
    id: 1,
    corporateName: 'Hospital São Lucas',
    tradeName: 'São Lucas',
    cnpj: '12345678901234',
    regional: {
      value: '32781632',
      label: 'São Paulo',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    opening_date: new Date(),
    active: true,
    attended_medical_specialties: [
      {
        value: '1',
        label: 'Cardiologia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        value: '12',
        label: 'Ortopedia',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly router: Router,
  ) {
  }

  filterValue = '';

  displayedColumns: string[] = ['nome', 'região', 'especialidades', 'ativa', 'actions'];

  dataSource = new MatTableDataSource<Entity>(ELEMENT_DATA);

  ngOnInit(): void {
  }

  formatSpecialties(specialties: AttendedMedicalSpecialties[]): string {
    const labels = specialties.map(specialty => specialty.label);
    if (labels.length > 1) {
      const last = labels.pop();
      return `${labels.join(', ')} e ${last}`;
    } else if (labels.length === 1) {
      return labels[0];
    } else {
      return '';
    }
  }

  navigateToNewEntity() {
    this.router.navigate(['entity/new']);
  }

  navigateToEditEntity(id: number) {
    this.router.navigate(['entity/edit', id]);
  }

  navigateToViewEntity(id: number) {
    this.router.navigate(['entity/view', id]);
  }
}
