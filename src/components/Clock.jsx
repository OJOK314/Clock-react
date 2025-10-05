import React, { useEffect, useState, useRef } from "react";

 function DigitalWatch() {
  const [now, setNow] = useState(new Date());
  const [running, setRunning] = useState(true);
  const [use24Hour, setUse24Hour] = useState(true);
  const [timeZone, setTimeZone] = useState("local");
  const tickRef = useRef(null);

  useEffect(() => {
    // update once per second while running
    if (running) {
      tickRef.current = setInterval(() => setNow(new Date()), 1000);
    }
    return () => clearInterval(tickRef.current);
  }, [running]);

  // returns a Date-like object adjusted for the chosen timezone (if not local)
  function zonedDate(date, tz) {
    if (tz === "local") return date;
    try {
      // Use Intl to convert to a string in timezone then parse back to Date
      const s = date.toLocaleString("en-US", { timeZone: tz });
      return new Date(s);
    } catch (e) {
      // invalid timezone -> fallback to UTC
      const s = date.toLocaleString("en-US", { timeZone: "UTC" });
      return new Date(s);
    }
  }

  const displayDate = zonedDate(now, timeZone);

  // Format time components for display
  const hours24 = displayDate.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = String(displayDate.getMinutes()).padStart(2, "0");
  const seconds = String(displayDate.getSeconds()).padStart(2, "0");
  const ampm = hours24 >= 12 ? "PM" : "AM";

  const hourDisplay = use24Hour ? String(hours24).padStart(2, "0") : String(hours12).padStart(2, "0");

  function toggleRunning() {
    setRunning((r) => !r);
  }

  function copyTime() {
    const text = `${hourDisplay}:${minutes}:${seconds}${use24Hour ? "" : " " + ampm}`;
    navigator.clipboard?.writeText(text).catch(() => {});
  }

  return (
    <div className="max-w-sm mx-auto p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-lg text-slate-100 font-sans justifyconten-center">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Digital Watch by Alfred</h2>
        <div className="text-sm opacity-80">{displayDate.toDateString()}</div>
      </div>

      <div className="flex items-center justify-center bg-black/60 p-4 rounded-xl mb-4">
        <div className="text-center select-none">
          <div className="text-5xl md:text-6xl font-mono tracking-wide">
            {hourDisplay}
            <span className="mx-2 text-5xl font-mono" aria-hidden>
              :
            </span>
            {minutes}
            <span className="mx-2 text-lg align-super font-mono ml-3 md:ml-6">{seconds}</span>
          </div>
          {!use24Hour && <div className="mt-1 text-sm">{ampm}</div>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={toggleRunning}
          className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 focus:outline-none"
          aria-pressed={!running}
        >
          {running ? "Pause" : "Start"}
        </button>

        <button
          onClick={() => setUse24Hour((s) => !s)}
          className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 focus:outline-none"
        >
          {use24Hour ? "Switch to 12h" : "Switch to 24h"}
        </button>

        <select
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
          className="col-span-2 mt-1 p-2 rounded-lg bg-slate-700 focus:outline-none"
          aria-label="Select timezone"
        >
          <option value="local">Local Time</option>
          <option value="UTC">UTC</option>
          <option value="Africa/Kampala">Africa/Kampala</option>
          <option value="Europe/London">Europe/London</option>
          <option value="America/New_York">America/New_York</option>
          <option value="Asia/Tokyo">Asia/Tokyo</option>
        </select>

        <button
          onClick={copyTime}
          className="col-span-2 mt-2 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 focus:outline-none"
        >
          Copy time to clipboard
        </button>
      </div>

      <div className="mt-4 text-xs text-slate-300">
        Tip: paste <code className="bg-slate-900 px-1 rounded">import DigitalWatch from "./DigitalWatch"</code> into your app and render <code className="bg-slate-900 px-1 rounded">&lt;DigitalWatch /&gt;</code>.
      </div>
    </div>
  );
}
export default DigitalWatch;
