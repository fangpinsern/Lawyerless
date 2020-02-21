import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2)
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6)
    },
    heroButtons: {
        marginTop: theme.spacing(4)
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardMedia: {
        paddingTop: "100%" // 16:9
    },
    cardContent: {
        flexGrow: 1
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6)
    }
}));

const cards = [1, 2, 3, 4, 5, 6];
// const cardsImages = ["./src/images/taps.jpg",
//     "./src/images/lawyerless.jpg",
//     "./src/images/siqi.jpg",
//     "./src/images/km.jpg",
//     "./src/images/pins.jpg",
//     "./src/images/ming.jpg"
// ];


const cardsImages = ["https://yangming.s3.amazonaws.com/taps.jpg",
    "https://yangming.s3.amazonaws.com/lawyerless.jpg",
    "https://yangming.s3.amazonaws.com/siqi.jpg",
    "https://yangming.s3.amazonaws.com/km.jpg",
    "https://yangming.s3.amazonaws.com/pins.jpg",
    "https://yangming.s3.amazonaws.com/ming.jpg"
];

const cardsNames = ["Tapasya Singh",
    "",
    "Yang Siqi",
    "Leong Kay Mei",
    "Fang Pin Sern",
    "Yang Ming"]
export default function Album() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography
                            component="h3"
                            variant="h3"
                            align="center"
                            color="textPrimary"
                            gutterBottom
                        >
                            Lawyerlike
            </Typography>
                        <Typography
                            variant="h6"
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            Access to justice made easy for Litigants-In-Person
            </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={0}>
                        {cards.map((card, i) => (
                            <Grid item key={card} xs={4} sm={3} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={cardsImages[i]}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h6" align="center" component="h2">
                                            {cardsNames[i]}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            {/* <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
        </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
        </Typography>
            </footer> */}
            {/* End footer */}
        </React.Fragment>
    );
}
