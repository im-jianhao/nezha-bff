import { assignIn } from "lodash";
import { join } from "path";

interface IConfig {
  viewDir: string;
  staticDir: string;
  port: number;
  memoryFlag: "memory" | false;
}

let config: IConfig = {
  viewDir: join(__dirname, "..", "views"),
  staticDir: join(__dirname, "..", "assets"),
  port: 8081,
  memoryFlag: false,
};

if (process.env.NODE_ENV === "development") {
  let localConfig = {
    port: 8081,
  };
  config = assignIn(config, localConfig);
}
if (process.env.NODE_ENV === "production") {
  let prodConfig = {
    port: 8082,
    memoryFlag: "memory",
  };
  config = assignIn(config, prodConfig);
}

export default config;
