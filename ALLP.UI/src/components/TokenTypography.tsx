import {FC, useEffect, useState} from "react";
import {Tooltip} from "./Tooltip";
import {translateAndGradeApi} from "../services/api";

export type TokenTypographyType = {
    text: string;
    showTooltip?: boolean
}

const TokenTypography:FC<TokenTypographyType> = ({text, showTooltip}) => {
    const words = text.split(' ');
    const [tooltipInfo, setTooltipInfo] = useState({ index: null, show: false });
    const [translatedWord, setTranslatedWord] = useState<string>("");

    useEffect(() => {
        if (text.length === 0) return;

        translateAndGradeApi(text).then((str) => {
            setTranslatedWord(str.processed_text)
        })
    }, [text]);

    const handleMouseEnter = (index) => {
        setTooltipInfo({ index, show: true });
    };

    const handleMouseLeave = () => {
        setTooltipInfo({ index: null, show: false });
    };

    return (
        <span className="space-x-1">
            {words.map((word, index) => (
                <Tooltip key={index} word={translatedWord} show={showTooltip === true && tooltipInfo.index === index && tooltipInfo.show}>
                    <span
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        className="hover:bg-yellow-200 cursor-pointer inline-block"
                    >
                        {word}
                    </span>
                </Tooltip>
            ))}
        </span>
    );
}
export default TokenTypography;