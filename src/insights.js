import React, { useEffect, useRef, useState } from 'react';
import {
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Chart from 'chart.js/auto';
import { CalendarToday } from '@mui/icons-material';

const InsightsDashboard = () => {
  const chartRef = useRef(null);
  const barChartRef = useRef(null);
  const spendByCategoryChartRef = useRef(null);
  const [barChartData, setBarChartData] = useState([]);
  const [spendByCities, setSpendByCities] = useState([
    { city: 'Coimbatore', totalSpend: 6000 },
    { city: 'Delhi', totalSpend: 8000 },
    { city: 'Bangalore', totalSpend: 5000 },
    { city: 'Chennai', totalSpend: 7000 },
    { city: 'Kolkata', totalSpend: 9000 },
  ]);
  const [spendByCategory, setSpendByCategory] = useState([
    { category: 'Food', totalSpend: 2500 },
    { category: 'Accommodation', totalSpend: 4000 },
    { category: 'Transportation', totalSpend: 1500 },
    { category: 'Entertainment', totalSpend: 3000 },
  ]);
  

  useEffect(() => {
    let barChart;
    let doughnutChart;
    let spendByCategoryChart;
    

    const createCharts = () => {
      // Destroy existing charts if they exist
      if (barChart) {
        barChart.destroy();
      }
      if (doughnutChart) {
        doughnutChart.destroy();
      }
      if (spendByCategoryChart) {
        spendByCategoryChart.destroy(); // Add this line
      }
      

      // Initialize the bar chart
      barChart = new Chart(barChartRef.current, {
        type: 'bar',
        data: {
          labels: spendByCities.map((city) => city.city),
          datasets: [
            {
              label: 'Total Spend',
              data: spendByCities.map((city) => city.totalSpend),
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
                '#4BC0C0',
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
    
    spendByCategoryChart = new Chart(spendByCategoryChartRef.current, {
      type: 'bar',
      data: {
        labels: spendByCategory.map((item) => item.category),
        datasets: [
          {
            label: 'Total Spend',
            data: spendByCategory.map((item) => item.totalSpend),
            backgroundColor: '#FF6384',
          },
        ],
      },
      options: {
        indexAxis: 'y',
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

    // Cleanup function
    return () => {
      if (barChart) {
        barChart.destroy();
      }
      if (doughnutChart) {
        doughnutChart.destroy();
      }
      if (spendByCategoryChart) {
        spendByCategoryChart.destroy(); // Add this line
      }
    };
  }, [spendByCities]);

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
    <Card variant="outlined">
      <Container>
        <header>
          <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: '1rem' }}>
            <Typography variant="h5">Insights Dashboard</Typography>
            <FormControl variant="outlined">
              <InputLabel id="select-label">
                <Icon>
                  <CalendarToday />
                </Icon>{' '}
                Select Date
              </InputLabel>
              <Select labelId="select-label" id="select" label="Select Date" onChange={handleDateChange}>
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
              <Grid item xs={12} md={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h4">Total Spend by Day</Typography>
                    <Box sx={{ position: 'relative', height: '300px' }}>
                      <canvas ref={barChartRef} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card md={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h4">Spend by Cities</Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>City</TableCell>
                            <TableCell align="right">Total Spend</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {spendByCities.map((city) => (
                            <TableRow key={city.city}>
                              <TableCell component="th" scope="row">
                                {city.city}
                              </TableCell>
                              <TableCell align="right">${city.totalSpend}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h4">Spend by Cities Chart</Typography>
                    <Box sx={{ position: 'relative', height: '300px' }}>
                      <canvas ref={chartRef} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="h4">Spend by Category</Typography>
      <Box sx={{ position: 'relative', height: '300px' }}>
        <canvas ref={spendByCategoryChartRef} />
      </Box>
    </CardContent>
  </Card>
</Grid>


          </section>
        </main>
      </Container>
    </Card>
  );
};

export default InsightsDashboard;
