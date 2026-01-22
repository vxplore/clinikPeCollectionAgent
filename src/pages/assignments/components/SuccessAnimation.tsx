import { useEffect, useState } from "react";
import { Check } from "lucide-react";

export default function SuccessAnimation() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // ✅ Delay state update until after first paint
    const frameId = requestAnimationFrame(() => {
      setShow(true);
    });

    // ✅ External system: Web Audio API
    const audioContext = new (
      window.AudioContext ||
      // @ts-expect-error webkitAudioContext
      window.webkitAudioContext
    )();

    const playSuccessSound = () => {
      const now = audioContext.currentTime;

      // First tone
      const osc1 = audioContext.createOscillator();
      const gain1 = audioContext.createGain();
      osc1.connect(gain1);
      gain1.connect(audioContext.destination);
      osc1.frequency.value = 800;
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc1.start(now);
      osc1.stop(now + 0.3);

      // Second tone (delayed)
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      osc2.connect(gain2);
      gain2.connect(audioContext.destination);
      osc2.frequency.value = 600;
      gain2.gain.setValueAtTime(0, now + 0.15);
      gain2.gain.setValueAtTime(0.3, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.5);
    };

    playSuccessSound();

    // ✅ Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      audioContext.close();
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center py-8 space-y-4">
      <div
        className={`flex flex-col items-center justify-center space-y-4 transition-all duration-1000 ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="relative">
          {/* Ripple effects */}
          <div
            className={`absolute inset-0 rounded-full bg-green-200 ${
              show ? "animate-ping" : "opacity-0"
            }`}
            style={{ animationDuration: "1.5s", animationIterationCount: "2" }}
          ></div>
          <div
            className={`absolute inset-0 rounded-full bg-green-100 ${
              show ? "animate-pulse" : "opacity-0"
            }`}
            style={{ animationDuration: "2s", animationIterationCount: "3" }}
          ></div>

          {/* Main circle */}
          <div
            className={`relative w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl transition-all duration-700 ${
              show ? "scale-100 rotate-0" : "scale-0 rotate-180"
            }`}
          >
            {/* Checkmark with draw animation */}
            <div
              className={`transition-all duration-500 delay-300 ${
                show ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            >
              <Check
                className="w-12 h-12 text-white drop-shadow-lg"
                strokeWidth={3}
              />
            </div>
          </div>
        </div>

        {/* Confetti particles */}
        {show && (
          <>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"][
                    i % 4
                  ],
                  animation: `confetti 1.5s ease-out forwards`,
                  animationDelay: `${i * 0.05}s`,
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${i * 30}deg) translateY(0)`,
                }}
              />
            ))}
          </>
        )}

        {/* Text content */}
        <h3
          className={`text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent transition-all duration-700 delay-500 ${
            show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Success!
        </h3>
        <p
          className={`text-gray-600 text-center text-lg transition-all duration-700 delay-700 ${
            show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Payment added successfully
        </p>

        {/* Success checkmark badge */}
        <div
          className={`mt-4 px-6 py-2 bg-green-100 rounded-full border-2 border-green-300 transition-all duration-700 delay-900 ${
            show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="text-green-700 font-semibold text-sm">
            Payment Confirmed
          </p>
        </div>
      </div>
      <style>{`
        @keyframes confetti {
            0% {
              transform: rotate(var(--rotate, 0deg)) translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: rotate(var(--rotate, 0deg)) translateY(-150px) scale(0);
              opacity: 0;
            }
          }
      `}</style>
    </div>
  );
}
