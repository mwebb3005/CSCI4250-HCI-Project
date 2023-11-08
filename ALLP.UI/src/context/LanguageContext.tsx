// Might use this context for grading/translating. Not quite sure yet

import {createContext} from "react";

export interface ILanguageContext {
    test: string;
}

const LanguageContext = createContext<ILanguageContext>({
    test: ""
});
