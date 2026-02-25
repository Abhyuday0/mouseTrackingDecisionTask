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

// ── Debug mode ────────────────────────────────────────────────────────────────
const DEBUG = false;  // set to false for real runs

// Experiment parameters
// const preview_duration = 2000; // Duration of preview period in ms (images appear before audio)
const audio_delay = 500;       // ms after image onset before audio plays (per Spivey et al.)



// Parse CSV data into trial structure


const stimuli = [
    // ── List 0 (Practice List)─────────────────────────
    {list: 0, target: "acorn.png",     cohort: "dragon.png",      replace: "",               audio: "acorn.mp3"},
    {list: 0, target: "boomerang.png", cohort: "parachute.png",   replace: "",               audio: "boomerang.mp3"},
    // {list: 0, target: "giraffe.png",   cohort: "doll.png",        replace: "",               audio: "giraffe.mp3"},
    // {list: 0, target: "ice.png",       cohort: "teacher.png",     replace: "",               audio: "ice.mp3"},

    // ── List 1 ─────────────────────────────────────────
    {list: 1, target: "bed.png",        cohort: "belt.png",       replace: "cymbals.png",    audio: "bed.mp3"},
    {list: 1, target: "letter.png",     cohort: "lettuce.png",    replace: "clown.png",      audio: "letter.mp3"},
    {list: 1, target: "banana.png",     cohort: "balloon.png",    replace: "mitten.png",     audio: "banana.mp3"},
    {list: 1, target: "car.png",        cohort: "cards.png",      replace: "belt.png",       audio: "car.mp3"},
    {list: 1, target: "mother.png",     cohort: "money.png",      replace: "cards.png",      audio: "mother.mp3"},
    {list: 1, target: "cloud.png",      cohort: "clown.png",      replace: "robe.png",       audio: "cloud.mp3"},
    {list: 1, target: "milk.png",       cohort: "mitten.png",     replace: "windmill.png",   audio: "milk.mp3"},
    {list: 1, target: "leash.png",      cohort: "leaf.png",       replace: "flag.png",       audio: "leash.mp3"},
    {list: 1, target: "chair.png",      cohort: "cherry.png",     replace: "money.png",      audio: "chair.mp3"},
    {list: 1, target: "flashlight.png", cohort: "flag.png",       replace: "balloon.png",    audio: "flashlight.mp3"},
    {list: 1, target: "picture.png",    cohort: "pickle.png",     replace: "notebook.png",   audio: "picture.mp3"},
    {list: 1, target: "window.png",     cohort: "windmill.png",   replace: "pickle.png",     audio: "window.mp3"},
    {list: 1, target: "paper.png",      cohort: "pail.png",       replace: "lettuce.png",    audio: "paper.mp3"},
    {list: 1, target: "scissors.png",   cohort: "cymbals.png",    replace: "cherry.png",     audio: "scissors.mp3"},
    {list: 1, target: "nose.png",       cohort: "notebook.png",   replace: "pail.png",       audio: "nose.mp3"},
    {list: 1, target: "rope.png",       cohort: "robe.png",       replace: "leaf.png",       audio: "rope.mp3"},
    {list: 1, target: "brick.png",      cohort: "bridge.png",     replace: "pencil.png",     audio: "brick.mp3"},
    {list: 1, target: "penguin.png",    cohort: "pencil.png",     replace: "bridge.png",     audio: "penguin.mp3"},

    // // ── List 2 ─────────────────────────────────────────
    {list: 2, target: "pumpkin.png",    cohort: "puzzle.png",     replace: "table.png",      audio: "pumpkin.mp3"},
    {list: 2, target: "mouse.png",      cohort: "mouth.png",      replace: "backpack.png",   audio: "mouse.mp3"},
    {list: 2, target: "doctor.png",     cohort: "doll.png",       replace: "pea.png",        audio: "doctor.mp3"},
    {list: 2, target: "battery.png",    cohort: "backpack.png",   replace: "puppet.png",     audio: "battery.mp3"},
    {list: 2, target: "street.png",     cohort: "stream.png",     replace: "toad.png",       audio: "street.mp3"},
    {list: 2, target: "children.png",   cohort: "chicken.png",    replace: "doll.png",       audio: "children.mp3"},
    {list: 2, target: "toast.png",      cohort: "toad.png",       replace: "skunk.png",      audio: "toast.mp3"},
    {list: 2, target: "chalk.png",      cohort: "chocolate.png",  replace: "telephone2.png", audio: "chalk.mp3"},
    {list: 2, target: "baby.png",       cohort: "bacon.png",      replace: "planet.png",     audio: "baby.mp3"},
    {list: 2, target: "hammer.png",     cohort: "hammock.png",    replace: "bacon.png",      audio: "hammer.mp3"},
    {list: 2, target: "telescope.png",  cohort: "telephone2.png", replace: "spider.png",     audio: "telescope.mp3"},
    {list: 2, target: "eye.png",        cohort: "ice.png",        replace: "chocolate.png",  audio: "eye.mp3"},
    {list: 2, target: "peel.png",       cohort: "pea.png",        replace: "hammock.png",    audio: "peel.mp3"},
    {list: 2, target: "puddle.png",     cohort: "puppet.png",     replace: "ice.png",        audio: "puddle.mp3"},
    {list: 2, target: "tape.png",       cohort: "table.png",      replace: "puzzle.png",     audio: "tape.mp3"},
    {list: 2, target: "skirt.png",      cohort: "skunk.png",      replace: "chicken.png",    audio: "skirt.mp3"},
    {list: 2, target: "spoon.png",      cohort: "spider.png",     replace: "mouth.png",      audio: "spoon.mp3"},
    {list: 2, target: "plate.png",      cohort: "planet.png",     replace: "stream.png",     audio: "plate.mp3"}
];

