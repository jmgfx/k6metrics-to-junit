# k6metrics-to-junit
Generate an XML file containing K6 test metrics, publishable to Azure DevOps Test Plans.

# How to use
1. Import the library

```import {MetricsToJunit} from "https://raw.githubusercontent.com/jmgfx/k6metrics-to-junit/main/k6metrics-to-junit.js"```

2. Add the following to the return statement of your handleSummary() function

```'k6metrics.xml': MetricsToJunit(data)```

3. That's it!

# Sample generated XML
```
<?xml version="1.0"?><testsuites><testsuite name="k6 metrics">
<testcase classname="http_req_tls_handshaking" name="http_req_tls_handshaking avg" time="0.8530648"/>
<testcase classname="iteration_duration" name="iteration_duration avg" time="2.5052486"/>
<testcase classname="http_req_blocked" name="http_req_blocked avg" time="0.8613864"/>
<testcase classname="http_req_connecting" name="http_req_connecting avg" time="0.0010474999999999998"/>
<testcase classname="http_req_receiving" name="http_req_receiving avg" time="0.00050055"/>
<testcase classname="http_req_duration" name="http_req_duration avg" time="0.2211703"/>
<testcase classname="http_req_sending" name="http_req_sending avg" time="0.00032829999999999996"/>
<testcase classname="http_req_waiting" name="http_req_waiting avg" time="0.22034145000000002"/>
</testsuite></testsuites>
```
