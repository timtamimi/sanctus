import { useState, useEffect } from "react";
import api from "./api";
import "./App.css";

/* MUI Gubbins */
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

/* Components */
import LoadingSpinner from "./LoadingSpinner";
import CriticalError from "./CriticalError";
import DataBrowser from "./DataBrowser";
import KeyStats from "./KeyStats";

function App() {
    const [selectedTab, setSelectedTab] = useState('data');
    const [loading, setLoading] = useState(true);
    const [criticalError, setCriticalError] = useState(false);

    const [partners, setPartners] = useState([]);
    const [coaches, setCoaches] = useState([]);
    const [coachees, setCoachees] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [stats, setStats] = useState({});

    useEffect(() => {
        /* Note: This is an absolutely absurd way to fetch data. Don't do this IRL.
        *        This is only acceptable in the realm of non-prod code.              */
        Promise.all([
            api
                .get("/partners")
                .then((response) => {
                    setPartners(response.data);
                })
                .catch((err) => {
                    console.log(err);
                }),
            api
                .get("/coaches")
                .then((response) => {
                    setCoaches(response.data);
                })
                .catch((err) => {
                    console.log(err);
                }),
            api
                .get("/coachees")
                .then((response) => {
                    setCoachees(response.data);
                })
                .catch((err) => {
                    console.log(err);
                }),
            api
                .get("/sessions")
                .then((response) => {
                    setSessions(response.data);
                })
                .catch((err) => {
                    console.log(err);
                }),
            api
                .get("/custom/key-stats")
                .then((response) => {
                    setStats(response.data);
                })
                .catch((err) => {
                    console.log(err);
                }),
        ])
            .then(() => {
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setCriticalError(true);
            });
    }, []);

    return (
        <Grid contain spacing={2} sx={{width: '80vw', minHeight: '90vh'}}>
            <Grid item xs={12}>
            {loading && <LoadingSpinner />}
            {!!criticalError && <CriticalError />}
            {!criticalError && !loading && (
                <TabContext value={selectedTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={(event, value) => setSelectedTab(value)} aria-label="lab API tabs example">
                            <Tab label="Data browser" value="data" />
                            <Tab label="Key stats" value="key_stats" />
                        </TabList>
                    </Box>
                    <TabPanel value="data">
                        <DataBrowser
                            coachees={coachees}
                            coaches={coaches}
                            sessions={sessions}
                            partners={partners}
                        />
                    </TabPanel>
                    <TabPanel value="key_stats">
                        <KeyStats stats={stats} />
                    </TabPanel>
                </TabContext>
            )}
            </Grid>
        </Grid>
    );
}

export default App;
