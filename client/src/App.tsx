import { useState, useEffect } from "react";
import api from "./api";
import "./App.css";
import LoadingSpinner from "./LoadingSpinner";
import CriticalError from "./CriticalError";
import DataBrowser from "./DataBrowser";

function App() {
    const [loading, setLoading] = useState(true);
    const [criticalError, setCriticalError] = useState(false);

    const [partners, setPartners] = useState([]);
    const [coaches, setCoaches] = useState([]);
    const [coachees, setCoachees] = useState([]);
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        /* Note: This is absolutely absurd. Don't do this IRL. */
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
        <>
            {loading && <LoadingSpinner />}
            {!!criticalError && <CriticalError />}
            {!criticalError && !loading && (
                <DataBrowser
                    coachees={coachees}
                    coaches={coaches}
                    sessions={sessions}
                    partners={partners}
                />
            )}
        </>
    );
}

export default App;
