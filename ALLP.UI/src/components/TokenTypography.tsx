import {FC} from "react";

export interface ITokenTypography {
    text: string;
}

const TokenTypography:FC<ITokenTypography> = ({text}) => {
    const words = text.split(' ');
    return <p className="space-x-1">
        {words.map((word, index) => (
            <span key={index} className="hover:bg-yellow-200 cursor-pointer">
          {word}
        </span>
        ))}
    </p>
}
export default TokenTypography;