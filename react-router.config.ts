import type {Config} from '@react-router/dev/config';
import {vercelPreset} from '@vercel/react-router/vite';

/**
 * React Router configuration for Vercel deployment.
 * Hydrogen utilities still run via createHydrogenContext in server/app.ts.
 */
export default {
  ssr: true,
  presets: [vercelPreset()],
} satisfies Config;
