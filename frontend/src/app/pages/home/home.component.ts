import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import Entity from "../../../interfaces/entity.interface";
import AttendedMedicalSpecialties from "../../../interfaces/attended_medical_specialties.interface";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HomeService} from "./home.service";
import {PageEvent} from "@angular/material/paginator";
import {debounceTime, Subject} from "rxjs";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  params?: Params;

  length!: number;
  page!: number;

  constructor(
    private readonly router: Router,
    private readonly homeService: HomeService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  filterValue = '';

  displayedColumns: string[] = ['nome', 'região', 'especialidades', 'ativa', 'actions'];

  dataSource: MatTableDataSource<Entity> = new MatTableDataSource<Entity>([]);

  searchChange = new Subject<Params>();

  loading = false;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.getEntities(params);
      this.filterValue = params['search'] || '';
      this.params = params;
    });

    this.searchChange.pipe(
      debounceTime(500),
    ).subscribe(params => {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: params,
        queryParamsHandling: 'merge',
      });

      this.getEntities(params);
    });
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

  getEntities(params: Params) {
    this.loading = true;
    this.homeService.getEntities(params).subscribe((response) => {
      this.dataSource = new MatTableDataSource<Entity>(response.entities);
      this.length = response.length;
      this.page = response.page;
      this.loading = false;
    });
  }

  onSearchChange(event: Event) {
    this.searchChange.next({search: (event.target as HTMLInputElement).value, page: 0});
  }

  onPageChange(event: PageEvent) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {page: event.pageIndex},
      queryParamsHandling: 'merge',
    });

    this.getEntities({...this.params!, page: event.pageIndex});
  }
}
