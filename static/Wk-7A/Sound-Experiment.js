const startBtn = document.getElementById('startBtn');
const freqSlider = document.getElementById('baseFreq');
const freqValue = document.getElementById('freqValue');

startBtn.addEventListener('click', async () => {
    // Ensure user gesture to unlock AudioContext
    await Tone.start()
    startBtn.disabled = true
    startBtn.textContent = 'Audio Running'

    // Create a sine oscillator
    const osc = new Tone.Oscillator(440, 'sine')

    // Create a distortion effect, initially off
    const distortion = new Tone.Distortion(0).toDestination()

    // LFO at 1/24 Hz (one cycle every 24 seconds) to modulate distortion amount
    // LFO stands for Low Frequency Oscillator
    const chaosLFO = new Tone.LFO({
        frequency: 1/24,
        min: 0,
        max: 1
    }).start()
    chaosLFO.connect(distortion, 'distortion')

    // Connect oscillator through distortion to output
    osc.connect(distortion)

    // Start the oscillator
    osc.start()

    // Update base frequency via slider
    freqSlider.addEventListener('input', (e) => {
        const val = Number(e.target.value)
        osc.frequency.value = val
        freqValue.textContent = val + ' Hz'
    })
})