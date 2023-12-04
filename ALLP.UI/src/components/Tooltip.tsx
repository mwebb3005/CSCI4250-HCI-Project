import {PropsWithChildren, useState} from 'react';

type TooltipProps = {
    word: string;
    show: boolean
}

export const Tooltip = ({ children, word, show}: PropsWithChildren<TooltipProps>) => {
    return (
        <div className="relative inline-block">
            {children}
            {show && (
                <div className="absolute w-fit whitespace-nowrap left-1/2 transform -translate-x-1/2 -top-full mt-1 bg-gray-700 text-white text-xs rounded py-2 px-4">
                    {word}
                    <svg className="absolute h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve">
                        <polygon fill="#4B5563" points="0,0 127.5,127.5 255,0"/> {/* Fill color set here */}
                    </svg>
                </div>
            )}
        </div>
    );
}
