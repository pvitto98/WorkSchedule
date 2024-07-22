// Example content of variables/charts.js
export const lineChartData = [
    {
      name: "Feriali",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    },
    {
      name: "Festivi",
      data: [20, 45, 30, 50, 49, 60, 70, 91, 125] // Example data for the second series
    }
  ];
  
  export const lineChartOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Product Trends by Month',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    }
  };