// Preload all images and audio files
const all_images = stimuli.map(s => [s.target, s.cohort, s.replace]).flat().filter(Boolean).map(f => 'media/' + f);
const all_audio = stimuli.map(s => 'media/' + s.audio);

let preload = {
    type: jsPsychPreload,
    images: all_images,
    audio: all_audio
};
timeline.push(preload);

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

    // Randomize target side on every trial (ignore hardcoded target_location)
    const actual_target_location = Math.random() < 0.5 ? 'L' : 'R';

    const left_image  = actual_target_location === 'L' ? stimulus.target : competitor;
    const right_image = actual_target_location === 'L' ? competitor : stimulus.target;

    // ── Step 1: Start button (bottom centre) ──────────────────────────────────
    // Participant clicks this to begin the trial from a known starting position.

    const start_button = {
        type: jsPsychHtmlButtonResponse,
        stimulus: is_practice ? `<p style="color:#666; position: fixed; bottom: 120px; left: 50%; transform: translateX(-50%);">Click the button below when you are ready.</p>` : '',        choices: ['⬆'],
        button_html: function(choice) {
            return `<button class="jspsych-btn start-btn" style="position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%);">${choice}</button>`;
        },
        extensions: [
            { type: jsPsychExtensionMouseTracking, params: { events: ['mousemove', 'mousedown'] } }
        ]
    };
    

    // ── Step 2: Main trial – images appear, audio plays after 500 ms ──────────
    const trial = {
        type: jsPsychHtmlKeyboardResponse,
        extensions: [
            { type: jsPsychExtensionMouseTracking, params: { events: ['mousemove', 'mousedown'] } }
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
                let audio = new Audio('media/' + stimulus.audio);
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
                        correct: (this.id === 'img-left' && actual_target_location === 'L') ||
                                 (this.id === 'img-right' && actual_target_location === 'R')
                    });
                });
            });
        },
        data: {
            task: 'vwp_trial',
            target: stimulus.target,
            competitor: competitor,
            condition: condition,
            actual_target_location: actual_target_location,
            left_image: left_image,
            right_image: right_image,
            is_practice: is_practice
        }
    };

    return [start_button, trial];
}

// ── Practice trials (list 0) ───────────────────────────────────────────────────
const practice_stimuli = stimuli.filter(s => s.list === 0);
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

