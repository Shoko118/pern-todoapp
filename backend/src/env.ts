import { cleanEnv, str, num } from "envalid";
import "dotenv/config";

const env = cleanEnv(process.env, {
  LOCALHOST_PORT: num(),
  POOL_USER: str(),
  POOL_PASSWORD: str(),
  POOL_HOST: str(),
  POOL_PORT: num(),
  POOL_DATABASE: str(),
});

export default env;
