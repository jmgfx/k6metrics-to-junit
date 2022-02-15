function generateXMLFromMetrics(data) {
  var junitMetric = [];

  for (var metric in data.metrics) {
    if (data.metrics[metric]['values']['p(90)']) {
      junitMetric.push(
        '<testcase classname="K6TestMetrics" name="' + metric + ' P(90)' + '" time="' + data.metrics[metric]['values']['p(90)']/1000 + '"/>'
      )
    }
  }

  return '<?xml version="1.0"?><testsuites><testsuite name="'
      + 'k6 Metrics' + '">\n'
      + junitMetric.join('\n')
      + '\n</testsuite></testsuites>';
}

exports.MetricsToJunit = generateXMLFromMetrics
