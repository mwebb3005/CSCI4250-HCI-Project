import {RecordingState, useLanguageProvider} from "../context/LanguageContext";
import TokenTypography from "./TokenTypography";

const GradeResultComponent = () => {

    const {englishResult, arabicResult, currentPrompt, nextPrompt} = useLanguageProvider();

    return <div className={`text-4xl mt-8`}>
        <span className={'text-gray-600'}>
            <TokenTypography text={arabicResult} showTooltip={true}/>
        </span>
        <br/>
        <br />
        <TokenTypography text={englishResult}/>
        <br/>
        {(currentPrompt && englishResult.length > 0) &&
            <>
                <div
                    className={`p-4 max-w-sm mx-auto mt-6 text-center ${currentPrompt.translation === englishResult ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {currentPrompt.translation === englishResult ? 'Correct!' : 'Incorrect!'}
                    <br />
                    {currentPrompt.translation === englishResult &&
                        <a className={"text-blue-600 hover:text-blue-800 font-semibold text-lg hover:cursor-pointer"} onClick={() => nextPrompt()}>Next</a>
                    }
                </div>

            </>
        }
    </div>
}

export default GradeResultComponent;