// ── Experimental trials (list > 0) ────────────────────────────────────────────
// Each stimulus generates two trial pairs: one cohort, one control.
// The pairs are shuffled randomly, then added to the timeline with optional breaks.
const experimental_stimuli = stimuli.filter(s => s.list > 0);

// Build all trial pairs (each pair = [start_button, main_trial])
let experimental_trial_pairs = [];
experimental_stimuli.forEach(stim => {
    experimental_trial_pairs.push({ stim, condition: 'cohort' });
    experimental_trial_pairs.push({ stim, condition: 'control' });
});

// // Fisher-Yates shuffle
// for (let i = experimental_trial_pairs.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [experimental_trial_pairs[i], experimental_trial_pairs[j]] = [experimental_trial_pairs[j], experimental_trial_pairs[i]];
// }
experimental_trial_pairs = jsPsych.randomization.shuffle(experimental_trial_pairs);

experimental_trial_pairs.forEach(({ stim, condition }, index) => {
    const trials = createVWPTrial(stim, condition, false);
    timeline.push(...trials);

    if ((index + 1) % 15 === 0 && index < experimental_trial_pairs.length - 1) {
        timeline.push({
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `
                <h2>Take a break!</h2>
                <p>You've completed ${index + 1} out of ${experimental_trial_pairs.length} trials.</p>
                <p><i>Press SPACE when you're ready to continue</i></p>
            `,
            choices: [' ']
        });
    }
});

// ── Post-experiment survey ─────────────────────────────────────────────────────
const instructions_endofstudy = {
    type: jsPsychInstructions,
    pages: [
        'Great work! You have finished the study. <br><br> There are just a few questions for you, and then the submission will be complete. <br><br> Click Next to move on.'
    ],
    show_clickable_nav: true
};
timeline.push(instructions_endofstudy);

let qTrial = {
    type: jsPsychSurveyText,
    questions: [
        {
            prompt: 'What do you think the experiment was about?',
            name: 'ExperimentPurpose'
        }
    ]
};

let qTrial2 = {
    type: jsPsychSurveyText,
    questions: [
        {
            prompt: 'How easy/hard did you find the task in this experiment, and what made it easier or harder?',
            name: 'Difficulty'
        }
    ]
};

let qTrial3 = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: 'Did you notice that some pairs of objects had names that sounded similar in the beginning?',
            name: 'NoticedCohorts',
            options: ["Yes", "No"],
            required: true
        }
    ]
};

let qTrial4 = {
    type: jsPsychSurveyText,
    questions: [
        {
            prompt: 'Did you feel that finding the object was more difficult when the names began similarly? <br> Please explain briefly.',
            name: 'DifficultyCohorts'
        }
    ]
};

let qTrial5 = {
    type: jsPsychSurveyText,
    questions: [
        {
            prompt: 'Is there anything else you noticed or found interesting while doing the task? Anything not work correctly?',
            name: 'Misc'
        }
    ]
};

let qTrial6 = {
    type: jsPsychSurveyLikert,
    questions: [
        {
            prompt: 'I think about problems in my mind in the form of a conversation with myself.',
            name: 'InnerSpeech1',
            labels: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            required: true
        },
        {
            prompt: 'If I am walking somewhere by myself, I often have a silent conversation with myself.',
            name: 'InnerSpeech2',
            labels: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            required: true
        },
        {
            prompt: 'If I am walking somewhere by myself, I frequently think of conversations that I\'ve recently had.',
            name: 'InnerSpeech3',
            labels: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            required: true
        },
        {
            prompt: 'My inner speech helps my imagination.',
            name: 'InnerSpeech4',
            labels: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            required: true
        },
        {
            prompt: 'I tend to think things through verbally when I am relaxing.',
            name: 'InnerSpeech5',
            labels: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            required: true
        }
    ]
};

const questionnaire = [qTrial, qTrial2, qTrial3, qTrial4, qTrial5, qTrial6];
if (!DEBUG) timeline.push(...questionnaire);

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