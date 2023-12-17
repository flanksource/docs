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

---

## aws

### aws.arnToMap

Takes in an AWS arn and parses it and returns a map.

Snytax

```
    aws.arnToMap(string): map[string]string

    arnToMap(string): map[string]string // Deprecated

    Where
        - arg: string
        - returns: map[string]string{
            "service": string,
            "region": string,
            "account": string,
            "resource": string,
        }
```

Examples:

```javascript
aws.arnToMap("arn:aws:sns:eu-west-1:123:MMS-Topic").region; // evaluates to 'eu-west-1'
```

### aws.fromAWSMap

`aws.fromAWSMap` takes a list of `map[string]string` and merges them into a single map. The input map is expected to have the field "Name".

Syntax

```
    aws.fromAWSMap([]map[string]string{}): map[string]string{}

    fromAWSMap([]map[string]string{}): map[string]string{} // Deprecated
```

Examples:

```javascript
`aws.fromAWSMap(x).hello" == "world"`; // evaluates to `true`
// Where
// x = [
//   { Name: 'hello', Value: 'world' },
//   { Name: 'John', Value: 'Doe' },
// ];
```

---

## base64

### base64.encode

The `base64.encode` function encodes the given byte slice to a Base64 encoded string.

Syntax:

    base64.encode([]bytes): string

Examples:

```javascript
base64.decode("aGVsbG8="); // return b'hello'
```

```javascript
base64.decode("aGVsbG8"); // error
```

### base64.decode

The `base64.decode` function decodes the given base64 encoded string back to its original form.

Syntax:

    base64.decode(string): []bytes

Examples:

```javascript
base64.decode("aGVsbG8="); // return b'hello'
```

```javascript
base64.decode("aGVsbG8"); // error
```

---

## collections

### in

The membership test operator checks whether an element is a member of a collection, such as a list or a map. It's worth noting that the `in` operator doesn't check for value membership in maps, only key membership.

Syntax:

```javascript
`a in b` Where `a` is the element you're checking for, and `b` is the collection.
```

Examples:

```javascript
`"apple" in ["apple", "banana"]` // evaluates to `true`
`3 in [1, 2, 4]`; // evaluates to `false`
```

### size

The `size` function in CEL is used to determine the number of elements in a collection or the number of Unicode characters in a string.

Syntax:

```
    collection.size() or string.size()
```

Examples:

```javascript
// Getting the size of a list:
["apple", "banana", "cherry"].size(); // Evaluates to 3
```

```javascript
// Determining the number of characters in a string:
"hello".size(); // Evaluates to 5
```

### has

The `has` macro checks for the presence of a field in a message. It's particularly useful for protobuf messages where fields can be absent rather than set to a default value. It's especially useful for distinguishing between a field being set to its default value and a field being unset. For instance, in a protobuf message, an unset integer field is indistinguishable from that field set to 0 without the `has` macro.

Syntax

```javascript
x.has(y);
```

Where `x` is the message and `y` is the field you're checking for.

Examples:

If you have a message `person` with a potential field `name`, you can check for its presence with:

```javascript
person.has(name); // Evaluates to true if 'name' is present, false otherwise
```

```javascript
addressBook.has(person.email); // Evaluates to true if 'email' field is present in 'person' within 'addressBook'
```

### map

The `map` macro creates a new collection by applying a function to each entry of an existing collection. It's useful for transforming the elements of a list or the values of a map.

Syntax:

```javascript
//For lists
list.map(e, <function>)
```

```javascript
// For maps:
map.map(k, v, <function>)
```

Where:

- `list` is the list you're transforming.
- `map` is the map you're transforming.
- `e` represents each element of the list.
- `k` represents each key of the map.
- `v` represents each value of the map.
- `<function>` is the transformation function applied to each entry.

Examples:

```javascript
// Transforming each element of a list by multiplying it by 2:
[1, 2, 3].map(e, e * 2); // Evaluates to [2, 4, 6]
```

```javascript
// Transforming the values of a map by appending "!" to each value:
{"a": "apple", "b": "banana"}.map(k, v, v + "!")  // Evaluates to {"a": "apple!", "b": "banana!"}
```

```javascript
// Using both key and value for transformation in a map:
{"a": 1, "b": 2}.map(k, v, k + v)  // Evaluates to {"a": "a1", "b": "b2"}
```

### filter

The `filter` macro creates a new collection containing only the elements or entries of an existing collection that satisfy a given condition.

Syntax:

```javascript
//For lists:
list.filter(e, <condition>)
```

```javascript
//For maps:
map.filter(k, v, <condition>)
```

Where:

- `list` is the list you're filtering.
- `map` is the map you're filtering.
- `e` represents each element of the list.
- `k` represents each key of the map.
- `v` represents each value of the map.
- `<condition>` is the condition applied to each entry.

Examples:

```javascript
// Filtering a list to include only numbers greater than 2:
[1, 2, 3, 4].filter(e, e > 2); // Evaluates to [3, 4]
```

```javascript
// Filtering a map to include only entries with values greater than 1:
{"a": 1, "b": 2, "c": 3}.filter(k, v, v > 1)  // Evaluates to {"b": 2, "c": 3}
```

### all

The `all` macro checks if all elements of a collection, such as a list or a map, satisfy a given condition. It returns a boolean value based on the evaluation.

Syntax:

```javascript
//For lists:
list.all(e, <condition>)
```

```javascript
//For maps:
map.all(k, v, <condition>)
```

Where:

- `list` is the list you're checking.
- `map` is the map you're checking.
- `e` represents each element of the list.
- `k` represents each key of the map.
- `v` represents each value of the map.
- `<condition>` is the condition applied to each entry.

Examples:

```javascript
// Checking if all elements of a list are greater than 0:
[1, 2, 3].all(e, e > 0); // Evaluates to true
```

```javascript
// Checking if all values of a map are non-empty strings:
{"a": "apple", "b": "banana", "c": ""}.all(k, v, v != "")  // Evaluates to false
```

```javascript
// Using both key and value for condition in a map:
{"a": 1, "b": 2, "c": 3}.all(k, v, k != "a" || v > 1)  // Evaluates to true
```

### exists

The `exists` macro checks if there exists an element in a collection, such as a list or a map, that satisfies a given condition. It returns a boolean value based on the evaluation.

Syntax:

```javascript
// For lists
list.exists(e, <condition>)
```

```javascript
// For maps
map.exists(k, v, <condition>)
```

Where:

- `list` is the list you're checking.
- `map` is the map you're checking.
- `e` represents each element of the list.
- `k` represents each key of the map.
- `v` represents each value of the map.
- `<condition>` is the condition applied to each entry.

Examples:

```javascript
//Checking if any element of a list is equal to 2:
[1, 2, 3].exists(e, e == 2); // Evaluates to true
```

```javascript
//Checking if any value of a map is an empty string:
{"a": "apple", "b": "banana", "c": ""}.exists(k, v, v == "")  // Evaluates to true
```

```javascript
/Using both key and value for condition in a map:
{"a": 1, "b": 2, "c": 3}.exists(k, v, k == "a" && v == 1)  // Evaluates to true
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
// Computing the sum of all elements of a list:
[1, 2, 3].fold(e, acc, acc + e); // Evaluates to 6
```

```javascript
// Concatenating all values of a map:
{"a": "apple", "b": "banana"}.fold(k, v, acc, acc + v)  // Evaluates to "applebanana"
```

### slice

Returns a new sub-list using the indexes provided.

```javascript
<list>.slice(<int>, <int>) -> <list>
```

Examples:

```javascript
[1, 2, 3, 4]
  .slice(1, 3) // return [2, 3]
  [(1, 2, 3, 4)].slice(2, 4); // return [3 ,4]
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
sets.contains([], []); // true
```

```javascript
sets.contains([], [1]); // false
```

```javascript
sets.contains([1, 2, 3, 4], [2, 3]); // true
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
sets.equivalent([], []); // true
```

```javascript
sets.equivalent([1], [1, 1]); // true
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

    sets.intersects(list(T), list(T)) -> bool

Examples:

