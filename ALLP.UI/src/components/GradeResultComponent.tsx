import {useLanguageProvider} from "../context/LanguageContext";
import TokenTypography from "./TokenTypography";

const GradeResultComponent = () => {

    const {englishResult, arabicResult} = useLanguageProvider();

    return <div className={`text-4xl`}>
        <span className={'text-gray-600'}>
            <TokenTypography text={arabicResult} />
        </span>
        <br />
        <TokenTypography text={englishResult} />
    </div>
}

export default GradeResultComponent;