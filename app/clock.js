import clock from "clock";
import { preferences } from "user-settings";
import { zeroPad } from "./utils/format";

/**
 * Clock-Klasse verwaltet:
 * - Uhrzeit-Anzeige
 * - Page-Navigation
 * - Toggle/Recording Button
 */
export class Clock {
  constructor(clockLabelElement, bgElement, toggleBtnElement, toggleBtnTextElement) {
    this.clockLabel = clockLabelElement;
    this.bgElement = bgElement;
    this.toggleBtn = toggleBtnElement;
    this.toggleBtnText = toggleBtnTextElement;

    this.currentPage = 0;
    this.totalPages = 3;
    this.pages = [];
    this.isRecording = false;

    this.recordingListener = null; // Callback wenn Recording startet/stoppt
    this.pageChangeListener = null; // Callback wenn Page wechselt
  }

  //Initialisiert die Uhrzeit-Anzeige
  initClock() {
    clock.granularity = "seconds";

    clock.ontick = (evt) => {
      let today = evt.date;
      let hours = today.getHours();

      if (preferences.clockDisplay === "12h") {
        hours = hours % 12 || 12;
      } else {
        hours = zeroPad(hours);
      }

      let mins = zeroPad(today.getMinutes());
      let seconds = zeroPad(today.getSeconds());

      this.clockLabel.text = `${hours}:${mins}:${seconds}`;
    };
  }

  //Setzt die Pages für die Navigation
  setPages(pageElements) {
    this.pages = pageElements;
    this.totalPages = pageElements.length;
    this.showPage(0);
  }

  //Wechselt zu einer bestimmten Page
  showPage(index) {
    this.currentPage = index;
    this.pages.forEach((p, i) => {
      p.style.visibility = i === index ? "visible" : "hidden";
    });

    if(index === 2) {
      this.toggleBtn.style.pointerEvents = "all";
    }

    if (this.pageChangeListener) {
      this.pageChangeListener(index);
    }
  }

  //Wechselt zur nächsten Page
  nextPage() {
    console.log(`[Clock] 🔁 Wechsel zu Page ${this.currentPage + 1}`);
    this.showPage((this.currentPage + 1) % this.totalPages);
  }

  //Toggle Recording Start/Stop
  toggleRecording() {
    this.isRecording = !this.isRecording;
    this.toggleBtnText.text = this.isRecording ? "STOP" : "START";

    if (this.recordingListener) {
      this.recordingListener(this.isRecording);
    }
  }

  //Registriert einen Callback für Recording Start/Stop
  onRecordingChange(callback) {
    this.recordingListener = callback;
  }

  onPageChange(callback) {
    this.pageChangeListener = callback;
  }

  //Initialisiert EventListener für Page Navigation und Toggle Button
  attachEventListeners() {
    this.bgElement.addEventListener("click", () => {
      this.nextPage();
    });

    this.toggleBtn.addEventListener("click", () => {
      //console.log(`[Clock] 🔴 Toggle Recording!`);
      this.toggleRecording();
    });
  }

  //Gibt den aktuellen Recording Status zurück
  getRecordingStatus() {
    return this.isRecording;
  }

  //Gibt die aktuelle Page zurück
  getCurrentPage() {
    return this.currentPage;
  }
}

// Legacy-Funktion für Kompatibilität
export function initClock(labelElement) {
  const clock = new Clock(labelElement, null, null, null);
  clock.initClock();
  return clock;
}