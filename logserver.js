import { serveAPI } from "https://js.sabae.cc/wsutil.js";

serveAPI("/api", async (param) => {
  console.log(JSON.stringify(param, null, 2));
  /*
  param = param.find(p => p.handedness == "right" && p.gamepad.buttons.length > 1);
  if (param) {
    console.log(JSON.stringify(param, null, 2));
  }
  */
  return "ok";
});
