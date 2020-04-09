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
  assigned_to: { type: String, default: "" },
  open: { type: Boolean, default: true },
  status_text: { type: String, default: "open"}
});

var Issue = mongoose.model("Issue", issueSchema);

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
     var query = req.query
     var collection = 
    Issue.find(query, function(err, data){ 
      if (!data){res.send('id error')}
      if(err) res.send("no data found that matches params");
       res.send(data);
    });
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
      if(!req.body||!(req.body.issue_title||req.body.issue_text||req.body.created_by||req.body.assigned_to||req.body.open||req.body.status_text)){
        res.send('no updated field sent')}
    else{
      Issue.findOneAndUpdate({_id: req.body._id}, {new: true}, function(err, data){
      if(err){res.send('could not update '+req.body._id)}
      if(req.body.issue_title){
        data.issue_title=req.body.issue_title;
      }
      if(req.body.issue_text){
        data.issue_text=req.body.issue_text
      }
      if(req.body.created_by){
        data.created_by=req.body.created_by;
      }
      if(req.body.assigned_to){
        data.assigned_to=req.body.assigned_to;
      }
      if(req.body.open){
        data.open=req.body.open;
      }
      if(req.body.status_text){
        data.status_text=req.body.status_text;
      }
      data.update_date=Date.now();
      data.save();
      res.send('successfully updated')
    });
    }
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      if (!req.query._id){res.send('_id error')}
    else{Issue.findByIdAndRemove({_id: req.query._id}, function(err, data){ 
      if(err) res.send("could not delete "+req.query._id);
       else res.send('deleted '+req.query._id);
    });
    }
    });
    
};
