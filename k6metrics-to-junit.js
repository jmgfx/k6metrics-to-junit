function generateXMLFromMetrics(data, options) {
  var junitMetric = [];
  var httpReqDuration = [];
  var name = options && options.name ? options.name : 'k6 metrics';
  var value = options && options.value ? options.value : 'p(90)';

  for (var metric in data.metrics) {
    if (data.metrics[metric]['values']['p(90)']) {
      if (metric.includes('http_req_duration')) {
        httpReqDuration.push(
          '<testsuites><testsuite name="' + metric + '">'
          + '<testcase classname="' + metric + '" name="' + metric + ' ' + value + '" time="' + data.metrics[metric]['values'][value]/1000 + '"/>'
          + '</testsuite></testsuites>'
        )
      } else {
        junitMetric.push(
          '<testcase classname="' + metric + '" name="' + metric + ' ' + value + '" time="' + data.metrics[metric]['values'][value]/1000 + '"/>'
        )
      }
    }
  }

  return '<?xml version="1.0"?>\n'
        + httpReqDuration.join('\n')
        + '\n<testsuites><testsuite name="' + name + '">\n'
        + junitMetric.join('\n')
        + '</testsuite></testsuites>';
}

exports.MetricsToJunit = generateXMLFromMetrics
