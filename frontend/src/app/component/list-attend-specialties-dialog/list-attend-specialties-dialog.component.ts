import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import AttendedMedicalSpecialties from "../../../interfaces/attended_medical_specialties.interface";

@Component({
  selector: 'list-attend-specialties-dialog',
  templateUrl: './list-attend-specialties-dialog.component.html',
})
export class ListAttendSpecialtiesDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ListAttendSpecialtiesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AttendedMedicalSpecialties[],
  ) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get specialties(): string[] {
    return this.data.map((specialty) => specialty.label)
  }
}
