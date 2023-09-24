import { defineConfig } from "vite";
import solid from "solid-start/vite";
import { Options } from "solid-start/vite/plugin";
import vercel from "solid-start-vercel"

export default defineConfig({
  plugins: [solid({
    adapter: vercel(),
    islands: false,
  })],
});
