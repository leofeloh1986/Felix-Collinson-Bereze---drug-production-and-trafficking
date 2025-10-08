
import React, { useState } from 'react';
import { NigerianState } from '../types';
import { PlayIcon } from './icons';

interface ControlPanelProps {
    onRunAnalysis: (state: NigerianState) => void;
    isLoading: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ onRunAnalysis, isLoading }) => {
    const [selectedState, setSelectedState] = useState<NigerianState>(NigerianState.Lagos);

    const handleRunClick = () => {
        onRunAnalysis(selectedState);
    };

    return (
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex flex-col sm:flex-row items-center gap-4 mb-8">
            <div className="flex-grow w-full sm:w-auto">
                <label htmlFor="state-select" className="block text-sm font-medium text-slate-400 mb-1">
                    Select State for Analysis
                </label>
                <select
                    id="state-select"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value as NigerianState)}
                    disabled={isLoading}
                    className="w-full bg-slate-900 border border-slate-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-white"
                >
                    {Object.values(NigerianState).map((state) => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
            </div>
            <button
                onClick={handleRunClick}
                disabled={isLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-slate-900 bg-cyan-400 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200"
            >
                {isLoading ? (
                    'Analyzing...'
                ) : (
                    <>
                        <PlayIcon className="w-5 h-5 mr-2" />
                        Run Analysis
                    </>
                )}
            </button>
        </div>
    );
};