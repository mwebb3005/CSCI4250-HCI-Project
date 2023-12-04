import {Prompt} from "../context/LanguageContext";

type PromptComponentType = {
    prompt: Prompt;
}
const PromptComponent = ({prompt}: PromptComponentType) => {
    return <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg flex">
        {/*<h2 className="text-lg font-semibold text-gray-800">Please say the following sentence in Arabic:</h2>*/}
        <p className="mt-4 text-gray-600 text-xl font-medium">{prompt ? prompt.original : "PROMPT ERROR"}</p>
    </div>
}

export default PromptComponent;