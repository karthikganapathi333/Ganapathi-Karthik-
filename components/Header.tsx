
import React from 'react';

const CricketBallIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM8.27 15.235l7.46-7.46a.75.75 0 011.06 1.06l-7.46 7.46a.75.75 0 01-1.06-1.06zm-1.06-6.4l7.46 7.46a.75.75 0 01-1.06 1.06L6.15 9.895a.75.75 0 011.06-1.06z" clipRule="evenodd" />
    </svg>
);


export const Header: React.FC = () => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-10">
            <div className="container mx-auto flex items-center justify-center">
                <CricketBallIcon />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white ml-3">
                    CricBot
                </h1>
            </div>
        </header>
    );
};
