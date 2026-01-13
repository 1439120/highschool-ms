import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  ngAfterViewInit(): void {
    this.createStudentsChart();
    this.createPassRateChart();
  }

  createStudentsChart() {
    new Chart('studentsChart', {
      type: 'line',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [{
          label: 'Number of Students',
          data: [980, 1050, 1120, 1180, 1250],
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79,70,229,0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  createPassRateChart() {
    new Chart('passRateChart', {
      type: 'bar',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [{
          label: 'Matric Pass Rate (%)',
          data: [78, 82, 88, 90, 92],
          backgroundColor: '#22c55e'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}
