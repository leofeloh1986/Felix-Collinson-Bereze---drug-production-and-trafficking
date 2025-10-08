
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { Dashboard } from './components/Dashboard';
import { Spinner } from './components/Spinner';
import { generateTraffickingData } from './services/geminiService';
import type { DashboardData, NigerianState } from './types';

const App: React.FC = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleRunAnalysis = useCallback(async (state: NigerianState) => {
        setIsLoading(true);
        setError(null);
        setDashboardData(null);
        try {
            const data = await generateTraffickingData(state);
            setDashboardData(data);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 text-slate-300 font-sans">
            <Header />
            <main className="p-4 sm:p-6 lg:p-8">
                <ControlPanel onRunAnalysis={handleRunAnalysis} isLoading={isLoading} />
                
                {isLoading && (
                    <div className="flex flex-col items-center justify-center mt-12">
                        <Spinner />
                        <p className="mt-4 text-lg text-cyan-400 animate-pulse">Analyzing illicit activity patterns...</p>
                        <p className="text-sm text-slate-500">This may take a moment.</p>
                    </div>
                )}

                {error && (
                    <div className="mt-12 text-center text-red-400 bg-red-900/20 p-6 rounded-lg border border-red-700 max-w-2xl mx-auto">
                        <h2 className="text-xl font-bold mb-2">Analysis Failed</h2>
                        <p>{error}</p>
                    </div>
                )}
                
                {!isLoading && !dashboardData && !error && (
                    <div className="mt-12 text-center text-slate-500">
                        <div className="max-w-md mx-auto">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                             <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10l.01.01" />
                           </svg>
                           <h2 className="mt-4 text-2xl font-semibold text-slate-400">System Ready for Analysis</h2>
                           <p className="mt-2">Please select a state and click "Run Analysis" to generate and visualize the control model data for Nigeria.</p>
                        </div>
                    </div>
                )}

                {dashboardData && <Dashboard data={dashboardData} />}
            </main>
        </div>
    );
};

export default App;