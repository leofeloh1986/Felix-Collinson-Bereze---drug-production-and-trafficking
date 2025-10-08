
import React from 'react';
import type { HighRiskZone } from '../types';
import { TargetIcon } from './icons';

interface DataTableProps {
    zones: HighRiskZone[];
}

const riskLevelClasses = {
    Critical: 'text-red-400 bg-red-900/30',
    High: 'text-amber-400 bg-amber-900/30',
    Moderate: 'text-blue-400 bg-blue-900/30',
};


export const DataTable: React.FC<DataTableProps> = ({ zones }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-400">
                <thead className="text-xs text-slate-400 uppercase bg-slate-800">
                    <tr>
                        <th scope="col" className="px-4 py-3">Zone Name</th>
                        <th scope="col" className="px-4 py-3">Activity</th>
                        <th scope="col" className="px-4 py-3">Risk Level</th>
                    </tr>
                </thead>
                <tbody>
                    {zones.map(zone => (
                        <tr key={zone.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                            <td className="px-4 py-3 font-medium text-slate-200 whitespace-nowrap flex items-center">
                                <TargetIcon className="w-4 h-4 mr-2 text-slate-500"/>
                                {zone.name}
                            </td>
                            <td className="px-4 py-3">{zone.primaryActivity}</td>
                            <td className="px-4 py-3">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${riskLevelClasses[zone.riskLevel]}`}>
                                    {zone.riskLevel}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
