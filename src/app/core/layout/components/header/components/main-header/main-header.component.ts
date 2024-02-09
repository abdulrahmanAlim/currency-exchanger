import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonItem } from 'app/core/layout/models/main-header';
import { MainHeaderUtilsService } from 'app/core/layout/services/main-header.utils.service';
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
})
export class MainHeaderComponent implements OnInit {

  btnsList: ButtonItem[] = []
  constructor(private mainHeaderUtilsService: MainHeaderUtilsService , private router: Router) {
    this.btnsList = mainHeaderUtilsService.headerBtnsList
  }

  ngOnInit(): void {
  }

  routeTo(url: string) {
    this.router.navigateByUrl(url)
  }
}
