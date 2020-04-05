/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

var Schema = mongoose.Schema;

var issueSchema = new Schema({
  issue_title: { type: String, required: true },
  issue_text: String,
  created_on: Date,
  updated_on: Date,
  created_by: String,
  assigned_to: String,
  open: Boolean,
  status_text: String
});

var Issue = mongoose.model("Person", issueSchema);

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
    var createAndSaveIssue = function(done){
      var issue=new Issue({
  issue_title: project.issue_title,
  issue_text: project.issue_text,
  created_on: project.created_on,
  updated_on: project.updated_on,
  created_by: project.created_by,
  assigned_to: project.assigned_to,
  open: project.open,
  status_text: project.status_text
    })
    issue.save(function(err, data) {
    if(err) return done(err);
    done(null,data);
  });
    }})

    
    .post(function (req, res){
      var project = req.params.project;
      
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
