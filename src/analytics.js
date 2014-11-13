/**
## `analytics` namespace

### analytics.csts

`analytics.csts` is a deep map containing various constants used by _analytics.js_. It contains mostly CSS selectors and texts (for internationalization).

The structure is as follows:

```js
analytics.csts = {
  resizeDelay : 350,
  css : { .. }, // CSS selectors
  txts : {
    charts : { // name of the charts
      chartId : 'Chart name',
      ...
    },
    factSelector : { ... } // titles used in the fact selector
  },
  tips : { // tips to show on the interface
    charts : {} // tips for the charts
  }
}
**/
var analytics = {
  version: '%VERSION%',
  csts : {
    resizeDelay : 350,
    css : {
      columnsContainer : '#columns',
      columns          : '.chart-columns',
      charts           : '.chart',
      chartsClass      : 'chart',
      factSelector     : '#fact-selector',
      reset            : '#reset',
      zoom             : 'zoom'
    },
    txts : {
      charts : {
        map : 'Choropleth map',
        bar : 'Bar chart',
        pie : 'Pie chart',
        timeline : 'Timeline',
        bubble : 'Bubble chart',
        table : 'Table',
        wordcloud : 'Word cloud chart'
      },
      factSelector : {
        cubes    : 'Cubes available:',
        measures : 'Measures available:'
      }
    }
  }
};

/**
### analytics.init(queryAPI, [state])

This function will initialize the whole component. Prior to it, you can set some constants.

For a standard user of the package, it is the only function you should call.

Parameters:
* Object `queryAPI`: an API component to query the OLAP database
* Object `state` (optional): The state of the interface, that was retrived with `analytics.state()`, to restore an analysis
**/
analytics.init = function (queryAPI, state) {
  analytics.query.queryAPI(queryAPI);
  if (state)
    analytics.state(state);

  analytics.query.queryAPI(queryAPI);
  analytics.display.init();
  analytics.state.initMeasure();
  analytics.state.initDimensions();
  analytics.data.load();
  analytics.display.initRender();
};

// import "query.js"
// import "data.js"
// import "data.cube.js"
// import "data.measure.js"
// import "data.dimension.js"
// import "data.property.js"
// import "state.js"
// import "display.js"
// import "display.factSelector.js"
// import "charts.js"
// import "charts.player.js"
// import "charts.chart.js"
// import "charts.map.js"
// import "charts.pie.js"
// import "charts.bar.js"
// import "charts.timeline.js"
// import "charts.table.js"
// import "charts.wordcloud.js"
// import "charts.wordcloudWithLegend.js"
// import "charts.bubble.js"
