function generateXMLFromMetrics(data) {
  const junitHeader = '<?xml version="1.0"?><testsuites name="' + "k6 Metrics" + '"><testsuite>\n';
  const junitFooter = '\n</testsuite></testsuites>';
  var junitMetric = [];

  for (var metric in data.metrics) {
    if (data.metrics[metric]['values']['p(90)']) {
      try {
        junitMetric.push(
          '<testcase classname="K6TestMetrics" name="' + metric + ' P(90)' + '" time="' + data.metrics[metric]['values']['p(90)']/1000 + '"/>'
        )
      } catch(err) { }
    }
  }

  const junitSelf = junitHeader + junitMetric.join('\n') + junitFooter;

  return junitSelf;
}

exports.K6MetricsToJunit = generateXMLFromMetrics