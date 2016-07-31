(function() {
  'use strict';

  angular
    .module('angularProject')
  /** @ngInject */

    .controller('CrapsController', function($http, $scope, $user, $cookies, $compile, soccerTeams) {
      var vm = this;
      var api = getData.getStockQuote($scope.ticker_name);
	    var data = api.get({symbol:$scope.ticker_name}, function() {
	        var quote = data.query.results.quote;
	        $scope.lang = data.query.lang;
	        $scope.lastTradeDate = quote.LastTradeDate;
	        $scope.lastTradeTime = quote.LastTradeTime;
	        $scope.lastTradePriceOnly = quote.LastTradePriceOnly;
	    });

	    //http://stackoverflow.com/questions/17245498/get-stock-quotes-from-yahoo-finance-in-json-format-using-a-javascript

      getWeatherDemo();
      /*$http({
	      method: 'GET',
	      url: 'http://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json'
	    }).then(function successCallback(response) {
	      console.log(response)
	        //console.log(data);
	      }, function errorCallback(response) {
	      });*/

        /*var request = new XMLHttpRequest();
		request.open("GET", "http://finance.yahoo.com/d/quotes.csv?s=GAIL.NS+BPCL.NS+%5ENSEI&f=snl1hgp", true);
		request.onreadystatechange = function() {//Call a function when the state changes.
		    if (request.readyState == 4) {
		        if (request.status == 200 || request.status == 0) {
		            console.log(request.responseText);
		        }
		    }
		}
		jQuery.support.cors = true;
    	var Result = $.getJSON("http://weather.yahooapis.com/forecastjson?w=9807", "",
        function (data)
        {
            $("body").append("Sunrise: " + data.astronomy.sunrise + "<br />");
            $("body").append("SuntSet: " + data.astronomy.sunset + "<br />");
        });
		request.send();*/

		$scope.getData = function() {
		    var url = 'http://query.yahooapis.com/v1/public/yql';
		    var symbol = $("#symbol").val();
		    var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");

		    $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
	        .done(function (data) {
	            $('#result').text("Price: " + data.query.results.quote.LastTradePriceOnly);
	        })
	        .fail(function (jqxhr, textStatus, error) {
	            var err = textStatus + ", " + error;
	            console.log('Request failed: ' + err);
	        });
		}

		function getWeatherDemo() {
	    $.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast ' +
	          'where woeid in (select woeid from geo.places(1) where text="London")&format=json', function (data) {
		        console.log(data);
		        alert("The temperatute in London is " +
		            data.query.results.channel.item.condition.temp +
		            data.query.results.channel.units.temperature
		        );
		    });
		}
    })

	/*.service('getData', ['$http', '$resource', function($http, $resource) {
	    // This service method is not used in this example.
	    this.getJSON = function(filename) {
	        return $http.get(filename);
	    };
	    // The complete url is from https://developer.yahoo.com/yql/.
	    this.getStockQuote = function(ticker) {
	        var url = 'http://query.yahooapis.com/v1/public/yql';
	        var data = encodeURIComponent(
	            "select * from yahoo.finance.quotes where symbol in ('" + ticker + "')");
	        url += '?q=' + data + '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
	        return $resource(url);
	    }
	}]);*/
})();
