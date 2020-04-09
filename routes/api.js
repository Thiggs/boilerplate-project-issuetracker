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

var Issue = mongoose.model("Issue", issueSchema);

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
 
    })
    
    .post(function (req, res){
      var project = req.params.project;
       if(!req.body.issue_title||!req.body.issue_text||!req.body.created_by){
      res.send("please fill out required fields")
    }
    else{
      var issue=new Issue({
  issue_title: req.body.issue_title,
  issue_text: req.body.issue_text,
  created_on: Date.now(),
  updated_on: Date.now(),
  created_by: req.body.created_by,
  assigned_to: req.body.assigned_to,
  open: req.body.open,
  status_text: req.body.status_text
    })
  issue.save;
    res.send(issue);
  }
  })
    
    .put(function (req, res){
      var project = req.params.project;
      if(!project){res.send('no updated field sent')}
      Issue.findOneAndUpdate({_id: project._id}, {new: true}, function(err, data){
      if(err){res.send('could not update '+project._id)}
      if(req.query.issue_title){
        data.issue_title=req.query.issue_title;
      }
      if(req.query.issue_text){
        data.issue_text=req.query.issue_text
      }
      if(req.query.created_by){
        data.created_by=req.query.created_by;
      }
      if(req.query.assigned_to){
        data.assigned_to=req.query.assigned_to;
      }
      if(project.open){
        data.open=req.query.open;
      }
      if(project.status_text){
        data.status_text=req.query.status_text;
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
