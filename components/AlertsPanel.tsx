
import React from 'react';
import type { Alert } from '../types';
import { AlertIcon } from './icons';

interface AlertsPanelProps {
    alerts: Alert[];
}

const severityClasses = {
    High: 'bg-red-900/50 border-red-700 text-red-300',
    Medium: 'bg-amber-900/50 border-amber-700 text-amber-300',
    Low: 'bg-blue-900/50 border-blue-700 text-blue-300',
};

const severityDotClasses = {
    High: 'bg-red-500',
    Medium: 'bg-amber-500',
    Low: 'bg-blue-500',
};

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
    return (
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h2 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
                <AlertIcon className="w-6 h-6 mr-2 text-amber-400" />
                Real-Time Alerts
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {alerts.map(alert => (
                    <div key={alert.id} className={`p-3 rounded-md border ${severityClasses[alert.severity]}`}>
                        <div className="flex justify-between items-start">
                           <div className="flex-grow">
                             <div className="flex items-center mb-1">
                                <span className={`h-2.5 w-2.5 rounded-full ${severityDotClasses[alert.severity]} mr-2`}></span>
                                <span className="font-semibold text-sm">{alert.severity} Priority</span>
                             </div>
                             <p className="text-sm text-slate-300">{alert.description}</p>
                           </div>
                            <div className="text-xs text-slate-500 whitespace-nowrap ml-2">
                                {new Date(alert.timestamp).toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
