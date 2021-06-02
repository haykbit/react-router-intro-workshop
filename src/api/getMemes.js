import memes from "../utils/demo-data";

function getMemes(fail = false) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (fail) {
        rej(new Error("Failed to fetch"));
      }

      res(memes);
    }, 1000);
  });
}

export { getMemes };
