# CEL Expressions

`expr` expressions in canary checker use the [Go Common Expression Language (CEL)](https://github.com/google/cel-go).
See [Language Definition](https://github.com/google/cel-spec/blob/master/doc/langdef.md#overview)

```yaml title=http-check-expr.yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-check-expr
spec:
  interval: 30
  http:
    - name: http pass response 200 status code
      endpoint: https://httpbin.demo.aws.flanksource.com/status/200
      test:
        expr: "code in [200,201,301] and sslAge < Duration('7d')"
```

Values in CEL represent any of the following:

| Type          | Description                                                     |
| ------------- | --------------------------------------------------------------- |
| `int`         | 64-bit signed integers                                          |
| `uint`        | 64-bit unsigned integers                                        |
| `double`      | 64-bit IEEE floating-point numbers                              |
| `bool`        | Booleans (`true` or `false`)                                    |
| `string`      | Strings of Unicode code points                                  |
| `bytes`       | Byte sequences                                                  |
| `list`        | Lists of values                                                 |
| `map`         | Associative arrays with `int`, `uint`, `bool`, or `string` keys |
| `null_type`   | The value `null`                                                |
| message names | Protocol buffer messages                                        |
| `type`        | Values representing the types in the first column               |

---

## aws

### aws.arnToMap

Takes in an AWS arn and parses it and returns a map.

```javascript
aws.arnToMap("arn:aws:sns:eu-west-1:123:MMS-Topic") //
// map[string]string{
// "service": string,
// "region": string,
// "account": string,
// "resource": string,
// }
```

### aws.fromAWSMap

`aws.fromAWSMap` takes a list of `map[string]string` and merges them into a single map. The input map is expected to have the field "Name".

```javascript
aws.fromAWSMap(x).hello" == "world" // `true`
// Where
// x = [
//   { Name: 'hello', Value: 'world' },
//   { Name: 'John', Value: 'Doe' },
// ];
```

---

## base64

### base64.encode

`base64.encode` encodes the given byte slice to a Base64 encoded string.

```javascript
base64.decode("aGVsbG8=") // return b'hello'
```

### base64.decode

`base64.decode` decodes the given base64 encoded string back to its original form.

```javascript
base64.decode("aGVsbG8=") // return b'hello'
```

## collections

### all

The `all` macro tests whether a predicate holds for **all** elements of a list `e` or keys of a map `e`. It returns a boolean value based on the evaluation.
If any predicate evaluates to false, the macro evaluates to false, ignoring any errors from other predicates

Syntax:

```javascript
e.all(x, p)

// Where:
//  `e` is the list or a map.
//  `x` represents each element of the list.
//  `p` is the condition applied to each entry.
```

Examples:

```javascript
// Checking if all elements of a list are greater than 0:
[1, 2, 3].all(e, e > 0) // true
```

```javascript
// Ensure that the all the map keys begin with the letter "a"
{"a": "apple", "b": "banana", "c": "coconut"}.all(k, k.startsWith("a")) // false
```

### exists

The `exists` macro checks if there exists at least one element in a list that satisfies a given condition. It returns a boolean value based on the evaluation.

Syntax:

```javascript
e.exists(x, p)

// Where:
//  `e` is the list you're checking.
//  `x` represents each element of the list.
//  `p` is the condition applied to each entry.
```

Example:

```javascript
// Checking if any element of a list is equal to 2:
[1, 2, 3].exists(e, e == 2) // true
```

### exists_one

The `exists_one` macro checks if there exists exactly one element in a list that satisfies a given condition. It returns a boolean value based on the evaluation.

Syntax:

```javascript
e.exists_one(x, p)

// Where:
//  `e` is the list you're checking.
//  `x` represents each element of the list.
//  `p` is the condition applied to each entry.
```

Example:

```javascript
[1, 2, 3].exists_one(e, e > 1) // false
```

```javascript
[1, 2, 3].exists_one(e, e == 2) // true
```

### filter

The `filter` macro creates a new list containing only the elements or entries of an existing list that satisfy the given condition.

Syntax:

```javascript
e.filter(x, p)
```

Where:

- `e` is the list you're filtering.
- `x` represents each element of the list.
- `p` is the predicate expression applied to each entry.

Examples:

```javascript
// Filtering a list to include only numbers greater than 2:
[1, 2, 3, 4].filter(e, e > 2) // [3, 4]
```

### fold

The `fold` macro is used to combine all elements of a collection, such as a list or a map, using a binary function. It's a powerful tool for aggregating or reducing data.

Syntax:

```javascript
//For lists:
list.fold(e, acc, <binary_function>)
```

```javascript
//For maps:
map.fold(k, v, acc, <binary_function>)
```

Where:

- `list` is the list you're folding.
- `map` is the map you're folding.
- `e` represents each element of the list.
- `k` represents each key of the map.
- `v` represents each value of the map.
- `acc` is the accumulator, which holds the intermediate results.
- `<binary_function>` is the function applied to each entry and the accumulator.

Examples:

```javascript
[1, 2, 3].fold(e, acc, acc + e) // 6
```

```javascript
// Concatenating all values of a map:
{"a": "apple", "b": "banana"}.fold(k, v, acc, acc + v)  // "applebanana"
```

### has

The `has` macro tests whether a field is available. It's particularly useful for protobuf messages where fields can be absent rather than set to a default value. It's especially useful for distinguishing between a field being set to its default value and a field being unset. For instance, in a protobuf message, an unset integer field is indistinguishable from that field set to 0 without the `has` macro.

Syntax

```javascript
has(x.y): boolean

// Where
//   `x` is a message or a map and
//   `y` (string) is the field you're checking for.
```

Example:

If you have a message `person` with a potential field `name`, you can check for its presence with:

```javascript
has(person.name) // true if 'name' is present, false otherwise
```

### in

The membership test operator checks whether an element is a member of a collection, such as a list or a map. It's worth noting that the `in` operator doesn't check for value membership in maps, only key membership.

Syntax:

```javascript
"apple" in ["apple", "banana"] // => true
```

```javascript
3 in [1, 2, 4] // => false
```

### map

The `map` macro creates a new list by transforming a list `e` by taking each element `x` to the function given by the expression `t`, which can use the variable `x`.

Syntax:

```javascript
e.map(x, t)

// Where:
//   `e` is the list you're transforming.
//   `x` represents each element of the list.
//   `t` is the transformation function applied to each entry.
```

```javascript
e.map(x, p, t)

// Where:
//   `e` is the list you're transforming.
//   `p` filter before the value is transformed
//   `x` represents each element of the list.
//   `t` is the transformation function applied to each entry.
```

Examples:

```javascript
// Transforming each element of a list by multiplying it by 2:
[1, 2, 3].map(e, e * 2) // [2, 4, 6]
```

```javascript
[(1, 2, 3)].map(x, x > 1, x + 1) // [3, 4]
```

### size

`size` function determines the number of elements in a collection or the number of Unicode characters in a string.

Syntax

```javascript
(string) -> int	string length
(bytes) -> int	bytes length
(list(A)) -> int	list size
(map(A, B)) -> int	map size
```

```javascript
"apple".size() // 5
```

```javascript
b"abc".size() // 3
```

```javascript
["apple", "banana", "cherry"].size() //  3
```

```javascript
{"a": 1, "b": 2}.size(); // 2
```

### slice

Returns a new sub-list using the indexes provided.

```javascript
[1, 2, 3, 4].slice(1, 3) // return [2, 3]
```

```javascript
[(1, 2, 3, 4)].slice(2, 4) // return [3 ,4]
```

---

## sets

### sets.contains

Returns whether the first list argument contains all elements in the second
list argument. The list may contain elements of any type and standard CEL
equality is used to determine whether a value exists in both lists. If the
second list is empty, the result will always return true.

```javascript
sets.contains(list(T), list(T)) -> bool
```

Examples:

```javascript
sets.contains([], []) // true
```

```javascript
sets.contains([], [1]) // false
```

```javascript
sets.contains([1, 2, 3, 4], [2, 3]) // true
```

```javascript
sets.contains([1, 2.0, 3u], [1.0, 2u, 3]) // true
```

### sets.equivalent

Returns whether the first and second list are set equivalent. Lists are set
equivalent if for every item in the first list, there is an element in the
second which is equal. The lists may not be of the same size as they do not
guarantee the elements within them are unique, so size does not factor into
the computation.

    sets.equivalent(list(T), list(T)) -> bool

Examples:

```javascript
sets.equivalent([], []) // true
```

```javascript
sets.equivalent([1], [1, 1]) // true
```

```javascript
sets.equivalent([1], [1u, 1.0]) // true
```

```javascript
sets.equivalent([1, 2, 3], [3u, 2.0, 1]) // true
```

### sets.intersects

Returns whether the first list has at least one element whose value is equal
to an element in the second list. If either list is empty, the result will
be false.

```javascript
sets.intersects([1], []) // false
```

```javascript
sets.intersects([1], [1, 2]) // true
```

```javascript
sets.intersects(
  [[1], [2, 3]],
  [
    [1, 2],
    [2, 3.0]
  ]
) // true
```

---

## csv

### CSV

`CSV` converts a CSV formatted array into a two-dimensional array, where each element is a row string.

```javascript
CSV(["Alice,30", "Bob,31"])[0][0] // "Alice"
```

---

<!-- ### data.CSVByRow

`data.CSVByRow` converts a CSV formatted string into an array of maps, where each map represents a row with column names as keys.

Syntax:

    data.CSVByRow(csvString)

Where:

- `csvString` is the CSV formatted string.

Examples:

```javascript
Converting a CSV string with headers to an array of maps:
data.CSVByRow("name,age\nAlice,30\nBob,35")  // [{"name": "Alice", "age": "30"}, {"name": "Bob", "age": "35"}]

Handling a single row CSV:
data.CSVByRow("name,age\nAlice,30")  // [{"name": "Alice", "age": "30"}]

An empty CSV string:
data.CSVByRow("")  // an empty array
```

---

### data.CSVByColumn

`data.CSVByColumn` converts a CSV formatted string into a map of arrays, where keys are column names and values are arrays of column values.

Syntax:

    data.CSVByColumn(csvString)

Where:

- `csvString` is the CSV formatted string.

Examples:

```javascript
Converting a CSV string with headers to a map of arrays:
data.CSVByColumn("name,age\nAlice,30\nBob,35")  // {"name": ["Alice", "Bob"], "age": ["30", "35"]}

Handling a single column CSV:
data.CSVByColumn("name\nAlice\nBob")  // {"name": ["Alice", "Bob"]}

An empty CSV string:
data.CSVByColumn("")  // an empty map
```

---

### toCSV

`data.ToCSV` converts an array of arrays or an array of maps into a CSV formatted string.

Syntax:

    data.ToCSV(data)

Where:

- `data` is the array of arrays or array of maps to be converted.

Examples:

```javascript
Converting an array of arrays to a CSV string:
data.ToCSV([["Alice", 30], ["Bob", 35]])  // "Alice,30\nBob,35"

Handling an array of maps:
data.ToCSV([{"name": "Alice", "age": 30}, {"name": "Bob", "age": 35}])  // "name,age\nAlice,30\nBob,35"

An empty array:
data.ToCSV([])  // an empty string
```

--- -->

## crypto

### crypto.SHA1|256|384|512

The `crypto.SHA*` functions are used to compute the SHA hash of the input data.

```javascript
crypto.SHA1("hello") // "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c"
crypto.SHA256("hello") // "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
```

## dates

### timestamp

`timestamp` represent a point in time. It's typically used in conjunction with other functions to extract or manipulate time-related data.

```javascript
// Creating a timestamp for January 1st, 2023:
timestamp("2023-01-01T00:00:00Z")
// Creating another timestamp:
timestamp("2023-07-04T12:00:00Z")
```

### .getDate

`getDate` extract the date part from a timestamp. It returns a string representation of the date.

```javascript
// Extracting the date from a timestamp:
"2023-01-01T12:34:56Z".getDate() // "2023-01-01"
```

```javascript
// Getting the date from another timestamp:
"2023-07-04T00:00:00Z".getDate() // "2023-07-04"
```

### .get[DatePart]

| Function                   | Description                                                                                    | Example |
| -------------------------- | ---------------------------------------------------------------------------------------------- | ------- |
| `{date>.getDayOfMonth()`   | A integer value representing the day of the month, with the first day being 1.                 | 1 - 31  |
| `<date>.getDayOfWeek()`    | eturns an integer value representing the day of the week, where Sunday is 0 and Saturday is 6. | 0 - 6   |
| `<date>.getDayOfYear()`    | an integer value representing the day of the year, with January 1st being day 1.               | 1 - 366 |
| `<date>.getDayOfMonth()`   | the full year (4 digits for 4-digit years) of the specified timestamp.                         |         |
| `<date>.getHours()`        | the full year (4 digits for 4-digit years) of the specified timestamp.                         | 0- 23   |
| `<date>.getMilliseconds()` |                                                                                                | 0 -999  |
| `<date>.getMinutes()`      |                                                                                                |         |
| `<date>.getMonth()`        |                                                                                                | 0 -11   |
| `<date>.getSeconds()`      | 0 - 59                                                                                         | 0 - 59  |
| `<date>.getHours()`        |                                                                                                |         |

### duration

`duration` parses a string into a new duration.
The format is an integer followed by a unit: `s` for seconds, `m` for minutes, `h` for hours, and `d` for days.

```javascript
// Creating a duration of 5 hours:
duration("5h") // Represents a duration of 5 hours
duration("30m") // Represents a duration of 30 minutes
```

Durations can also be crated using arithmetic:

| Field            | Description                                                                   |
| ---------------- | ----------------------------------------------------------------------------- |
| time.Unix(epoch) | converts a UNIX time (seconds since the UNIX epoch) into a `time.Time` object |
| time.Nanosecond  | converts to a time.Duration                                                   |
| time.Microsecond |                                                                               |
| time.Millisecond |                                                                               |
| time.Second      |                                                                               |
| time.Minute      |                                                                               |
| time.Hour        |                                                                               |

### time.ZoneName

`time.ZoneName` returns the name of the local system's time zone. It doesn't require any parameters and is useful for retrieving the time zone information.

```javascript
// Retrieving the local time zone name:
time.ZoneName() // Might evaluate to "PST" if the local time zone is Pacific Standard Time
```

### time.ZoneOffset

`time.ZoneOffset` returns the offset of the local system's time zone in minutes. It helps in understanding the time difference between the local time zone and UTC.

```javascript
// Getting the time zone offset:
time.ZoneOffset() // Could evaluate to -480 for PST
```

### time.Parse

`time.Parse` parse a given string into a time object based on a specified layout. It's handy for converting string representations of time into actual time objects.

Syntax:

```javascript
time.Parse(layout, value)
```

- `layout` is the time layout string.
- `value` is the string representation of the time to be parsed.

```javascript
// Parsing a time string with a specific format:
time.Parse("2006-01-02", "2023-09-26") // a time object representing September 26, 2023
```

```javascript
// Another example with a different format:
time.Parse("02-01-2006", "26-09-2023") // the same time object as above
```

```javascript
// Parsing a time with hour and minute information:
time.Parse("15:04 02-01-2006", "14:30 26-09-2023") // Includes time of day information
```

### time.ParseLocal

`time.ParseLocal` parses a given string into a time object according to a specified layout and the local time zone. It's useful for working with local times.

```javascript
time.ParseLocal(layout, value)
```

- `layout` is the time layout string.
- `value` is the string representation of the time to be parsed.

Examples:

```javascript
// Parsing a local time string:
time.ParseLocal("2006-01-02 15:04", "2023-09-26 14:30") // a local time object for 14:30 on September 26, 2023
```

```javascript
// Another example:
time.ParseLocal("02-01-2006", "26-09-2023") // a local time object for September 26, 2023
```

```javascript
// Parsing with a different time format:
time.ParseLocal("15:04 02-01-2006", "14:30 26-09-2023") // Includes time of day information in local time zone
```

### time.ParseInLocation

`time.ParseInLocation` parses a string into a time object according to a specified layout and time zone. It provides more control over the time zone compared to `time.ParseLocal`.

Syntax:

```javascript
time.ParseInLocation(layout, location, value)
```

- `layout` is the time layout string.
- `location` is the string name of the time zone.
- `value` is the string representation of the time to be parsed.

Examples:

```javascript
// Parsing a time string for a specific time zone:
time.ParseInLocation("2006-01-02", "America/New_York", "2023-09-26") // a time object for EST/EDT
```

```javascript
// Another example for a different time zone:
time.ParseInLocation("02-01-2006", "Europe/London", "26-09-2023") // a time object for GMT/BST
```

```javascript
// Parsing with hour and minute for a specific zone:
time.ParseInLocation("15:04 02-01-2006", "Asia/Tokyo", "14:30 26-09-2023") // a time object for JST
```

### time.Now

`time.Now` returns the current time. It's a straightforward way to retrieve the current date and time according to the system's local time zone.

```javascript
// Getting the current time:
time.Now() // the current date and time
```

### time.ParseDuration

`time.ParseDuration` parses a string into a duration. It supports various units like "s" for seconds, "m" for minutes, "h" for hours, etc.

```javascript
// Parsing a duration string:
time.ParseDuration("1h30m") // a duration of 1 hour and 30 minutes
```

```javascript
// Another example with a different format:
time.ParseDuration("15m30s") // a duration of 15 minutes and 30 seconds
```

```javascript
// Parsing a negative duration:
time.ParseDuration("-2h45m") // a duration of -2 hours and -45 minutes
```

### time.Since

`time.Since` calculates the duration that has elapsed since a given time. It is commonly used to measure the time difference between a specified time and the current moment.

```javascript
// Calculating the time elapsed since a specific past time:
time.Since(time.Parse("2006-01-02", "2023-09-26")) // the duration since September 26, 2023
```

```javascript
// Another example with a different past time:
time.Since(time.Parse("15:04 02-01-2006", "14:30 26-09-2023")) // the duration since 14:30 on September 26, 2023
```

```javascript
// Using `time.Now` for a real-time duration:
time.Since(time.Now()) // Always evaluates to a very small duration, as it's the time since "now"
```

### time.Until

`time.Until` calculates the duration remaining until a specified future time. It helps in determining the time left for an event or deadline.

```javascript
// Calculating the time remaining until a specific future time:
time.Until(time.Parse("2006-01-02", "2023-10-01")) // the duration until October 1, 2023
```

```javascript
// Another example with a different future time:
time.Until(time.Parse("15:04 02-01-2006", "16:00 30-09-2023")) // the duration until 16:00 on September 30, 2023
```

```javascript
// Using `time.Now` for a real-time duration:
time.Until(time.Now()) // Always evaluates to zero, as it's the time until "now"
```

---

## encode

### urlencode

`urlencode` encodes the given string into a URL-encoded string.

```javascript
urlencode("hello world ?") // hello+world+%3F
```

### urldecode

`urldecode` decodes a URL-encoded string.

```javascript
urldecode("hello+world+%3F") // 'hello world ?'
```

---

## filepath

### filepath.Base

`filepath.Base` returns the last element of path.
Trailing path separators are removed before extracting the last element.
If the path is empty, Base returns ".".
If the path consists entirely of separators, Base returns a single separator.

```javascript
filepath.Base("/home/flanksource/projects/gencel") // gencel
```

### filepath.Clean

`filepath.Clean` returns the shortest path name equivalent to path by purely lexical processing.
It applies the following rules iteratively until no further processing can be done:

```javascript
filepath.Clean("/foo/bar/../baz") // Evaluates /foo/baz
```

### filepath.Dir

`filepath.Dir` returns all but the last element of path, typically the path's directory.
After dropping the final element, Dir calls Clean on the path and trailing
slashes are removed.
If the path is empty, Dir returns ".".
If the path consists entirely of separators, Dir returns a single separator.
The returned path does not end in a separator unless it is the root directory.

```javascript
filepath.Dir("/home/flanksource/projects/gencel") // /home/flanksource/projects
```

### filepath.Ext

`filepath.Ext` returns the file name extension used by path.
The extension is the suffix beginning at the final dot in the final element of path; it is empty if there is no dot.

```javascript
filepath.Ext("/opt/image.jpg") // .jpg
```

### filepath.IsAbs

`filepath.IsAbs` reports whether the path is absolute.

```javascript
filepath.Base("/home/flanksource/projects/gencel") // true
```

```javascript
filepath.Base("projects/gencel") // false
```

### filepath.Join

`filepath.Join` joins any number of path elements into a single path,
separating them with an OS specific Separator. Empty elements
are ignored. The result is Cleaned. However, if the argument
list is empty or all its elements are empty, Join returns
an empty string.
On Windows, the result will only be a UNC path if the first
non-empty element is a UNC path.

```javascript
filepath.Join(["/home/flanksource", "projects", "gencel"]; // /home/flanksource/projects/gencel
```

### filepath.Match

`filepath.Match` reports whether name matches the shell file name pattern.

```javascript
filepath.Match("*.txt", "foo.json") // false
```

```javascript
filepath.Match("*.txt", "foo.txt") // true
```

### filepath.Rel

`filepath.Rel` returns a relative path that is lexically equivalent to targpath when
joined to basepath with an intervening separator. That is,
Join(basepath, Rel(basepath, targpath)) is equivalent to targpath itself.
On success, the returned path will always be relative to basepath,
even if basepath and targpath share no elements.
An error is returned if targpath can't be made relative to basepath or if
knowing the current working directory would be necessary to compute it.
Rel calls Clean on the result.

```javascript
filepath.Rel("/foo/bar", "/foo/bar/baz") // baz
```

### filepath.Split

`filepath.Split` splits path immediately following the final Separator,
separating it into a directory and file name component.
If there is no Separator in path, Split returns an empty dir
and file set to path.
The returned values have the property that path = dir+file.

```javascript
filepath.Split("/foo/bar/baz") // [/foo/bar/ baz]
```

---

## JSON

### .JSON

`JSON` parses a string into an object

```javascript
'{"name": "Alice", "age": 30}'.JSON()
```

### .JSONArray

`JSONArray` parses a string into an array

```javascript
'[{"name": "Alice"}, {"name": "Bob"}]'.JSONArray()
```

### .toJSON

`toJSON` converts an object into a JSON formatted string.

```javascript
[{ name: "John" }].toJSON() // [{"name":"John"}]
```

```javascript
{'name': 'John'}.toJSON() // {"name":"John"}
```

```javascript
1.toJSON() // 1
```

### .toJSONPretty

`toJSONPretty` converts any data type into a JSON formatted string with proper indentation.

```javascript
{'name': 'aditya'}.toJSONPretty('\t')
//
// {
// 	"name": "aditya"
// }
```

```javascript
// Using tab for indentation:
["Alice", 30].toJSONPretty("\t")
```

```javascript
// An empty map with four spaces indent:
{}.toJSONPretty("    ", );
```

### jq

`jq` applies a jq expression to filter or transform data.

```javascript
// Filtering data with a jq expression:
jq(".name", { name: "John", age: 30 }) // "John"
```

```javascript
// Transforming data with a jq expression:
jq("{name, age}", { name: "John", age: 30, city: "NY" }) // {"name": "John", "age": 30}
```

```javascript
// Using a complex jq expression:
jq(".[] | select(.age > 25)", [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 }
]) // [{"name": "John", "age": 30}]
```

---

## kubernetes

### k8s.cpuAsMillicores

`k8s.cpuAsMillicores` returns the millicores of a Kubernetes resource.

```javascript
k8s.cpuAsMillicores("10m") // 10
k8s.cpuAsMillicores("0.5") // 500
k8s.cpuAsMillicores("1.234") // 1234
```

### k8s.getHealth

`k8s.getHealth` retrieves the health status of a Kubernetes resource as a map. The map contains key-value pairs providing detailed information about the resource's health.

Examples:

```javascript
// Retrieving the health information of a pod:
k8s.getHealth(pod) // a map with keys and values indicating the pod's health
```

```javascript
// Getting the health information of a service:
k8s.getHealth(service) // a map with keys and values indicating the service's health
```

```javascript
// Checking the health information of a deployment:
k8s.getHealth(deployment) // a map with keys and values indicating the deployment's health
```

### k8s.getStatus

`k8s.getStatus` retrieves the status of a Kubernetes resource as a string. It provides detailed information about the current state of the resource.

```javascript
// Retrieving the status of a pod:
k8s.getStatus(pod) // "Running" if the pod is running
```

```javascript
// Getting the status of a service:
k8s.getStatus(service) // "Active" if the service is active
```

```javascript
// Checking the status of a deployment:
k8s.getStatus(deployment) // "Deployed" if the deployment is successful
```

### k8s.isHealthy

`k8s.isHealthy` determine if a Kubernetes resource is healthy. It returns a boolean value indicating the health status of the resource.

```javascript
// Checking if a pod is healthy:
k8s.isHealthy(pod) // true if the pod is healthy
```

```javascript
// Verifying the health of a service:
k8s.isHealthy(service) // false if the service is not healthy
```

```javascript
// Assessing the health of a deployment:
k8s.isHealthy(deployment) // true if the deployment is healthy
```

### k8s.memoryAsBytes

`k8s.memoryAsBytes` converts the memory string to bytes.

```javascript
k8s.memoryAsBytes("10Ki") // 10240
```

```javascript
k8s.memoryAsBytes("1.234gi") // 1324997410
```

---

## math

### math.Add

`math.Add` takes a list of number and returns their sum

```javascript
math.Add([1, 2, 3, 4, 5]) // 15
```

### math.Sub

`math.Sub` takes two numbers and returns their difference

```javascript
math.Sub(5, 4) // 1
```

### math.Mul

`math.Mul` takes a list of numbers and returns their product

```javascript
math.Mul([1, 2, 3, 4, 5]) // 120
```

### math.Div

`math.Div` takes two numbers and returns their quotient

```javascript
math.Div(4, 2) // 2
```

### math.Rem

`math.Rem` takes two numbers and returns their remainder

```javascript
math.Rem(4, 3) // 1
```

### math.Pow

`math.Pow` takes two numbers and returns their power

```javascript
math.Pow(4, 2) // 16
```

### math.Seq

`math.Seq` generates a sequence of numbers from the start value to the end value, incrementing by the step value.

Syntax:

```javascript
math.Seq([start, end, ?step])
```

- `start` is the starting value of the sequence.
- `end` is the ending value of the sequence.
- `step` is the increment value of the sequence. (optional. Defaults to 1)

```javascript
math.Seq([1, 5]) // [1, 2, 3, 4, 5]
```

```javascript
math.Seq([1, 6, 2]) // [1, 3, 5]
```

### math.Abs

`math.Abs` takes a number and returns its absolute value

```javascript
math.Abs(-1) // 1
```

### math.greatest

`math.greatest` takes a list of numbers and returns the greatest value

```javascript
math.greatest([1, 2, 3, 4, 5]) // 5
```

### math.least

`math.least` takes a list of numbers and returns the least value

```javascript
math.least([1, 2, 3, 4, 5]) // 1
```

### math.Ceil

`math.Ceil` returns the smallest integer greater than or equal to the provided float.

```javascript
math.Ceil(2.3) // 3
```

### math.Floor

`math.Floor` returns the largest integer less than or equal to the provided float.

```javascript
math.Floor(2.3) // 2
```

### math.Round

`math.Round` returns the nearest integer to the provided float.

```javascript
math.Round(2.3) // 2
```

---

## random

### random.ASCII

`random.ASCII` generates random ASCII strings of a specified length.

```javascript
random.ASCII(5)
```

### random.Alpha

`random.Alpha` generates random alphabetic strings of a specified length.

```javascript
random.Alpha(5)
```

### random.AlphaNum

`random.AlphaNum` generates random alphanumeric strings of a specified length.

```javascript
random.AlphaNum(5)
```

### random.String

`random.String` generates random strings of a specified length and character set.

```javascript
random.String(5)
```

```javascript
// generate 5 chars between a and d
random.String(5, ["a", "d"])
```

### random.Item

`random.Item` generates a random item from a list.

```javascript
random.Item(["a", "b", "c"])
```

### random.Number

`random.Number` generates a random integer within a specified range.

Syntax:

```javascript
random.Number(min, max)
```

- `min` is the minimum value of the range (inclusive).
- `max` is the maximum value of the range (inclusive).

Examples:

```javascript
random.Number(1, 10)
```

### random.Float

`random.Float` generates a random float within a specified range.

Syntax:

```javascript
random.Float(min, max)
```

- `min` is the minimum value of the range (inclusive).
- `max` is the maximum value of the range (inclusive).

Examples:

```javascript
random.Float(1, 10)
```

---

## regexp

### regexp.Find

`regexp.Find` find the first occurrence of a pattern within a string. It returns the matched substring or an error if the pattern is invalid.

```javascript
// Finding a pattern within a string:
regexp.Find("llo", "hello") // "llo"
```

```javascript
// Searching for digits within a string:
regexp.Find("\\d+", "abc123def") // "123"
```

```javascript
// Pattern not found in the string:
regexp.Find("xyz", "hello") // ""
```

---

### regexp.FindAll

`regexp.FindAll` retrieves all occurrences of a pattern within a string, up to a specified count. It returns a list of matched substrings or an error if the pattern is invalid.

```javascript
regexp.FindAll(pattern, count, input)
```

- `pattern` is the regular expression pattern to find.
- `count` is the maximum number of occurrences to return.
- `input` is the string to search within.

Examples:

```javascript
// Finding all occurrences of a pattern:
regexp.FindAll("a.", -1, "banana") // ["ba", "na", "na"]
```

```javascript
// Limiting the number of matches:
regexp.FindAll("\\d", 2, "12345") // ["1", "2"]
```

```javascript
// Pattern not found:
regexp.FindAll("z", -1, "hello") // []
```

---

### regexp.Match

`regexp.Match` checks if a string matches a given regular expression pattern. It returns a boolean value indicating the match status.

```javascript
// Checking if a string matches a pattern:
regexp.Match("^h.llo", "hello") // true
```

```javascript
// Pattern does not match the string:
regexp.Match("^b", "apple") // false
```

```javascript
// Matching digits in a string:
regexp.Match("\\d+", "abc123") // true
```

---

### regexp.QuoteMeta

`regexp.QuoteMeta` quotes all regular expression metacharacters inside a string. It returns the quoted string.

```javascript
// Quoting metacharacters in a string:
regexp.QuoteMeta("a.b") // "a\\.b"
```

```javascript
// String without metacharacters:
regexp.QuoteMeta("abc") // "abc"
```

```javascript
// Quoting a complex pattern:
regexp.QuoteMeta("[a-z].*") // "\\[a\\-z\\]\\.\\*"
```

---

### regexp.Replace

`regexp.Replace` replaces occurrences of a pattern within a string with a specified replacement string. It returns the modified string.

Syntax:

```javascript
regexp.Replace(pattern, replacement, input)
```

- `pattern` is the regular expression pattern to replace.
- `replacement` is the string to replace the pattern with.
- `input` is the original string.

```javascript
// Replacing a pattern in a string:
regexp.Replace("a.", "x", "banana") // "bxnxna"
```

```javascript
// Pattern not found:
regexp.Replace("z", "x", "apple") // "apple"
```

```javascript
// Replacing digits:
regexp.Replace("\\d+", "num", "abc123") // "abcnum"
```

---

### regexp.ReplaceLiteral

`regexp.ReplaceLiteral` replaces occurrences of a pattern within a string with a specified replacement string, without interpreting the pattern as a regular expression. It returns the modified string or an error if the pattern is invalid.

Syntax:

    regexp.ReplaceLiteral(pattern, replacement, input)

Where:

- `pattern` is the substring to replace.
- `replacement` is the string to replace the pattern with.
- `input` is the original string.

Examples:

```javascript
// Replacing a substring:
regexp.ReplaceLiteral("apple", "orange", "apple pie") // "orange pie"
```

```javascript
// Substring not found:
regexp.ReplaceLiteral("z", "x", "apple") // "apple"
```

```javascript
// Replacing a pattern without regex interpretation:
regexp.ReplaceLiteral("a.", "x", "a.b c.d") // "x.b c.d"
```

---

### regexp.Split

`regexp.Split` splits a string into a slice of substrings separated by a pattern. It returns the slice of strings or an error if the pattern is invalid.

```javascript
regexp.Split(pattern, count, input)
```

- `pattern` is the regular expression pattern that separates the substrings.
- `count` is the maximum number of splits. Use -1 for no limit.
- `input` is the string to split.

```javascript
regexp.Split("a.", -1, "banana") // ["", "n", "n"]
```

```javascript
// Limiting the number of splits:
regexp.Split("\\s", 2, "apple pie is delicious") // ["apple", "pie is delicious"]
```

```javascript
// Pattern not found:
regexp.Split("z", -1, "hello") // ["hello"]
```

---

## strings

### .abbrev

`abbrev` on a string abbreviates the string using ellipses. This will turn the string "Now is the time for all good men" into "...s the time for..."
This function works like `Abbreviate(string, int)`, but allows you to specify a "left edge" offset. Note that this left edge is not
necessarily going to be the leftmost character in the result, or the first character following the ellipses, but it will appear
somewhere in the result.
In no case will it return a string of length greater than maxWidth.

```javascript
"string".abbrev(offset, maxWidth)
```

- str - the string to check
- offset - left edge of source string
- maxWidth - maximum length of result string, must be at least 4

Examples:

```javascript
"Now is the time for all good men".abbrev(5, 20) // "...s the time for..."
```

```javascript
"KubernetesPod".abbrev(1, 5) // "Ku..."
```

```javascript
"KubernetesPod".abbrev(6) // "Kub..."
```

### .camelCase

`camelCase` converts a given string into camelCase format.

```javascript
// Converting a string to camelCase:
"hello world".camelCase() // "HelloWorld"
```

```javascript
// Converting a snake_case string:
"hello_world".camelCase() // "HelloWorld"
```

```javascript
// Converting a string with spaces and special characters:
"hello beautiful world!".camelCase() // "HelloBeautifulWorld"
```

### .charAt

Returns the character at the given position. If the position is negative, or
greater than the length of the string, the function will produce an error:

```javascript
"hello".charAt(4) // return 'o'
```

```javascript
"hello".charAt(5) // return ''
```

```javascript
"hello".charAt(-1) // error
```

### .contains

`contains` check if a string contains a given substring.

```javascript
"apple".contains("app") // true
```

### .endsWith

`endsWith` determine if a string ends with a specified substring.

```javascript
"hello".endsWith("lo") // true
```

### .format

`format` Returns a new string with substitutions being performed, printf-style.
The valid formatting clauses are:

- `%s` substitutes a string. This can also be used on `bools`, `lists`, `maps`, `bytes`,
  `Duration`, `Timestamp`,`int`, `double`
  <br/>Note that the dot/period decimal separator will always be used when printing a list or map that contains a double, and that null can be passed (which results in the string "null") in addition to types.
- `%d` substitutes an integer.
- `%f` substitutes a double with fixed-point precision. The default precision is 6, but this can be adjusted. The strings `Infinity`, `-Infinity`, and `NaN` are also valid input for this clause.
- `%e` substitutes a double in scientific notation. The default precision is 6, but this can be adjusted.
- `%b` substitutes an integer with its equivalent binary string. Can also be used on bools.
- `%x` substitutes an integer with its equivalent in hexadecimal, or if given a string or bytes, will output each character's equivalent in hexadecimal.
- `%X` same as above, but with A-F capitalized.
- `%o` substitutes an integer with its equivalent in octal.

```javascript
"this is a string: %s\nand an integer: %d".format(["str", 42]) thsis is a string: str\nand an integer: 42
```

### .indent

`indent` indents each line of a string by the specified width and prefix

```javascript
"hello world".indent(4, "-") // ----hello world
```

### .indexOf

Returns the integer index of the first occurrence of the search string. If the
search string is not found the function returns -1.

The function also accepts an optional position from which to begin the
substring search. If the substring is the empty string, the index where the
search starts is returned (zero or custom).

```
    <string>.indexOf(<string>) -> <int>
    <string>.indexOf(<string>, <int>) -> <int>
```

Examples:

```javascript
"hello mellow".indexOf("") // returns 0
```

```javascript
"hello mellow".indexOf("ello") // returns 1
```

```javascript
"hello mellow".indexOf("jello") // returns -1
```

```javascript
"hello mellow".indexOf("", 2) // returns 2
```

```javascript
"hello mellow".indexOf("ello", 20) // error
```

### .join

Returns a new string where the elements of string list are concatenated.

The function also accepts an optional separator which is placed between
elements in the resulting string.

```javascript
["hello", "mellow"].join() // returns 'hellomellow'
```

```javascript
["hello", "mellow"].join(" ") // returns 'hello mellow'
```

```javascript
[].join() // returns ''
```

```javascript
[].join("/") // returns ''
```

### .kebabCase

`kebabCase` converts a given string into kebab-case format.

```javascript
// Converting a string to kebab-case:
"Hello World".kebabCase() // "hello-world"
```

```javascript
// Converting a CamelCase string:
"HelloWorld".kebabCase() // "hello-world"
```

```javascript
// Converting a string with spaces and special characters:
"Hello Beautiful World!".kebabCase() // "hello-beautiful-world"
```

### .lastIndexOf

Returns the integer index of the last occurrence of the search string. If the
search string is not found the function returns -1.

The function also accepts an optional position which represents the last index
to be considered as the beginning of the substring match. If the substring is
the empty string, the index where the search starts is returned (string length
or custom).

```javascript
"hello mellow".lastIndexOf("") // returns 12
```

```javascript
"hello mellow".lastIndexOf("ello") // returns 7
```

```javascript
"hello mellow".lastIndexOf("jello") // returns -1
```

```javascript
"hello mellow".lastIndexOf("ello", 6) // returns 1
```

```javascript
"hello mellow".lastIndexOf("ello", -1) // error
```

### .lowerAscii

Returns a new string where all ASCII characters are lower-cased.

This function does not perform Unicode case-mapping for characters outside the
ASCII range.

```javascript
"TacoCat".lowerAscii() // returns 'tacocat'
"TacoCÆt Xii".lowerAscii() // returns 'tacocÆt xii'
```

### .matches

`matches` determine if a string matches a given regular expression pattern. It returns a boolean value indicating whether the string conforms to the pattern.

```javascript
// Checking if a string matches a simple pattern:
"apple".matches("^a.*e$") // true
```

```javascript
// Validating an email format:
"example@email.com".matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$") // true
```

```javascript
// Checking for a pattern of digits:
"12345".matches("^\\d+$") // true
```

### .quote

Takes the given string and makes it safe to print (without any formatting due to escape sequences).
If any invalid UTF-8 characters are encountered, they are replaced with \uFFFD.

```javascript
strings.quote('single-quote with "double quote"') // returns '"single-quote with \"double quote\""'
```

```javascript
strings.quote("two escape sequences a\n") // returns '"two escape sequences \\a\\n"'
```

### .repeat

`repeat` on a string repeats the string for a given number of times.

```javascript
"apple".repeat(3) // "appleappleapple"
```

### .replace

Returns a new string based on the target, which replaces the occurrences of a
search string with a replacement string if present. The function accepts an
optional limit on the number of substring replacements to be made.

When the replacement limit is 0, the result is the original string. When the
limit is a negative number, the function behaves the same as replace all.

```javascript
<string>.replace(<string>, <string>) -> <string>
<string>.replace(<string>, <string>, <int>) -> <string>
```

Examples:

```javascript
"hello hello".replace("he", "we") // returns 'wello wello'
```

```javascript
"hello hello".replace("he", "we", -1) // returns 'wello wello'
```

```javascript
"hello hello".replace("he", "we", 1) // returns 'wello hello'
```

```javascript
"hello hello".replace("he", "we", 0) // returns 'hello hello'
```

### .replaceAll

`replaceAll` replaces all occurrences of a substring within a string with another substring.

```javascript
"I have an apple".replaceAll("apple", "orange") // "I have an orange"
```

### .reverse

Returns a new string whose characters are the same as the target string, only formatted in
reverse order.
This function relies on converting strings to rune arrays in order to reverse.

```javascript
"gums".reverse() // returns 'smug'
```

```javascript
"John Smith".reverse() // returns 'htimS nhoJ'
```

### .runeCount

`runeCount` counts the number of runes in a given string.

```javascript
"Hello World".runeCount() // 11
```

```javascript
"Hello$World".runeCount() // 11
```

### .shellQuote

`shellQuote` quotes a string such that it can be safely used as a token in a shell command.

```javascript
"Hello World".shellQuote() // "'Hello World'"
```

```javascript
// Shell quoting a string with special characters:
"Hello$World".shellQuote() // "'Hello$World'"
```

```javascript
// Shell quoting a string with spaces and special characters:
"Hello World$123".shellQuote() // "'Hello World$123'"
```

### .size

`size` determine the number of elements in a collection or the number of Unicode characters in a string.

```javascript
// Getting the size of a list:
["apple", "banana", "cherry"].size() // 3
```

```javascript
// Determining the number of characters in a string:
"hello".size() // 5
```

### .slug

`slug` converts a given string into a URL-friendly slug format.

Syntax:

    'string'.slug()

Where:

- `string` is the input string to be converted.

Examples:

```javascript
// Converting a string to a slug:
"Hello World!".slug() // "hello-world"
```

```javascript
// Converting a string with special characters:
"Hello, World!".slug() // "hello-world"
```

```javascript
// Converting a multi-word string:
"Hello Beautiful World".slug() // "hello-beautiful-world"
```

### .snakeCase

`snakeCase` converts a given string into snake_case format.

```javascript
// Converting a string to snake_case:
"Hello World".snakeCase() // "hello_world"
```

```javascript
// Converting a CamelCase string:
"HelloWorld".snakeCase() // "hello_world"
```

```javascript
// Converting a string with spaces and special characters:
"Hello Beautiful World!".snakeCase() // "hello_beautiful_world"
```

### .sort

`sort` on a string sorts the string alphabetically.

```javascript
"hello".sort() // ehllo
```

### .split

Returns a list of strings split from the input by the given separator. The
function accepts an optional argument specifying a limit on the number of
substrings produced by the split.

When the split limit is 0, the result is an empty list. When the limit is 1,
the result is the target string to split. When the limit is a negative
number, the function behaves the same as split all.

Examples:

```javascript
"hello hello hello".split(" ") // returns ['hello', 'hello', 'hello']
```

```javascript
"hello hello hello".split(" ", 0) // returns []
```

```javascript
"hello hello hello".split(" ", 1) // returns ['hello hello hello']
```

```javascript
"hello hello hello".split(" ", 2) // returns ['hello', 'hello hello']
```

```javascript
"hello hello hello".split(" ", -1) // returns ['hello', 'hello', 'hello']
```

### .squote

`squote` adds single quotes around a given string.

```javascript
// Single quoting a simple string:
"Hello World".squote() // "'Hello World'"
```

```javascript
// Single quoting a string with a number:
"12345".squote() // "'12345'"
```

```javascript
// Single quoting an already single quoted string:
"'Hello World'".squote() // "'''Hello World'''"
```

### .startsWith

`startsWith` determine if a string starts with a specified substring.

```javascript
// Checking if a string starts with a certain substring:
"hello".startsWith("he") // true
```

### .substring

Returns the substring given a numeric range corresponding to character
positions. Optionally may omit the trailing range for a substring from a given
character position until the end of a string.

Character offsets are 0-based with an inclusive start range and exclusive end
range. It is an error to specify an end range that is lower than the start
range, or for either the start or end index to be negative or exceed the string
length.

```javascript
"tacocat".substring(4) // returns 'cat'
```

```javascript
"tacocat".substring(0, 4) // returns 'taco'
```

```javascript
"tacocat".substring(-1) // error
```

```javascript
"tacocat".substring(2, 1) // error
```

### .title

`title` converts the first character of each word in a string to uppercase.

```javascript
// Converting a string:
"hello world".title() // "Hello World"
```

```javascript
// Working with mixed case:
"mIxEd CaSe".title() // "MIxED CASe"
```

### .trim

Returns a new string which removes the leading and trailing whitespace in the
target string. The trim function uses the Unicode definition of whitespace
which does not include the zero-width spaces.

```javascript
"  \ttrim\n    ".trim() //  'trim'
```

### .trimPrefix

`trimPrefix` removes a given prefix from a string if the string starts with that prefix.

```javascript
// Removing a prefix from a string:
"Mr. Smith".trimPrefix("Mr.") // "Smith"
```

```javascript
// Another example:
"Astronaut".trimPrefix("Astro") // "naut"
```

```javascript
// If the prefix is not present:
"Mr. Smith".trimPrefix("Dr.") // "Mr. Smith"
```

---

### .trimSuffix

`trimSuffix` removes a given suffix from a string if the string ends with that suffix.

```javascript
// Removing a suffix from a string:
"image.jpg".trimSuffix(".jpg") // "image"
```

```javascript
// If the suffix is not present:
"image.jpg".trimSuffix(".png") // "image.jpg"
```

### .upperAscii

Returns a new string where all ASCII characters are upper-cased.

This function does not perform Unicode case-mapping for characters outside the
ASCII range.

```javascript
"TacoCat".upperAscii() // returns 'TACOCAT'
```

```javascript
"TacoCÆt Xii".upperAscii() // returns 'TACOCÆT XII'
```

### .wordWrap

`wordWrap` on a string inserts line-breaks into the string, before it reaches the given max width

Syntax:

    'string'.wordWrap(maxWidth)
    'string'.wordWrap(maxWidth, lineBreakSequence)

Where:

- `maxWidth` is the desired maximum line length in characters
- `lineBreakSequence` is the Line-break sequence to insert (defaults to "\n")

Examples:

```javascript
"testing this line from here".wordWrap(10) // testing\nthis line\nfrom here
```

```javascript
"Hello Beautiful World".wordWrap(16, "===") // Hello Beautiful===World
```

### HumanDuration

`HumanDuration` converts a duration into a human-readable format.

```javascript
// Converting a duration into a human-readable format:
HumanDuration(3600) // "1 hour"
```

```javascript
// Converting another duration:
HumanDuration(600) // "10 minutes"
```

```javascript
// Converting a longer duration:
HumanDuration(86400) // "1 day"
```

### HumanSize

`HumanSize` converts a size in bytes into a human-readable format.

```javascript
// Converting a size into a human-readable format:
HumanSize(1024) // "1 KiB"
```

```javascript
// Converting another size:
HumanSize(1048576) // "1 MiB"
```

```javascript
// Converting a larger size:
HumanSize(1073741824) // "1 GiB"
```

### Semver

`Semver` parses a version string and returns a map containing the major, minor, patch, prerelease, metadata, and original version.

```javascript
// Parsing a semantic version:
Semver("1.2.3-alpha+meta") // a map with major: "1", minor: "2", patch: "3", prerelease: "alpha", metadata: "meta", original: "1.2.3-alpha+meta"
```

```javascript
Semver("2.3.4-beta+meta2") // a map with major: "2", minor: "3", patch: "4", prerelease: "beta", metadata: "meta2", original: "2.3.4-beta+meta2"
```

```javascript
// Parsing a simple semantic version:
Semver("3.4.5") // a map with major: "3", minor: "4", patch: "5", prerelease: "", metadata: "", original: "3.4.5"
```

### SemverCompare

`SemverCompare` compares two semantic version strings.

```javascript
// Comparing two semantic versions:
SemverCompare("1.2.3", "1.2.4") // false
```

```javascript
// Comparing two identical versions:
SemverCompare("2.3.4", "2.3.4") // true
```

```javascript
// Comparing with a prerelease version:
SemverCompare("3.4.5", "3.4.5-alpha") // false
```

## YAML

### YAML

`YAML` converts a YAML formatted string into a map. It provides an easy way to handle YAML data.

```javascript
// Converting a simple YAML string to a map:
YAML("name: Alice\nage: 30") // a map with keys "name" and "age"
```

```javascript
// Handling a YAML sequence:
YAML("numbers:\n- 1\n- 2\n- 3") // a map with a key "numbers" containing an array
```

```javascript
// Nested YAML data conversion:
YAML("person:\n  name: Bob\n  age: 35") // a nested map
```

### toYAML

`toYAML` converts an object into a YAML formatted string.

```javascript
toYAML({ name: "John" })
toYAML(["John", "Alice"])
```

### YAMLArray

`YAMLArray` converts a YAML formatted string representing a sequence into an array.

```javascript
// Converting a YAML sequence to an array:
YAMLArray("- 1\n- 2\n- 3") // an array [1, 2, 3]
```

```javascript
// Handling complex objects in a YAML sequence:
YAMLArray("- name: Alice\n- name: Bob") // an array of maps
```

```javascript
// An empty YAML sequence:
YAMLArray("") // an empty array
```

---

## TOML

### TOML

`TOML` converts a TOML formatted string into a map, making it easy to work with TOML data.

```javascript
// Converting a TOML string to a map:
TOML('name = "Alice"\nage = 30') // a map with keys "name" and "age"
```

```javascript
// Handling an array in TOML:
TOML("numbers = [1, 2, 3]") // a map with a key "numbers" containing an array
```

```javascript
// Nested TOML data conversion:
TOML('[person]\nname = "Bob"\nage = 35') // a nested map
```

### toTOML

`toTOML` converts a map or an array into a TOML formatted string.

Syntax:

    toTOML(data)

Where:

- `data` is the map or array to be converted.

Examples:

```javascript
// Converting a map to a TOML string:
toTOML({ name: "Alice", age: 30 }) // "name = \"Alice\"\nage = 30"
```

```javascript
// Handling an array (TOML arrays must be of the same type):
toTOML({ people: ["Alice", "Bob"] }) // "people = [\"Alice\", \"Bob\"]"
```

```javascript
// An empty map:
toTOML({}) // an empty string
```

---

## uuid

### uuid.Nil

`uuid.Nil` returns the nil UUID.

```javascript
uuid.V1() != uuid.Nil()
```

### uuid.V1

`uuid.V1` returns a version 1 UUID.

```javascript
uuid.V1() != uuid.Nil()
```

### uuid.V4

`uuid.V4` returns a version 4 UUID.

```javascript
uuid.V4() != uuid.Nil()
```

### uuid.IsValid

`uuid.IsValid` checks if a string is a valid UUID.

```javascript
uuid.IsValid("2a42e576-c308-4db9-8525-0513af307586")
```

### uuid.Parse

`uuid.Parse` parses a string into a UUID.

```javascript
uuid.Parse("2a42e576-c308-4db9-8525-0513af307586")
```
