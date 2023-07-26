import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private communicationService: CommunicationService) {}
  products: any[] = [];

  // Flag variables for column sort order
  id_sort_asc = false;
  name_sort_asc = false;
  type_sort_asc = false;
  price_sort_asc = false;
  units_sort_asc = false;
  manufacturing_sort_asc = false;

  // clone of products array
  temp_products: any[] = [];

  ngOnInit() {
    // Get the product data from API
    this.communicationService.getData().subscribe((data) => {
      this.products = data;
      this.temp_products = [...this.products];
    });
  }

  // Method to sort the data of table based on column
  onSort(property: any, type: any) {
    // set the sort order
    let asc_order = this.setSortOrder(property);

    // based on data type, sort the data
    switch (type) {
      case 'number':
        // sort in ascending order
        if (asc_order) {
          this.products.sort((a: any, b: any) => {
            return a[property] - b[property];
          });
        }
        // sort in descending order
        else {
          this.products.sort((a: any, b: any) => {
            return b[property] - a[property];
          });
        }
        break;
      case 'string':
        // sort in ascending order
        if (asc_order) {
          this.products.sort((a: any, b: any) => {
            let s1 = a[property].toLowerCase(),
              s2 = b[property].toLowerCase();

            if (s1 < s2) return -1;
            if (s1 > s2) return 1;

            return 0;
          });
        }

        // sort in descending order
        else {
          this.products.sort((a: any, b: any) => {
            let s1 = a[property].toLowerCase(),
              s2 = b[property].toLowerCase();

            if (s1 < s2) return 1;
            if (s1 > s2) return -1;

            return 0;
          });
        }
        break;
      case 'date':
        // sort in ascending order
        if (asc_order) {
          this.products.sort((a: any, b: any) => {
            let date1 = new Date(a[property]).valueOf();
            let date2 = new Date(b[property]).valueOf();
            return date1 - date2;
          });
        }
        // sort in descending order
        else {
          this.products.sort((a: any, b: any) => {
            let date1 = new Date(a[property]).valueOf();
            let date2 = new Date(b[property]).valueOf();
            return date2 - date1;
          });
        }
        break;
      default:
        break;
    }
  }

  // Method to set the sort order based on toggling
  setSortOrder(property: string) {
    let order;
    switch (property) {
      case 'id':
        this.id_sort_asc = !this.id_sort_asc;
        order = this.id_sort_asc;
        break;
      case 'name':
        this.name_sort_asc = !this.name_sort_asc;
        order = this.name_sort_asc;
        break;
      case 'type':
        this.type_sort_asc = !this.type_sort_asc;
        order = this.type_sort_asc;
        break;
      case 'price':
        this.price_sort_asc = !this.price_sort_asc;
        order = this.price_sort_asc;
        break;
      case 'units':
        this.units_sort_asc = !this.units_sort_asc;
        order = this.units_sort_asc;
        break;
      case 'manufacturing':
        this.manufacturing_sort_asc = !this.manufacturing_sort_asc;
        order = this.manufacturing_sort_asc;
        break;
      default:
        break;
    }
    return order;
  }

  // Method to filter the data based on search
  onFilter(event: any, property: string) {
    const searchedString = event.target.value;

    this.products = this.temp_products.filter((product) => {
      return product[property]
        .toString()
        .toLowerCase()
        .includes(searchedString.toLowerCase());
    });
  }
}
