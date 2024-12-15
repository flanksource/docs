What is Prometheus?
Prometheus is an open-source tool for monitoring systems and services. This project differentiates itself from similar alternatives by giving devs ample flexibility as it collects metric data at customizable intervals.

Prometheus users can define data models characterized by extreme dimensionality and use time series to create bespoke visualizations or alerts. Although this tool stores data in a custom format geared toward optimal disk and memory efficiency, you don't have to worry about manually managing the information you collect: The project makes it easy to scale up with built-in sharding and federation features.

Prometheus comprises a few discrete parts, some of which are optional depending on your use case. The system features a time-series data-scraping-and-storing server, client application instrumentation libraries, a job push gateway, exporters for third-party data services, and a customizable alert manager.

One element that might be a slight sticking point for new users is having to use Prometheus' query language, PromQL. Although PromQL is highly flexible and minimally complicated, users must be careful to test their custom rules and queries before taking them live to avoid slowdowns, overloads, or stale data.

Focus
The fundamental idea behind Prometheus involves tying time-series monitoring to containerized service decision-making. Like Google's proprietary Borgmon and similar alternatives, it can synthesize higher-level information from raw time series data – while remaining strictly independent from any single company.

It's important to note, however, that Prometheus has its limitations. Although server-side TLS support and other security features are in the works, this tool leaves it up to the user to implement secure networking setups, institute appropriate endpoint access controls, and avoid potential DoS attack vectors (like poorly optimized PromQL queries). It's also not quite appropriate for situations that require complete accuracy, like billing, although it’s geared towards general reliability in the face of failure conditions.

Background
SoundCloud originally built Prometheus for its internal use, and following its creation in 2012, the project received contributions from teams at Boxever and Docker. The project is fully open-source, however, as it's released under an Apache 2.0 license. It was also among the first few projects to join the Cloud Native Computing Foundation in 2016 and eventually achieve graduated status.

Among system monitoring tools, Prometheus is fairly popular, with more than 41K Github stars and a healthy presence online. Users can reach out to the project's devs on IRC, Matrix, or Slack, and the team's weekly meetings are open to the public. This project also features a well-thought-out governance model that likely contributes to its stability.

Prometheus main features
Prometheus gives you options
This tool's mix-and-match design philosophy can help you get monitoring up and running fast. Users can get most things done using the standard components, such as using the server's web-ready expression browser to generate custom visualizations. Alternatively, you can use an integration, such as when you want to port your data to Grafana or a custom console.

Time-series metrics for the uninitiated
Prometheus offers an accessible introduction to time-series monitoring with four distinct metric types: Monotonically increasing counters, unconstrained gauges, histograms, and summaries. In other words, you can get going with minimal statistical experience and still generate well-organized, maintainable results.

Alerts come included
Prometheus' alert manager lets you define custom conditions that prompt notifications. These time-series driven alerts might help you slash service outage response times – or at least stop fires from spreading.
