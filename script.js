let speech = new SpeechSynthesisUtterance();



// Replace 'YOUR_API_KEY' with your actual Google API key
const googleApiKey = '@iamtraction/google-translate';

// Function to start text-to-speech
function startTextToSpeech() {
    // ...

    fetch(`https://github.com/iamtraction/google-translate`, {
        method: 'POST',
        body: JSON.stringify({
            q: inputText,
            source: 'auto',
            target: targetLanguage,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        const translatedText = data.data.translations[0].translatedText;
        speech.text = translatedText;
        window.speechSynthesis.speak(speech);
    });
}

// ...



document.querySelector("button").addEventListener("click",() =>{
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});

let mediaRecorder;
let audioChunks = [];
function startTextToSpeech() {
    // ... (Your existing text-to-speech code)

    // Initialize MediaRecorder
    mediaRecorder = new MediaRecorder(audioContext.createMediaStreamDestination());

    // When data is available, add it to audioChunks
    mediaRecorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
    };

    // Start recording
    mediaRecorder.start();
}
function stopRecording() {
    if (mediaRecorder.state === "recording") {
        mediaRecorder.stop();
    }
}
function saveAudio() {
    if (audioChunks.length > 0) {
        stopRecording();

        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' }); // Change the type to 'audio/mpeg' for MP3

        const audioUrl = URL.createObjectURL(audioBlob);

        const a = document.createElement('a');
        a.href = audioUrl;
        a.download = 'generated_audio.wav'; // Change the extension to .mp3 for MP3
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(audioUrl);
    }
}
