import * as dotenv from "dotenv";
import { scraper } from "./src/scraper";

dotenv.config();
const username: string | undefined = process.argv[2];

if (process.argv.length > 3) {
  console.log("Only the first username will be taken into consideration.");
}

export const index = (username: string | undefined) => {
  if (!username) {
    console.log(
      "Username is undefined. You have to pass username in order to use scraper."
    );
    return "Username is undefined. You have to pass username in order to use scraper.";
  } else {
    try {
      return scraper(username);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
};

index(username);
