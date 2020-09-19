import { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceRecognition = (noteValues, setNoteValues) => {

    const validatorSpeech = SpeechRecognition.browserSupportsSpeechRecognition();
    const [isListening, setIsListening] = useState(false)
    const { transcript, resetTranscript } = useSpeechRecognition()

    useEffect(() => {
        handleListen()
    }, [isListening]);

    const handleListen = async () => {
        if (isListening) {
            SpeechRecognition.startListening({ continuous: true, language: 'es-AR' })
            console.log(transcript)
        } else {
            SpeechRecognition.stopListening()
        }
        await setNoteValues({
            ...noteValues,
            description: transcript
        })
    }

    return {
        isListening,
        validatorSpeech,
        transcript,
        resetTranscript,
        setIsListening
    };
};

export default VoiceRecognition;