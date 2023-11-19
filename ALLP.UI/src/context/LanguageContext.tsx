// Might use this context for grading/translating. Not quite sure yet

import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {translateAndGradeApi} from "../services/api";

export enum RecordingState {
    Stopped,
    Recording,
    Review,
    Grading
}

export interface ILanguageContext {
    recordingState: RecordingState;
    transcript: string;
    currentTest: string;
    englishResult: string;
    arabicResult: string;
    translateAndGrade: Function;
    setRecordingState: Dispatch<SetStateAction<RecordingState>>;
    setTranscript: Dispatch<SetStateAction<string>>;
}

const LanguageContext = createContext<ILanguageContext>({
    recordingState: RecordingState.Stopped,
    currentTest: "",
    englishResult: "",
    arabicResult: "",
    transcript: "",
    translateAndGrade: () => {},
    setRecordingState: () => {},
    setTranscript: () => {}
});


const LanguageProvider = ({children}) => {
    const [recordingState, setRecordingState] = useState<RecordingState>(RecordingState.Stopped);
    const [currentTest, setCurrentTest] = useState<string>("");
    const [transcript, setTranscript] = useState<string>("");
    const [englishResult, setEnglishResult] = useState<string>("");
    const [arabicResult, setArabicResult] = useState<string>("");

    const translateAndGrade = () => {
        translateAndGradeApi(transcript).then(result => {
            setArabicResult(result.original_text);
            setEnglishResult(result.processed_text)
        }).finally(() => {
            setRecordingState(RecordingState.Stopped)
        });
    }

    return <LanguageContext.Provider value={{
        recordingState,
        currentTest,
        englishResult,
        arabicResult,
        transcript,
        translateAndGrade,
        setRecordingState,
        setTranscript
    }}>
        {children}
    </LanguageContext.Provider>
}

export const useLanguageProvider = () => {
    const context = useContext<ILanguageContext>(LanguageContext);
    if (context === undefined) {
        throw new Error("hook must be used within LanguageProvider")
    }
    return context;
}

export default LanguageProvider;