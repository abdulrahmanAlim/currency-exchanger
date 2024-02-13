import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart, { ChartConfiguration, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-dynamic-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-chart.component.html',
  styleUrl: './dynamic-chart.component.scss',
})
export class DynamicChartComponent implements OnInit, OnChanges {
  @ViewChild('chart', { static: true }) private chartElementRef!: ElementRef;
  @Input() data:any;
  @Input() chartType!:ChartType;
  chart: any = [];
  title = 'ng-chart';

  constructor() {}

  ngOnInit() {
    this.initChart()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue && this.chart?.id) {
      this.chart.data = this.data;
      this.chart.update();
    }

  }

  initChart() {
    const context = this.chartElementRef.nativeElement;
    const chartData: ChartConfiguration = {
      type: this.chartType,
      data: this.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
    this.chart = new Chart(context, chartData);
  }


}
