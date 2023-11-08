import {FC, useEffect, useRef, useState} from "react";
import {translateAndGrade} from "../services/api";

const RecordingComponent: FC = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState<string>("");
    const recognitionRef = useRef(null);

    useEffect(() => {
        const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
        //recognition.lang = 'ar-SA'
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }

            setTranscript(interimTranscript + finalTranscript);
        };

        recognitionRef.current = recognition;

        // This return statement fixed the infinite loop bug. No useCallback needed
        return () => {
            recognitionRef.current.stop();
        }
    }, [])

    const startRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.start();
            setIsRecording(true);
            setTranscript("")
        }
        else {
            console.error("Error")
        }

    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsRecording(false);
            translateAndGrade(transcript)
        }
        else {
            console.error("Error")
        }
    };


    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="w-full">
                <div className={'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-32'}>
                    <div className={`flex items-center overflow-y-auto pr-32 h-32 translate-y-2 m-auto rounded-md border p-4 bg-white transition-[opacity] duration-500 ease-in-out ${isRecording ? 'opacity-100' : 'opacity-0' }`}>
                        {transcript}
                    </div>
                </div>
                    <button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`translate-y-2 m-auto flex items-center justify-center ${isRecording ? 'bg-red-400 hover:bg-red-500 translate-x-40' : 'bg-blue-400 hover:bg-blue-500 translate-x-0'} rounded-full focus:outline-none w-20 h-20 transition-all duration-500 ease-in-out relative`}
                    >
                        <svg
                            viewBox="0 0 256 256"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-12 h-12 text-white absolute transition-transform duration-500 ease-in-out ${isRecording ? 'scale-0' : 'scale-100'}`}
                        >
                            <path
                                fill="currentColor"
                                d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
                            />
                        </svg>
                        <svg
                            className={`w-12 h-12 text-white absolute transition-transform duration-500 ease-in-out ${isRecording ? 'scale-100' : 'scale-0'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill="currentColor" d="M5 5h14v14H5z"/>
                        </svg>
                    </button>
            </div>
        </div>
    );
}

export default RecordingComponent;