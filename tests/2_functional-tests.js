/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'name',
          assigned_to: 'Chai and Mocha',
                   open: true,
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.include(res.body, {
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'name',
          assigned_to: 'Chai and Mocha',
          open: true,
          status_text: 'In QA'
        })
          done();
                }) 
        });
      
      test('Required fields filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'name'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.include(res.body, {
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'name',
        })        
          done();
                }) 
        });
      
      test('Missing required fields', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: ''
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, "please fill out required fields")        
          done();
                }) 
        });
      
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
               chai.request(server)
        .put('/api/issues/test')
        .send({
              _id : "5e8e8e89aac60f31462a2957"})
        .end(function(err, res){
          assert.equal(res.status, 200);
        assert.equal(res.text, 'no updated field sent')
                 done();
      });
      });
      
      test('One field to update', function(done) {
              chai.request(server)
        .put('/api/issues/test')
        .send({
               _id: "5e8e8e89aac60f31462a2957",
              issue_title: "New Title"})
        .end(function(err, res){
          assert.equal(res.status, 200);
        assert.equal(res.text, 'successfully updated')
                 done();
      });
      });
      
      test('Multiple fields to update', function(done) {
          chai.request(server)
        .put('/api/issues/test')
        .send({
               _id: "5e8e8e89aac60f31462a2957",
              issue_title: "New Title",
              issue_text: "New Text"})
        .end(function(err, res){
          assert.equal(res.status, 200);
        assert.equal(res.text, 'successfully updated')
                 done();
      });
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({
          issue_title: 'Title'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({
          issue_title: 'Title',
          issue_text: 'text'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
        chai.request(server)
        .delete('/api/issues/test')
        .query({})
        .end(function(err, res){
                  assert.equal(res.status, 200);
                  assert.equal(res.text, '_id error')
                  done();
      });
      });
      
      test('Valid _id', function(done) {
        chai.request(server)
        .delete('/api/issues/test?_id=5e8e8e7ae9858d30e8b7d3c2')
        .end(function(err, res){
                  assert.equal(res.status, 200);
                  assert.equal(res.text, 'deleted 5e8e8e7ae9858d30e8b7d3c2')
                  done();
      });
      });
  });
});
