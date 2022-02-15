function generateXMLFromMetrics(data, options) {
  var junitMetric = [];
  var name = options && options.name ? options.name : 'k6 metrics';
  var value = options && options.value ? options.value : 'p(90)';

  for (var metric in data.metrics) {
    if (data.metrics[metric]['values']['p(90)']) {
      junitMetric.push(
        '<testcase classname="' + metric + '" name="' + metric + ' ' + value + '" time="' + data.metrics[metric]['values'][value]/1000 + '"/>'
      )
    }
  }

  return '<?xml version="1.0"?><testsuites><testsuite name="'
      + name + '">\n'
      + junitMetric.join('\n')
      + '\n</testsuite></testsuites>';
}

exports.MetricsToJunit = generateXMLFromMetrics
