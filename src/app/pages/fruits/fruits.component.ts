import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FruitsService } from './../../services/fruits.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import swal from 'sweetalert2';

interface PeriodicElement {
  id: number;
  name: string;
}

@Component({
  selector: 'app-fruits',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './fruits.component.html',
  styleUrl: './fruits.component.scss',
})
export class FruitsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fruitsService: FruitsService) {}

  ngOnInit() {
    this.list();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async list() {
    const page = this.currentPage + 1;
    this.fruitsService.list(page, this.pageSize).subscribe((response) => {
      this.dataSource = new MatTableDataSource<PeriodicElement>(
        response.results
      );

      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = response.total;
      });
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.list();
  }

  async delete(id: number) {
    swal
      .fire({
        text: `Do you want to remove this fruit?`,
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
        icon: 'warning',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          this.fruitsService
            .delete(id)
            .subscribe(async () => await this.list());
        }
      });
  }
}
