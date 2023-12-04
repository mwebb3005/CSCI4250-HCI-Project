// WILL REMOVE THIS FILE. WAS USED FOR ANIMATION TESTING

import { useState } from 'react';

const ExpandableDiv = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    return (
        <div
            className={`w-${expanded ? '12' : '32'} m-auto rounded-md border p-4 bg-white bg-blue-500 cursor-pointer transition-all duration-500 ease-in-out`}
            onClick={toggleExpansion}
        ></div>
    );
};

export default ExpandableDiv;
