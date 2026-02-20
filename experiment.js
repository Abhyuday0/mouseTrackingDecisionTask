/**
 * VWP2 Mouse-Tracking Experiment
 * Based on Spivey et al. (2005) - "Continuous attraction toward phonological competitors"
 *
 * Structure:
 * - Two images appear (target + distractor) in upper-left and upper-right corners
 * - 500ms after image onset, a spoken word names the target
 * - Participant clicks a start button at bottom center, then clicks the named object
 * - Mouse x,y coordinates are tracked throughout the trial
 */

// ─── Trial Data (from VWP2_LR.csv) ───────────────────────────────────────────
// cohort_list: 1 or 2 (counterbalancing list)
// target_location: L or R
// target: filename of target image
// cohort: filename of phonological competitor image
// replace_cohort: filename of unrelated control distractor
// audio: filename of spoken word audio

const trialData = [
  // List 1
  { cohort_list: 1, target_location: "R", target: "bed.png",        cohort: "belt.png",       replace_cohort: "cymbals.png",    audio: "bed.wav" },
  { cohort_list: 1, target_location: "L", target: "letter.png",     cohort: "lettuce.png",    replace_cohort: "clown.png",      audio: "letter.wav" },
  { cohort_list: 1, target_location: "R", target: "banana.png",     cohort: "balloon.png",    replace_cohort: "mitten.png",     audio: "banana.wav" },
  { cohort_list: 1, target_location: "L", target: "car.png",        cohort: "cards.png",      replace_cohort: "belt.png",       audio: "car.wav" },
  { cohort_list: 1, target_location: "R", target: "mother.png",     cohort: "money.png",      replace_cohort: "cards.png",      audio: "mother.wav" },
  { cohort_list: 1, target_location: "L", target: "cloud.png",      cohort: "clown.png",      replace_cohort: "robe.png",       audio: "cloud.wav" },
  { cohort_list: 1, target_location: "R", target: "milk.png",       cohort: "mitten.png",     replace_cohort: "windmill.png",   audio: "milk.wav" },
  { cohort_list: 1, target_location: "L", target: "leash.png",      cohort: "leaf.png",       replace_cohort: "flag.png",       audio: "leash.wav" },
  { cohort_list: 1, target_location: "R", target: "chair.png",      cohort: "cherry.png",     replace_cohort: "money.png",      audio: "chair.wav" },
  { cohort_list: 1, target_location: "L", target: "flashlight.png", cohort: "flag.png",       replace_cohort: "balloon.png",    audio: "flashlight.wav" },
  { cohort_list: 1, target_location: "R", target: "picture.png",    cohort: "pickle.png",     replace_cohort: "notebook.png",   audio: "picture.wav" },
  { cohort_list: 1, target_location: "L", target: "window.png",     cohort: "windmill.png",   replace_cohort: "pickle.png",     audio: "window.wav" },
  { cohort_list: 1, target_location: "R", target: "paper.png",      cohort: "pail.png",       replace_cohort: "lettuce.png",    audio: "paper.wav" },
  { cohort_list: 1, target_location: "L", target: "scissors.png",   cohort: "cymbals.png",    replace_cohort: "cherry.png",     audio: "scissors.wav" },
  { cohort_list: 1, target_location: "R", target: "nose.png",       cohort: "notebook.png",   replace_cohort: "pail.png",       audio: "nose.wav" },
  { cohort_list: 1, target_location: "L", target: "rope.png",       cohort: "robe.png",       replace_cohort: "leaf.png",       audio: "rope.wav" },
  { cohort_list: 1, target_location: "R", target: "brick.png",      cohort: "bridge.png",     replace_cohort: "pencil.png",     audio: "brick.wav" },
  { cohort_list: 1, target_location: "L", target: "penguin.png",    cohort: "pencil.png",     replace_cohort: "bridge.png",     audio: "penguin.wav" },
  // List 2
  { cohort_list: 2, target_location: "R", target: "pumpkin.png",    cohort: "puzzle.png",     replace_cohort: "table.png",      audio: "pumpkin.wav" },
  { cohort_list: 2, target_location: "L", target: "mouse.png",      cohort: "mouth.png",      replace_cohort: "backpack.png",   audio: "mouse.wav" },
  { cohort_list: 2, target_location: "R", target: "doctor.png",     cohort: "doll.png",       replace_cohort: "pea.png",        audio: "doctor.wav" },
  { cohort_list: 2, target_location: "L", target: "battery.png",    cohort: "backpack.png",   replace_cohort: "puppet.png",     audio: "battery.wav" },
  { cohort_list: 2, target_location: "R", target: "street.png",     cohort: "stream.png",     replace_cohort: "toad.png",       audio: "street.wav" },
  { cohort_list: 2, target_location: "L", target: "children.png",   cohort: "chicken.png",    replace_cohort: "doll.png",       audio: "children.wav" },
  { cohort_list: 2, target_location: "R", target: "toast.png",      cohort: "toad.png",       replace_cohort: "skunk.png",      audio: "toast.wav" },
  { cohort_list: 2, target_location: "L", target: "chalk.png",      cohort: "chocolate.png",  replace_cohort: "telephone2.png", audio: "chalk.wav" },
  { cohort_list: 2, target_location: "R", target: "baby.png",       cohort: "bacon.png",      replace_cohort: "planet.png",     audio: "baby.wav" },
  { cohort_list: 2, target_location: "L", target: "hammer.png",     cohort: "hammock.png",    replace_cohort: "bacon.png",      audio: "hammer.wav" },
  { cohort_list: 2, target_location: "R", target: "telescope.png",  cohort: "telephone2.png", replace_cohort: "spider.png",     audio: "telescope.wav" },
  { cohort_list: 2, target_location: "L", target: "eye.png",        cohort: "ice.png",        replace_cohort: "chocolate.png",  audio: "eye.wav" },
  { cohort_list: 2, target_location: "R", target: "peel.png",       cohort: "pea.png",        replace_cohort: "hammock.png",    audio: "peel.wav" },
  { cohort_list: 2, target_location: "L", target: "puddle.png",     cohort: "puppet.png",     replace_cohort: "ice.png",        audio: "puddle.wav" },
  { cohort_list: 2, target_location: "R", target: "tape.png",       cohort: "table.png",      replace_cohort: "puzzle.png",     audio: "tape.wav" },
  { cohort_list: 2, target_location: "L", target: "skirt.png",      cohort: "skunk.png",      replace_cohort: "chicken.png",    audio: "skirt.wav" },
  { cohort_list: 2, target_location: "R", target: "spoon.png",      cohort: "spider.png",     replace_cohort: "mouth.png",      audio: "spoon.wav" },
  { cohort_list: 2, target_location: "L", target: "plate.png",      cohort: "planet.png",     replace_cohort: "stream.png",     audio: "plate.wav" },
];

