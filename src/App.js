import React, { useEffect, useRef, useState } from 'react';
import {
  Typography,
  Button,
  Grid,
  Paper,
  Container,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Icon,
} from '@mui/material';
import Chart from 'chart.js/auto';

const InsightsDashboard = () => {
  const chartRef = useRef(null);
  const barChartRef = useRef(null);
  const [barChartData, setBarChartData] = useState([]);
  const [spendByCities, setSpendByCities] = useState([
    { city: 'Paris', totalSpend: 600 },
    { city: 'London', totalSpend: 800 },
    { city: 'Rome', totalSpend: 500 },
    { city: 'Berlin', totalSpend: 700 },
    { city: 'Amsterdam', totalSpend: 900 },
  ]);

  useEffect(() => {
    let doughnutChart;
    let barChart;

    const createCharts = () => {
      // Destroy existing charts if they exist
      if (doughnutChart) {
        doughnutChart.destroy();
      }
      if (barChart) {
        barChart.destroy();
      }

      // Initialize the doughnut chart
      doughnutChart = new Chart(chartRef.current, {
        type: 'doughnut',
        data: {
          labels: spendByCities.map((city) => city.city),
          datasets: [
            {
              data: spendByCities.map((city) => city.totalSpend),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#FF9F40',
                '#9966FF',
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#FF9F40',
                '#9966FF',
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });

      // Initialize the bar chart
      barChart = new Chart(barChartRef.current, {
        type: 'bar',
        data: {
          labels: Array.from({ length: 30 }, (_, i) => i + 1), // Generate labels for 30 days
          datasets: [
            {
              label: 'Total Spend',
              data: barChartData,
              backgroundColor: '#36A2EB',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              maxTicksLimit: 5,
            },
          },
        },
      });
    };

    createCharts();

    // Cleanup functions
    return () => {
      if (doughnutChart) {
        doughnutChart.destroy();
      }
      if (barChart) {
        barChart.destroy();
      }
    };
  }, [barChartData, spendByCities]);

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    let startDate;
    let endDate = new Date();

    switch (selectedDate) {
      case 'last30':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 29);
        break;
      case 'last15':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 14);
        break;
      case 'last7':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 6);
        break;
      case 'today':
        startDate = new Date();
        break;
      // Add custom date logic here
      default:
        break;
    }

    // Replace the following line with your data fetching logic based on the selected date range
    const randomData = Array.from({ length: 30 }, () =>
      Math.floor(Math.random() * 1000)
    );
    setBarChartData(randomData);
  };

  return (
    <Container>
      <header>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ padding: '1rem' }}
        >
          <Typography variant="h5">Insights Dashboard</Typography>
          <FormControl variant="outlined">
            <InputLabel id="select-label">
              <Icon>calendar_today</Icon> Select Date
            </InputLabel>
            <Select
              labelId="select-label"
              id="select"
              label="Select Date"
              onChange={handleDateChange}
            >
              <MenuItem value="last30">Last 30 Days</MenuItem>
              <MenuItem value="last15">Last 15 Days</MenuItem>
              <MenuItem value="last7">Last 7 Days</MenuItem>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </header>

      <main>
        <section id="booking-overview">
          <Typography variant="h2" sx={{ marginBottom: '1rem' }}>
            Insights and Dashboard
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h4">Total Spend on Hotels</Typography>
                  <Typography variant="h6">$50,000</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h4">Average Booking Window</Typography>
                  <Typography variant="h6">14 days</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h4">Average Daily Rate</Typography>
                  <Typography variant="h6">$150</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h4">Average Length of Stay</Typography>
                  <Typography variant="h6">3 nights</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h4">City-wise Spend</Typography>
                  <Box sx={{ position: 'relative', height: '300px' }}>
                    <canvas ref={chartRef} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h4">Total Spend by Day</Typography>
                  <Box sx={{ position: 'relative', height: '300px' }}>
                    <canvas ref={barChartRef} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </section>

        <section id="spend-by-cities">
          <Typography variant="h2" sx={{ marginBottom: '1rem' }}>
            Spend by Cities
          </Typography>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">City</TableCell>
                  <TableCell align="right">Total Spend</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {spendByCities.map((cityData, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{cityData.city}</TableCell>
                    <TableCell align="right">{cityData.totalSpend}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </section>
      </main>
    </Container>
  );
};

export default InsightsDashboard;
