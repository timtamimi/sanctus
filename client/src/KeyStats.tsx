import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { BarChart } from "@mui/x-charts/BarChart";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default (props) => {
    const {
        averageAttendanceRate = 0,
        topOverUsingPartners = [],
        topUnderUsingPartners = [],
        coachesByPartner = [],
    } = props?.stats;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Gauge
                    height={250}
                    value={averageAttendanceRate * 100}
                    text={`${averageAttendanceRate * 100}%`}
                />
                <Typography variant={'h6'}>Attendance rate across all coaches and partners</Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'h6'} sx={{textAlign: 'left'}}>Top over-utilised accounts</Typography>
                <BarChart
                    series={[
                        {
                            id: "estimated",
                            data: topOverUsingPartners.map(
                                (eachPartner) => eachPartner.estimated
                            ),
                            label: "Estimated",
                            highlightScope: {
                                highlighted: "item",
                            },
                        },
                        {
                            id: "utilised",
                            data: topOverUsingPartners.map(
                                (eachPartner) => eachPartner.actual
                            ),
                            label: "Utilised",
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
                    height={350}
                />
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'h6'} sx={{textAlign: 'left'}}>Least utilised accounts</Typography>
                <BarChart
                    series={[
                        {
                            id: "estimated",
                            data: topUnderUsingPartners.map(
                                (eachPartner) => eachPartner.estimated
                            ),
                            label: "Estimated",
                            highlightScope: {
                                highlighted: "item",
                            },
                        },
                        {
                            id: "utilised",
                            data: topUnderUsingPartners.map(
                                (eachPartner) => eachPartner.actual
                            ),
                            label: "Utilised",
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
                    height={350}
                />
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'h6'} sx={{textAlign: 'left'}}>Coach utilisation by partner</Typography>
                <DataGrid
                    autoHeight={true}
                    rows={coachesByPartner}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 25, page: 0 },
                        },
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
