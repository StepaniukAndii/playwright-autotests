import { Locator, Page } from "@playwright/test";

export class RegistrationPage {
    readonly page:Page
    readonly submit:Locator
    readonly name:Locator
    readonly email:Locator
    readonly loginId:Locator
    readonly password:Locator
    readonly reEnterPass:Locator
    readonly wordVerefication:Locator


    constructor(page:Page) {
        this.page = page;
        this.submit = page.locator('[name="ctl00$CPHContainer$btnRegistration"]');
        this.name = page.locator('#ctl00_CPHContainer_txtFname');
        this.email = page.locator('#ctl00_CPHContainer_txtEmail');
        this.loginId = page.locator('#ctl00_CPHContainer_txtUserLogin1')
        this.password = page.locator('#ctl00_CPHContainer_txtpassword')
        this.reEnterPass = page.locator('#ctl00_CPHContainer_txtReType')
        this.wordVerefication = page.locator('#ctl00_CPHContainer_txtVarificationCode')
    }

    async visit() {
       await this.page.goto('http://www.testyou.in/SignUp.aspx');
    }

   async registration(name:string, email:string, loginId:string, password:string,
    reEnterPass:string, wordVerefication:string) {
        await this.name.type(name)
        await  this.email.type(email)
        await  this.loginId.type(loginId)
        await this.password.type(password)
        await  this.reEnterPass.type(reEnterPass)
        await this.wordVerefication.type(wordVerefication)
        await  this.clickSubmit();
   }

  async getErrorMessages() {
    await this.page.waitForSelector('#ctl00_CPHContainer_valsAll > ul > li');
    return this.page.$$('#ctl00_CPHContainer_valsAll > ul > li');
  }

 async clickSubmit() {
    await this.submit.click();
 }

async getErrorVerfWord() {
    await this.page.waitForSelector('#ctl00_CPHContainer_lblResult')
    return this.page.locator('#ctl00_CPHContainer_lblResult').innerText()
}
}