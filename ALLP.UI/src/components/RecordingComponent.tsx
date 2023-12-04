import {useEffect, useRef, useState} from "react";
import {RecordingState, useLanguageProvider} from "../context/LanguageContext";


const RecordingComponent = () => {

    const recognitionRef = useRef(null);
    const {recordingState, setRecordingState, transcript, setTranscript} = useLanguageProvider();

    useEffect(() => {
        const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
        //recognition.lang = 'ar-EG';
        recognition.lang = 'ja'
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

            console.log(interimTranscript)
            setTranscript(interimTranscript + finalTranscript);
        };

        recognitionRef.current = recognition;

        // This return statement fixed the infinite loop bug. No useCallback needed
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        }
    }, [])

    const startRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.start();
            setRecordingState(RecordingState.Recording);
            setTranscript("")
        } else {
            console.error("Error")
        }

    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setRecordingState(RecordingState.Review);
        } else {
            console.error("Error")
        }
    };

    const onActionButtonClicked = () => {
        console.log(recordingState)
        switch (recordingState) {
            case RecordingState.Stopped:
                startRecording();
                break;
            case RecordingState.Recording:
                stopRecording();
                break;
            case RecordingState.Review:
                startRecording();
                break;
        }
    }

    return (

            <div className="w-full mt-10 relative">
                <div className={'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-32'}>
                    <div
                        className={`flex items-center overflow-y-auto pr-32 h-32 translate-y-2 m-auto rounded-md border p-4 bg-white transition-[opacity] duration-500 ease-in-out ${recordingState !== RecordingState.Stopped && recordingState !== RecordingState.Grading ? 'opacity-100' : 'opacity-0'}`}>
                        {transcript}
                    </div>
                </div>
                <button
                    onClick={onActionButtonClicked}
                    disabled={recordingState === RecordingState.Grading}
                    className={`translate-y-2 m-auto flex items-center justify-center 
                        ${recordingState !== RecordingState.Stopped && recordingState !== RecordingState.Grading ? 'translate-x-44' : 'translate-x-0'}
                        ${recordingState === RecordingState.Recording ? 'bg-red-400 hover:bg-red-500' : 'bg-blue-400 hover:bg-blue-500'} 
                        rounded-full focus:outline-none w-20 h-20 transition-all duration-500 ease-in-out relative`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"
                         className={`w-12 h-12 absolute transition-transform duration-500 ease-in-out ${recordingState !== RecordingState.Recording && recordingState !== RecordingState.Grading ? 'scale-100' : 'scale-0'}`}>
                        <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z"/>
                        <path
                            d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"
                         className={`w-12 h-12 absolute transition-transform duration-500 ease-in-out ${recordingState === RecordingState.Recording ? 'scale-100' : 'scale-0'}`}>
                        <path fillRule="evenodd"
                              d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                              clipRule="evenodd"/>
                    </svg>
                    <div className={`absolute w-16 h-16 transition-transform duration-500 ease-in-out ${recordingState === RecordingState.Grading ? 'scale-100' : 'scale-0'}`}>
                        <div
                            className={`w-16 h-16 animate-spin rounded-full border-8 border-solid border-white border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]`}
                            role="status" />
                        </div>
                </button>
            </div>

    );

}

export default RecordingComponent;