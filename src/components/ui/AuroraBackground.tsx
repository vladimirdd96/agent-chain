import React from "react";

const AuroraBackground = () => (
  <div className="absolute inset-0 -z-20 overflow-hidden">
    <div className="absolute left-1/2 top-1/3 w-[80vw] h-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple-500/30 via-pink-400/20 to-blue-400/30 blur-3xl animate-aurora" />
    <div className="absolute left-1/4 top-2/3 w-[40vw] h-[30vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-pink-500/20 via-blue-400/20 to-purple-400/20 blur-2xl animate-aurora2" />
  </div>
);

export default AuroraBackground;

// Add the following to your globals.css or a CSS module:
// .animate-aurora {
//   animation: auroraMove 12s ease-in-out infinite alternate;
// }
// .animate-aurora2 {
//   animation: auroraMove2 16s ease-in-out infinite alternate;
// }
// @keyframes auroraMove {
//   0% { transform: translate(-50%, -50%) scale(1); }
//   100% { transform: translate(-40%, -60%) scale(1.2); }
// }
// @keyframes auroraMove2 {
//   0% { transform: translate(-50%, -50%) scale(1); }
//   100% { transform: translate(-60%, -40%) scale(1.1); }
// }
