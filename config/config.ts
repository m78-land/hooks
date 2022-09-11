import path from "path";

export default {
  favicon: "https://gitee.com/llixianjie/m78/raw/master/public/logo-small.png",
  history: { type: "hash" },
  outputPath: "docs",
  base: "/hooks/",
  publicPath: "/hooks/",
  title: "hooks",
  description: "Use Your Imagination",
  alias: {
    "@": path.resolve(__dirname, "../src"),
    "@m78/hook": path.resolve(__dirname, "../src/index.ts"),
  },
  resolve: {
    includes: ["src"],
  },
  // dynamicImport: {
  //   loading: '@/Loading',
  // },
};
