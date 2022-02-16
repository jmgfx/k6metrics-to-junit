function generateXMLFromMetrics(data, options) {
  var junitMetric = [];
  var name = options && options.name ? options.name : 'k6 metrics';
  var value = options && options.value ? options.value : 'p(90)';

  for (var metric in data.metrics) {
    if (data.metrics[metric]['values'][value]) {
      junitMetric.push(
        '<testcase classname="' + metric + '" name="' + metric + ' ' + value + '" time="' + data.metrics[metric]['values'][value]/1000 + '"/>'
      )
    }
  }

  return '<?xml version="1.0"?>\n'
    + '<testsuites><testsuite name="' + name + '">\n'
    + junitMetric.join('\n')
    + '</testsuite></testsuites>';
}

function generateXMLFromReqDuration(data, options) {
  var httpReqDuration = [];
  var name = options && options.name ? options.name : 'k6 metrics';
  var value = options && options.value ? options.value : 'p(90)';

  for (var metric in data.metrics) {
    if (data.metrics[metric]['values'][value]) {
      if (metric.includes('http_req_duration')) {
        httpReqDuration.push(
          '<testcase classname="' + metric + '" name="' + metric + ' ' + value + '" time="' + data.metrics[metric]['values'][value]/1000 + '"/>'
        )
      }
    }
  }

  return '<?xml version="1.0"?>\n'
    + '<testsuites><testsuite name="' + name + '">\n'
    + httpReqDuration.join('\n')
    + '</testsuite></testsuites>';
}

function generateXMLFromSelectMetrics(data, options) {
  var selectMetrics = [];
  var name = options && options.name ? options.name : 'k6 metrics';
  var value = options && options.value ? options.value : 'p(90)';

  console.log(options.save);

  for (var metric in options.save) {
    if (data.metrics[options.save[metric]]['values'][value]) {
      selectMetrics.push(
        '<testcase classname="' + options.save[metric] + '" name="' + options.save[metric] + ' ' + value + '" time="' + data.metrics[options.save[metric]]['values'][value]/1000 + '"/>'
      )
    }
  }

  return '<?xml version="1.0"?>\n'
    + '<testsuites><testsuite name="' + name + '">\n'
    + selectMetrics.join('\n')
    + '</testsuite></testsuites>';
}

exports.MetricsToJunit = generateXMLFromMetrics
exports.ReqDurationToJunit = generateXMLFromReqDuration
exports.SelectToJunit = generateXMLFromSelectMetrics
