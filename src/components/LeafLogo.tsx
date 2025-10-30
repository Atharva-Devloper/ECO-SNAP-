// src/components/LeafLogo.tsx
import { motion } from "framer-motion";

type Props = { size?: number };

// Branch/stem data for sub-path animations
const branchPaths: {
  d?: string;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  transform?: string;
  isLine?: boolean;
  delay: number;
}[] = [
  // Each object represents one animated stem segment
  { transform: "matrix(-0.896473 0.443097 -0.451349 -0.892348 63.3757 34)", x1: 1, y1: -1, x2: 30.6526, y2: -1, isLine: true, delay: 0.7 },
  { isLine: true, x1: 64.3072, y1: 34.4604, x2: 90.7281, y2: 45.4429, delay: 0.75 },
  { isLine: true, x1: 62.5075, y1: 64.3257, x2: 33.4772, y2: 77.6287, delay: 0.8 },
  { d: "M63.5 63.5L98.1393 76.5754", delay: 0.85 },
  { d: "M63.5 97.5L23.266 117.072", delay: 0.9 },
  { d: "M63.5002 97.5003L102.873 113.979", delay: 0.95 },
  { isLine: true, x1: 62.7049, y1: 136.383, x2: 38.2639, y2: 152.23, delay: 1.0 },
  { transform: "matrix(0.846447 0.532472 -0.541285 0.840839 63 135)", x1: 1, y1: -1, x2: 29.7297, y2: -1, isLine: true, delay: 1.05 },
];

export function LeafLogo({ size = 120 }: Props) {
  // Check if user prefers reduced motion (accessibility)
  const prefersReduced =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Custom easing curve for smooth animations
  const easeOutCubic = [0.33, 0.01, 0.68, 0.99];

  return (
    <div
      style={{ width: size, height: size, display: "inline-block", position: "relative" }}
      aria-hidden
    >
      {/* Slight floating & rotation animation for the whole logo */}
      <motion.div
        style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
        animate={prefersReduced ? {} : { y: [0, -6, 0], rotate: [0, 1.5, -1.5, 0] }}
        transition={prefersReduced ? ({} as any) : ({ duration: 4, repeat: Infinity, ease: easeOutCubic } as any)}
      >
        {/* Main SVG container */}
        <motion.svg
          viewBox="0 0 129 182"
          width={size}
          height={size}
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          {/* Gradient definition for leaf color */}
          <defs>
            <linearGradient id="paint0_linear_2003_3418" x1="64.0159" y1="12" x2="64.0159" y2="180.384" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4ADE80" />
              <stop offset="0.5" stopColor="#22C55E" />
              <stop offset="1" stopColor="#16A34A" />
            </linearGradient>
          </defs>

          {/* Leaf body fill animation */}
          <motion.path
            d="M128.024 64.6704C127.633 54.5682 101.338 9.8388 62.996 12.0815C27.1623 11.4355 3.34949 53.2467 0.332887 64.6676C-2.68371 76.0885 14.5364 142.811 62.996 180.384C114.424 155.139 128.415 74.7727 128.024 64.6704Z"
            fill="url(#paint0_linear_2003_3418)"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 1.1, ease: easeOutCubic } as any}
            style={{ transformOrigin: "50% 50%" }}
          />

          {/* Central vertical stem */}
          <motion.line
            x1="64.3918"
            y1="1.5"
            x2="64.3918"
            y2="180.5"
            stroke="#2D5016"
            strokeWidth={3}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: easeOutCubic } as any}
          />

          {/* Animate each branch path */}
          {branchPaths.map((b, i) => {
            const transitionObj = { duration: 0.55, delay: b.delay, ease: easeOutCubic } as any;

            // Animate straight lines
            if (b.isLine) {
              return (
                <motion.line
                  key={i}
                  x1={b.x1}
                  y1={b.y1}
                  x2={b.x2}
                  y2={b.y2}
                  transform={b.transform}
                  stroke="#2D5016"
                  strokeWidth={2}
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={transitionObj}
                />
              );
            }
            // Animate curved paths
            else {
              return (
                <motion.path
                  key={i}
                  d={b.d}
                  stroke="#2D5016"
                  strokeWidth={2}
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={transitionObj}
                />
              );
            }
          })}
        </motion.svg>
      </motion.div>
    </div>
  );
}

export default LeafLogo;
