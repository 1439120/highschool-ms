import { Component, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements AfterViewInit {
  @ViewChild('enrollmentChart') enrollmentChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('passRateChart') passRateChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('stemChart') stemChartRef!: ElementRef<HTMLCanvasElement>;

  // Data for grade distribution
  gradeDistribution = [
    { name: 'Grade 8', count: 290 },
    { name: 'Grade 9', count: 270 },
    { name: 'Grade 10', count: 250 },
    { name: 'Grade 11', count: 220 },
    { name: 'Grade 12', count: 180 }
  ].map(g => ({
    ...g,
    percentage: Math.round((g.count / 1210) * 100) // total = 1210
  }));

  // Strategic alerts data
  strategicAlerts = [
    { icon: 'fas fa-chart-simple', text: 'Pass rate target (92%) exceeded by 2%', badge: '+2%', type: 'success' },
    { icon: 'fas fa-user-graduate', text: 'Grade 12 enrollment dip — 180 vs 205 last year', badge: '-12%', type: 'warning' },
    { icon: 'fas fa-coin-bill', text: 'Govt. budget allocation: +8% for STEM labs', badge: 'approved', type: '' },
    { icon: 'fas fa-people-group', text: 'Teacher : student ratio improved to 1:16', badge: 'optimal', type: 'success' },
    { icon: 'fas fa-building-columns', text: 'Infrastructure: 2 new classrooms needed by 2027', badge: 'action', type: 'warning' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Only run chart initialization in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.initCharts();
    }
  }

  private initCharts() {
    // Enrollment chart (line)
    const enrollmentCtx = this.enrollmentChartRef.nativeElement.getContext('2d');
    if (enrollmentCtx) {
      new Chart(enrollmentCtx, {
        type: 'line',
        data: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          datasets: [{
            label: 'Students',
            data: [980, 1060, 1150, 1220, 1300, 1350],
            backgroundColor: 'rgba(42, 111, 156, 0.10)',
            borderColor: '#2a6f9c',
            borderWidth: 3,
            pointBackgroundColor: '#2a6f9c',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            tension: 0.2,
            fill: true,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: { legend: { display: false }, tooltip: { backgroundColor: '#0e2c42', titleColor: '#eef6fd' } },
          scales: {
            y: { beginAtZero: true, grid: { color: '#e4ebf3' }, ticks: { color: '#386481' } },
            x: { grid: { display: false }, ticks: { color: '#386481' } }
          }
        }
      });
    }

    // Pass rate chart (line)
    const passCtx = this.passRateChartRef.nativeElement.getContext('2d');
    if (passCtx) {
      new Chart(passCtx, {
        type: 'line',
        data: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          datasets: [{
            label: 'Pass %',
            data: [78, 81, 85, 88, 91, 92],
            backgroundColor: 'rgba(31, 139, 110, 0.10)',
            borderColor: '#1f8b6e',
            borderWidth: 3,
            pointBackgroundColor: '#1f8b6e',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            tension: 0.2,
            fill: true,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: { legend: { display: false }, tooltip: { backgroundColor: '#0e2c42', titleColor: '#eef6fd' } },
          scales: {
            y: { beginAtZero: true, grid: { color: '#e4ebf3' }, ticks: { color: '#386481' } },
            x: { grid: { display: false }, ticks: { color: '#386481' } }
          }
        }
      });
    }

    // STEM uptake chart (bar)
    const stemCtx = this.stemChartRef.nativeElement.getContext('2d');
    if (stemCtx) {
      new Chart(stemCtx, {
        type: 'bar',
        data: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          datasets: [{
            label: 'STEM students',
            data: [210, 245, 290, 340, 405, 460],
            backgroundColor: 'rgba(180, 125, 58, 0.30)',
            borderColor: '#b47d3a',
            borderWidth: 2,
            borderRadius: 6,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: { legend: { display: false }, tooltip: { backgroundColor: '#0e2c42' } },
          scales: {
            y: { beginAtZero: true, grid: { color: '#e4ebf3' }, ticks: { color: '#386481' } },
            x: { grid: { display: false }, ticks: { color: '#386481' } }
          }
        }
      });
    }
  }
}