// ─── Configuration ────────────────────────────────────────────────────────────

const CONFIG = {
  mediaPath: "media/",          // path to your media folder
  imageSize: 200,               // px, size of each object image
  speechOnsetDelay: 500,        // ms after image onset before audio plays
  mouseTrackingHz: 36,          // sampling rate in Hz (matches Spivey et al.)
  // Which list(s) to run. Set to [1], [2], or [1, 2]
  listsToRun: [1, 2],
  // Condition: "cohort" shows phonological competitor; "control" shows unrelated distractor
  // Set to "both" to counterbalance within-subject (half cohort, half control)
  condition: "both",
};

// ─── Helper: Build jsPsych trial list ─────────────────────────────────────────

function buildTrials(jsPsych) {
  // Filter by desired lists
  const filtered = trialData.filter(t => CONFIG.listsToRun.includes(t.cohort_list));

  // For "both" condition, assign cohort/control alternating per trial
  // For a proper counterbalancing design, you may want to split by participant.
  const trials = [];

  filtered.forEach((row, idx) => {
    // Determine condition for this trial
    let trialCondition;
    if (CONFIG.condition === "cohort") {
      trialCondition = "cohort";
    } else if (CONFIG.condition === "control") {
      trialCondition = "control";
    } else {
      // "both": alternate, so half the trials are cohort, half control
      trialCondition = idx % 2 === 0 ? "cohort" : "control";
    }

    // Determine which distractor to show
    const distractorImg = trialCondition === "cohort" ? row.cohort : row.replace_cohort;

    // Assign images to left/right positions
    const leftImg  = row.target_location === "L" ? row.target : distractorImg;
    const rightImg = row.target_location === "R" ? row.target : distractorImg;

    trials.push({
      type: "vwp-mouse-tracking",   // custom plugin defined below
      target:          row.target,
      distractor:      distractorImg,
      left_image:      leftImg,
      right_image:     rightImg,
      audio:           row.audio,
      target_location: row.target_location,
      condition:       trialCondition,
      cohort_list:     row.cohort_list,
    });
  });

  return jsPsych.randomization.shuffle(trials);
}

