import { expect, test } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';

let loginPage:LoginPage


test.beforeEach(async ({page}) => {
  loginPage = new LoginPage(page);
  await loginPage.visit();
})

test('login', async ({ }) => {
    await loginPage.login('andrej@gmail.com', '12345');

    expect(await loginPage.getErrorMessage()).toEqual('Userid or Password did Not Match !!')
})

test('login with email', async ({ }) => {
  await loginPage.login('andrej@gmail.com', '');

  expect(await loginPage.getErrorMessage()).toEqual('Userid or Password did Not Match !!')
})

test('login with passsowrd', async ({ }) => {
  await loginPage.login('', '12345');

  expect(await loginPage.getErrorMessage()).toEqual('Userid or Password did Not Match !!')
})

test('check fogot password link', async ({ page }) => {
  await loginPage.clickFogotPassword();

  expect(page.url()).toEqual('http://www.testyou.in/ForgetPassword.aspx')
})

test('check sign up link', async ({ page }) => {
  await loginPage.clickSignUp();

  expect(page.url()).toEqual('http://www.testyou.in/SignUp.aspx')
})