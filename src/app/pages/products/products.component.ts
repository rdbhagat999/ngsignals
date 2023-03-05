import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgGridAngular, AgGridModule } from "ag-grid-angular";
import {
  GridApi,
  ColDef,
  GridReadyEvent,
  CellClickedEvent,
} from "ag-grid-community";
import { Observable, takeUntil, map, tap } from "rxjs";
import { LifeCycleDirective } from "src/app/directives";
import { IProductsAPIResponse } from "src/app/models";
import { ProductService } from "src/app/services";
import { ImageCellComponent } from "./image-cell/image-cell.component";
import { fromSignal } from "src/app/lib";

@Component({
  selector: "app-products",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, AgGridModule, ImageCellComponent],
  hostDirectives: [LifeCycleDirective],
  template: `
    <div class="space-x-4">
      <button
        class="text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-700 px-4 py-1 my-2 rounded"
        (click)="onBtnExport()">
        Export CSV
      </button>
      <button
        class="text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-700 px-4 py-1 my-2 rounded"
        (click)="clearSelection()">
        Clear Selection
      </button>
    </div>
    <!-- AG Grid Angular Component -->
    <ag-grid-angular
      style="width: 840px; height: 300px"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="(rowData$ | async)?.products"
      [rowSelection]="'multiple'"
      [animateRows]="true"
      [debounceVerticalScrollbar]="true"
      [pagination]="true"
      [paginationPageSize]="paginationPageSize()"
      [suppressPaginationPanel]="true"
      [suppressScrollOnNewData]="true"
      (gridReady)="onGridReady($event)"
      (cellClicked)="onCellClicked($event)"
      (paginationChanged)="onPaginationChanged($event)"></ag-grid-angular>
    <div class="flex justify-center items-center space-x-4">
      <button
        class="text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-700 px-4 py-1 my-2 rounded"
        (click)="onBtnFirst()">
        First
      </button>
      <button
        class="text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-700 px-4 py-1 my-2 rounded"
        (click)="onBtnPrevious()">
        Previous
      </button>
      <p class="font-semibold">
        {{ (currentPage() + 1) * 10 }} / {{ (rowData$ | async)?.total }}
      </p>
      <button
        class="text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-700 px-4 py-1 my-2 rounded"
        (click)="onBtnNext()">
        Next
      </button>
      <button
        class="text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-700 px-4 py-1 my-2 rounded"
        (click)="onBtnLast()">
        Last
      </button>
    </div>
  `,
  styles: [],
})
export class ProductsComponent {
  private productService: ProductService = inject(ProductService);
  private gridApi!: GridApi;
  public currentPage = signal<number>(0);
  public paginationPageSize = signal<number>(10);
  private lifeCycleDirective = inject(LifeCycleDirective);
  rowData$!: Observable<IProductsAPIResponse>;

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: "id" },
    {
      field: "thumbnail",
      cellRenderer: ImageCellComponent,
      cellRendererParams: {
        buttonText: "Click image",
      },
    },
    { field: "category" },
    { field: "brand" },
    { field: "title", headerName: "Product" },
    { field: "description" },
    { field: "price" },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    editable: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.fetchProducts();
    this.currentPage.set(this.gridApi.paginationGetCurrentPage());
  }

  onCellClicked(e: CellClickedEvent): void {
    console.log("cellClicked", e);
  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

  onPaginationChanged(event: any) {
    console.log("onPaginationChanged");
  }

  onBtPageFive() {
    // we say page 2, as the first page is zero
    this.gridApi.paginationGoToPage(2);
  }

  onBtnFirst() {
    // this.gridApi.paginationGoToFirstPage();
    // this.gridApi.paginationGoToPage(0);
    this.currentPage.set(0);
    this.fetchProducts();
  }

  onBtnLast() {
    // this.gridApi.paginationGoToLastPage();
    const total$ = this.rowData$.pipe(
      takeUntil(this.lifeCycleDirective.destroy$),
      map((data) => data?.total)
    );

    total$.subscribe((total) => {
      this.currentPage.set(total / this.paginationPageSize() - 1);
      this.fetchProducts();
    });
  }

  onBtnNext() {
    // this.gridApi.paginationGoToNextPage();
    this.currentPage.update((state) => (state += 1));
    this.fetchProducts();
  }

  onBtnPrevious() {
    // this.gridApi.paginationGoToPreviousPage();
    this.currentPage.update((state) => (state -= 1));
    this.fetchProducts();
  }

  onBtShowLoading() {
    this.agGrid.api!.showLoadingOverlay();
  }

  onBtShowNoRows() {
    this.agGrid.api!.showNoRowsOverlay();
  }

  onBtHide() {
    this.agGrid.api!.hideOverlay();
  }

  fetchProducts() {
    this.onBtShowLoading();

    this.rowData$ = fromSignal(
      this.productService.getProducts(
        this.currentPage(),
        this.paginationPageSize()
      )
    );

    this.onBtHide();
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
