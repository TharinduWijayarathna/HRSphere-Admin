import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import { Link } from 'react-router-dom';

// Helper function to generate date labels
const generateDateLabels = (range: string) => {
    const labels = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    if (range === "Last 7 days") {
        for (let i = 6; i >= 0; i--) {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - i);
            labels.push(date.toISOString().split('T')[0]);
        }
    } else if (range === "Last 30 days") {
        for (let i = 29; i >= 0; i--) {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - i);
            labels.push(date.toISOString().split('T')[0]);
        }
    } else if (range === "Last 3 months") {
        for (let month = 2; month >= 0; month--) {
            const date = new Date(currentYear, currentDate.getMonth() - month, 1);
            labels.push(date.toISOString().split('T')[0]);
        }
    }

    return labels;
};

// Helper function to generate random data points for the chart
const generateRandomData = (length: number, max: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * max));
};

const UserChart: React.FC<{ range: string }> = ({ range }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const dateLabels = generateDateLabels(range);
    const newTenantsData = generateRandomData(dateLabels.length, 300);
    const deactivatedTenantsData = generateRandomData(dateLabels.length, 100);
    const activeTenantsData = generateRandomData(dateLabels.length, 200);

    useEffect(() => {
        if (chartRef.current) {
            const options = {
                chart: {
                    type: "line",
                    fontFamily: 'inherit',
                    height: 288,
                    parentHeightOffset: 0,
                    toolbar: {
                        show: false,
                    },
                    animations: {
                        enabled: false,
                    },
                },
                fill: {
                    opacity: 1,
                },
                stroke: {
                    width: 2,
                    lineCap: "round",
                    curve: "smooth",
                },
                series: [
                    {
                        name: "New Tenants",
                        data: newTenantsData
                    },
                    {
                        name: "Deactivated Tenants",
                        data: deactivatedTenantsData
                    },
                    {
                        name: "Active Tenants",
                        data: activeTenantsData
                    }
                ],
                tooltip: {
                    theme: 'dark'
                },
                grid: {
                    padding: {
                        top: -20,
                        right: 0,
                        left: -4,
                        bottom: -4
                    },
                    strokeDashArray: 4,
                },
                xaxis: {
                    labels: {
                        padding: 0,
                    },
                    tooltip: {
                        enabled: false
                    },
                    type: 'datetime',
                },
                yaxis: {
                    labels: {
                        padding: 4
                    },
                },
                labels: dateLabels,
                colors: ['#206bc4', '#ff4560', '#00b19d'],
                legend: {
                    show: false,
                },
            };

            const chart = new ApexCharts(chartRef.current, options);
            chart.render();

            // Cleanup function to destroy chart instance
            return () => {
                chart.destroy();
            };
        }
    }, [dateLabels, newTenantsData, deactivatedTenantsData]);

    return <div id="chart-active-users-2" ref={chartRef}></div>;
};

const DashboardCard: React.FC = () => {
    const [range, setRange] = useState("Last 7 days");

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex">
                    <h3 className="card-title">Tenant Activity</h3>
                    <div className="ms-auto">
                        <div className="dropdown">
                            <Link to="#" className="dropdown-toggle text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                {range}
                            </Link>
                            <div className="dropdown-menu dropdown-menu-end">
                                <Link className="dropdown-item" to="#" onClick={() => setRange("Last 7 days")}>Last 7 days</Link>
                                <Link className="dropdown-item" to="#" onClick={() => setRange("Last 30 days")}>Last 30 days</Link>
                                <Link className="dropdown-item" to="#" onClick={() => setRange("Last 3 months")}>Last 3 months</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <UserChart range={range} />
                    </div>
                    <div className="col-md-auto">
                        <div className="divide-y divide-y-fill">
                            <div className="px-3">
                                <div className="text-muted text-start">
                                    <span className="status-dot bg-primary"></span> New Tenants
                                </div>
                                <div className="h2 text-start">&nbsp; {generateRandomData(1, 300)[0]}</div>
                            </div>
                            <div className="px-3">
                                <div className="text-muted text-start">
                                    <span className="status-dot bg-danger"></span> Deactivated Tenants
                                </div>
                                <div className="h2 text-start">&nbsp; {generateRandomData(1, 300)[0]}</div>
                            </div>
                            <div className="px-3">
                                <div className="text-muted  text-start">
                                    <span className="status-dot bg-green"></span> Active Tenants
                                </div>
                                <div className="h2 text-start">&nbsp; {generateRandomData(1, 300)[0]}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
