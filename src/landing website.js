import React from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  subheading: {
    marginBottom: theme.spacing(4),
  },
  card: {
    padding: theme.spacing(4),
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
  },
  actionButton: {
    marginTop: theme.spacing(4),
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid container spacing={4} justify="center">
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" className={classes.heading}>
                Welcome to Our B2B Hotel Booking Platform
              </Typography>
              <Typography variant="subtitle1" className={classes.subheading}>
                Discover a wide range of hotels for your business needs
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.actionButton}
              >
                Explore Hotels
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
