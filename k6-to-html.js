function generateHTMLFromData(data, options) {
  const css = 'body{font-family:sans-serif}table tr *{padding:.15em;border:1px solid #000}';
  var name = options && options.name ? options.name : 'k6 results';
  var trendMetricsTable = [];
  var counterMetricsTable = [];
  var checksTable = [];
  var checksPass = 0;
  var checksFail = 0;
  var thresholdsTable = [];

  const vus = data.metrics['vus']['values']['value'];
  const iterations = data.metrics['iterations']['values']['count'];

  for (var metric in data.metrics) {
    if (data.metrics[metric]['type'] == 'trend' && data.metrics[metric]['contains'] == 'time') {
      var min = data.metrics[metric]['values']['min'];
      var max = data.metrics[metric]['values']['max'];
      var avg = data.metrics[metric]['values']['avg'];
      var p90 = data.metrics[metric]['values']['p(90)'];
      var p95 = data.metrics[metric]['values']['p(95)'];

      trendMetricsTable.push(
        '<tr><td>' + metric + '</td><td>' + min + '</td><td>' + max + '</td><td>' + avg + '</td><td>' + p90 + '</td><td>' + p95 + '</td></tr>'
      )
    }

    if (data.metrics[metric]['type'] == 'counter') {
      var count = data.metrics[metric]['values']['count'];
      var rate = data.metrics[metric]['values']['rate'];

      counterMetricsTable.push(
        '<tr><td>' + metric + '</td><td>' + count + '</td><td>' + rate + '</td></tr>'
      )
    }

    if (data.metrics[metric]['thresholds']) {
      for (var threshold in data.metrics[metric]['thresholds']) {
        if (data.metrics[metric]['thresholds'][threshold].ok == true) {
          thresholdsTable.push(
            '<tr><td>' + metric + '</td><td>' + threshold + '</td><td>' + 'Pass' + '</td></tr>'
          )
        } else {
          thresholdsTable.push(
            '<tr><td>' + metric + '</td><td>' + threshold + '</td><td>' + 'Fail' + '</td></tr>'
          )
        }
      }
    }
  }

  for (var check in data.root_group.checks) {
    checksPass += data.root_group.checks[check]['passes'];
    checksFail += data.root_group.checks[check]['fails'];

    checksTable.push(
      '<tr><td>' + data.root_group.checks[check]['name'] + '</td><td>' + data.root_group.checks[check]['passes'] + '</td><td>' + data.root_group.checks[check]['fails'] + '</td></tr>'
    )
  }

  return '<html><head><title>' + name + '</title><style>' + css + '</style></head>'
    + '<body>'
    + '<h1>' + name + '</h1>'
    + '<h2>Test Details</h2>'
    + '<table><tr><th>Vusers</th><th>Iterations</th></tr>'
    + '<tr><td>' + vus + '</td><td>' + iterations + '</td></tr></table>'
    + '</table>'
    + '<h2>Trend Metrics (ms)</h2>'
    + '<table><tr><th>Name</th><th>Min</th><th>Max</th><th>Avg</th><th>P(90)</th><th>P(95)</th></tr>'
    + trendMetricsTable.join('\n')
    + '</table>'
    + '<h2>Counter Metrics</h2>'
    + '<table><tr><th>Name</th><th>Count</th><th>Rate</th></tr>'
    + counterMetricsTable.join('\n')
    + '</table>'
    + '<h2>Checks</h2>'
    + '<table><tr><th>Passes</th><th>Fails</th></tr>'
    + '<tr><td>' + checksPass + '</td><td>' + checksFail + '</td></tr></table>'
    + '<table><tr><th>Name</th><th>Passes</th><th>Fails</th></tr>'
    + checksTable.join('\n')
    + '</table>'
    + '<h2>Thresholds</h2>'
    + '<table><tr><th>Name</th><th>Threshold</th><th>Status</th></tr>'
    + thresholdsTable.join('\n')
    + '</table>'
    + '</body></html>'
}

exports.GenerateHTML = generateHTMLFromData
