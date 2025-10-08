
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        <div className="text-cyan-400">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                        </div>
                        <h1 className="text-xl font-bold text-slate-100 tracking-wider">
                            Illicit Trafficking Control Model
                        </h1>
                    </div>
                     <div className="text-xs text-slate-500">
                        Centralized Algorithm Interface v1.0
                    </div>
                </div>
            </div>
        </header>
    );
};
