/*
 * Copyright (c) 2015 Perceptive Reach License ALL Rights Reserved.
 *
 * Not sure what license goes here yet.
 */

'use strict';

angular.module('ui.models')
  .factory('CommonDataModel', function (WidgetDataModel) {
    function CommonDataModel() {}

    CommonDataModel.prototype = Object.create(WidgetDataModel.prototype);

    CommonDataModel.prototype.setup = function (widget, scope) {
      WidgetDataModel.prototype.setup.call(this, widget, scope);

      this.dataModelOptions = this.dataModelOptions || {};
      this.dataModelOptions.common = this.dataModelOptions.common  ||  { data: 'default value' };
     
      scope.$on('commonDataChanged', function (event, data) {
        //console.log('Common data changed for: ' + this.widgetScope.widget.title);
        this.setCommon(data);
      }.bind(this));
    };

    CommonDataModel.prototype.setCommon = function (data) {
      if (data && (!angular.equals(this.dataModelOptions.common, data))) {
        //console.log(this.widgetScope.widget.title + ' data model options changed');
        this.dataModelOptions.common = data;
        //this.widgetScope.$emit('widgetChanged', this.widgetScope.widget);
      }
    };

    return CommonDataModel;
  })
  .factory('PatientDataModel', function ($http, CommonDataModel) {
    function PatientDataModel() {
    }

    //PatientDataModel.prototype = Object.create(WidgetDataModel.prototype);
    //PatientDataModel.prototype.constructor = WidgetDataModel;
    PatientDataModel.prototype = Object.create(CommonDataModel.prototype);
    angular.extend(PatientDataModel.prototype, {
      init: function () {
        var dataModelOptions = this.dataModelOptions;
        var currentsta3N = null;
        //console.log("currentDataModelCommon:");
        //console.log(dataModelOptions.common);
        this.widgetScope.$on('commonDataChanged', function (event, data) {
          //console.log('Inside Common data changed for : ' + this.widgetScope.widget.title);
          /*console.log(data);
          console.log(this.dataModelOptions);*/
          //CommonDataModel.prototype.setCommon.call(this,data);
          this.currentsta3N = this.sta3N;
          this.sta3N = (dataModelOptions && dataModelOptions.common.data.facilitySelected) ? dataModelOptions.common.data.facilitySelected : 9;
          /*console.log('widgetScope');
          console.log(this.widgetScope);
          console.log('commonData:');
          console.log(this.dataModelOptions.common);*/
          if(this.sta3N != this.currentsta3N)
            this.getData();
        }.bind(this));
        this.sta3N = (dataModelOptions && dataModelOptions.common.data.facilitySelected) ? dataModelOptions.common.data.facilitySelected : 9;
        //this.updateScope([]);
        //this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];
        var outreachStatus = null;

        $http.get('/api/getListOfOutreachStatus')
        .success(function(listOfOutreachStatus) {
          outreachStatus = listOfOutreachStatus;
        }.bind(this));

        $http.get('/api/patient?id=' + this.sta3N)
        .success(function(patientsBysta3N) {
          var output = [];
          var sta3N = "";
          
          while(outreachStatus == null){} // wait until outreachStatus is not null

          //console.log("outreachStatus -  ");
          //console.log(outreachStatus);  
          for (var veteran in patientsBysta3N) {
              sta3N = patientsBysta3N[0].sta3N
              var record = [];
              var fullName = patientsBysta3N[veteran].LastName + ", " +patientsBysta3N[veteran].FirstName + " " + patientsBysta3N[veteran].MiddleName; 
             /* record.push(String(fullName));
              record.push(String(veteransByVAMC[veteran].SSN));
              record.push(String(veteransByVAMC[veteran].Phone));
              record.push(String(veteransByVAMC[veteran].DateIdentifiedRisk));
              record.push(String(veteransByVAMC[veteran].RiskLevel)); */
              //record.push(String(veteransByVAMC[veteran].OutreachStatus));
              patientsBysta3N[veteran].Name = fullName;
              var options = "";
              var temp = "";
              var selected = " selected='selected'";
              for(var outreachStat in outreachStatus){
                if(patientsBysta3N[veteran].OutreachStatus == outreachStatus[outreachStat].OutReachStatusID)
                  temp = "<option value=" + outreachStatus[outreachStat].OutReachStatusID + selected + ">" + outreachStatus[outreachStat].StatusName + "</option>";
                else
                  temp = "<option value=" + outreachStatus[outreachStat].OutReachStatusID + ">" + outreachStatus[outreachStat].StatusName + "</option>";
                options += temp;
              }
              var select = "<select class='form-control' style='width: 180px;' id='vet_" + patientsBysta3N[veteran].ReachID + "'><option value=''></option>"+ options+ "</select>";
              //record.push(String(select));
              patientsBysta3N[veteran].OutreachStatusSelect = select;                
              //output.push(veteransByVAMC);
          }
          //output.sort(function(a,b) {return (a.RiskLevel > b.RiskLevel) ? 1 : ((b.RiskLevel > a.RiskLevel) ? -1 : 0);} );
          var columnHeaders = [];
          //data = [this.vamc, output, outreachStatus];//{vamc : this.vamc, roster : output};
          data = [this.sta3N, patientsBysta3N, outreachStatus];
          //console.log(data);
          this.updateScope(data);
        }.bind(this));
      },

      saveOutreachData: function (outreachStatus, veteranID) {
        $http.put('/api/veteranRoster?vetReachID=' + veteranID, {'outreachStatus': outreachStatus})
        .success(function(data) {
          //alert(data);
        });  
      },
      updatesta3N: function (sta3N) {
        this.dataModelOptions = this.dataModelOptions ? this.dataModelOptions : {};
        this.dataModelOptions.sta3N = sta3N;
        this.sta3N = sta3N;
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
        //$http.cancel(this.intervalPromise);
      }
    });

    return PatientDataModel;
  })
  .factory('ClinicalDecisionSupportDataModel', function ($http, CommonDataModel) {
    function ClinicalDecisionSupportDataModel() {
    }

    /*ClinicalDecisionSupportDataModel.prototype = Object.create(WidgetDataModel.prototype);
    ClinicalDecisionSupportDataModel.prototype.constructor = WidgetDataModel;*/
    ClinicalDecisionSupportDataModel.prototype = Object.create(CommonDataModel.prototype);
    angular.extend(ClinicalDecisionSupportDataModel.prototype, {
      init: function () {
        var dataModelOptions = this.dataModelOptions;
        var currentRiskLevel = null;
        this.widgetScope.$on('commonDataChanged', function (event, data) {
          //console.log('Inside Common data changed for : ' + this.widgetScope.widget.title);
          /*console.log(data);
          console.log(this.dataModelOptions);*/
          //CommonDataModel.prototype.setCommon.call(this,data);
          this.currentRiskLevel = this.riskLevel;
          this.riskLevel = (dataModelOptions && dataModelOptions.common.data.veteranObj.RiskLevelID) ? dataModelOptions.common.data.veteranObj.RiskLevelID : null;
          this.guidelineType = (dataModelOptions && dataModelOptions.guidelineType) ? dataModelOptions.guidelineType : null;
          /*console.log('widgetScope');
          console.log(this.widgetScope);
          console.log('commonData:');
          console.log(this.dataModelOptions.common);*/
          if(this.riskLevel != this.currentRiskLevel)
            this.getData();
        }.bind(this));
        

        this.updateScope([]);
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];
        var options = "";

        if(this.riskLevel && this.guidelineType)
          options += '?guideType=' + this.guidelineType + '&riskLevel=' + this.riskLevel;
        else if(this.riskLevel || this.guidelineType)
          options += (this.riskLevel) ? '?riskLevel=' + this.riskLevel : '?guideType=' + this.guidelineType;
        
        $http.get('/api/clinicalDecisionSupport' + options) // '/api/clinicalDecisionSupport?guideType=%27SRB%27&riskLevel=1'
        .success(function(dataset) {
          //console.log('inside Clinical decision support success');
          //console.log(dataset);
          data = dataset;
          this.updateScope(data);
        }.bind(this));
      },

      updateRiskLevel: function (riskLevel) {
        this.dataModelOptions = this.dataModelOptions ? this.dataModelOptions : {};
        this.dataModelOptions.riskLevel = riskLevel;
        this.riskLevel = riskLevel;
      },

      updateGuidelineType: function (guidelineType) {
        this.dataModelOptions = this.dataModelOptions ? this.dataModelOptions : {};
        this.dataModelOptions.guidelineType = guidelineType;
        this.guidelineType = guidelineType;
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return ClinicalDecisionSupportDataModel;
  })      
  .factory('TotalRisksDataModel', function ($http, WidgetDataModel) {
    function TotalRisksDataModel() {
    }

    TotalRisksDataModel.prototype = Object.create(WidgetDataModel.prototype);
    TotalRisksDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(TotalRisksDataModel.prototype, {
      init: function () {
        var dataModelOptions = this.dataModelOptions;
        this.vamc = (dataModelOptions && dataModelOptions.vamc) ? dataModelOptions.vamc : 9;

        this.updateScope([]);
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        $http.get('/api/totalRiskByVAMCPieChart?id='+ this.vamc)
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      updateVAMC: function (vamc) {
        this.dataModelOptions = this.dataModelOptions ? this.dataModelOptions : {};
        this.dataModelOptions.vamc = vamc;
        this.vamc = vamc;
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
      }
    });

    return TotalRisksDataModel;
  })
.factory('ContactBaseDataModel', function ($http, CommonDataModel) {
    function ContactBaseDataModel() {
    }

    ContactBaseDataModel.prototype = Object.create(CommonDataModel.prototype);
    ContactBaseDataModel.prototype.constructor = CommonDataModel;

    angular.extend(ContactBaseDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        //this.vamc = (dataModelOptions && dataModelOptions.vamc) ? dataModelOptions.vamc : 9;

        var currentReachID = (dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;

        this.widgetScope.$on('commonDataChanged', function (event, data) {
          this.currentReachID = this.reachID;
          this.reachID = (dataModelOptions && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;
          if(this.reachID != this.currentReachID)
            this.getData();
        }.bind(this));

        this.updateScope('-');
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        if(!this.reachID) {
          this.updateScope(data);
        }
        else {
          $http.get('/api/patientContactData?id='+ this.reachID)
          .success(function(dataset) {
                  data = dataset;
                  this.updateScope(data);
              }.bind(this));
        }
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return ContactBaseDataModel;
  })
.factory('EmergencyContactDataModel', function ($http, CommonDataModel) {
    function EmergencyContactDataModel() {
    }

    EmergencyContactDataModel.prototype = Object.create(CommonDataModel.prototype);
    EmergencyContactDataModel.prototype.constructor = CommonDataModel;

    angular.extend(EmergencyContactDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        //this.reachID = (dataModelOptions && dataModelOptions.reachID) ? dataModelOptions.reachID : 12;

        var currentReachID = (dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;

        this.widgetScope.$on('commonDataChanged', function (event, data) {
          this.currentReachID = this.reachID;
          this.reachID = (dataModelOptions && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;
          if(this.reachID != this.currentReachID)
            this.getData();
        }.bind(this));

        this.updateScope('-');
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        if(!this.reachID) {
          this.updateScope(data);
        }
        else {
          $http.get('/api/emergencyContact?id='+ this.reachID)
                .success(function(dataset) {
                        data = dataset;
                        this.updateScope(data);
                    }.bind(this));
        }
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return EmergencyContactDataModel;
  })
.factory('PatientFlagDataModel', function ($http, WidgetDataModel) {
    function PatientFlagDataModel() {
    }

    PatientFlagDataModel.prototype = Object.create(WidgetDataModel.prototype);
    PatientFlagDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(PatientFlagDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        this.reachID = (dataModelOptions && dataModelOptions.reachID) ? dataModelOptions.reachID : 12;

        this.updateScope('-');
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        $http.get('/api/patientFlagData')
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
      }
    });

    return PatientFlagDataModel;
  })
.factory('MedicationDataModel', function ($http, WidgetDataModel) {
    function MedicationDataModel() {
    }

    MedicationDataModel.prototype = Object.create(WidgetDataModel.prototype);
    MedicationDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(MedicationDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        this.reachID = (dataModelOptions && dataModelOptions.reachID) ? dataModelOptions.reachID : 12;

        this.updateScope('-');
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        $http.get('/api/medicationData')
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
      }
    });

    return MedicationDataModel;
  })
.factory('AppointmentDataModel', function ($http, CommonDataModel) {
    function AppointmentDataModel() {
    }

    AppointmentDataModel.prototype = Object.create(CommonDataModel.prototype);
    AppointmentDataModel.prototype.constructor = CommonDataModel;

    angular.extend(AppointmentDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        //this.reachID = (dataModelOptions && dataModelOptions.reachID) ? dataModelOptions.reachID : 12;
        var currentReachID = (dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;

        this.widgetScope.$on('commonDataChanged', function (event, data) {
          this.currentReachID = this.reachID;
          this.reachID = (dataModelOptions && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;
          if(this.reachID != this.currentReachID)
            this.getData();
        }.bind(this));

        this.updateScope('-');
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        $http.get('/api/appointmentData?id='+ this.reachID)
        .success(function(dataset) {
                data = dataset; 
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return AppointmentDataModel;
  })
.factory('DiagnosesDataModel', function ($http, CommonDataModel) {
    function DiagnosesDataModel() {
    }

    DiagnosesDataModel.prototype = Object.create(CommonDataModel.prototype);
    DiagnosesDataModel.prototype.constructor = CommonDataModel;

    angular.extend(DiagnosesDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        //this.reachID = (dataModelOptions && dataModelOptions.reachID) ? dataModelOptions.reachID : 12;
        var currentReachID = (dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;

        this.widgetScope.$on('commonDataChanged', function (event, data) {
          this.currentReachID = this.reachID;
          this.reachID = (dataModelOptions && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;
          if(this.reachID != this.currentReachID)
            this.getData();
        }.bind(this));
        
        this.updateScope('-');
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        $http.get('/api/DiagnosesData?id='+ this.reachID)
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return DiagnosesDataModel;
  });