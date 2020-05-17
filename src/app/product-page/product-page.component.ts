import { Component, OnInit } from "@angular/core";
import { HttpClientService, Product } from "../service/http-client.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-page",
  templateUrl: "./product-page.component.html",
  styleUrls: ["./product-page.component.css"],
})
export class ProductPageComponent implements OnInit {
  category: string = "All Products";
  filter: string = "";
  searchProduct: string = "";
  categoryProducts: Product[];
  allProducts: Product[];
  products: Product[];
  singleProduct: Product;
  columnDisplay: number = 3;
  noShow: boolean = false;
  discountPercent: string = "";

  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.httpClientService.getAllProducts().subscribe((response) => {
      this.allProducts = response;

      this.products = this.removeDuplicates(
        this.allProducts,
        "productCategory"
      );
      console.log(this.products);
    });

    let id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.httpClientService
      .getProduct(id)
      .subscribe((response) => (this.singleProduct = response));
  }

  getCategoryProducts(c) {
    this.category = c.target.innerHTML;

    this.noShow = true;
    this.httpClientService.getCategory(this.category).subscribe((response) => {
      this.categoryProducts = response;
    });
  }

  getDiscountProducts(c) {
    this.discountPercent = c.target.innerHTML;
    localStorage.setItem("category", this.category);
    this.noShow = true;
    this.httpClientService
      .getDiscount(localStorage.getItem("category"), this.discountPercent)
      .subscribe((response) => {
        this.categoryProducts = response;
      });
    console.log(this.categoryProducts);
  }

  applyFilters(selectedFilter) {
    this.filter = selectedFilter;
  }

  removeDuplicates(array, key) {
    let lookup = new Set();
    return array.filter((obj) => !lookup.has(obj[key]) && lookup.add(obj[key]));
  }

  search() {
    this.httpClientService
      .getSearchProducts(this.searchProduct)
      .subscribe((response) => {
        this.categoryProducts = response;
      });
  }

  show() {
    alert("1");
  }

  closePop() {
    document.getElementById("id01").style.display = "none";
  }
  openPop() {
    document.getElementById("id01").style.display = "block";
  }

  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

}
