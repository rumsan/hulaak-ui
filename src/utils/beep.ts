let audioBuffer: AudioBuffer | null = null;

export const createAudioContext = async (url?: string) => {
  try {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const response = await fetch(url || '/chime.mp3');
    const arrayBuffer = await response.arrayBuffer();

    // Decode audio data into an AudioBuffer
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioContext;
  } catch (error) {
    console.error('Error loading custom sound:', error);
  }
};

export const playSound = (audioContext: AudioContext) => {
  if (!audioBuffer) {
    console.error('AudioBuffer is not loaded yet.');
    return;
  }

  // Create a buffer source node
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;

  // Connect the source to the audio context's destination (the speakers)
  source.connect(audioContext.destination);

  // Start playing the sound
  source.start(0);

  // Handle cleanup: stop the sound after it has finished playing
  source.onended = () => {
    source.disconnect();
  };
};
