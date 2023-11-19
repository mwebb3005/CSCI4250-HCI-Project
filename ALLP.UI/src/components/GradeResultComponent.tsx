import {useLanguageProvider} from "../context/LanguageContext";
import TokenTypography from "./TokenTypography";

const GradeResultComponent = () => {

    const {englishResult, arabicResult} = useLanguageProvider();

    return <div className={`text-4xl`}>
        <TokenTypography text={arabicResult} />
        <br />
        <TokenTypography text={englishResult} />
    </div>
}

export default GradeResultComponent;