import { defineConfig } from "@m78/build-tools/defineConfig.js";

const ignore = ["**/*(play|.umi)/**/*", "**/*.demo.*(js|ts|jsx|tsx)"];

export default defineConfig([
  {
    inpDir: "src",
    outDir: "dist",
    swcConfig: {
      module: {
        type: "es6",
      },
    },
    ignore,
    copyfile: false,
  },
  {
    inpDir: "src",
    outDir: "dist/umd",
    swcConfig: {
      module: {
        type: "umd",
      },
    },
    ignore,
    copyfile: false,
  },
]);
