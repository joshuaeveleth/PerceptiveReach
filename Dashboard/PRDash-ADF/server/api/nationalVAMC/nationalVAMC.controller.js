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

    var query = "SELECT v.VAMC_Name as VAMCName, v.StateAbbr as StateID, v.VISN as VISN, COUNT(v.VAMC_Name) as Total"; 
		query += " FROM dbo.Patient p JOIN dbo.PatientStation ps ON p.ReachID = ps.ReachID JOIN dbo.Ref_VAMC v ON ps.STA3N = v.STA3N";
		query += " WHERE p.RiskLevel IS NOT NULL GROUP BY v.VAMC_Name, v.StateAbbr, v.VISN ORDER BY Total desc";

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