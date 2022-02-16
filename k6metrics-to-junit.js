function generateXMLFromMetrics(data, options) {
  var junitMetric = [];
  var httpReqDuration = [];
  var name = options && options.name ? options.name : 'k6 metrics';
  var value = options && options.value ? options.value : 'p(90)';

  for (var metric in data.metrics) {
    if (data.metrics[metric]['values']['p(90)']) {
      if (metric.includes('http_req_duration')) {
        httpReqDuration.push(
          '<testsuite name="' + metric + '">'
          + '<testcase classname="' + metric + '" name="' + metric + ' ' + value + '" time="' + data.metrics[metric]['values'][value]/1000 + '"/>'
          + '</testsuite>'
        )
      } else {
        junitMetric.push(
          '<testcase classname="' + metric + '" name="' + metric + ' ' + value + '" time="' + data.metrics[metric]['values'][value]/1000 + '"/>'
        )
      }
    }
  }

  return '<?xml version="1.0"?><testsuites>'
        + httpReqDuration.join('\n')
        + '<testsuite name="' + name + '">'
        + junitMetric.join('\n')
        + '</testsuite>'
        + '\n</testsuites>';
}

exports.MetricsToJunit = generateXMLFromMetrics
