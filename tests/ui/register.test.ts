import { expect, test } from '@playwright/test';
import { RegistrationPage } from '../../page-objects/RegistrationPage';

let regPage:RegistrationPage


test.beforeEach(async ({page}) => {
  regPage = new RegistrationPage(page);
  await regPage.visit();
})

test('register validation', async ({ }) => {
    await regPage.clickSubmit();

    expect((await regPage.getErrorMessages()).length).toEqual(6)
})

test('register validation name', async ({ }) => {
    await regPage.registration('', 'andi@gmail.com', '1234842784', '12345', '12345', '123');

    expect((await regPage.getErrorMessages()).length).toEqual(1)
})

test('register validation email', async ({ }) => {
    await regPage.registration('Andrii', '', '1234842784', '12345', '12345', '123');

    expect((await regPage.getErrorMessages()).length).toEqual(1)
})

test('register validation loginId', async ({ }) => {
    await regPage.registration('Andrii', 'and@gmail.com', '', '12345', '12345', '123');

    expect((await regPage.getErrorMessages()).length).toEqual(1)
})

test('register validation Word Verification ', async ({ }) => {
    await regPage.registration('Andrii', 'andi@gmail.com', '1234842784', '12345', '12345', '123');

    expect(await regPage.getErrorVerfWord()).toEqual('Invalid Code!')
})