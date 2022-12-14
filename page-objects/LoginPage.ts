import { Locator, expect, Page } from "@playwright/test";

export class LoginPage {
    readonly page:Page
    readonly emailInput:Locator
    readonly passwordInput:Locator
    readonly submitBtn:Locator
    readonly fogotPassword:Locator
    readonly signUpLink:Locator
    errorMessage:Locator

    constructor(page:Page) {
        this.page = page;
        this.emailInput = page.locator('#ctl00_CPHContainer_txtUserLogin');
        this.passwordInput = page.locator('#ctl00_CPHContainer_txtPassword');
        this.submitBtn = page.locator('[name="ctl00$CPHContainer$btnLoginn"]');
        this.fogotPassword = page.locator('#ctl00_CPHContainer_hprlnkForgetPassword');
        this.signUpLink = page.locator('[class="signup_link"] > a');
    }

    async visit() {
       await this.page.goto('http://www.testyou.in/Login.aspx');
    }

   async login(email:string, password:string) {
      await this.emailInput.type(email);
      await this.passwordInput.type(password);
      await this.submitBtn.click();
   }

  async getErrorMessage() {
    await this.page.waitForSelector('#ctl00_CPHContainer_lblOutput');
    this.errorMessage = this.page.locator('#ctl00_CPHContainer_lblOutput')
    return this.errorMessage.innerText()
  }

 async clickFogotPassword() {
    await this.fogotPassword.click();
 }

 async clickSignUp() {
    await this.signUpLink.nth(1).click();
 }
}