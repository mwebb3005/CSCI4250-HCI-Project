import './App.css'
import RecordingComponent from "./components/RecordingComponent";
import GradeResultComponent from "./components/GradeResultComponent";
import {RecordingState, useLanguageProvider} from "./context/LanguageContext";
import PromptComponent from "./components/PromptComponent";

const App = () => {
    const {recordingState, setRecordingState, translateAndGrade, currentPrompt} = useLanguageProvider();

    const onGradeButtonClicked = () => {
        setRecordingState(RecordingState.Grading);
        translateAndGrade();
    }

  return (
      <div className="flex flex-col items-center justify-center h-screen w-full">
          <PromptComponent prompt={currentPrompt} />
          <RecordingComponent />
          <div className="text-center mt-16 flex-1 w-full">
              <button
                  disabled={recordingState !== RecordingState.Review}
                  className={`w-1/4 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-500 ease-in-out"
                        ${recordingState === RecordingState.Review ? 'opacity-100' : 'opacity-0'}`}
                  onClick={onGradeButtonClicked}
              >
                  Grade
              </button>
              <GradeResultComponent />
          </div>
      </div>
  )
}

export default App
