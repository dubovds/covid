import React, {useEffect, useState} from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: '#fff',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    title: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px'
    },
    number: {
        marginBottom: '10px',
        borderBottom: '1px solid #fff',
        paddingBottom: "10px"
    }
}));

function App() {
    const classes = useStyles();

    const [latest, setLatest] = useState([]);
    const [results, setResults] = useState([])

    useEffect(() => {
        axios
            .all([
                axios.get("https://corona.lmao.ninja/all"),
                axios.get("https://corona.lmao.ninja/countries")
            ])
            .then(responseArr => {
                setLatest(responseArr[0].data);
                setResults(responseArr[1].data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const date = new Date(parseInt(latest.updated));
    const lastUpdated = date.toString();

    const countries = results.map((data, index) => {
        return(
            <Grid item xs={2} key={index}>
                <Paper className={classes.paper} style={{backgroundColor: " grey"}}>
                    <CardMedia
                        className={classes.media}
                        image={data.countryInfo.flag}
                        title={`falg of ${data.country}`}
                    />
                    <div className={classes.title}>
                        {data.country}
                    </div>
                    <div className={classes.number}>
                        {data.cases}
                    </div>
                    {/*<div className="update-time">*/}
                    {/*    last update {lastUpdated}*/}
                    {/*</div>*/}
                </Paper>
            </Grid>
        )
    })

  return (
    <div className="App">

        <Container>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Paper className={classes.paper} style={{backgroundColor: " grey"}}>
                        <div className={classes.title}>
                            Cases
                        </div>
                        <div className={classes.number}>
                            {latest.cases}
                        </div>
                        <div className="update-time">
                            last update {lastUpdated}
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper} style={{backgroundColor: " red"}}>
                        <div className={classes.title}>
                            Deaths
                        </div>
                        <div className={classes.number}>
                            {latest.deaths}
                        </div>
                        <div className="update-time">
                            last update {lastUpdated}
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper} style={{backgroundColor: "green"}}>
                        <div className={classes.title}>
                            Recovered
                        </div>
                        <div className={classes.number}>
                            {latest.recovered}
                        </div>
                        <div className="update-time">
                            last update {lastUpdated}
                        </div>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {countries}
            </Grid>

        </Container>
    </div>
  );
}

export default App;
