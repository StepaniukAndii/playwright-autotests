import { expect, test, request } from '@playwright/test';

test('api test post',async ({ request }) => {
    const newIssue = await request.post('https://reqres.in/api/users', {
      data: {
          "name": "morpheus",
          "job": "leader"
      }
    } );
  
    expect(newIssue.status()).toEqual(201);
  })

  test('api test get',async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2');
  
    const json = JSON.parse((await response.body()).toString());

    expect(response.status()).toEqual(200);
    expect(json.page).toEqual(2);
  })
  
  test('api test get by id',async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2');
    const json = JSON.parse((await response.body()).toString());

    expect(response.status()).toEqual(200);
    expect(json.data.id).toEqual(2);
  })

  test('api test get fail',async ({ request }) => {
    const newIssue = await request.get('https://reqres.in/api/users/23');
  
    expect(newIssue.status()).toEqual(404);
  })

  test('api test get fail unknown',async ({ request }) => {
    const newIssue = await request.get('https://reqres.in/api/users/unknown/23');
  
    expect(newIssue.status()).toEqual(404);
  })

  test('api test delete',async ({ request }) => {
    const newIssue = await request.delete('https://reqres.in/api/users/2');
  
    expect(newIssue.status()).toEqual(204);
  })

  test('api test register',async ({ request }) => {
    const newIssue = await request.post('https://reqres.in/api/register', {
      data:
      {
        "email": "eve.holt@reqres.in",
        "password": "pistol"
      }
    });

    const json = JSON.parse((await newIssue.body()).toString());
  
    expect(json.token).toEqual('QpwL5tke4Pnpja7X4');
  })

  test('api test register fail',async ({ request }) => {
    const newIssue = await request.post('https://reqres.in/api/register', {
      data:
      {
        "email": "eve.holt@reqres.in"
      }
    });

    const json = JSON.parse((await newIssue.body()).toString());
  
    expect(json.error).toEqual('Missing password');
  })

  test('api test login',async ({ request }) => {
    const newIssue = await request.post('https://reqres.in/api/login', {
      data:
      {
        "email": "eve.holt@reqres.in",
        "password": "cityslicka"
    }
    });

    const json = JSON.parse((await newIssue.body()).toString());
  
    expect(json.token).toEqual('QpwL5tke4Pnpja7X4');
  })

  test('api test login fail',async ({ request }) => {
    const newIssue = await request.post('https://reqres.in/api/login', {
      data:
      {
        "email": "eve.holt@reqres.in"
      }
    });

    const json = JSON.parse((await newIssue.body()).toString());
  
    expect(json.error).toEqual('Missing password');
  })