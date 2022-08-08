import * as puppeteer from "puppeteer";
import { IResponse } from "./interfaces";

export const scraper = async (username: string): Promise<IResponse> => {
  const url: string = `https://www.instagram.com/accounts/login/?next=/${username}/`;

  try {
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = (await browser.pages())[0];
    await page.setUserAgent(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 105.0.0.11.118 (iPhone11,8; iOS 12_3_1; en_US; en-US; scale=2.00; 828x1792; 165586599)"
    );

    // Accept all cookies
    await page.goto(url);
    await page.$$eval("button", (buttons) => {
      buttons[buttons.length - 1].click();
    });

    // Sign in
    try {
      await page.waitForSelector('input[name="username"]');
      await page.type('input[name="username"]', process.env.LOGIN);
      await page.type('input[name="password"]', process.env.PASSWORD);
      await page.keyboard.press("Enter");
      await page.waitForNavigation();
    } catch (error) {
      console.log("Incorrect login or password");
      await browser.close();
      return;
    }

    // Work with user page
    try {
      const userPage: string = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`;
      await page.goto(userPage);
      const data = await page.$$eval("pre", (bodies) => {
        return bodies[0].innerText;
      });

      const response: IResponse = {
        username: username,
        followersCount: JSON.parse(data).data.user.edge_followed_by.count,
        is_account_public: !JSON.parse(data).data.user.is_private,
      };
      console.log(response);

      return response;
    } catch (error) {
      console.log(`"${username}" doesn\'t exist.`);
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.log(error);
  }
};
