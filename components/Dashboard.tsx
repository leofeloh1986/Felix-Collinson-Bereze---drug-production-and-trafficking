
import React from 'react';
import type { DashboardData } from '../types';
import { MetricsCard } from './MetricsCard';
import { AlertsPanel } from './AlertsPanel';
import { MapVisualization } from './MapVisualization';
import { DataTable } from './DataTable';

interface DashboardProps {
    data: DashboardData;
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
    return (
        <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.metrics.map((metric, index) => (
                    <MetricsCard key={index} metric={metric} />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column: Map */}
                <div className="lg:col-span-2">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 h-[600px]">
                        <h2 className="text-lg font-semibold text-slate-200 mb-4">Trafficking Activity Map</h2>
                        <MapVisualization routes={data.routes} alerts={data.alerts} zones={data.highRiskZones} />
                    </div>
                </div>

                {/* Right column: Alerts and High Risk Zones */}
                <div className="space-y-6">
                    <AlertsPanel alerts={data.alerts} />
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <h2 className="text-lg font-semibold text-slate-200 mb-4">High-Risk Zones</h2>
                      <DataTable zones={data.highRiskZones} />
                    </div>
                </div>
            </div>
        </div>
    );
};
