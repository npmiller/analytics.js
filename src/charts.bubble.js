analytics.charts.bubble = (function () {
  var bubbleChart = function (selector, dimensions) {

    var _chart = analytics.charts.chart(selector, dimensions);

    _chart.type = function() {
      return "bubble";
    };

    _chart._createDcElement = function () {
      _chart._element = dc.bubbleChart(_chart.selector()+" .chart-container");
    };

    _chart._initChartSpecific = function () {

      var format = d3.format('.3s');

      _chart.element()
        .colorCalculator(function (d) {
          var measureId = analytics.state.measure().id();
          return d.value[measureId] ? _chart.element().colors()(d.value[measureId]) : '#ccc';
        })

        .margins({top: 0, right: 0, bottom: 30, left: 45})

        .elasticY(true)
        .elasticX(true)

        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)

        .maxBubbleRelativeSize(0.075);

      _chart.element().yAxis().tickFormat(function (s) { return format(s); });
      _chart.element().xAxis().tickFormat(function (s) { return format(s); });
    };

    _chart._updateChartSpecific = function () {

      var extraMeasures = _chart.extraMeasures(); // [x, y]
      var measures = [extraMeasures[0], extraMeasures[1], analytics.state.measure()]; // [x, y, r]
      var dimension = _chart.dimensions()[0];
      var metadata  = dimension.getLastSlice();
      var cfGroup = dimension.crossfilterGroup(extraMeasures);
      var format = d3.format(".3s");

      _chart.element()
        .keyAccessor(function (p)         { return p.value[measures[0].id()]; })
        .valueAccessor(function (p)       { return p.value[measures[1].id()]; })
        .radiusValueAccessor(function (p) { return p.value[measures[2].id()]; })

        .x(d3.scale.linear().domain(_chart._niceDomain(cfGroup, measures[0].id())))
        .y(d3.scale.linear().domain(_chart._niceDomain(cfGroup, measures[1].id())))
        .r(d3.scale.linear().domain(_chart._niceDomain(cfGroup, measures[2].id())))

        .xAxisLabel(measures[0].caption())
        .yAxisLabel(measures[1].caption())

        .xAxisPadding(_chart._niceDomain(cfGroup, measures[0].id())[0]*0.1)
        .yAxisPadding(_chart._niceDomain(cfGroup, measures[1].id())[0]*0.1)

        .minRadiusWithLabel(14)

        .title(function (d) {
          var key = d.key ? d.key : d.data.key;
          if (metadata[key] === undefined) return (d.value ? format(d.value) : '');
          var out = dimension.caption() + ': ' + (metadata[key] ? metadata[key].caption : '') + "\n" +
                    measures[0].caption() + ": " + (d.value[measures[0].id()] ? format(d.value[measures[0].id()]) : 0) + "\n";
          if (!measures[1].equals(measures[0]))
            out +=  measures[1].caption() + ": " + (d.value[measures[1].id()] ? format(d.value[measures[1].id()]) : 0) + "\n";
          if (!measures[2].equals(measures[0]) && !measures[2].equals(measures[1]))
            out +=  measures[2].caption() + ": " + (d.value[measures[2].id()] ? format(d.value[measures[2].id()]) : 0) + "\n";
          return out;
        });
    };

    return _chart;
  };

  bubbleChart.options = {
    labels : true,
    height : 500
  };

  bubbleChart.params = {
    nbExtraMeasuresMin  : 2,
    nbExtraMeasuresMax  : 2
  };

  return analytics.charts.chart.extend(bubbleChart);
})();