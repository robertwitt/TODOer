import { createApp } from "./app";

const app = createApp();

app.listen(3000, () => {
  console.log("Server started and is listening on port 3000");
});
