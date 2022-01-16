# Overview
The Website is built with different components. In general, the website has a navigation bar (`Sidebar Component`) to the side, which is used to navigate between the main 4 pages:
* Home
* Metrics
* Logs
* Detectors

The top `Navbar Component` always shows the current Page.

## Home Page
### Not Logged in
![](./img/home_noLogin.PNG)
The user has to log in via an OAuth Server. The `Log In` Button will redirect them to the site.

### Logged in
![](./img/home_Login.PNG)

When logged in, the User has to provide a valid `AppKey` in order to use the other services. All Pages beside `Home` are unavailable until a valid `AppKey` is provided.

# Metrics Page
![](./img/metric.PNG)

The `Metric` Page offers an overview to the Users metrics using `Chart.js`.
Charts are stored in the browsers `localstorage`.

## Metric Details
![](./img/metric_details.PNG)

Each chart offers a detailpage, in which the chart is shown in large and all metrics displayed in the chart are shown in a list.
The chart is `scrollable` and `zoomable`.

# Logs
![](./img/logs.PNG)

The `Log` Page offers a list of the Users logs. This list has a search-component, which filters the logs for a given string, which is then applied on all fields.
All fields are sortable and filterable on their own.