```javascript
sets.intersects([1], []); // false
```

```javascript
sets.intersects([1], [1, 2]); // true
```

```javascript
sets.intersects(
  [[1], [2, 3]],
  [
    [1, 2],
    [2, 3.0],
  ]
); // true
```

---

## csv

### CSV

The `CSV` function converts a CSV formatted array into a two-dimensional array, where each element is a row string.

Syntax:

    CSV(csvRowList)

Where:

- `csvRowList` is a list of rows.

Examples:

```javascript
CSV(["Alice,30", "Bob,31"])[0][0]; // Evaluates to "Alice"
```

---

<!-- ### data.CSVByRow

The `data.CSVByRow` function converts a CSV formatted string into an array of maps, where each map represents a row with column names as keys.

Syntax:

    data.CSVByRow(csvString)

Where:

- `csvString` is the CSV formatted string.

Examples:

```javascript
Converting a CSV string with headers to an array of maps:
data.CSVByRow("name,age\nAlice,30\nBob,35")  // Evaluates to [{"name": "Alice", "age": "30"}, {"name": "Bob", "age": "35"}]

Handling a single row CSV:
data.CSVByRow("name,age\nAlice,30")  // Evaluates to [{"name": "Alice", "age": "30"}]

An empty CSV string:
data.CSVByRow("")  // Evaluates to an empty array
```

---

### data.CSVByColumn

The `data.CSVByColumn` function converts a CSV formatted string into a map of arrays, where keys are column names and values are arrays of column values.

Syntax:

    data.CSVByColumn(csvString)

Where:

- `csvString` is the CSV formatted string.

Examples:

```javascript
Converting a CSV string with headers to a map of arrays:
data.CSVByColumn("name,age\nAlice,30\nBob,35")  // Evaluates to {"name": ["Alice", "Bob"], "age": ["30", "35"]}

Handling a single column CSV:
data.CSVByColumn("name\nAlice\nBob")  // Evaluates to {"name": ["Alice", "Bob"]}

An empty CSV string:
data.CSVByColumn("")  // Evaluates to an empty map
```

---

### toCSV

The `data.ToCSV` function converts an array of arrays or an array of maps into a CSV formatted string.

Syntax:

    data.ToCSV(data)

Where:

- `data` is the array of arrays or array of maps to be converted.

Examples:

```javascript
Converting an array of arrays to a CSV string:
data.ToCSV([["Alice", 30], ["Bob", 35]])  // Evaluates to "Alice,30\nBob,35"

Handling an array of maps:
data.ToCSV([{"name": "Alice", "age": 30}, {"name": "Bob", "age": 35}])  // Evaluates to "name,age\nAlice,30\nBob,35"

An empty array:
data.ToCSV([])  // Evaluates to an empty string
```

--- -->

## crypto

### crypto.SHA1

The `crypto.SHA1` function in CEL is used to compute the SHA-1 hash of the input data. Note that SHA-1 is considered insecure for cryptographic purposes.

Syntax:

    crypto.SHA1(data)

Where:

- `data` is the input data to be hashed.

Examples:

```javascript
// Hashing a simple string:
crypto.SHA1("hello"); // Might evaluate to "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c"
```

```javascript
// Hashing a number represented as a string:
crypto.SHA1("12345"); // Might evaluate to "8cb2237d0679ca88db6464eac60da96345513964"
```

```javascript
// Hashing special characters:
crypto.SHA1("!@#"); // Might evaluate to "8f9b6cb1cf7d70f23c16c9b9d4894d7f3b8fe15d"
```

### crypto.SHA224

The `crypto.SHA224` function in CEL calculates the SHA-224 hash of the provided input data, offering a balance between security and performance.

Syntax:

    crypto.SHA224(data)

Where:

- `data` is the input data to be hashed.

Examples:

```javascript
// Hashing a simple string:
crypto.SHA224("hello"); // Might evaluate to "ea09ae9cc6768c50fcee903ed054556e5bfc8347907f12598aa24193"
```

```javascript
// Hashing a number represented as a string:
crypto.SHA224("12345"); // Might evaluate to "a7470858e79c282bc2f6adfd831b132672dfd1224c1e78cbf5bcd057"
```

### crypto.SHA256

The `crypto.SHA256` function in CEL calculates the SHA-256 hash of the provided input data, offering a balance between security and performance.

Syntax:

    crypto.SHA256(data)

Where:

- `data` is the input data to be hashed.

Examples:

```javascript
// Hashing a simple string:
crypto.SHA256("hello"); // Might evaluate to "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
```

```javascript
// Hashing a number represented as a string:
crypto.SHA256("12345"); // Might evaluate to "d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2"
```

```javascript
// Hashing special characters:
crypto.SHA256("!@#"); // Might evaluate to "d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8"
```

### crypto.SHA384

The `crypto.SHA384` function in CEL is used for computing the SHA-384 hash of the input data, which is a truncated version of SHA-512 and provides enhanced security.

Syntax:

    crypto.SHA384(data)

Where:

- `data` is the input data to be hashed.

Examples:

```javascript
// Hashing a simple string:
crypto.SHA384("hello"); // Might evaluate to a long hash string
```

```javascript
// Hashing a number represented as a string:
crypto.SHA384("12345"); // Might evaluate to another long hash string
```

```javascript
// Hashing special characters:
crypto.SHA384("!@#"); // Might evaluate to yet another long hash string
```

### crypto.SHA512

The `crypto.SHA512` function in CEL calculates the SHA-512 hash of the given input data. It's commonly used for data integrity verification and password storage.

Syntax:

    crypto.SHA512(data)

Where:

- `data` is the input data to be hashed.

Examples:

```javascript
// Hashing a simple string:
crypto.SHA512("hello"); // Might evaluate to a very long hash string
```

```javascript
// Hashing a number represented as a string:
crypto.SHA512("12345"); // Might evaluate to another very long hash string
```

```javascript
// Hashing special characters:
crypto.SHA512("!@#"); // Might evaluate to yet another very long hash string
```

---

## dates

### timestamp

The `timestamp` function in CEL is used to represent a point in time. It's typically used in conjunction with other functions to extract or manipulate time-related data.

Syntax:

    timestamp("YYYY-MM-DDTHH:MM:SSZ")

Where:

- The string inside the function represents the date and time.

Examples:

```javascript
// Creating a timestamp for January 1st, 2023:
timestamp("2023-01-01T00:00:00Z");
```

```javascript
// Creating another timestamp:
timestamp("2023-07-04T12:00:00Z");
```

### getDate

The `getDate` function in CEL is used to extract the date part from a timestamp. It returns a string representation of the date.

Syntax:

    timestamp.getDate()

Where:

- `timestamp` is the timestamp value from which you're extracting the date.

Examples:

```javascript
// Extracting the date from a timestamp:
"2023-01-01T12:34:56Z".getDate(); // Evaluates to "2023-01-01"
```

```javascript
// Getting the date from another timestamp:
"2023-07-04T00:00:00Z".getDate(); // Evaluates to "2023-07-04"
```

### get[DatePart]

| Function                   | Description                                                                                    | Example |
| -------------------------- | ---------------------------------------------------------------------------------------------- | ------- |
| `{date>.getDayOfMonth()`   | A integer value representing the day of the month, with the first day being 1.                 | 1 - 31  |
| ` <date>.getDayOfWeek()`   | eturns an integer value representing the day of the week, where Sunday is 0 and Saturday is 6. | 0 - 6   |
| `<date>.getDayOfYear()`    | an integer value representing the day of the year, with January 1st being day 1.               | 1 - 366 |
| `<date>.getDayOfMonth()`   | the full year (4 digits for 4-digit years) of the specified timestamp.                         |         |
| `<date>.getHours()`        | the full year (4 digits for 4-digit years) of the specified timestamp.                         | 0- 23   |
| `<date>.getMilliseconds()` |                                                                                                | 0 -999  |
| `<date>.getMinutes()`      |                                                                                                |         |
| `<date>.getMonth()`        |                                                                                                | 0 -11   |
| `<date>.getSeconds()`      | 0 - 59                                                                                         | 0 - 59  |
| `<date>.getHours()`        |                                                                                                |         |

