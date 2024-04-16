import Grid from "@mui/material/Grid";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { BarChart } from "@mui/x-charts/BarChart";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default (props) => {
    const {
        averageAttendanceRate = 0,
        topOverUsingPartners = [],
        topUnderUsingPartners = [],
        busiestCoachByPartner = [],
    } = props?.stats;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                Attendance rate across all coaches and partners
                <Gauge
                    height={250}
                    value={averageAttendanceRate * 100}
                    text={`${averageAttendanceRate * 100}%`}
                />
            </Grid>
            <Grid item xs={12}>
                Top over-utilised accounts
                <BarChart
                    series={[
                        {
                            id: "series-1",
                            data: topOverUsingPartners.map(
                                (eachPartner) => eachPartner.estimated
                            ),
                            label: "Estimated",
                            stack: "total",
                            highlightScope: {
                                highlighted: "item",
                            },
                        },
                        {
                            id: "series-2",
                            data: topOverUsingPartners.map(
                                (eachPartner) => eachPartner.actual
                            ),
                            label: "Utilised",
                            stack: "total",
                            highlightScope: {
                                highlighted: "item",
                            },
                        },
                    ]}
                    xAxis={[
                        {
                            data: topOverUsingPartners.map(
                                (eachPartner) =>
                                    `${eachPartner.name} (${(eachPartner.ratio * 100).toFixed(
                                        2
                                    )}%)`
                            ),
                            scaleType: "band",
                            id: "axis1",
                        },
                    ]}
                    width={600}
                    height={350}
                />
            </Grid>
            <Grid item xs={12}>
                Least utilised accounts
                <BarChart
                    series={[
                        {
                            id: "series-1",
                            data: topUnderUsingPartners.map(
                                (eachPartner) => eachPartner.estimated
                            ),
                            label: "Estimated",
                            stack: "total",
                            highlightScope: {
                                highlighted: "item",
                            },
                        },
                        {
                            id: "series-2",
                            data: topUnderUsingPartners.map(
                                (eachPartner) => eachPartner.actual
                            ),
                            label: "Utilised",
                            stack: "total",
                            highlightScope: {
                                highlighted: "item",
                            },
                        },
                    ]}
                    xAxis={[
                        {
                            data: topUnderUsingPartners.map(
                                (eachPartner) =>
                                    `${eachPartner.name} (${(eachPartner.ratio * 100).toFixed(
                                        2
                                    )}%)`
                            ),
                            scaleType: "band",
                            id: "axis1",
                        },
                    ]}
                    width={600}
                    height={350}
                />
            </Grid>
            <Grid item xs={12}>
                Coach utilisation by partner
                <DataGrid
                    autoHeight={true}
                    rows={busiestCoachByPartner}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: "expectedMonthlyUsage", sort: "desc" }],
                        },
                    }}
                    columns={[
                        { field: "name", headerName: "Name", width: 200 },
                        { field: "CoachEmail", headerName: "Email", width: 200 },
                        {
                            field: "countOfSessionsDelivered",
                            headerName: "Sessions delivered (January)",
                            width: 200,
                            type: "number",
                        },
                        {
                            field: "expectedMonthlyUsage",
                            headerName: "Percentage Sessions delivered (January)",
                            width: 200,
                            valueGetter: (value, row) =>
                                row.countOfSessionsDelivered / row.expectedMonthlyUsage,
                            renderCell: ({ row }) =>
                                `${(
                                    (row.countOfSessionsDelivered / row.expectedMonthlyUsage) *
                                    100
                                ).toFixed(2)}%`,
                            type: "number",
                        },
                    ]}
                />
            </Grid>
        </Grid>
    );
};
