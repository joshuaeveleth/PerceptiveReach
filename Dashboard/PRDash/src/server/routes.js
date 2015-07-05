/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/scoreSummaryByVISN', require('./api/scoreSummaryByVISN'));
  app.use('/api/facilitiesStateCount', require('./api/facilitiesStateCount'));
  app.use('/api/veteranDetails', require('./api/veteranDetails'));
  app.use('/api/veteransByVAMC', require('./api/veteransByVAMC'));
  app.use('/api/scoreSummaryByVAMC', require('./api/scoreSummaryByVAMC'));
  app.use('/api/facilitiesByState', require('./api/facilitiesByState'));
  app.use('/api/totalRiskByVAMC', require('./api/totalRiskByVAMC'));
  app.use('/api/totalRiskByVAMCPieChart', require('./api/totalRiskByVAMCPieChart'));
  app.use('/api/totalRiskByState', require('./api/totalRiskByState'));
  app.use('/api/userLogin', require('./api/userLogin'));
  app.use('/api/getRiskFactors', require('./api/getRiskFactors'));
  app.use('/api/getRiskFactorGuidelines', require('./api/getRiskFactorGuidelines'));

  app.use('/auth', require('./auth'));
  app.use('/api/user', require('./api/user'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets|dist)/*')
   .get(errors[404]);

  console.log('Express config.root %d, appPath %s', url, app.get('appPath'));


  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};