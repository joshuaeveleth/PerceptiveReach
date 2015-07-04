/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sql = require('mssql');
var dataFormatter = require('../../components/formatUtil/formatUtil.service.js');

exports.index = function(req, res) {
  res.header("content-type: application/json");

  var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;

        var query = "SELECT CASE";
		query += " WHEN DOB < DATEADD(year, -18, getdate()) AND DOB >= DATEADD(year, -29, getdate()) THEN '18 - 29'";
		query += " WHEN DOB < DATEADD(year, -29, getdate()) AND DOB >= DATEADD(year, -44, getdate()) THEN '30 - 44'";
		query += " WHEN DOB < DATEADD(year, -44, getdate()) AND DOB >= DATEADD(year, -69, getdate()) THEN '45 - 69'";
		query += " WHEN DOB < DATEADD(year, -69, getdate()) then '70+'";
		query += " END as AgeRange, d.RiskLevelDesc as RiskLevelDescription, COUNT(*) as Total";
		query += " FROM dbo.Patient p INNER JOIN Ref_RiskLevel d ON p.RiskLevel = d.RiskLevelID";
		query += " GROUP BY CASE";
		query += " WHEN DOB < DATEADD(year, -18, getdate()) AND DOB >= DATEADD(year, -29, getdate()) THEN '18 - 29'";
		query += " WHEN DOB < DATEADD(year, -29, getdate()) AND DOB >= DATEADD(year, -44, getdate()) THEN '30 - 44'";
		query += " WHEN DOB < DATEADD(year, -44, getdate()) AND DOB >= DATEADD(year, -69, getdate()) THEN '45 - 69'";
		query += " WHEN DOB < DATEADD(year, -69, getdate()) then '70+'";
		query += " END, d.RiskLevelDesc ORDER BY AgeRange";

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err || !query) { 
        //data = "Error: Database connection failed!";
        return; 
        }

        // Query
        var request = new sql.Request(connection);
        request.query(query, function(err, recordset) {
            // ... error checks
            if (err) { 
                console.log("Query failed! " + err); 
            return; 
            }

            var jsonRecordSet = JSON.parse(JSON.stringify(recordset));
            res.send(jsonRecordSet);
        });

    });
  
};