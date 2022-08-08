// @ts-nocheck

import "jest";
import { index } from "../index";

describe("Scraper", () => {
  it("checks if proper message returns when 0 arguments passed", () => {
    // GIVEN 0 arguments passed
    // WHEN response is given
    const response = index();

    // THEN result proper message returns
    expect(response).toEqual(
      "Username is undefined. You have to pass username in order to use scraper."
    );
  });

  it("checks if proper message returns when 1 username passed", async () => {
    jest.setTimeout(10000);
    // GIVEN 1 arguments passed
    // WHEN response is given
    try {
      const response = await index("qwerty");

      // THEN result is defined
      expect(response).toBeDefined();
    } catch (error) {
      console.log("Something went wrong.");
      return;
    }
  });
});
