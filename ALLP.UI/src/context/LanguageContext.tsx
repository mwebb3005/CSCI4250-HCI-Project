// Might use this context for grading/translating. Not quite sure yet

import {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {getPromptsApi, translateAndGradeApi} from "../services/api";

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
    currentPrompt: Prompt | undefined;
    nextPrompt: Function
}

const LanguageContext = createContext<ILanguageContext>({
    recordingState: RecordingState.Stopped,
    currentTest: "",
    englishResult: "",
    arabicResult: "",
    transcript: "",
    translateAndGrade: () => {},
    setRecordingState: () => {},
    setTranscript: () => {},
    currentPrompt: undefined,
    nextPrompt: () => {}
});

export type Prompt = {
    original: string;
    translation: string;
}


const LanguageProvider = ({children}) => {
    const [recordingState, setRecordingState] = useState<RecordingState>(RecordingState.Stopped);
    const [currentTest, setCurrentTest] = useState<string>("");
    const [transcript, setTranscript] = useState<string>("");
    const [englishResult, setEnglishResult] = useState<string>("");
    const [arabicResult, setArabicResult] = useState<string>("");
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [currentPromptIndex, setCurrentPromptIndex] = useState<number>(0);
    const [currentPrompt, setCurrentPrompt] = useState<Prompt>();

    useEffect(() => {
        fetchPrompts()
    }, []);

    useEffect(() => {
        if (prompts.length > currentPromptIndex){
            setCurrentPrompt(prompts[currentPromptIndex])
        }

    }, [prompts, currentPromptIndex]);


    const fetchPrompts = () => {
        getPromptsApi().then(p => {
            setPrompts(p);
        })
    }


    const nextPrompt = () => {
        setArabicResult("");
        setEnglishResult("");
        setTranscript("")
        setRecordingState(RecordingState.Stopped)
        setCurrentPromptIndex((cur) => {
            if (cur === prompts.length - 1) {
                return 0;
            }
            else {
                return cur + 1;
            }
        });
    }

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
        setTranscript,
        currentPrompt,
        nextPrompt
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