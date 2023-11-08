// WILL REMOVE THIS FILE. WAS USED FOR ANIMATION TESTING

import { useState } from 'react';

const ExpandableDiv = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    return (
        <div
            //className={"border p-4 text-white absolute md:relative flex-col min-h-full bg-black mt-24 md:mt-12 transition-width transition-slowest ease"}
            className={`w-${expanded ? '12' : '32'} m-auto rounded-md border p-4 bg-white bg-blue-500 cursor-pointer transition-all duration-500 ease-in-out`}
            onClick={toggleExpansion}
        ></div>
    );
};

export default ExpandableDiv;