### duration

The `duration` function in CEL creates a new duration from a string representation. The string format is an integer followed by a unit: `s` for seconds, `m` for minutes, `h` for hours, and `d` for days.

Syntax:

    duration(stringRepresentation)

Examples:

```javascript
// Creating a duration of 5 hours:
duration("5h"); // Represents a duration of 5 hours
```

```javascript
// Creating a duration of 30 minutes:
duration("30m"); // Represents a duration of 30 minutes
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

The `time.ZoneName` function in CEL returns the name of the local system's time zone. It doesn't require any parameters and is useful for retrieving the time zone information.

Syntax:

    time.ZoneName()

Examples:

```javascript
// Retrieving the local time zone name:
time.ZoneName(); // Might evaluate to "PST" if the local time zone is Pacific Standard Time
```

```javascript
// Another example of retrieving the time zone:
time.ZoneName(); // Could evaluate to "EST" for Eastern Standard Time
```

```javascript
// Yet another example:
time.ZoneName(); // Might evaluate to "UTC" for Coordinated Universal Time
```

### time.ZoneOffset

The `time.ZoneOffset` function in CEL returns the offset of the local system's time zone in minutes. It helps in understanding the time difference between the local time zone and UTC.

Syntax:

    time.ZoneOffset()

Examples:

```javascript
// Getting the time zone offset:
time.ZoneOffset(); // Could evaluate to -480 for PST
```

```javascript
// Another example of getting the offset:
time.ZoneOffset(); // Might evaluate to 0 for UTC
```

```javascript
// Yet another example:
time.ZoneOffset(); // Could evaluate to 330 for IST (Indian Standard Time)
```

### time.Parse

The `time.Parse` function in CEL is used to parse a given string into a time object based on a specified layout. It's handy for converting string representations of time into actual time objects.

Syntax:

    time.Parse(layout, value)

Where:

- `layout` is the time layout string.
- `value` is the string representation of the time to be parsed.

Examples:

```javascript
// Parsing a time string with a specific format:
time.Parse("2006-01-02", "2023-09-26"); // Evaluates to a time object representing September 26, 2023
```

```javascript
// Another example with a different format:
time.Parse("02-01-2006", "26-09-2023"); // Evaluates to the same time object as above
```

```javascript
// Parsing a time with hour and minute information:
time.Parse("15:04 02-01-2006", "14:30 26-09-2023"); // Includes time of day information
```

### time.ParseLocal

The `time.ParseLocal` function in CEL parses a given string into a time object according to a specified layout and the local time zone. It's useful for working with local times.

Syntax:

    time.ParseLocal(layout, value)

Where:

- `layout` is the time layout string.
- `value` is the string representation of the time to be parsed.

Examples:

```javascript
// Parsing a local time string:
time.ParseLocal("2006-01-02 15:04", "2023-09-26 14:30"); // Evaluates to a local time object for 14:30 on September 26, 2023
```

```javascript
// Another example:
time.ParseLocal("02-01-2006", "26-09-2023"); // Evaluates to a local time object for September 26, 2023
```

```javascript
// Parsing with a different time format:
time.ParseLocal("15:04 02-01-2006", "14:30 26-09-2023"); // Includes time of day information in local time zone
```

### time.ParseInLocation

The `time.ParseInLocation` function in CEL parses a string into a time object according to a specified layout and time zone. It provides more control over the time zone compared to `time.ParseLocal`.

Syntax:

    time.ParseInLocation(layout, location, value)

Where:

- `layout` is the time layout string.
- `location` is the string name of the time zone.
- `value` is the string representation of the time to be parsed.

Examples:

```javascript
// Parsing a time string for a specific time zone:
time.ParseInLocation("2006-01-02", "America/New_York", "2023-09-26"); // Evaluates to a time object for EST/EDT
```

```javascript
// Another example for a different time zone:
time.ParseInLocation("02-01-2006", "Europe/London", "26-09-2023"); // Evaluates to a time object for GMT/BST
```

```javascript
// Parsing with hour and minute for a specific zone:
time.ParseInLocation("15:04 02-01-2006", "Asia/Tokyo", "14:30 26-09-2023"); // Evaluates to a time object for JST
```

### time.Now

The `time.Now` function in CEL returns the current time. It's a straightforward way to retrieve the current date and time according to the system's local time zone.

Syntax:

    time.Now()

Examples:

```javascript
// Getting the current time:
time.Now(); // Evaluates to the current date and time
```

```javascript
// Another example of retrieving the current time:
time.Now(); // Will always return the current moment's date and time
```

```javascript
// Yet another example:
time.Now(); // Useful for timestamping or time-stamping events in real-time
```

### time.ParseDuration

The `time.ParseDuration` function in CEL parses a string into a duration. It supports various units like "s" for seconds, "m" for minutes, "h" for hours, etc.

Syntax:

    time.ParseDuration(duration)

Where:

- `duration` is the string representation of the duration.

Examples:

```javascript
// Parsing a duration string:
time.ParseDuration("1h30m"); // Evaluates to a duration of 1 hour and 30 minutes
```

```javascript
// Another example with a different format:
time.ParseDuration("15m30s"); // Evaluates to a duration of 15 minutes and 30 seconds
```

```javascript
// Parsing a negative duration:
time.ParseDuration("-2h45m"); // Evaluates to a duration of -2 hours and -45 minutes
```

### time.Since

The `time.Since` function in CEL calculates the duration that has elapsed since a given time. It is commonly used to measure the time difference between a specified time and the current moment.

Syntax:

    time.Since(pastTime)

Where:

- `pastTime` is a `time.Time` object representing a past point in time.

Examples:

```javascript
// Calculating the time elapsed since a specific past time:
time.Since(time.Parse("2006-01-02", "2023-09-26")); // Evaluates to the duration since September 26, 2023
```

```javascript
// Another example with a different past time:
time.Since(time.Parse("15:04 02-01-2006", "14:30 26-09-2023")); // Evaluates to the duration since 14:30 on September 26, 2023
```

```javascript
// Using the `time.Now` function for a real-time duration:
time.Since(time.Now()); // Always evaluates to a very small duration, as it's the time since "now"
```

### time.Until

The `time.Until` function in CEL calculates the duration remaining until a specified future time. It helps in determining the time left for an event or deadline.

Syntax:

    time.Until(futureTime)

Where:

- `futureTime` is a `time.Time` object representing a future point in time.

Examples:

```javascript
// Calculating the time remaining until a specific future time:
time.Until(time.Parse("2006-01-02", "2023-10-01")); // Evaluates to the duration until October 1, 2023
```

```javascript
// Another example with a different future time:
time.Until(time.Parse("15:04 02-01-2006", "16:00 30-09-2023")); // Evaluates to the duration until 16:00 on September 30, 2023
```

```javascript
// Using the `time.Now` function for a real-time duration:
time.Until(time.Now()); // Always evaluates to zero, as it's the time until "now"
```

---

## encode

### urlencode

The `urlencode` function encodes the given string into a URL-encoded string.

Syntax:

    urlencode(string)

Examples:

```javascript
urlencode("hello world ?"); // Evaluates to hello+world+%3F
```

### urldecode

The `urldecode` function decodes a URL-encoded string.

Syntax:

    urldecode(string)

Examples:

```javascript
urldecode("hello+world+%3F"); // Evaluates to 'hello world ?'
```

---

## filepath

### filepath.Base

The `filepath.Base` function returns the last element of path.
Trailing path separators are removed before extracting the last element.
If the path is empty, Base returns ".".
If the path consists entirely of separators, Base returns a single separator.

Syntax:

    filepath.Base(string)

Examples:

```javascript
filepath.Base("/home/flanksource/projects/gencel"); // Evaluates to gencel
```

### filepath.Clean

`filepath.Clean` returns the shortest path name equivalent to path by purely lexical processing.
It applies the following rules iteratively until no further processing can be done:

Syntax:

    filepath.Clean(string)

Examples:

```javascript
filepath.Clean("/foo/bar/../baz"); // Evaluates /foo/baz
```

### filepath.Dir

`filepath.Dir` returns all but the last element of path, typically the path's directory.
After dropping the final element, Dir calls Clean on the path and trailing
slashes are removed.
If the path is empty, Dir returns ".".
If the path consists entirely of separators, Dir returns a single separator.
The returned path does not end in a separator unless it is the root directory.

Syntax:

    filepath.Dir(string)

Examples:

```javascript
filepath.Dir("/home/flanksource/projects/gencel"); // Evaluates to /home/flanksource/projects
```

### filepath.Ext

`filepath.Ext` returns the file name extension used by path.
The extension is the suffix beginning at the final dot in the final element of path; it is empty if there is no dot.

Syntax:

    filepath.Ext(string)

Examples:

```javascript
filepath.Ext("/opt/image.jpg"); // Evaluates to .jpg
```

### filepath.IsAbs

The `filepath.IsAbs` function reports whether the path is absolute.

Syntax:

    filepath.IsAbs(string)

Examples:

```javascript
filepath.Base("/home/flanksource/projects/gencel"); // Evaluates to true
```

```javascript
filepath.Base("projects/gencel"); // Evaluates to false
```

### filepath.Join

The `filepath.Join` function joins any number of path elements into a single path,
separating them with an OS specific Separator. Empty elements
are ignored. The result is Cleaned. However, if the argument
list is empty or all its elements are empty, Join returns
an empty string.
On Windows, the result will only be a UNC path if the first
non-empty element is a UNC path.

Syntax:

    filepath.Join([]string)

Examples:

```javascript
filepath.Join(["/home/flanksource", "projects", "gencel"]; // Evaluates to /home/flanksource/projects/gencel
```

### filepath.Match

The `filepath.Match` function reports whether name matches the shell file name pattern.

Syntax:

    filepath.Match(pattern, inputString)

Examples:

```javascript
filepath.Match("*.txt", "foo.json"); // Evaluates to false
```

```javascript
filepath.Match("*.txt", "foo.txt"); // Evaluates to true
```

### filepath.Rel

The `filepath.Rel` function returns a relative path that is lexically equivalent to targpath when
joined to basepath with an intervening separator. That is,
Join(basepath, Rel(basepath, targpath)) is equivalent to targpath itself.
On success, the returned path will always be relative to basepath,
even if basepath and targpath share no elements.
An error is returned if targpath can't be made relative to basepath or if
knowing the current working directory would be necessary to compute it.
Rel calls Clean on the result.

Syntax:

    filepath.Rel(basepath, targetpath)

Examples:

```javascript
filepath.Rel("/foo/bar", "/foo/bar/baz"); // Evaluates to baz
```

### filepath.Split

The `filepath.Split` function splits path immediately following the final Separator,
separating it into a directory and file name component.
If there is no Separator in path, Split returns an empty dir
and file set to path.
The returned values have the property that path = dir+file.

Syntax:

    filepath.Split(path) (dir, file)

Examples:

```javascript
filepath.Split("/foo/bar/baz"); // Evaluates to [/foo/bar/ baz]
```

---

## JSON

### .JSON

The `JSON` method in CEL is used to convert a JSON formatted string into a map.

Syntax:

    jsonObjectString.JSON()

Where:

- `jsonObjectString` is the JSON formatted string representing a JSON object.

Examples:

```javascript
'{"name": "Alice", "age": 30}'.JSON();
```

### .JSONArray

The `JSONArray` method converts a JSON formatted string into an array. It is particularly useful for handling JSON arrays.

Syntax:

    jsonArrayString.JSONArray()

Where:

- `jsonArrayString` is the JSON formatted string representing an array.

Examples:

```javascript
'[{"name": "Alice"}, {"name": "Bob"}]'.JSONArray();
```

### .toJSON

The `toJSON` method converts any data type into a JSON formatted string.

Syntax:

```
    any.toJSON()
```

Examples:

```javascript
[{ name: "John" }].toJSON(); // [{"name":"John"}]
```

```javascript
{'name': 'John'}.toJSON() // {"name":"John"}
```

```javascript
1.toJSON() // 1
```

### .toJSONPretty

The `toJSONPretty` method converts any data type into a JSON formatted string with proper indentation.

Syntax:

    any.toJSONPretty(indent)

Where:

- `indent` is the string used for indentation.

Examples:

```javascript
{'name': 'aditya'}.toJSONPretty('\t')
// Evaluates to
// {
// 	"name": "aditya"
// }
```

```javascript
// Using tab for indentation:
["Alice", 30].toJSONPretty("\t");
```

```javascript
// An empty map with four spaces indent:
{}.toJSONPretty("    ", );
```

### jq

The `jq` function in CEL applies a jq expression to filter or transform data.

Syntax:

    jq(jqExpr, data)

Where:

- `jqExpr` is the jq expression you're applying.
- `data` is the data you're filtering or transforming.

Examples:

```javascript
// Filtering data with a jq expression:
jq(".name", { name: "John", age: 30 }); // Evaluates to "John"
```

```javascript
// Transforming data with a jq expression:
jq("{name, age}", { name: "John", age: 30, city: "NY" }); // Evaluates to {"name": "John", "age": 30}
```

```javascript
// Using a complex jq expression:
jq(".[] | select(.age > 25)", [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
]); // Evaluates to [{"name": "John", "age": 30}]
```

---

## kubernetes

### k8s.cpuAsMillicores

The `k8s.cpuAsMillicores` function returns the millicores of a Kubernetes resource.

Syntax:

    k8s.cpuAsMillicores(resource): int

Where:

    resource: memory representation string

Examples:

```javascript
k8s.cpuAsMillicores("10m"); // 10
```

```javascript
k8s.cpuAsMillicores("0.5"); // 500
```

```javascript
k8s.cpuAsMillicores("1.234"); // 1234
```

### k8s.getHealth

The `k8s.getHealth` function in CEL retrieves the health status of a Kubernetes resource as a map. The map contains key-value pairs providing detailed information about the resource's health.

Syntax:

```
k8s.getHealth(resource)

GetHealth(resource) // Deprecated

Where:

    - `resource` is the Kubernetes resource whose health information you're retrieving.
```

Examples:

```javascript
// Retrieving the health information of a pod:
k8s.getHealth(pod); // Evaluates to a map with keys and values indicating the pod's health
```

```javascript
// Getting the health information of a service:
k8s.getHealth(service); // Evaluates to a map with keys and values indicating the service's health
```

```javascript
// Checking the health information of a deployment:
k8s.getHealth(deployment); // Evaluates to a map with keys and values indicating the deployment's health
```

### k8s.getStatus

The `k8s.getStatus` function in CEL retrieves the status of a Kubernetes resource as a string. It provides detailed information about the current state of the resource.

Syntax:

```
k8s.getStatus(resource)

GetStatus(resource) // Deprecated

Where:

    - `resource` is the Kubernetes resource whose status you're retrieving.
```

Examples:

```javascript
// Retrieving the status of a pod:
k8s.getStatus(pod); // Evaluates to "Running" if the pod is running
```

```javascript
// Getting the status of a service:
k8s.getStatus(service); // Evaluates to "Active" if the service is active
```

```javascript
// Checking the status of a deployment:
k8s.getStatus(deployment); // Evaluates to "Deployed" if the deployment is successful
```

### k8s.isHealthy

The `k8s.isHealthy` function in CEL is used to determine if a Kubernetes resource is healthy. It returns a boolean value indicating the health status of the resource.

Syntax:

```
k8s.isHealthy(resource)

k8s.is_healthy(resource) // Deprecated
IsHealth(resource) // Deprecated

Where:

    - `resource` is the Kubernetes resource you're checking.
```

Examples:

```javascript
// Checking if a pod is healthy:
k8s.isHealthy(pod); // Evaluates to true if the pod is healthy
```

```javascript
// Verifying the health of a service:
k8s.isHealthy(service); // Evaluates to false if the service is not healthy
```

```javascript
// Assessing the health of a deployment:
k8s.isHealthy(deployment); // Evaluates to true if the deployment is healthy
```

### k8s.memoryAsBytes

The `k8s.memoryAsBytes` function converts the memory string to bytes.

Syntax:

    k8s.memoryAsBytes(resource): int

Where:

    resource: memory representation string

Examples:

```javascript
k8s.memoryAsBytes("10Ki"); // 10240
```

```javascript
k8s.memoryAsBytes("1.234gi"); // 1324997410
```

---

## math

### math.Add

The `math.Add` function takes a list of number and returns their sum

Syntax:

    math.Add(list)

Example:

```javascript
math.Add([1, 2, 3, 4, 5]); // Evaluates to 15
```

### math.Sub

The `math.Sub` function takes two numbers and returns their difference

Syntax:

    math.Sub(num1, num2)

Example:

```javascript
math.Sub(5, 4); // Evaluates to 1
```

### math.Mul

The `math.Mul` function takes a list of numbers and returns their product

Syntax:

    math.Mul(list)

Example:

```javascript
math.Mul([1, 2, 3, 4, 5]); // Evaluates to 120
```

### math.Div

The `math.Div` function takes two numbers and returns their quotient

Syntax:

    math.Div(num1, num2)

Example:

```javascript
math.Div(4, 2); // Evaluates to 2
```

### math.Rem

The `math.Rem` function takes two numbers and returns their remainder

Syntax:

    math.Rem(num1, num2)

Example:

```javascript
math.Rem(4, 3); // Evaluates to 1
```

### math.Pow

The `math.Pow` function takes two numbers and returns their power

Syntax:

    math.Pow(num1, num2)

Example:

```javascript
math.Pow(4, 2); // Evaluates to 16
```

### math.Seq

The `math.Seq` function generates a sequence of numbers from the start value to the end value, incrementing by the step value.

Syntax:

    math.Seq([start, end, ?step])

Where:

- `start` is the starting value of the sequence.
- `end` is the ending value of the sequence.
- `step` is the increment value of the sequence. (optional. Defaults to 1)

Examples:

```javascript
math.Seq([1, 5]); // Evaluates to [1, 2, 3, 4, 5]
```

```javascript
math.Seq([1, 6, 2]); // Evaluates to [1, 3, 5]
```

### math.Abs

The `math.Abs` function takes a number and returns its absolute value

Syntax:

    math.Abs(num)

Example:

```javascript
math.Abs(-1); // Evaluates to 1
```

### math.greatest

The `math.greatest` function takes a list of numbers and returns the greatest value

Syntax:

    math.greatest(list)

Example:

```javascript
math.greatest([1, 2, 3, 4, 5]); // Evaluates to 5
```

### math.least

The `math.least` function takes a list of numbers and returns the least value

Syntax:

    math.least(list)

Example:

```javascript
math.least([1, 2, 3, 4, 5]); // Evaluates to 1
```

### math.Ceil

The `math.Ceil` function returns the smallest integer greater than or equal to the provided float.

Syntax:

    math.Ceil(value)

Example:

```javascript
math.Ceil(2.3); // Evaluates to 3
```

### math.Floor

The `math.Floor` function returns the largest integer less than or equal to the provided float.

Syntax:

    math.Floor(value)

Example:

```javascript
math.Floor(2.3); // Evaluates to 2
```

### math.Round

The `math.Round` function returns the nearest integer to the provided float.

Syntax:

    math.Round(value)

Example:

```javascript
math.Round(2.3); // Evaluates to 2
```

---

## random

### random.ASCII

The `random.ASCII` function generates random ASCII strings of a specified length.

Syntax:

    random.ASCII(count)

Examples:

```javascript
random.ASCII(5);
```

### random.Alpha

The `random.Alpha` function generates random alphabetic strings of a specified length.

Syntax:

    random.Alpha(count)

```javascript
random.Alpha(5);
```

### random.AlphaNum

The `random.AlphaNum` function generates random alphanumeric strings of a specified length.

Syntax:

    random.AlphaNum(count)

```javascript
random.AlphaNum(5);
```

### random.String

The `random.String` function generates random strings of a specified length and character set.

Syntax:

    random.String(count, [min, max])

Where:
characters is a list specifying the characters to be used in the string.
Optionally, the list can also be left empty to use the default character set.

Examples:

```javascript
random.String(5, ["a", "d"]);
```

```javascript
random.String(5, []);
```

### random.Item

The `random.Item` function generates a random item from a list.

Syntax:

    random.Item(list)

Example:

```javascript
random.Item(["a", "b", "c"]);
```

### random.Number

The `random.Number` function generates a random integer within a specified range.

Syntax:

    random.Number(min, max)

Where:

- `min` is the minimum value of the range (inclusive).
- `max` is the maximum value of the range (inclusive).

Examples:

```javascript
random.Number(1, 10);
```

### random.Float

The `random.Float` function generates a random float within a specified range.

Syntax:

    random.Float(min, max)

Where:

- `min` is the minimum value of the range (inclusive).
- `max` is the maximum value of the range (inclusive).

Examples:

```javascript
random.Float(1, 10);
```

---

## regexp

### regexp.Find

The `regexp.Find` function in CEL is used to find the first occurrence of a pattern within a string. It returns the matched substring or an error if the pattern is invalid.

Syntax:

    regexp.Find(pattern, input)

Where:

- `pattern` is the regular expression pattern you're looking for.
- `input` is the string you're searching within.

Examples:

```javascript
// Finding a pattern within a string:
regexp.Find("llo", "hello"); // Evaluates to "llo"
```

```javascript
// Searching for digits within a string:
regexp.Find("\\d+", "abc123def"); // Evaluates to "123"
```

```javascript
// Pattern not found in the string:
regexp.Find("xyz", "hello"); // Evaluates to ""
```

---

### regexp.FindAll

The `regexp.FindAll` function in CEL retrieves all occurrences of a pattern within a string, up to a specified count. It returns a list of matched substrings or an error if the pattern is invalid.

Syntax:

    regexp.FindAll(pattern, count, input)

Where:

- `pattern` is the regular expression pattern to find.
- `count` is the maximum number of occurrences to return.
- `input` is the string to search within.

Examples:

```javascript
// Finding all occurrences of a pattern:
regexp.FindAll("a.", -1, "banana"); // Evaluates to ["ba", "na", "na"]
```

```javascript
// Limiting the number of matches:
regexp.FindAll("\\d", 2, "12345"); // Evaluates to ["1", "2"]
```

```javascript
// Pattern not found:
regexp.FindAll("z", -1, "hello"); // Evaluates to []
```

---

### regexp.Match

The `regexp.Match` function in CEL checks if a string matches a given regular expression pattern. It returns a boolean value indicating the match status.

Syntax:

    regexp.Match(pattern, input)

Where:

- `pattern` is the regular expression pattern to match.
- `input` is the string to check.

Examples:

```javascript
// Checking if a string matches a pattern:
regexp.Match("^h.llo", "hello"); // Evaluates to true
```

```javascript
// Pattern does not match the string:
regexp.Match("^b", "apple"); // Evaluates to false
```

```javascript
// Matching digits in a string:
regexp.Match("\\d+", "abc123"); // Evaluates to true
```

---

### regexp.QuoteMeta

The `regexp.QuoteMeta` function in CEL quotes all regular expression metacharacters inside a string. It returns the quoted string.

Syntax:

    regexp.QuoteMeta(input)

Where:

- `input` is the string containing metacharacters to be quoted.

Examples:

```javascript
// Quoting metacharacters in a string:
regexp.QuoteMeta("a.b"); // Evaluates to "a\\.b"
```

```javascript
// String without metacharacters:
regexp.QuoteMeta("abc"); // Evaluates to "abc"
```

```javascript
// Quoting a complex pattern:
regexp.QuoteMeta("[a-z].*"); // Evaluates to "\\[a\\-z\\]\\.\\*"
```

---

### regexp.Replace

The `regexp.Replace` function in CEL replaces occurrences of a pattern within a string with a specified replacement string. It returns the modified string.

Syntax:

    regexp.Replace(pattern, replacement, input)

Where:

- `pattern` is the regular expression pattern to replace.
- `replacement` is the string to replace the pattern with.
- `input` is the original string.

Examples:

```javascript
// Replacing a pattern in a string:
regexp.Replace("a.", "x", "banana"); // Evaluates to "bxnxna"
```

```javascript
// Pattern not found:
regexp.Replace("z", "x", "apple"); // Evaluates to "apple"
```

```javascript
// Replacing digits:
regexp.Replace("\\d+", "num", "abc123"); // Evaluates to "abcnum"
```

---

### regexp.ReplaceLiteral

The `regexp.ReplaceLiteral` function in CEL replaces occurrences of a pattern within a string with a specified replacement string, without interpreting the pattern as a regular expression. It returns the modified string or an error if the pattern is invalid.

Syntax:

    regexp.ReplaceLiteral(pattern, replacement, input)

Where:

- `pattern` is the substring to replace.
- `replacement` is the string to replace the pattern with.
- `input` is the original string.

Examples:

```javascript
// Replacing a substring:
regexp.ReplaceLiteral("apple", "orange", "apple pie"); // Evaluates to "orange pie"
```

```javascript
// Substring not found:
regexp.ReplaceLiteral("z", "x", "apple"); // Evaluates to "apple"
```

```javascript
// Replacing a pattern without regex interpretation:
regexp.ReplaceLiteral("a.", "x", "a.b c.d"); // Evaluates to "x.b c.d"
```

---

### regexp.Split

The `regexp.Split` function in CEL splits a string into a slice of substrings separated by a pattern. It returns the slice of strings or an error if the pattern is invalid.

Syntax:

    regexp.Split(pattern, count, input)

Where:

- `pattern` is the regular expression pattern that separates the substrings.
- `count` is the maximum number of splits. Use -1 for no limit.
- `input` is the string to split.

Examples:

```javascript
// Splitting a string by a pattern:
regexp.Split("a.", -1, "banana"); // Evaluates to ["", "n", "n"]
```

```javascript
// Limiting the number of splits:
regexp.Split("\\s", 2, "apple pie is delicious"); // Evaluates to ["apple", "pie is delicious"]
```

```javascript
// Pattern not found:
regexp.Split("z", -1, "hello"); // Evaluates to ["hello"]
```

---

## strings

### .abbrev

The `abbrev` method on a string abbreviates the string using ellipses. This will turn the string "Now is the time for all good men" into "...s the time for..."
This function works like `Abbreviate(string, int)`, but allows you to specify a "left edge" offset. Note that this left edge is not
necessarily going to be the leftmost character in the result, or the first character following the ellipses, but it will appear
somewhere in the result.
In no case will it return a string of length greater than maxWidth.

```
Syntax:
    'string'.abbrev(maxWidth)
    'string'.abbrev(offset, maxWidth)

Where:

    - str - the string to check
    - offset - left edge of source string
    - maxWidth - maximum length of result string, must be at least 4
```

Examples:

```javascript
"Now is the time for all good men".abbrev(5, 20); // "...s the time for..."
```

```javascript
"KubernetesPod".abbrev(1, 5); // "Ku..."
```

```javascript
"KubernetesPod".abbrev(6); // "Kub..."
```

### .camelCase

The `camelCase` method in CEL converts a given string into camelCase format.

Syntax:

    'string'.camelCase()

Where:

- `string` is the input string to be converted.

Examples:

```javascript
// Converting a string to camelCase:
"hello world".camelCase(); // Evaluates to "HelloWorld"
```

```javascript
// Converting a snake_case string:
"hello_world".camelCase(); // Evaluates to "HelloWorld"
```

```javascript
// Converting a string with spaces and special characters:
"hello beautiful world!".camelCase(); // Evaluates to "HelloBeautifulWorld"
```

### .charAt

Returns the character at the given position. If the position is negative, or
greater than the length of the string, the function will produce an error:

```
    <string>.charAt(<int>) -> <string>
```

Examples:

```javascript
"hello".charAt(4); // return 'o'
```

```javascript
"hello".charAt(5); // return ''
```

```javascript
"hello".charAt(-1); // error
```

### .contains

The `contains` function in CEL is used to check if a string contains a given substring.

Syntax:

    string.contains(substring)

Examples:

```javascript
//Checking if a string contains a certain substring:
"apple".contains("app"); // Evaluates to true
```

### .endsWith

The `endsWith` function in CEL is used to determine if a string ends with a specified substring.

Syntax:

    string.endsWith(substring)

Examples:

```javascript
// Checking if a string ends with a certain substring:
"hello".endsWith("lo"); // Evaluates to true
```

### .indent

The `indent` method on a string indents each line of a string by the specified prefix. Additionally, a width paramater can also be specified
which repeats the prefix that many times.

Syntax:

    'string'.indent(prefix)
    'string'.indent(width, prefix)

Examples:

```javascript
"hello world".indent("=="); // ==hello world
```

```javascript
"hello world".indent(4, "-"); // ----hello world
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
"hello mellow".indexOf(""); // returns 0
```

```javascript
"hello mellow".indexOf("ello"); // returns 1
```

```javascript
"hello mellow".indexOf("jello"); // returns -1
```

```javascript
"hello mellow".indexOf("", 2); // returns 2
```

```javascript
"hello mellow".indexOf("ello", 20); // error
```

### .join

Returns a new string where the elements of string list are concatenated.

The function also accepts an optional separator which is placed between
elements in the resulting string.

```
    <list<string>>.join() -> <string>
    <list<string>>.join(<string>) -> <string>
```

Examples:

```javascript
["hello", "mellow"].join(); // returns 'hellomellow'
```

```javascript
["hello", "mellow"].join(" "); // returns 'hello mellow'
```

```javascript
[].join(); // returns ''
```

```javascript
[].join("/"); // returns ''
```

### .kebabCase

The `kebabCase` function in CEL converts a given string into kebab-case format.

Syntax:

    kebabCase(string)

Where:

- `string` is the input string to be converted.

Examples:

```javascript
// Converting a string to kebab-case:
"Hello World".kebabCase(); // Evaluates to "hello-world"
```

```javascript
// Converting a CamelCase string:
"HelloWorld".kebabCase(); // Evaluates to "hello-world"
```

```javascript
// Converting a string with spaces and special characters:
"Hello Beautiful World!".kebabCase(); // Evaluates to "hello-beautiful-world"
```

### .lastIndexOf

Returns the integer index of the last occurrence of the search string. If the
search string is not found the function returns -1.

The function also accepts an optional position which represents the last index
to be considered as the beginning of the substring match. If the substring is
the empty string, the index where the search starts is returned (string length
or custom).

```
    <string>.lastIndexOf(<string>) -> <int>
    <string>.lastIndexOf(<string>, <int>) -> <int>
```

Examples:

```javascript
"hello mellow".lastIndexOf(""); // returns 12
```

```javascript
"hello mellow".lastIndexOf("ello"); // returns 7
```

```javascript
"hello mellow".lastIndexOf("jello"); // returns -1
```

```javascript
"hello mellow".lastIndexOf("ello", 6); // returns 1
```

```javascript
"hello mellow".lastIndexOf("ello", -1); // error
```

### .lowerAscii

Returns a new string where all ASCII characters are lower-cased.

This function does not perform Unicode case-mapping for characters outside the
ASCII range.

```
     <string>.lowerAscii() -> <string>
```

Examples:

```javascript
"TacoCat".lowerAscii(); // returns 'tacocat'
"TacoCÆt Xii".lowerAscii(); // returns 'tacocÆt xii'
```

### .matches

The `matches` function in CEL is used to determine if a string matches a given regular expression pattern. It returns a boolean value indicating whether the string conforms to the pattern.

Syntax:

```javascript
"string".matches(pattern);
```

Where:

- `string` is the string you're checking.
- `pattern` is the regular expression pattern you're matching against.

Examples:

```javascript
// Checking if a string matches a simple pattern:
"apple".matches("^a.*e$"); // Evaluates to true
```

```javascript
// Validating an email format:
"example@email.com".matches(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
); // Evaluates to true
```

```javascript
// Checking for a pattern of digits:
"12345".matches("^\\d+$"); // Evaluates to true
```

### .quote

Takes the given string and makes it safe to print (without any formatting due to escape sequences).
If any invalid UTF-8 characters are encountered, they are replaced with \uFFFD.

```
    strings.quote(<string>)
```

Examples:

```javascript
strings.quote('single-quote with "double quote"'); // returns '"single-quote with \"double quote\""'
```

```javascript
strings.quote("two escape sequences a\n"); // returns '"two escape sequences \\a\\n"'
```

### .repeat

The `repeat` method on a string in CEL repeats the string for a given number of times.

Syntax:

    'string'.repeat(count)

Where:

- `count` is the number of times the string should be repeated.
- `string` is the string to repeat.

Examples:

```javascript
"apple".repeat(3); // Evaluates to "appleappleapple"
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
"hello hello".replace("he", "we"); // returns 'wello wello'
```

```javascript
"hello hello".replace("he", "we", -1); // returns 'wello wello'
```

```javascript
"hello hello".replace("he", "we", 1); // returns 'wello hello'
```

```javascript
"hello hello".replace("he", "we", 0); // returns 'hello hello'
```

### .replaceAll

The `replaceAll` function in CEL replaces all occurrences of a substring within a string with another substring.

Syntax:

    'string'.replaceAll(old, new)

Where:

- `old` is the substring to be replaced.
- `new` is the substring to replace with.
- `string` is the original string.

Examples:

```javascript
"I have an apple".replaceAll("apple", "orange"); // Evaluates to "I have an orange"
```

### .reverse

Returns a new string whose characters are the same as the target string, only formatted in
reverse order.
This function relies on converting strings to rune arrays in order to reverse.
It can be located in Version 3 of strings.

```
    <string>.reverse() -> <string>
```

Examples:

```javascript
"gums".reverse(); // returns 'smug'
```

```javascript
"John Smith".reverse(); // returns 'htimS nhoJ'
```

### .runeCount

The `runeCount` method in CEL counts the number of runes in a given string.

Syntax:

    'string'.runeCount()

Where:

- `string` is the input string whose runes are to be counted.

Examples:

```javascript
"Hello World".runeCount(); // Evaluates to 11
```

```javascript
"Hello$World".runeCount(); // Evaluates to 11
```

### .shellQuote

The `shellQuote` method in CEL quotes a string such that it can be safely used as a token in a shell command.

Syntax:

    'string'.shellQuote()

Examples:

```javascript
"Hello World".shellQuote(); // Evaluates to "'Hello World'"
```

```javascript
// Shell quoting a string with special characters:
"Hello$World".shellQuote(); // Evaluates to "'Hello$World'"
```

```javascript
// Shell quoting a string with spaces and special characters:
"Hello World$123".shellQuote(); // Evaluates to "'Hello World$123'"
```

### .size

The `size` function in CEL is used to determine the number of elements in a collection or the number of Unicode characters in a string.

Syntax:

    collection.size() or string.size()

Examples:

```javascript
// Getting the size of a list:
["apple", "banana", "cherry"].size(); // Evaluates to 3
```

```javascript
// Determining the number of characters in a string:
"hello".size(); // Evaluates to 5
```

### .slug

The `slug` method in CEL converts a given string into a URL-friendly slug format.

Syntax:

    'string'.slug()

Where:

- `string` is the input string to be converted.

Examples:

```javascript
// Converting a string to a slug:
"Hello World!".slug(); // Evaluates to "hello-world"
```

```javascript
// Converting a string with special characters:
"Hello, World!".slug(); // Evaluates to "hello-world"
```

```javascript
// Converting a multi-word string:
"Hello Beautiful World".slug(); // Evaluates to "hello-beautiful-world"
```

### .snakeCase

The `snakeCase` method in CEL converts a given string into snake_case format.

Syntax:

    'string'.snakeCase()

Where:

- `string` is the input string to be converted.

Examples:

```javascript
// Converting a string to snake_case:
"Hello World".snakeCase(); // Evaluates to "hello_world"
```

```javascript
// Converting a CamelCase string:
"HelloWorld".snakeCase(); // Evaluates to "hello_world"
```

```javascript
// Converting a string with spaces and special characters:
"Hello Beautiful World!".snakeCase(); // Evaluates to "hello_beautiful_world"
```

### .sort

The `sort` method on a string sorts the string alphabetically.

Syntax:

    'string'.sort()

Examples:

```javascript
"hello".sort(); // ehllo
```

### .split

Returns a list of strings split from the input by the given separator. The
function accepts an optional argument specifying a limit on the number of
substrings produced by the split.

When the split limit is 0, the result is an empty list. When the limit is 1,
the result is the target string to split. When the limit is a negative
number, the function behaves the same as split all.

```
    <string>.split(<string>) -> <list<string>>
    <string>.split(<string>, <int>) -> <list<string>>
```

Examples:

```javascript
"hello hello hello".split(" "); // returns ['hello', 'hello', 'hello']
```

```javascript
"hello hello hello".split(" ", 0); // returns []
```

```javascript
"hello hello hello".split(" ", 1); // returns ['hello hello hello']
```

```javascript
"hello hello hello".split(" ", 2); // returns ['hello', 'hello hello']
```

```javascript
"hello hello hello".split(" ", -1); // returns ['hello', 'hello', 'hello']
```

### .squote

The `squote` method in CEL adds single quotes around a given string.

Syntax:

    'string'.squote()

Examples:

```javascript
// Single quoting a simple string:
"Hello World".squote(); // Evaluates to "'Hello World'"
```

```javascript
// Single quoting a string with a number:
"12345".squote(); // Evaluates to "'12345'"
```

```javascript
// Single quoting an already single quoted string:
"'Hello World'".squote(); // Evaluates to "'''Hello World'''"
```

### .startsWith

The `startsWith` function in CEL is used to determine if a string starts with a specified substring.

Syntax:

    string.startsWith(substring)

Examples:

```javascript
// Checking if a string starts with a certain substring:
"hello".startsWith("he"); // Evaluates to true
```

### .substring

Returns the substring given a numeric range corresponding to character
positions. Optionally may omit the trailing range for a substring from a given
character position until the end of a string.

Character offsets are 0-based with an inclusive start range and exclusive end
range. It is an error to specify an end range that is lower than the start
range, or for either the start or end index to be negative or exceed the string
length.

```
    <string>.substring(<int>) -> <string>
    <string>.substring(<int>, <int>) -> <string>
```

Examples:

```javascript
"tacocat".substring(4); // returns 'cat'
```

```javascript
"tacocat".substring(0, 4); // returns 'taco'
```

```javascript
"tacocat".substring(-1); // error
```

```javascript
"tacocat".substring(2, 1); // error
```

### .title

The `title` method in CEL converts the first character of each word in a string to uppercase.

Syntax:

    'string'.title()

Where:

- `string` is the string to convert.

Examples:

```javascript
// Converting a string:
"hello world".title(); // Evaluates to "Hello World"
```

```javascript
// Working with mixed case:
"mIxEd CaSe".title(); // Evaluates to "MIxED CASe"
```

### .trim

Returns a new string which removes the leading and trailing whitespace in the
target string. The trim function uses the Unicode definition of whitespace
which does not include the zero-width spaces. See:
https://en.wikipedia.org/wiki/Whitespace_character#Unicode

```
    <string>.trim() -> <string>
```

Examples:

    '  \ttrim\n    '.trim() // returns 'trim'

### .trimPrefix

The `trimPrefix` method in CEL removes a given prefix from a string if the string starts with that prefix.

Syntax:

    'string'.trimPrefix(prefix)

Where:

- `prefix` is the starting substring to remove.
- `string` is the string from which the prefix will be removed.

Examples:

```javascript
// Removing a prefix from a string:
"Mr. Smith".trimPrefix("Mr."); // Evaluates to "Smith"
```

```javascript
// Another example:
"Astronaut".trimPrefix("Astro"); // Evaluates to "naut"
```

```javascript
// If the prefix is not present:
"Mr. Smith".trimPrefix("Dr."); // Evaluates to "Mr. Smith"
```

---

### .trimSuffix

The `trimSuffix` method in CEL removes a given suffix from a string if the string ends with that suffix.

Syntax:

    trimSuffix(suffix, string)

Where:

- `suffix` is the ending substring to remove.
- `string` is the string from which the suffix will be removed.

Examples:

```javascript
// Removing a suffix from a string:
"image.jpg".trimSuffix(".jpg"); // Evaluates to "image"
```

```javascript
// If the suffix is not present:
"image.jpg".trimSuffix(".png"); // Evaluates to "image.jpg"
```

### .upperAscii

Returns a new string where all ASCII characters are upper-cased.

This function does not perform Unicode case-mapping for characters outside the
ASCII range.

```
    <string>.upperAscii() -> <string>
```

Examples:

```javascript
"TacoCat".upperAscii(); // returns 'TACOCAT'
```

```javascript
"TacoCÆt Xii".upperAscii(); // returns 'TACOCÆT XII'
```

### .wordWrap

The `wordWrap` method on a string inserts line-breaks into the string, before it reaches the given max width

Syntax:

    'string'.wordWrap(maxWidth)
    'string'.wordWrap(maxWidth, lineBreakSequence)

Where:

- `maxWidth` is the desired maximum line length in characters
- `lineBreakSequence` is the Line-break sequence to insert (defaults to "\n")

Examples:

```javascript
"testing this line from here".wordWrap(10); // testing\nthis line\nfrom here
```

```javascript
"Hello Beautiful World".wordWrap(16, "==="); // Hello Beautiful===World
```

### HumanDuration

The `HumanDuration` function in CEL converts a duration into a human-readable format.

Syntax:

    HumanDuration(duration)

Where:

- `duration` is the duration you want to convert.

Examples:

```javascript
// Converting a duration into a human-readable format:
HumanDuration(3600); // Evaluates to "1 hour"
```

```javascript
// Converting another duration:
HumanDuration(600); // Evaluates to "10 minutes"
```

```javascript
// Converting a longer duration:
HumanDuration(86400); // Evaluates to "1 day"
```

### HumanSize

The `HumanSize` function in CEL converts a size in bytes into a human-readable format.

Syntax:

    HumanSize(size)

Where:

- `size` is the size in bytes you want to convert.

Examples:

```javascript
// Converting a size into a human-readable format:
HumanSize(1024); // Evaluates to "1 KiB"
```

```javascript
// Converting another size:
HumanSize(1048576); // Evaluates to "1 MiB"
```

```javascript
// Converting a larger size:
HumanSize(1073741824); // Evaluates to "1 GiB"
```

### Semver

The `Semver` function in CEL parses a version string and returns a map containing the major, minor, patch, prerelease, metadata, and original version.

Syntax:

    Semver(version)

Where:

- `version` is the version string to parse.

Examples:

```javascript
// Parsing a semantic version:
Semver("1.2.3-alpha+meta"); // Evaluates to a map with major: "1", minor: "2", patch: "3", prerelease: "alpha", metadata: "meta", original: "1.2.3-alpha+meta"
```

```javascript
Semver("2.3.4-beta+meta2"); // Evaluates to a map with major: "2", minor: "3", patch: "4", prerelease: "beta", metadata: "meta2", original: "2.3.4-beta+meta2"
```

```javascript
// Parsing a simple semantic version:
Semver("3.4.5"); // Evaluates to a map with major: "3", minor: "4", patch: "5", prerelease: "", metadata: "", original: "3.4.5"
```

### SemverCompare

The `SemverCompare` function in CEL compares two semantic version strings.

Syntax:

    SemverCompare(version1, version2)

Where:

- `version1` is the first version string to compare.
- `version2` is the second version string to compare.

Examples:

```javascript
// Comparing two semantic versions:
SemverCompare("1.2.3", "1.2.4"); // Evaluates to false
```

```javascript
// Comparing two identical versions:
SemverCompare("2.3.4", "2.3.4"); // Evaluates to true
```

```javascript
// Comparing with a prerelease version:
SemverCompare("3.4.5", "3.4.5-alpha"); // Evaluates to false
```

## YAML

### YAML

The `YAML` function in CEL converts a YAML formatted string into a map. It provides an easy way to handle YAML data.

Syntax:

    YAML(yamlString)

Where:

- `yamlString` is the YAML formatted string.

Examples:

```javascript
// Converting a simple YAML string to a map:
YAML("name: Alice\nage: 30"); // Evaluates to a map with keys "name" and "age"
```

```javascript
// Handling a YAML sequence:
YAML("numbers:\n- 1\n- 2\n- 3"); // Evaluates to a map with a key "numbers" containing an array
```

```javascript
// Nested YAML data conversion:
YAML("person:\n  name: Bob\n  age: 35"); // Evaluates to a nested map
```

### toYAML

The `toYAML` function converts an object into a YAML formatted string.

Syntax:

    toYAML(object|array)

Examples:

```javascript
toYAML({ name: "John" });
toYAML(["John", "Alice"]);
```

### YAMLArray

The `YAMLArray` function converts a YAML formatted string representing a sequence into an array.

Syntax:

    YAMLArray(yamlArrayString)

Where:

- `yamlArrayString` is the YAML formatted string representing a sequence.

Examples:

```javascript
// Converting a YAML sequence to an array:
YAMLArray("- 1\n- 2\n- 3"); // Evaluates to an array [1, 2, 3]
```

```javascript
// Handling complex objects in a YAML sequence:
YAMLArray("- name: Alice\n- name: Bob"); // Evaluates to an array of maps
```

```javascript
// An empty YAML sequence:
YAMLArray(""); // Evaluates to an empty array
```

---

## TOML

### TOML

The `TOML` function converts a TOML formatted string into a map, making it easy to work with TOML data.

Syntax:ToYAML

    TOML(tomlString)

Where:

- `tomlString` is the TOML formatted string.

Examples:

```javascript
// Converting a TOML string to a map:
TOML('name = "Alice"\nage = 30'); // Evaluates to a map with keys "name" and "age"
```

```javascript
// Handling an array in TOML:
TOML("numbers = [1, 2, 3]"); // Evaluates to a map with a key "numbers" containing an array
```

```javascript
// Nested TOML data conversion:
TOML('[person]\nname = "Bob"\nage = 35'); // Evaluates to a nested map
```

### toTOML

The `toTOML` function converts a map or an array into a TOML formatted string.

Syntax:

    toTOML(data)

Where:

- `data` is the map or array to be converted.

Examples:

```javascript
// Converting a map to a TOML string:
toTOML({ name: "Alice", age: 30 }); // Evaluates to "name = \"Alice\"\nage = 30"
```

```javascript
// Handling an array (TOML arrays must be of the same type):
toTOML({ people: ["Alice", "Bob"] }); // Evaluates to "people = [\"Alice\", \"Bob\"]"
```

```javascript
// An empty map:
toTOML({}); // Evaluates to an empty string
```

---

## uuid

### uuid.Nil

The `uuid.Nil` function returns the nil UUID.

Syntax:

    uuid.Nil()

### uuid.V1

The `uuid.V1` function returns a version 1 UUID.

Syntax:

    uuid.V1()

Example:

```javascript
uuuuid.V1() != uuid.Nil();
```

### uuid.V4

The `uuid.V4` function returns a version 4 UUID.

Syntax:

    uuid.V4()

Example:

```javascript
uuid.V4() != uuid.Nil();
```

### uuid.IsValid

The `uuid.IsValid` function checks if a string is a valid UUID.

Syntax:

    uuid.IsValid(uuid)

Example:

```javascript
uuid.IsValid("2a42e576-c308-4db9-8525-0513af307586");
```

### uuid.Parse

The `uuid.Parse` function parses a string into a UUID.

Syntax:

    uuid.Parse(uuid)

Example:

```javascript
uuid.Parse("2a42e576-c308-4db9-8525-0513af307586");
```
