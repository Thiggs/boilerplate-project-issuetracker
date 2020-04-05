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
  issue_text: { type: String, required: true },
  created_on: Date,
  updated_on: Date,
  created_by: { type: String, required: true },
  assigned_to: String,
  open: { type: Boolean, default: true },
  status_text: String
});

var Issue = mongoose.model("Person", issueSchema);

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
    if(!project.issue_title||!project.issue_text||!project.create_by){
      return "please fill out required fields"
    }
    
    var createAndSaveIssue = function(done){
      var issue=new Issue({
  issue_title: project.issue_title,
  issue_text: project.issue_text,
  created_on: Date.now(),
  updated_on: Date.now(),
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
      var result ={
      "_id": project._id,
      "issue_title": project.issue_title,
      "issue_text": project.issue_text,
      "created_on": project.created_on,
      "updated_on": project.updated_on,
      "created_by": project.created_by,
      "assigned_to": project.assigned_to,
      "open": project.open,
      "status_text": project.status_text}
      res.json(result);
    })
    
    .put(function (req, res){
      var project = req.params.project;
      if(!project){res.send('no updated field sent')}
      Issue.findOneAndUpdate({_id: project._id}, {new: true}, function(err, data){
      if(err){res.send('could not update '+project._id)}
      if(project.issue_title){
        data.issue_title=project.issue_title;
      }
      if(project.issue_text){
        data.issue_text=project.issue_text
      }
      if(project.created_by){
        data.created_by=project.created_by;
      }
      if(project.assigned_to){
        data.assigned_to=project.assigned_to;
      }
      if(project.open){
        data.open=project.open;
      }
      if(project.status_text){
        data.status_text=project.status_text;
      }
      data.update_date=Date.now();
      data.save();
      res.send('successfully updated')
    });
    })
    
    .delete(function (req, res){
      var project = req.params.project;
    Issue.findByIdAndRemove({_id: project._id}, function(err, data){ 
      if (!data){res.send('id error')}
      if(err) res.send("could not delete "+project._id);
       res.send(null, 'deleted '+data._id);
    });
    });
    
};
