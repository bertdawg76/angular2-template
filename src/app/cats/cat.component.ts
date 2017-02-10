import {Component, OnInit} from '@angular/core';
import {CatService} from "../shared/services/cat.service";
import {Cats} from './cat';
import {log} from "util";
import 'rxjs/add/operator/startWith';


@Component({
  selector: 'cat-app',
  templateUrl: 'cat.component.html',
  styleUrls: ['cat.component.scss']
})

export class CatComponent implements OnInit {

  cats = this.catService.getCats().startWith([]);
  errorMessage: string;

  constructor(private catService: CatService){}

  ngOnInit(){
    // this.getCats();
  }

  // getCats(){
  //   this.catService.getCats().subscribe(
  //     cats => this.cats = cats,
  //     error => this.errorMessage = <any>error
  //   )
  // }
}
