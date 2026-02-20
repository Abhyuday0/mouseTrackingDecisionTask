// Initialize jsPsych
let jsPsych = initJsPsych({
    extensions: [
        { type: jsPsychExtensionMouseTracking, params: { sampling_rate: 60 } },
    ],
    on_finish: function() {
        jsPsych.data.displayData();
    }
});

let timeline = [];

// Experiment parameters
const preview_duration = 2000; // Duration of preview period in ms (images appear before audio)
const audio_delay = 500;       // ms after image onset before audio plays (per Spivey et al.)

// Parse CSV data into trial structure
const stimuli = [
    {list: 1, target_location: "R", target: "bed.png", cohort: "belt.png", replace: "cymbals.png", audio: "bed.wav"},
    {list: 1, target_location: "L", target: "letter.png", cohort: "lettuce.png", replace: "clown.png", audio: "letter.wav"},
    {list: 1, target_location: "R", target: "banana.png", cohort: "balloon.png", replace: "mitten.png", audio: "banana.wav"}
    // {list: 1, target_location: "L", target: "car.png", cohort: "cards.png", replace: "belt.png", audio: "car.wav"},
    // {list: 1, target_location: "R", target: "mother.png", cohort: "money.png", replace: "cards.png", audio: "mother.wav"},
    // {list: 1, target_location: "L", target: "cloud.png", cohort: "clown.png", replace: "robe.png", audio: "cloud.wav"},
    // {list: 1, target_location: "R", target: "milk.png", cohort: "mitten.png", replace: "windmill.png", audio: "milk.wav"},
    // {list: 1, target_location: "L", target: "leash.png", cohort: "leaf.png", replace: "flag.png", audio: "leash.wav"},
    // {list: 1, target_location: "R", target: "chair.png", cohort: "cherry.png", replace: "money.png", audio: "chair.wav"},
    // {list: 1, target_location: "L", target: "flashlight.png", cohort: "flag.png", replace: "balloon.png", audio: "flashlight.wav"},
    // {list: 1, target_location: "R", target: "picture.png", cohort: "pickle.png", replace: "notebook.png", audio: "picture.wav"},
    // {list: 1, target_location: "L", target: "window.png", cohort: "windmill.png", replace: "pickle.png", audio: "window.wav"},
    // {list: 1, target_location: "R", target: "paper.png", cohort: "pail.png", replace: "lettuce.png", audio: "paper.wav"},
    // {list: 1, target_location: "L", target: "scissors.png", cohort: "cymbals.png", replace: "cherry.png", audio: "scissors.wav"},
    // {list: 1, target_location: "R", target: "nose.png", cohort: "notebook.png", replace: "pail.png", audio: "nose.wav"},
    // {list: 1, target_location: "L", target: "rope.png", cohort: "robe.png", replace: "leaf.png", audio: "rope.wav"},
    // {list: 1, target_location: "R", target: "brick.png", cohort: "bridge.png", replace: "pencil.png", audio: "brick.wav"},
    // {list: 1, target_location: "L", target: "penguin.png", cohort: "pencil.png", replace: "bridge.png", audio: "penguin.wav"},
];

// Welcome page
let welcome_page = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h1>Welcome to the Experiment</h1>
        <p>You will see a series of pictures displayed on the screen.</p>
        <p>You will then hear an audio instruction.</p>
        <p>Click on the picture you're instructed to click on.</p>
        <p><i>Press SPACE to continue</i></p>
    `,
    choices: [' ']
};
timeline.push(welcome_page);

// Instructions
let instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h2>Instructions</h2>
        <p>In each trial:</p>
        <ul style="text-align: left; max-width: 500px; margin: 0 auto;">
            <li>Click the button at the bottom of the screen to begin each trial</li>
            <li>Two pictures will appear on the screen</li>
            <li>Shortly after, you'll hear an instruction</li>
            <li>Move your mouse upward and click the picture that matches the instruction</li>
            <li>Try to respond as quickly and accurately as possible</li>
        </ul>
        <p><i>Press SPACE to begin the practice trials</i></p>
    `,
    choices: [' ']
};
timeline.push(instructions);