// ─── Custom jsPsych Plugin: vwp-mouse-tracking ───────────────────────────────
//
// This plugin implements the exact Spivey et al. (2005) paradigm:
//  1. Participant clicks a START button at the bottom center of the screen.
//  2. Two images appear simultaneously in the upper-left and upper-right.
//  3. 500 ms after image onset, the audio plays.
//  4. Mouse x,y is sampled at ~36 Hz throughout.
//  5. Participant clicks one of the images to end the trial.
//  6. Data saved: all mouse samples, RT, accuracy, movement duration.

const VWPMouseTrackingPlugin = (function () {
  const info = {
    name: "vwp-mouse-tracking",
    parameters: {
      target:          { type: "STRING", default: null },
      distractor:      { type: "STRING", default: null },
      left_image:      { type: "STRING", default: null },
      right_image:     { type: "STRING", default: null },
      audio:           { type: "STRING", default: null },
      target_location: { type: "STRING", default: "R" },
      condition:       { type: "STRING", default: "cohort" },
      cohort_list:     { type: "INT",    default: 1 },
    },
  };

  class VWPMouseTrackingPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial) {
      const jsPsych = this.jsPsych;

      // ── Layout constants (relative to viewport) ────────────────────────────
      const IMG_SIZE = CONFIG.imageSize;
      const MARGIN   = 40; // px from edge

      // ── State ──────────────────────────────────────────────────────────────
      let mouseData      = [];
      let trackingActive = false;
      let trackInterval  = null;
      let imageOnsetTime = null;
      let moveStartTime  = null;
      let audioStarted   = false;

      // ── Build HTML ─────────────────────────────────────────────────────────
      display_element.innerHTML = `
        <div id="vwp-container" style="
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #f5f0e8;
          cursor: crosshair;
          font-family: 'Georgia', serif;
        ">
          <!-- Left image box -->
          <div id="left-box" style="
            position: absolute;
            top: ${MARGIN}px;
            left: ${MARGIN}px;
            width: ${IMG_SIZE}px;
            height: ${IMG_SIZE}px;
            border: 3px solid #888;
            background: white;
            display: none;
            cursor: pointer;
            box-shadow: 2px 2px 8px rgba(0,0,0,0.15);
          ">
            <img id="left-img" src="${CONFIG.mediaPath}${trial.left_image}"
              style="width:100%; height:100%; object-fit:contain;" draggable="false"/>
          </div>

          <!-- Right image box -->
          <div id="right-box" style="
            position: absolute;
            top: ${MARGIN}px;
            right: ${MARGIN}px;
            width: ${IMG_SIZE}px;
            height: ${IMG_SIZE}px;
            border: 3px solid #888;
            background: white;
            display: none;
            cursor: pointer;
            box-shadow: 2px 2px 8px rgba(0,0,0,0.15);
          ">
            <img id="right-img" src="${CONFIG.mediaPath}${trial.right_image}"
              style="width:100%; height:100%; object-fit:contain;" draggable="false"/>
          </div>

          <!-- START button at bottom center -->
          <div id="start-btn" style="
            position: absolute;
            bottom: 60px;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 48px;
            background: #3a5a8c;
            color: white;
            font-size: 16px;
            font-family: Georgia, serif;
            letter-spacing: 1px;
            border: none;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            user-select: none;
          ">START</div>

          <!-- Trial instruction -->
          <div style="
            position: absolute;
            bottom: 120px;
            left: 50%;
            transform: translateX(-50%);
            color: #555;
            font-size: 14px;
            white-space: nowrap;
          ">Click START, then click the object you hear.</div>

          <!-- Mouse cursor dot (visual feedback) -->
          <div id="cursor-dot" style="
            position: fixed;
            width: 10px;
            height: 10px;
            background: rgba(200,50,50,0.7);
            border-radius: 50%;
            pointer-events: none;
            display: none;
            transform: translate(-50%, -50%);
            z-index: 999;
          "></div>
        </div>
      `;

      const container  = document.getElementById("vwp-container");
      const startBtn   = document.getElementById("start-btn");
      const leftBox    = document.getElementById("left-box");
      const rightBox   = document.getElementById("right-box");
      const cursorDot  = document.getElementById("cursor-dot");

      // ── Track mouse position continuously ─────────────────────────────────
      let currentMouseX = window.innerWidth / 2;
      let currentMouseY = window.innerHeight;

      const onMouseMove = (e) => {
        currentMouseX = e.clientX;
        currentMouseY = e.clientY;
        // Show cursor dot
        cursorDot.style.left = e.clientX + "px";
        cursorDot.style.top  = e.clientY + "px";
      };
      document.addEventListener("mousemove", onMouseMove);

      // ── Start tracking at ~36 Hz ───────────────────────────────────────────
      function startTracking() {
        const intervalMs = Math.round(1000 / CONFIG.mouseTrackingHz);
        trackInterval = setInterval(() => {
          if (!trackingActive) return;
          const now = performance.now();
          mouseData.push({
            t:     Math.round(now - imageOnsetTime),  // ms since image onset
            x:     currentMouseX,
            y:     currentMouseY,
          });
        }, intervalMs);
      }

      // ── Audio ──────────────────────────────────────────────────────────────
      // const audioEl = new Audio(CONFIG.mediaPath + trial.audio);
      const audioEl = new Audio(CONFIG.mediaPath + "audio.mp3");

      // ── Click START ────────────────────────────────────────────────────────
      startBtn.addEventListener("click", () => {
        startBtn.style.display    = "none";
        cursorDot.style.display   = "block";

        // Show images
        leftBox.style.display  = "block";
        rightBox.style.display = "block";
        imageOnsetTime         = performance.now();
        trackingActive         = true;
        startTracking();

        // Schedule audio 500 ms after image onset
        setTimeout(() => {
          audioEl.play().catch(err => console.warn("Audio play failed:", err));
          audioStarted = true;
        }, CONFIG.speechOnsetDelay);
      });

      // ── Helper: get box center in viewport coords ──────────────────────────
      function getBoxCenter(boxEl) {
        const rect = boxEl.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }

      // ── Click handler for image boxes ──────────────────────────────────────
      function handleImageClick(clickedSide) {
        if (!trackingActive) return;

        trackingActive = false;
        clearInterval(trackInterval);
        document.removeEventListener("mousemove", onMouseMove);

        // Push one final sample
        const clickTime = performance.now();
        mouseData.push({
          t:     Math.round(clickTime - imageOnsetTime),
          x:     currentMouseX,
          y:     currentMouseY,
          click: true,
        });

        audioEl.pause();

        // Determine accuracy
        const correct = (clickedSide === trial.target_location);

        // Compute movement onset: first sample after START where mouse moved
        // (we define movement onset as the first sample after image onset)
        const moveOnset = mouseData.length > 0 ? mouseData[0].t : null;
        const totalRT   = mouseData.length > 0 ? mouseData[mouseData.length - 1].t : null;

        // Compute trajectory area (curvature) relative to straight line from first to last point
        const curvature = computeCurvature(mouseData);

        // Compute average x relative to screen center (negative = pulled left, positive = right)
        const screenCenterX = window.innerWidth / 2;

        jsPsych.finishTrial({
          // Trial info
          target:          trial.target,
          distractor:      trial.distractor,
          target_location: trial.target_location,
          condition:       trial.condition,
          cohort_list:     trial.cohort_list,
          audio:           trial.audio,
          // Outcome
          correct:         correct,
          clicked_side:    clickedSide,
          rt:              totalRT,         // ms from image onset to click
          move_onset:      moveOnset,       // ms from image onset to first sample
          // Trajectory
          mouse_data:      JSON.stringify(mouseData),
          n_samples:       mouseData.length,
          curvature_area:  curvature,
          // Screen info for normalization
          screen_width:    window.innerWidth,
          screen_height:   window.innerHeight,
          img_size:        IMG_SIZE,
          margin:          MARGIN,
          speech_onset_delay: CONFIG.speechOnsetDelay,
        });
      }

      leftBox.addEventListener("click",  () => handleImageClick("L"));
      rightBox.addEventListener("click", () => handleImageClick("R"));

      // ── Hover highlight ───────────────────────────────────────────────────
      [leftBox, rightBox].forEach(box => {
        box.addEventListener("mouseenter", () => box.style.borderColor = "#3a5a8c");
        box.addEventListener("mouseleave", () => box.style.borderColor = "#888");
      });
    }
  }

  VWPMouseTrackingPlugin.info = info;
  return VWPMouseTrackingPlugin;
})();

