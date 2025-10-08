
import React from 'react';
import type { Metric } from '../types';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from './icons';

interface MetricsCardProps {
    metric: Metric;
}

const iconMap = {
    increase: <ArrowUpIcon className="w-5 h-5 text-red-500" />,
    decrease: <ArrowDownIcon className="w-5 h-5 text-green-500" />,
    stable: <MinusIcon className="w-5 h-5 text-yellow-500" />,
};

const colorMap = {
    increase: 'text-red-500',
    decrease: 'text-green-500',
    stable: 'text-yellow-500',
};

export const MetricsCard: React.FC<MetricsCardProps> = ({ metric }) => {
    return (
        <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700 shadow-lg">
            <p className="text-sm font-medium text-slate-400 truncate">{metric.title}</p>
            <div className="mt-1 flex items-baseline justify-between">
                <p className="text-2xl font-semibold text-slate-100">{metric.value}</p>
                <div className={`flex items-baseline text-sm font-semibold ${colorMap[metric.changeType]}`}>
                    {iconMap[metric.changeType]}
                    <span className="ml-1">{metric.change}</span>
                </div>
            </div>
        </div>
    );
};