// Function to create a VWP trial (Spivey et al. paradigm)
function createVWPTrial(stimulus, condition, is_practice = false) {
    const competitor = condition === 'cohort' ? stimulus.cohort : stimulus.replace;

    const left_image  = stimulus.target_location === 'L' ? stimulus.target : competitor;
    const right_image = stimulus.target_location === 'L' ? competitor : stimulus.target;

    // ── Step 1: Start button (bottom centre) ──────────────────────────────────
    // Participant clicks this to begin the trial from a known starting position.
    const start_button = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `<p style="color:#666; margin-bottom: 120px;">Click the button below when you are ready.</p>`,
        choices: ['Start'],
        button_html: function(choice) {
            return `<button class="jspsych-btn start-btn">${choice}</button>`;
        }
    };
    
    // const start_button = {
    //     type: jsPsychHtmlButtonResponse,
    //     stimulus: `<p style="color:#666; margin-bottom: 120px;">Click the button below when you are ready.</p>`,
    //     choices: ['Start'],
    //     button_html: function(choice) {
    //         return `<button class="jspsych-btn start-btn">${choice}</button>`;
    //     }
    // };

    // ── Step 2: Main trial – images appear, audio plays after 500 ms ──────────
    const trial = {
        type: jsPsychHtmlKeyboardResponse,
        extensions: [
            { type: jsPsychExtensionMouseTracking, params: { targets: ['#img-left', '#img-right'] } }
        ],
        stimulus: function() {
            return `
                <div class="vwp-container">
                    <img src="media/${left_image}"
                         class="vwp-image position-top-left"
                         id="img-left"
                         data-choice="left">
                    <img src="media/${right_image}"
                         class="vwp-image position-top-right"
                         id="img-right"
                         data-choice="right">
                </div>
            `;
        },
        choices: "NO_KEYS",
        trial_duration: null,    // ended by mouse click below
        on_start: function(trial_data) {
            // Play audio 500 ms after image onset (per Spivey et al.)
            setTimeout(function() {
                let audio = new Audio('media/audio.mp3');
                audio.play();
            }, audio_delay);
        },
        on_load: function() {
            // End trial when participant clicks either image
            document.querySelectorAll('.vwp-image').forEach(function(img) {
                img.addEventListener('click', function() {
                    jsPsych.finishTrial({
                        clicked_image: this.id,
                        clicked_choice: this.getAttribute('data-choice'),
                        correct: (this.id === 'img-left' && stimulus.target_location === 'L') ||
                                 (this.id === 'img-right' && stimulus.target_location === 'R')
                    });
                });
            });
        },
        data: {
            task: 'vwp_trial',
            target: stimulus.target,
            competitor: competitor,
            condition: condition,
            target_location: stimulus.target_location,
            left_image: left_image,
            right_image: right_image,
            is_practice: is_practice
        }
    };

    return [start_button, trial];
}

// ── Practice trials ────────────────────────────────────────────────────────────
const practice_stimuli = stimuli.slice(0, 3);
practice_stimuli.forEach(stim => {
    const practice_trials = createVWPTrial(stim, 'cohort', true);
    timeline.push(...practice_trials);
});

// Practice end
let practice_end = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h2>Practice Complete!</h2>
        <p>You've finished the practice trials.</p>
        <p>The experiment will now begin.</p>
        <p><i>Press SPACE to start</i></p>
    `,
    choices: [' ']
};
timeline.push(practice_end);

// ── Experimental trials ────────────────────────────────────────────────────────
const experimental_stimuli = stimuli.slice(3);

experimental_stimuli.forEach((stim, index) => {
    const condition = index % 2 === 0 ? 'cohort' : 'control';
    const trials = createVWPTrial(stim, condition, false);
    timeline.push(...trials);

    if ((index + 1) % 10 === 0 && index < experimental_stimuli.length - 1) {
        timeline.push({
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `
                <h2>Take a break!</h2>
                <p>You've completed ${index + 1} out of ${experimental_stimuli.length} trials.</p>
                <p><i>Press SPACE when you're ready to continue</i></p>
            `,
            choices: [' ']
        });
    }
});

// ── Debrief ────────────────────────────────────────────────────────────────────
let debrief = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h1>Thank you for participating!</h1>
        <p>The experiment is now complete.</p>
        <p>Press any key to finish.</p>
    `,
    choices: "ALL_KEYS"
};
timeline.push(debrief);

// Run the experiment
jsPsych.run(timeline);