// ─── Curvature computation (area between trajectory and straight line) ────────
// Mirrors the Spivey et al. analysis: area between actual path and straight
// line from start to endpoint. Positive = curved toward distractor side.

function computeCurvature(mouseData) {
  if (mouseData.length < 2) return 0;
  const x0 = mouseData[0].x, y0 = mouseData[0].y;
  const x1 = mouseData[mouseData.length - 1].x;
  const y1 = mouseData[mouseData.length - 1].y;
  const dx = x1 - x0, dy = y1 - y0;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return 0;

  let area = 0;
  for (let i = 0; i < mouseData.length; i++) {
    // Signed distance from point to straight line (cross product / length)
    const px = mouseData[i].x - x0;
    const py = mouseData[i].y - y0;
    const signedDist = (dx * py - dy * px) / len;
    area += signedDist;
  }
  return area / mouseData.length; // mean signed deviation
}

// ─── Main experiment initialization ───────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  // jsPsych must be loaded globally (via index.html)
  if (typeof jsPsych === "undefined") {
    console.error("jsPsych not loaded. Make sure to include jsPsych in your index.html.");
    return;
  }

  // Register custom plugin
  jsPsych.plugins["vwp-mouse-tracking"] = VWPMouseTrackingPlugin;

  const jsPsychInstance = initJsPsych({
    on_finish: () => {
      // Download data as CSV when experiment ends
      jsPsychInstance.data.displayData();
    },
  });

  // ── Preload images & audio ─────────────────────────────────────────────────
  const allImages = [...new Set(trialData.flatMap(t => [
    CONFIG.mediaPath + t.target,
    CONFIG.mediaPath + t.cohort,
    CONFIG.mediaPath + t.replace_cohort,
  ]))];
  const allAudio = trialData.map(t => CONFIG.mediaPath + t.audio);

  const preload = {
    type: jsPsychPreload,
    images: allImages,
    audio:  allAudio,
    show_progress_bar: true,
    message: "<p>Loading experiment materials...</p>",
  };

  // ── Welcome screen ─────────────────────────────────────────────────────────
  const welcome = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <div style="max-width:600px; margin:auto; font-family:Georgia,serif; line-height:1.6;">
        <h2>Word Recognition Study</h2>
        <p>In this experiment, you will see two pictures on the screen and hear a spoken word.</p>
        <p>Your task is to <strong>click the picture that matches the word you hear</strong>.</p>
        <p>Each trial begins when you click the <strong>START</strong> button at the bottom of the screen.
           The pictures will appear, and shortly after you will hear the word.</p>
        <p>Please move your mouse <em>smoothly and continuously</em> toward the picture you think is named —
           don't wait until the word is finished before moving.</p>
        <p>Try to be both <strong>fast and accurate</strong>.</p>
      </div>
    `,
    choices: ["Begin"],
  };

  // ── Practice instructions ──────────────────────────────────────────────────
  const practiceInstructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <div style="max-width:600px; margin:auto; font-family:Georgia,serif; line-height:1.6;">
        <h3>Practice</h3>
        <p>Let's start with a few practice trials to get familiar with the task.</p>
        <p>Remember: click <strong>START</strong>, then move your mouse toward the correct picture as soon as you start to hear the word.</p>
      </div>
    `,
    choices: ["Start Practice"],
  };

  // ── Main task instructions ─────────────────────────────────────────────────
  const mainInstructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <div style="max-width:600px; margin:auto; font-family:Georgia,serif; line-height:1.6;">
        <h3>Main Task</h3>
        <p>Great! Now you'll complete the main experiment.</p>
        <p>There are <strong>${trialData.filter(t => CONFIG.listsToRun.includes(t.cohort_list)).length} trials</strong> in total.</p>
        <p>Remember to move your mouse smoothly as soon as you start recognizing the word.</p>
      </div>
    `,
    choices: ["Start"],
  };

  // ── Build trial timeline ───────────────────────────────────────────────────
  const experimentTrials = buildTrials(jsPsychInstance).map(t => ({
    ...t,
    // Add inter-trial fixation
    on_start: () => {},
  }));

  // Wrap each trial with a blank inter-trial interval
  const itiNode = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="background:#f5f0e8; width:100vw; height:100vh;"></div>',
    choices: "NO_KEYS",
    trial_duration: 500,
  };

  const trialTimeline = experimentTrials.flatMap(t => [itiNode, t]);

  // ── Debrief ────────────────────────────────────────────────────────────────
  const debrief = {
    type: jsPsychHtmlButtonResponse,
    stimulus: () => {
      const data    = jsPsychInstance.data.get().filter({ trial_type: "vwp-mouse-tracking" });
      const correct = data.filter({ correct: true }).count();
      const total   = data.count();
      const pct     = total > 0 ? Math.round((correct / total) * 100) : 0;
      return `
        <div style="max-width:500px; margin:auto; font-family:Georgia,serif; line-height:1.6; text-align:center;">
          <h2>Thank You!</h2>
          <p>You completed <strong>${total}</strong> trials and selected the correct object on
             <strong>${correct}</strong> (${pct}%) of them.</p>
          <p>Your data has been recorded. The experiment is now complete.</p>
        </div>
      `;
    },
    choices: ["Finish"],
  };

  // ── Save data ──────────────────────────────────────────────────────────────
  const saveData = {
    type: jsPsychCallFunction,
    func: () => {
      const csv = jsPsychInstance.data.get().csv();
      const blob = new Blob([csv], { type: "text/csv" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `vwp_data_${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    },
  };

  // ── Full timeline ──────────────────────────────────────────────────────────
  const timeline = [
    preload,
    welcome,
    mainInstructions,
    ...trialTimeline,
    saveData,
    debrief,
  ];

  jsPsychInstance.run(timeline);
});
