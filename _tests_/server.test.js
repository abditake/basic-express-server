'use strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);


describe('Server Tests', ()=> {
  describe('Error Handler Test', ()=>{
    test('404 on a bad route', async ()=>{
      let response = await mockRequest.get('/foo');
      expect(response.status).toEqual(404);
      expect(response.text).toEqual('Not Found');
    });
    test('404 on a bad method', async ()=>{
      let response = await mockRequest.put('/person');
      expect(response.status).toEqual(404);
      expect(response.text).toEqual('Not Found');
    });
    test('500 if name is not included on person route', async ()=>{
      let response = await mockRequest.get(`/person`);
      expect(response.status).toEqual(500);
      expect(response.text).toEqual('Please enter a name query parameter like this:  /person?name=Ryan');
    });
  });
  describe('Get Routes Tests',()=>{
    test('/person route works wit query params', async () =>{
      let response = await mockRequest.get(`/person?name=abdi`);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({'name': 'abdi'});
    });

  });
});





