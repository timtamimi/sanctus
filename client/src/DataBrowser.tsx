import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Grid from "@mui/material/Grid";
import { v4 as uuid } from "uuid";

const prepareDataForDataGrid = (data) => {
    if (data.length > 0) {
        return data.map((eachRow) => ({
            id: uuid(),
            ...eachRow,
        }));
    }
    return [];
};
export default (props) => {
    const [dataView, setDataView] = useState("partners");

    const columns: Record<string, GridColDef[]> = {
        partners: [
            { field: "name", headerName: "Name", width: 150 },
            {
                field: "expectedMonthlyUsage",
                headerName: "Expected monthly usage",
                width: 150,
                type: "number",
            },
            {
                field: "sessionCount",
                headerName: "Actual usage (January)",
                width: 150,
                type: "number",
            },
            {
                field: "delta",
                headerName: "Balance (January)",
                width: 150,
                type: "number",
            },
            {
                field: "attendanceRate",
                headerName: "Attendance rate (January)",
                width: 150,
                type: "number",
                renderCell: ({ row }) => `${(row?.attendanceRate * 100).toFixed(2)}%`,
            },
        ],
        coaches: [
            { field: "email", headerName: "Email", width: 300 },
            {
                field: "Sessions",
                valueGetter: (value) => value?.length,
                headerName: "Sessions delivered (January)",
                width: 200,
                renderCell: ({ row }) => row?.Sessions.length,
                type: "number",
            },
        ],
        coachees: [
            { field: "firstName", headerName: "First name", width: 150 },
            { field: "lastName", headerName: "Last name", width: 150 },
            { field: "job", headerName: "Title", width: 150 },
            {
                field: "Sessions",
                valueGetter: (value) => value?.length,
                headerName: "Sessions received (January)",
                width: 150,
                renderCell: ({ row }) => row?.Sessions.length,
                type: "number",
            },
        ],
        sessions: [
            { field: "sessionStart", headerName: "Start time", width: 150 },
            { field: "CoachEmail", headerName: "Coach", width: 150 },
            {
                field: "coachee.name",
                headerName: "Coachee",
                width: 150,
                renderCell: ({ row }) =>
                    `${row?.Coachee?.firstName} ${row?.Coachee?.lastName}`,
            },
            { field: "attended", headerName: "Attended", width: 150 },
        ],
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ToggleButtonGroup
                    sx={{width: '100%'}}
                    value={dataView}
                    exclusive
                    onChange={(event, value) => setDataView(value)}
                >
                    <ToggleButton value="partners" disabled={dataView == "partners"}>
                        Partners
                    </ToggleButton>
                    <ToggleButton value="coaches" disabled={dataView == "coaches"}>
                        Coaches
                    </ToggleButton>
                    <ToggleButton value="coachees" disabled={dataView == "coachees"}>
                        Coachees
                    </ToggleButton>
                    <ToggleButton value="sessions" disabled={dataView == "sessions"}>
                        Sessions
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
                <DataGrid
                    rows={prepareDataForDataGrid(props[dataView])}
                    columns={columns[dataView]}
                    initialState={{
                        pagination: {
                            paginationModel: {pageSize: 25, page: 0},
                        },
                    }}
                />
            </Grid>
        </Grid>
    );
};
