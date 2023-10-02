# CEL Function Reference
### Logical Operators
Logical operators combine boolean values to produce a result which is also a boolean.

Syntax:

    `a || b`: Logical OR
    `a && b`: Logical AND
    `!a`: Logical NOT. Inverts the value of a boolean expression.

Examples:

    `true || false` evaluates to `true`
    `true && false` evaluates to `false`
    `!(5 > 3)` evaluates to false, because 5 is indeed greater than 3
---

### Comparison Operators
Comparison operators compare two operands and return a boolean value based on whether the comparison is true.

Syntax:

    `a == b`: Equal to
    `a != b`: Not equal to
    `a < b`: Less than
    `a <= b`: Less than or equal to
    `a > b`: Greater than
    `a >= b`: Greater than or equal to

Examples:

    `5 == 5` evaluates to `true`
    `5 < 3` evaluates to `false`
---
### Arithmetic Operators
Arithmetic operators perform mathematical operations on two operands.

Syntax:

    `a + b`: Addition
    `a     b`: Subtraction
    `a * b`: Multiplication
    `a / b`: Division
    `a % b`: Modulus

Examples:

    `5 + 3` evaluates to `8`
    `5 % 3` evaluates to `2`
---
### Ternary Conditional Operator
The ternary conditional operator evaluates a boolean expression and returns one of two values depending on whether the expression evaluates to true or false.

Syntax:

    `a ? b : c`

Examples:

    `true ? "yes" : "no"` evaluates to `"yes"`
    `false ? "yes" : "no"` evaluates to `"no"`
---
### Type Conversion Operators
Type conversion operators convert one type of data to another.

Syntax:

    `string(a)`: Converts a to string
    `int(a)`: Converts a to integer

Examples:

    `string(123)` evaluates to `"123"`
    `int("123")` evaluates to `123`
---
### in
The membership test operator checks whether an element is a member of a collection, such as a list or a map. It's worth noting that the `in` operator doesn't check for value membership in maps, only key membership.

Syntax:

    `a in b` Where `a` is the element you're checking for, and `b` is the collection.

Examples:

    `"apple" in ["apple", "banana"]` evaluates to `true`
    `3 in [1, 2, 4]` evaluates to `false`
---
### matches

The `matches` function in CEL is used to determine if a string matches a given regular expression pattern. It returns a boolean value indicating whether the string conforms to the pattern.

Syntax:
    
    string.matches(pattern)

Where:
- `string` is the string you're checking.
- `pattern` is the regular expression pattern you're matching against.

Examples:

    Checking if a string matches a simple pattern:
    "apple".matches("^a.*e$")  // Evaluates to true

    Validating an email format:
    "example@email.com".matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")  // Evaluates to true

    Checking for a pattern of digits:
    "12345".matches("^\\d+$")  // Evaluates to true
---

### dyn

The `dyn` function in CEL is used to dynamically interpret a value. It's particularly useful when the type of a value is not known ahead of time.

Syntax:
    
    dyn(expression)

Where:
- `expression` is the value or expression you're dynamically interpreting.

Examples:

    Dynamically interpreting a string as an integer:
    dyn("123")  // Might evaluate to integer 123 if contextually appropriate

    Dynamically interpreting a boolean:
    dyn("true")  // Might evaluate to boolean true if contextually appropriate

---

### size

The `size` function in CEL is used to determine the number of elements in a collection or the number of Unicode characters in a string.

Syntax:
    
    collection.size() or string.size()

Examples:

    Getting the size of a list:
    ["apple", "banana", "cherry"].size()  // Evaluates to 3

    Determining the number of characters in a string:
    "hello".size()  // Evaluates to 5

---

### timestamp

The `timestamp` function in CEL is used to represent a point in time. It's typically used in conjunction with other functions to extract or manipulate time-related data.

Syntax:
    
    timestamp("YYYY-MM-DDTHH:MM:SSZ")

Where:
- The string inside the function represents the date and time.

Examples:

    Creating a timestamp for January 1st, 2023:
    timestamp("2023-01-01T00:00:00Z")

    Creating another timestamp:
    timestamp("2023-07-04T12:00:00Z")

---

### startsWith

The `startsWith` function in CEL is used to determine if a string starts with a specified substring.

Syntax:
    
    string.startsWith(substring)

Examples:

    Checking if a string starts with a certain substring:
    "hello".startsWith("he")  // Evaluates to true

    Another example:
    "world".startsWith("wo")  // Evaluates to true

---

### endsWith 

The `endsWith` function in CEL is used to determine if a string ends with a specified substring.

Syntax:
    
    string.endsWith(substring)

Examples:

    Checking if a string ends with a certain substring:
    "hello".endsWith("lo")  // Evaluates to true

    Another example:
    "world".endsWith("ld")  // Evaluates to true

---

### contains 

The `contains` function in CEL is used to check if a string contains a given substring.

Syntax:
    
    string.contains(substring)

Examples:

    Checking if a string contains a certain substring:
    "apple".contains("app")  // Evaluates to true

    Another example:
    "cherry".contains("err")  // Evaluates to true

---

### matches 

The `matches` function in CEL is used to determine if a string matches a given regular expression pattern.

Syntax:
    
    string.matches(pattern)

Examples:

    Checking if a string matches a simple pattern:
    "apple".matches("^a.*e$")  // Evaluates to true

    Validating an email format:
    "example@email.com".matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")  // Evaluates to true


---
### getDate 

The `getDate` function in CEL is used to extract the date part from a timestamp. It returns a string representation of the date.

Syntax:
    
    timestamp.getDate()

Where:
- `timestamp` is the timestamp value from which you're extracting the date.

Examples:

    Extracting the date from a timestamp:
    "2023-01-01T12:34:56Z".getDate()  // Evaluates to "2023-01-01"

    Getting the date from another timestamp:
    "2023-07-04T00:00:00Z".getDate()  // Evaluates to "2023-07-04"
---
### getDayOfMonth 

The `getDayOfMonth` function in CEL is used to determine the day of the month for a given timestamp. It returns an integer value representing the day of the month, with the first day being 1.

Syntax:
    
    timestamp.getDayOfMonth()

Where:
- `timestamp` is the timestamp value for which you're determining the day of the month.

Examples:

    Getting the day of the month for January 1st:
    "2023-01-01T00:00:00Z".getDayOfMonth()  // Evaluates to 1

    Determining the day of the month for July 15th:
    "2023-07-15T00:00:00Z".getDayOfMonth()  // Evaluates to 15

    Checking the day of the month for December 31st:
    "2023-12-31T00:00:00Z".getDayOfMonth()  // Evaluates to 31


---
### getDayOfWeek 

The `getDayOfWeek` function in CEL is used to determine the day of the week for a given timestamp. It returns an integer value representing the day of the week, where Sunday is 0 and Saturday is 6.

Syntax:
    
    timestamp.getDayOfWeek()

Where:
- `timestamp` is the timestamp value for which you're determining the day of the week.

Examples:

    Getting the day of the week for a Sunday:
    "2023-01-01T00:00:00Z".getDayOfWeek()  // Evaluates to 0

    Determining the day of the week for a Wednesday:
    "2023-07-05T00:00:00Z".getDayOfWeek()  // Evaluates to 3

    Checking the day of the week for a Saturday:
    "2023-12-30T00:00:00Z".getDayOfWeek()  // Evaluates to 6
---
### getDayOfYear 

The `getDayOfYear` function in CEL is used to determine the day of the year for a given timestamp. It returns an integer value representing the day of the year, with January 1st being day 1.

Syntax:
    
    timestamp.getDayOfYear()

Where:
- `timestamp` is the timestamp value for which you're determining the day of the year.

Examples:

    Getting the day of the year for January 1st:
    "2023-01-01T00:00:00Z".getDayOfYear()  // Evaluates to 1

    Determining the day of the year for July 1st:
    "2023-07-01T00:00:00Z".getDayOfYear()  // Evaluates to 182

    Checking the day of the year for December 31st:
    "2023-12-31T00:00:00Z".getDayOfYear()  // Evaluates to 365
---

### getFullYear 

The `getFullYear` function in CEL retrieves the full year (4 digits for 4-digit years) of the specified timestamp.

Syntax:
    
    timestamp.getFullYear()

Examples:

    Retrieving the year for a date in 2023:
    "2023-05-15T12:00:00Z".getFullYear()  // Evaluates to 2023

    Getting the year for a date in 1999:
    "1999-11-11T11:11:11Z".getFullYear()  // Evaluates to 1999

---

### getHours 

The `getHours` function in CEL returns the hour for the given timestamp, from 0 to 23.

Syntax:
    
    timestamp.getHours()

Examples:

    Retrieving the hour for a midday timestamp:
    "2023-05-15T12:30:00Z".getHours()  // Evaluates to 12

    Getting the hour for an early morning timestamp:
    "2023-11-11T03:15:00Z".getHours()  // Evaluates to 3

---

### getMilliseconds 

The `getMilliseconds` function in CEL returns the milliseconds (from 0 to 999) of the specified timestamp.

Syntax:
    
    timestamp.getMilliseconds()

Examples:

    Checking milliseconds for a timestamp:
    "2023-05-15T12:30:00.450Z".getMilliseconds()  // Evaluates to 450

    Retrieving milliseconds for another timestamp:
    "2023-11-11T03:15:00.123Z".getMilliseconds()  // Evaluates to 123

---

### getMinutes 

The `getMinutes` function in CEL returns the minutes (from 0 to 59) of the specified timestamp.

Syntax:
    
    timestamp.getMinutes()

Examples:

    Retrieving minutes for a timestamp:
    "2023-05-15T12:30:00Z".getMinutes()  // Evaluates to 30

    Checking minutes for an early morning timestamp:
    "2023-11-11T03:15:00Z".getMinutes()  // Evaluates to 15

---

### getMonth 

The `getMonth` function in CEL returns the month (from 0 to 11) for the specified timestamp, where 0 represents January and 11 represents December.

Syntax:
    
    timestamp.getMonth()

Examples:

    Checking the month for a May timestamp:
    "2023-05-15T12:30:00Z".getMonth()  // Evaluates to 4

    Retrieving the month for a November timestamp:
    "2023-11-11T03:15:00Z".getMonth()  // Evaluates to 10

---

### getSeconds 

The `getSeconds` function in CEL returns the seconds (from 0 to 59) of the specified timestamp.

Syntax:
    
    timestamp.getSeconds()

Examples:

    Checking seconds for a timestamp:
    "2023-05-15T12:30:45Z".getSeconds()  // Evaluates to 45

    Retrieving seconds for another timestamp:
    "2023-11-11T03:15:25Z".getSeconds()  // Evaluates to 25

---

### duration 

The `duration` function in CEL creates a new duration from a string representation. The string format is an integer followed by a unit: `s` for seconds, `m` for minutes, `h` for hours, and `d` for days.

Syntax:
    
    duration(stringRepresentation)

Examples:

    Creating a duration of 5 hours:
    duration("5h")  // Represents a duration of 5 hours

    Creating a duration of 30 minutes:
    duration("30m")  // Represents a duration of 30 minutes
---
### has
The `has` macro checks for the presence of a field in a message. It's particularly useful for protobuf messages where fields can be absent rather than set to a default value. It's especially useful for distinguishing between a field being set to its default value and a field being unset. For instance, in a protobuf message, an unset integer field is indistinguishable from that field set to 0 without the `has` macro.

Syntax

    x.has(y)

Where `x` is the message and `y` is the field you're checking for.

Examples:

If you have a message `person` with a potential field `name`, you can check for its presence with:

    person.has(name)  // Evaluates to true if 'name' is present, false otherwise

    addressBook.has(person.email)  // Evaluates to true if 'email' field is present in 'person' within 'addressBook'
---
### map
The `map` macro creates a new collection by applying a function to each entry of an existing collection. It's useful for transforming the elements of a list or the values of a map.

Syntax:

    //For lists
    list.map(e, <function>)

    //For maps:  
    map.map(k, v, <function>)

Where:
- `list` is the list you're transforming.
- `map` is the map you're transforming.
- `e` represents each element of the list.
- `k` represents each key of the map.
- `v` represents each value of the map.
- `<function>` is the transformation function applied to each entry.

Examples:

    Transforming each element of a list by multiplying it by 2:
    [1, 2, 3].map(e, e * 2)  // Evaluates to [2, 4, 6]


    Transforming the values of a map by appending "!" to each value:
    {"a": "apple", "b": "banana"}.map(k, v, v + "!")  // Evaluates to {"a": "apple!", "b": "banana!"}


    Using both key and value for transformation in a map:
    {"a": 1, "b": 2}.map(k, v, k + v)  // Evaluates to {"a": "a1", "b": "b2"}
---
### filter
The `filter` macro creates a new collection containing only the elements or entries of an existing collection that satisfy a given condition.

Syntax:

    //For lists:  
    list.filter(e, <condition>)

    //For maps:
    map.filter(k, v, <condition>)

Where:
- `list` is the list you're filtering.
- `map` is the map you're filtering.
- `e` represents each element of the list.
- `k` represents each key of the map.
- `v` represents each value of the map.
- `<condition>` is the condition applied to each entry.

Examples:

    Filtering a list to include only numbers greater than 2:
    [1, 2, 3, 4].filter(e, e > 2)  // Evaluates to [3, 4]

    Filtering a map to include only entries with values greater than 1:
    {"a": 1, "b": 2, "c": 3}.filter(k, v, v > 1)  // Evaluates to {"b": 2, "c": 3}
---
### all
The `all` macro checks if all elements of a collection, such as a list or a map, satisfy a given condition. It returns a boolean value based on the evaluation.

Syntax:
    
    //For lists:  
    list.all(e, <condition>)

    //For maps:  
    map.all(k, v, <condition>)

Where:
- `list` is the list you're checking.
- `map` is the map you're checking.
- `e` represents each element of the list.
- `k` represents each key of the map.
- `v` represents each value of the map.
- `<condition>` is the condition applied to each entry.

Examples:

    Checking if all elements of a list are greater than 0:    
    [1, 2, 3].all(e, e > 0)  // Evaluates to true

    Checking if all values of a map are non-empty strings:    
    {"a": "apple", "b": "banana", "c": ""}.all(k, v, v != "")  // Evaluates to false

    Using both key and value for condition in a map:    
    {"a": 1, "b": 2, "c": 3}.all(k, v, k != "a" || v > 1)  // Evaluates to true
---
### exists

The `exists` macro checks if there exists an element in a collection, such as a list or a map, that satisfies a given condition. It returns a boolean value based on the evaluation.

Syntax:
```
//For lists:
list.exists(e, <condition>)

For maps:
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

    Checking if any element of a list is equal to 2:    
    [1, 2, 3].exists(e, e == 2)  // Evaluates to true

    Checking if any value of a map is an empty string:    
    {"a": "apple", "b": "banana", "c": ""}.exists(k, v, v == "")  // Evaluates to true

    Using both key and value for condition in a map:    
    {"a": 1, "b": 2, "c": 3}.exists(k, v, k == "a" && v == 1)  // Evaluates to true
---
### fold
The `fold` macro is used to combine all elements of a collection, such as a list or a map, using a binary function. It's a powerful tool for aggregating or reducing data.

Syntax:
    
    //For lists:
    list.fold(e, acc, <binary_function>)

    //For maps:
    map.fold(k, v, acc, <binary_function>)


Where:
- `list` is the list you're folding.
- `map` is the map you're folding.
- `e` represents each element of the list.
- `k` represents each key of the map.
- `v` represents each value of the map.
- `acc` is the accumulator, which holds the intermediate results.
- `<binary_function>` is the function applied to each entry and the accumulator.

Examples:

    Computing the sum of all elements of a list:    
    [1, 2, 3].fold(e, acc, acc + e)  // Evaluates to 6

    Concatenating all values of a map:    
    {"a": "apple", "b": "banana"}.fold(k, v, acc, acc + v)  // Evaluates to "applebanana"

---
### Cel.Bind

Binds a simple identifier to an initialization expression which may be used
in a subsequenct result expression. Bindings may also be nested within each
other.

    cel.bind(<varName>, <initExpr>, <resultExpr>)

Examples:

    cel.bind(a, 'hello',
     cel.bind(b, 'world', a + b + b + a)) // "helloworldworldhello"

    // Avoid a list allocation within the exists comprehension.
    cel.bind(valid_values, [a, b, c],
     [d, e, f].exists(elem, elem in valid_values))

Local bindings are not guaranteed to be evaluated before use.

---
### Base64.Decode

Decodes base64-encoded string to bytes.

This function will return an error if the string input is not
base64-encoded.

    base64.decode(<string>) -> <bytes>

Examples:

    base64.decode('aGVsbG8=')  // return b'hello'
    base64.decode('aGVsbG8')   // error
---
### Base64.Encode

Encodes bytes to a base64-encoded string.

    base64.encode(<bytes>)  -> <string>

Example:

    base64.encode(b'hello') // return 'aGVsbG8='
---
### Math.Greatest

Returns the greatest valued number present in the arguments to the macro.

Greatest is a variable argument count macro which must take at least one
argument. Simple numeric and list literals are supported as valid argument
types; however, other literals will be flagged as errors during macro
expansion. If the argument expression does not resolve to a numeric or
list(numeric) type during type-checking, or during runtime then an error
will be produced. If a list argument is empty, this too will produce an
error.

    math.greatest(<arg>, ...) -> <double|int|uint>

Examples:

    math.greatest(1)      // 1
    math.greatest(1u, 2u) // 2u
    math.greatest(-42.0, -21.5, -100.0)   // -21.5
    math.greatest([-42.0, -21.5, -100.0]) // -21.5
    math.greatest(numbers) // numbers must be list(numeric)

    math.greatest()         // parse error
    math.greatest('string') // parse error
    math.greatest(a, b)     // check-time error if a or b is non-numeric
    math.greatest(dyn('string')) // runtime error
---
### Math.Least

Returns the least valued number present in the arguments to the macro.

Least is a variable argument count macro which must take at least one
argument. Simple numeric and list literals are supported as valid argument
types; however, other literals will be flagged as errors during macro
expansion. If the argument expression does not resolve to a numeric or
list(numeric) type during type-checking, or during runtime then an error
will be produced. If a list argument is empty, this too will produce an error.

    math.least(<arg>, ...) -> <double|int|uint>

Examples:

    math.least(1)      // 1
    math.least(1u, 2u) // 1u
    math.least(-42.0, -21.5, -100.0)   // -100.0
    math.least([-42.0, -21.5, -100.0]) // -100.0
    math.least(numbers) // numbers must be list(numeric)

    math.least()         // parse error
    math.least('string') // parse error
    math.least(a, b)     // check-time error if a or b is non-numeric
    math.least(dyn('string')) // runtime error
---
### Protos.GetExt

Macro which generates a select expression that retrieves an extension field
from the input proto2 syntax message. If the field is not set, the default
value forthe extension field is returned according to safe-traversal semantics.

    proto.getExt(<msg>, <fully.qualified.extension.name>) -> <field-type>

Example:

    proto.getExt(msg, google.expr.proto2.test.int32_ext) // returns int value
---
### Protos.HasExt

Macro which generates a test-only select expression that determines whether
an extension field is set on a proto2 syntax message.

    proto.hasExt(<msg>, <fully.qualified.extension.name>) -> <bool>

Example:

    proto.hasExt(msg, google.expr.proto2.test.int32_ext) // returns true || false
---
### Slice


Returns a new sub-list using the indexes provided.

    <list>.slice(<int>, <int>) -> <list>

Examples:

    [1,2,3,4].slice(1, 3) // return [2, 3]
    [1,2,3,4].slice(2, 4) // return [3 ,4]
---
### Sets.Contains

Returns whether the first list argument contains all elements in the second
list argument. The list may contain elements of any type and standard CEL
equality is used to determine whether a value exists in both lists. If the
second list is empty, the result will always return true.

    sets.contains(list(T), list(T)) -> bool

Examples:

    sets.contains([], []) // true
    sets.contains([], [1]) // false
    sets.contains([1, 2, 3, 4], [2, 3]) // true
    sets.contains([1, 2.0, 3u], [1.0, 2u, 3]) // true
---
### Sets.Equivalent

Returns whether the first and second list are set equivalent. Lists are set
equivalent if for every item in the first list, there is an element in the
second which is equal. The lists may not be of the same size as they do not
guarantee the elements within them are unique, so size does not factor into
the computation.

    sets.equivalent(list(T), list(T)) -> bool

Examples:

    sets.equivalent([], []) // true
    sets.equivalent([1], [1, 1]) // true
    sets.equivalent([1], [1u, 1.0]) // true
    sets.equivalent([1, 2, 3], [3u, 2.0, 1]) // true
---
### Sets.Intersects

Returns whether the first list has at least one element whose value is equal
to an element in the second list. If either list is empty, the result will
be false.

    sets.intersects(list(T), list(T)) -> bool

Examples:

    sets.intersects([1], []) // false
    sets.intersects([1], [1, 2]) // true
    sets.intersects([[1], [2, 3]], [[1, 2], [2, 3.0]]) // true
---
### CharAt

Returns the character at the given position. If the position is negative, or
greater than the length of the string, the function will produce an error:

    <string>.charAt(<int>) -> <string>

Examples:

    'hello'.charAt(4)  // return 'o'
    'hello'.charAt(5)  // return ''
    'hello'.charAt(-1) // error
---
### IndexOf

Returns the integer index of the first occurrence of the search string. If the
search string is not found the function returns -1.

The function also accepts an optional position from which to begin the
substring search. If the substring is the empty string, the index where the
search starts is returned (zero or custom).

    <string>.indexOf(<string>) -> <int>
    <string>.indexOf(<string>, <int>) -> <int>

Examples:

    'hello mellow'.indexOf('')         // returns 0
    'hello mellow'.indexOf('ello')     // returns 1
    'hello mellow'.indexOf('jello')    // returns -1
    'hello mellow'.indexOf('', 2)      // returns 2
    'hello mellow'.indexOf('ello', 2)  // returns 7
    'hello mellow'.indexOf('ello', 20) // error
---
### Join

Returns a new string where the elements of string list are concatenated.

The function also accepts an optional separator which is placed between
elements in the resulting string.

    <list<string>>.join() -> <string>
    <list<string>>.join(<string>) -> <string>

Examples:

	['hello', 'mellow'].join() // returns 'hellomellow'
	['hello', 'mellow'].join(' ') // returns 'hello mellow'
	[].join() // returns ''
	[].join('/') // returns ''
---
### LastIndexOf

Returns the integer index of the last occurrence of the search string. If the
search string is not found the function returns -1.

The function also accepts an optional position which represents the last index
to be considered as the beginning of the substring match. If the substring is
the empty string, the index where the search starts is returned (string length
or custom).

    <string>.lastIndexOf(<string>) -> <int>
    <string>.lastIndexOf(<string>, <int>) -> <int>

Examples:

    'hello mellow'.lastIndexOf('')         // returns 12
    'hello mellow'.lastIndexOf('ello')     // returns 7
    'hello mellow'.lastIndexOf('jello')    // returns -1
    'hello mellow'.lastIndexOf('ello', 6)  // returns 1
    'hello mellow'.lastIndexOf('ello', -1) // error
---
### LowerAscii

Returns a new string where all ASCII characters are lower-cased.

This function does not perform Unicode case-mapping for characters outside the
ASCII range.

     <string>.lowerAscii() -> <string>

Examples:

     'TacoCat'.lowerAscii()      // returns 'tacocat'
     'TacoCÆt Xii'.lowerAscii()  // returns 'tacocÆt xii'
---
### Quote

Takes the given string and makes it safe to print (without any formatting due to escape sequences).
If any invalid UTF-8 characters are encountered, they are replaced with \uFFFD.

    strings.quote(<string>)

Examples:

    strings.quote('single-quote with "double quote"') // returns '"single-quote with \"double quote\""'
    strings.quote("two escape sequences \a\n") // returns '"two escape sequences \\a\\n"'
---
### Replace

Returns a new string based on the target, which replaces the occurrences of a
search string with a replacement string if present. The function accepts an
optional limit on the number of substring replacements to be made.

When the replacement limit is 0, the result is the original string. When the
limit is a negative number, the function behaves the same as replace all.

    <string>.replace(<string>, <string>) -> <string>
    <string>.replace(<string>, <string>, <int>) -> <string>

Examples:

    'hello hello'.replace('he', 'we')     // returns 'wello wello'
    'hello hello'.replace('he', 'we', -1) // returns 'wello wello'
    'hello hello'.replace('he', 'we', 1)  // returns 'wello hello'
    'hello hello'.replace('he', 'we', 0)  // returns 'hello hello'
---
### Split

Returns a list of strings split from the input by the given separator. The
function accepts an optional argument specifying a limit on the number of
substrings produced by the split.

When the split limit is 0, the result is an empty list. When the limit is 1,
the result is the target string to split. When the limit is a negative
number, the function behaves the same as split all.

    <string>.split(<string>) -> <list<string>>
    <string>.split(<string>, <int>) -> <list<string>>

Examples:

    'hello hello hello'.split(' ')     // returns ['hello', 'hello', 'hello']
    'hello hello hello'.split(' ', 0)  // returns []
    'hello hello hello'.split(' ', 1)  // returns ['hello hello hello']
    'hello hello hello'.split(' ', 2)  // returns ['hello', 'hello hello']
    'hello hello hello'.split(' ', -1) // returns ['hello', 'hello', 'hello']
---
### Substring

Returns the substring given a numeric range corresponding to character
positions. Optionally may omit the trailing range for a substring from a given
character position until the end of a string.

Character offsets are 0-based with an inclusive start range and exclusive end
range. It is an error to specify an end range that is lower than the start
range, or for either the start or end index to be negative or exceed the string
length.

    <string>.substring(<int>) -> <string>
    <string>.substring(<int>, <int>) -> <string>

Examples:

    'tacocat'.substring(4)    // returns 'cat'
    'tacocat'.substring(0, 4) // returns 'taco'
    'tacocat'.substring(-1)   // error
    'tacocat'.substring(2, 1) // error
---
### Trim

Returns a new string which removes the leading and trailing whitespace in the
target string. The trim function uses the Unicode definition of whitespace
which does not include the zero-width spaces. See:
https://en.wikipedia.org/wiki/Whitespace_character#Unicode

    <string>.trim() -> <string>

Examples:

    '  \ttrim\n    '.trim() // returns 'trim'
---
### UpperAscii

Returns a new string where all ASCII characters are upper-cased.

This function does not perform Unicode case-mapping for characters outside the
ASCII range.

    <string>.upperAscii() -> <string>

Examples:

     'TacoCat'.upperAscii()      // returns 'TACOCAT'
     'TacoCÆt Xii'.upperAscii()  // returns 'TACOCÆT XII'
---
### Reverse

Returns a new string whose characters are the same as the target string, only formatted in
reverse order.
This function relies on converting strings to rune arrays in order to reverse.
It can be located in Version 3 of strings.

    <string>.reverse() -> <string>

Examples:

    'gums'.reverse() // returns 'smug'
    'John Smith'.reverse() // returns 'htimS nhoJ'
---
### base64.Encode

The `base64.Encode` function in CEL is used to encode input data into a Base64 string. The function can accept various types of input, including strings, byte slices, and types that can be converted to a byte slice.

Syntax:

    base64.Encode(data)

Where:
- `data` is the input you're encoding. It can be a string, byte slice, or any type that can be converted to a byte slice.

Examples:

    Encoding a simple string:
    base64.Encode("hello")  // Expected Output: "aGVsbG8="

    Encoding a number (which will first be converted to a string):
    base64.Encode(12345)  // Expected Output: "MTIzNDU="

    Encoding a byte slice representation of a string:
    base64.Encode([104, 101, 108, 108, 111])  // Expected Output: "aGVsbG8="

---

### base64.Decode

The `base64.Decode` function in CEL is used to decode a Base64 encoded string back to its original form. The function returns the decoded string.

Syntax:

    base64.Decode(encodedData)

Where:
- `encodedData` is the Base64 encoded string you're decoding.

Examples:

    Decoding a Base64 encoded string:
    base64.Decode("aGVsbG8=")  // Expected Output: "hello"

    Decoding another example:
    base64.Decode("MTIzNDU=")  // Expected Output: "12345"

    Decoding an encoded special character:
    base64.Decode("4pyT")  // Expected Output: "✓"

---

### base64.DecodeBytes

The `base64.DecodeBytes` function in CEL is similar to `base64.Decode`, but it returns the decoded data as a byte slice instead of a string.

Syntax:

    base64.DecodeBytes(encodedData)

Where:
- `encodedData` is the Base64 encoded string you're decoding.

Examples:

    Decoding a Base64 encoded string to byte slice:
    base64.DecodeBytes("aGVsbG8=")  // Expected Output: [104, 101, 108, 108, 111]

    Decoding another example to byte slice:
    base64.DecodeBytes("MTIzNDU=")  // Expected Output: [49, 50, 51, 52, 53]

    Decoding an encoded special character to byte slice:
    base64.DecodeBytes("4pyT")  // Expected Output: [226, 147, 147]

---
### Slice 

The `Slice` function in CEL is used to create a slice from the provided arguments.

Syntax:
    
    Slice(data)

Where:
- `data` is the data you're converting into a slice.

Examples:

    Creating a slice from multiple values:
    Slice(1, 2, 3)  // Evaluates to [1, 2, 3]

    Creating a slice from strings:
    Slice("a", "b", "c")  // Evaluates to ["a", "b", "c"]

    Creating an empty slice:
    Slice()  // Evaluates to []

---

### Has 

The `Has` function in CEL checks if a given key exists in the provided data structure.

Syntax:
    
    Has(data, key)

Where:
- `data` is the data structure you're checking.
- `key` is the key you're looking for.

Examples:

    Checking if a key exists in a map:
    Has({"apple": 1, "banana": 2}, "apple")  // Evaluates to true

    Checking for a non-existent key:
    Has({"apple": 1, "banana": 2}, "orange")  // Evaluates to false

    Checking in a complex structure:
    Has({"fruits": {"apple": 1, "banana": 2}}, "fruits")  // Evaluates to true

---

### Dict 

The `Dict` function in CEL is used to create a dictionary (map) from the provided key-value pairs.

Syntax:
    
    Dict(key1, value1, key2, value2, ...)

Where:
- `keyN` is the Nth key for the dictionary.
- `valueN` is the value associated with the Nth key.

Examples:

    Creating a simple dictionary:
    Dict("apple", 1, "banana", 2)  // Evaluates to {"apple": 1, "banana": 2}

    Creating a dictionary with mixed types:
    Dict("name", "John", "age", 30)  // Evaluates to {"name": "John", "age": 30}

    Creating an empty dictionary:
    Dict()  // Evaluates to {}

---

### Keys 

The `Keys` function in CEL retrieves all the keys from the provided dictionary.

Syntax:
    
    Keys(dict)

Where:
- `dict` is the dictionary you're extracting keys from.

Examples:

    Getting keys from a dictionary:
    Keys({"apple": 1, "banana": 2})  // Evaluates to ["apple", "banana"]

    Getting keys from an empty dictionary:
    Keys({})  // Evaluates to []

    Getting keys from a nested dictionary:
    Keys({"fruits": {"apple": 1, "banana": 2}, "vegetables": {"carrot": 3}})  // Evaluates to ["fruits", "vegetables"]

---

### Values 

The `Values` function in CEL retrieves all the values from the provided dictionary.

Syntax:
    
    Values(dict)

Where:
- `dict` is the dictionary you're extracting values from.

Examples:

    Getting values from a dictionary:
    Values({"apple": 1, "banana": 2})  // Evaluates to [1, 2]

    Getting values from an empty dictionary:
    Values({})  // Evaluates to []

    Getting values from a nested dictionary:
    Values({"fruits": {"apple": 1, "banana": 2}, "vegetables": {"carrot": 3}})  // Evaluates to [{"apple": 1, "banana": 2}, {"carrot": 3}]

---

### Append 

The `Append` function in CEL appends a value to the end of a list.

Syntax:
    
    Append(value, list)

Where:
- `value` is the value you're appending.
- `list` is the list you're appending to.

Examples:

    Appending to a list:
    Append(3, [1, 2])  // Evaluates to [1, 2, 3]

    Appending a string to a list:
    Append("c", ["a", "b"])  // Evaluates to ["a", "b", "c"]

    Appending to an empty list:
    Append(1, [])  // Evaluates to [1]

---

### Prepend 

The `Prepend` function in CEL adds a value to the beginning of a list.

Syntax:
    
    Prepend(value, list)

Where:
- `value` is the value you're prepending.
- `list` is the list you're adding to.

Examples:

    Prepending to a list:
    Prepend(0, [1, 2, 3])  // Evaluates to [0, 1, 2, 3]

    Prepending a string to a list:
    Prepend("a", ["b", "c"])  // Evaluates to ["a", "b", "c"]

    Prepending to an empty list:
    Prepend(1, [])  // Evaluates to [1]

---

### Uniq 

The `Uniq` function in CEL removes duplicate values from a list.

Syntax:
    
    Uniq(list)

Where:
- `list` is the list you're removing duplicates from.

Examples:

    Removing duplicates from a list:
    Uniq([1, 2, 2, 3, 3, 3])  // Evaluates to [1, 2, 3]

    Removing duplicates from a string list:
    Uniq(["a", "b", "a", "c", "b"])  // Evaluates to ["a", "b", "c"]

    Using a list without duplicates:
    Uniq([1, 2, 3])  // Evaluates to [1, 2, 3]

---

### Reverse 

The `Reverse` function in CEL reverses the order of elements in a list.

Syntax:
    
    Reverse(list)

Where:
- `list` is the list you're reversing.

Examples:

    Reversing a list:
    Reverse([1, 2, 3])  // Evaluates to [3, 2, 1]

    Reversing a string list:
    Reverse(["a", "b", "c"])  // Evaluates to ["c", "b", "a"]

    Reversing an empty list:
    Reverse([])  // Evaluates to []

---

### Merge 

The `Merge` function in CEL merges two or more dictionaries into one.

Syntax:
    
    Merge(dict1, dict2, ...)

Where:
- `dictN` is the Nth dictionary you're merging.

Examples:

    Merging two dictionaries:
    Merge({"apple": 1}, {"banana": 2})  // Evaluates to {"apple": 1, "banana": 2}

    Merging with overlapping keys:
    Merge({"apple": 1, "banana": 2}, {"banana": 3, "cherry": 4})  // Evaluates to {"apple": 1, "banana": 3, "cherry": 4}

    Merging multiple dictionaries:
    Merge({"apple": 1}, {"banana": 2}, {"cherry": 3})  // Evaluates to {"apple": 1, "banana": 2, "cherry": 3}

---

### Sort  

The `Sort` function in CEL sorts a list. If provided with a key, it sorts based on that key.

Syntax:
    
    Sort(list)
    Sort(key, list)

Where:
- `key` is the key to sort by (optional).
- `list` is the list you're sorting.

Examples:

    Sorting a list of numbers:
    Sort([3, 1, 2])  // Evaluates to [1, 2, 3]

    Sorting a list of strings:
    Sort(["banana", "apple", "cherry"])  // Evaluates to ["apple", "banana", "cherry"]

    Sorting a list of dictionaries by a key:
    Sort("age", [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}])  // Evaluates to [{"name": "Jane", "age": 25}, {"name": "John", "age": 30}]

---

### JQ  

The `JQ` function in CEL applies a jq expression to filter or transform data.

Syntax:
    
    JQ(jqExpr, data)

Where:
- `jqExpr` is the jq expression you're applying.
- `data` is the data you're filtering or transforming.

Examples:

    Filtering data with a jq expression:
    JQ(".name", {"name": "John", "age": 30})  // Evaluates to "John"

    Transforming data with a jq expression:
    JQ("{name, age}", {"name": "John", "age": 30, "city": "NY"})  // Evaluates to {"name": "John", "age": 30}

    Using a complex jq expression:
    JQ(".[] | select(.age > 25)", [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}])  // Evaluates to [{"name": "John", "age": 30}]

---

### Flatten  

The `Flatten` function in CEL flattens a nested list structure.

Syntax:
    
    Flatten(list)
    Flatten(depth, list)

Where:
- `depth` is the depth to which the list should be flattened (optional).
- `list` is the list you're flattening.

Examples:

    Flattening a nested list:
    Flatten([1, [2, 3], [4, [5, 6]]])  // Evaluates to [1, 2, 3, 4, 5, 6]

    Flattening to a specific depth:
    Flatten(1, [1, [2, 3], [4, [5, 6]]])  // Evaluates to [1, 2, 3, 4, [5, 6]]

    Flattening an already flat list:
    Flatten([1, 2, 3])  // Evaluates to [1, 2, 3]

---

### Pick  

The `Pick` function in CEL creates a new dictionary by picking specific keys from the provided dictionary.

Syntax:
    
    Pick(key1, key2, ..., dict)

Where:
- `keyN` is the Nth key you're picking.
- `dict` is the dictionary you're picking from.

Examples:

    Picking specific keys from a dictionary:
    Pick("apple", "cherry", {"apple": 1, "banana": 2, "cherry": 3})  // Evaluates to {"apple": 1, "cherry": 3}

    Picking a non-existent key:
    Pick("apple", "orange", {"apple": 1, "banana": 2})  // Evaluates to {"apple": 1}

    Picking from an empty dictionary:
    Pick("apple", {})  // Evaluates to {}

---

### Omit

The `Omit` function in CEL creates a new dictionary by omitting specific keys from the provided dictionary.

Syntax:
    
    Omit(key1, key2, ..., dict)

Where:
- `keyN` is the Nth key you're omitting.
- `dict` is the dictionary you're omitting from.

Examples:

    Omitting specific keys from a dictionary:
    Omit("banana", {"apple": 1, "banana": 2, "cherry": 3})  // Evaluates to {"apple": 1, "cherry": 3}

    Omitting a non-existent key:
    Omit("orange", {"apple": 1, "banana": 2})  // Evaluates to {"apple": 1, "banana": 2}

    Omitting from an empty dictionary:
    Omit("apple", {})  // Evaluates to {}

---
### conv.Bool

The `conv.Bool` function in CEL is used to convert a given input to a boolean value. It internally converts the input to a string and then determines its boolean representation.

Syntax:

    conv.Bool(input)

Where:
- `input` is the value you're converting to a boolean.

Examples:

    Converting a truthy string to boolean:
    conv.Bool("true")  // Evaluates to true

    Converting a falsy string to boolean:
    conv.Bool("false")  // Evaluates to false

---

### conv.ToBool

The `conv.ToBool` function in CEL is similar to `conv.Bool` and is used to convert a given input to a boolean value.

Syntax:

    conv.ToBool(input)

Examples:

    Converting a truthy string to boolean:
    conv.ToBool("true")  // Evaluates to true

---

### conv.ToBools

The `conv.ToBools` function in CEL converts a list of inputs to their respective boolean values.

Syntax:

    conv.ToBools(input1, input2, ...)

Examples:

    Converting multiple values to booleans:
    conv.ToBools("true", "false")  // Evaluates to [true, false]

---

### conv.Slice

The `conv.Slice` function in CEL is used to create a slice from the provided arguments.

Syntax:

    conv.Slice(item1, item2, ...)

Examples:

    Creating a slice of strings:
    conv.Slice("apple", "banana", "cherry")  // Evaluates to ["apple", "banana", "cherry"]

    Creating a mixed slice:
    conv.Slice("apple", 1, true)  // Evaluates to ["apple", 1, true]

    Creating a slice of numbers:
    conv.Slice(1, 2, 3, 4)  // Evaluates to [1, 2, 3, 4]

---

### conv.Join

The `conv.Join` function in CEL is used to join a list or slice of items with a specified separator.

Syntax:

    conv.Join(list, separator)

Where:
- `list` is the list or slice of items you're joining.
- `separator` is the string used to separate the items.

Examples:

    Joining a list of strings:
    conv.Join(["apple", "banana", "cherry"], ", ")  // Evaluates to "apple, banana, cherry"

    Joining a list with a different separator:
    conv.Join(["apple", "banana", "cherry"], "-")  // Evaluates to "apple-banana-cherry"

---

### conv.Has

The `conv.Has` function in CEL checks if a given key exists in the provided input, which can be a map or other collection.

Syntax:

    conv.Has(collection, key)

Where:
- `collection` is the map or collection you're checking.
- `key` is the key or item you're looking for.

Examples:

    Checking for a key in a map:
    conv.Has({"apple": 1, "banana": 2}, "apple")  // Evaluates to true

    Checking for a missing key:
    conv.Has({"apple": 1, "banana": 2}, "cherry")  // Evaluates to false

---

### conv.ParseInt

The `conv.ParseInt` function in CEL is used to parse a string representation of an integer with a specified base and bit size.

Syntax:

    conv.ParseInt(input, base, bitSize)

Where:
- `input` is the string representation of the integer.
- `base` is the base (e.g., 10 for decimal, 2 for binary).
- `bitSize` specifies the integer type (e.g., 32 for `int32`).

Examples:

    Parsing a decimal string:
    conv.ParseInt("12345", 10, 32)  // Evaluates to 12345

    Parsing a binary string:
    conv.ParseInt("1101", 2, 32)  // Evaluates to 13

    Parsing a hexadecimal string:
    conv.ParseInt("1a3f", 16, 32)  // Evaluates to 6719

---

### conv.ParseFloat

The `conv.ParseFloat` function in CEL is used to parse a string representation of a floating-point number with a specified bit size.

Syntax:

    conv.ParseFloat(input, bitSize)

Where:
- `input` is the string representation of the floating-point number.
- `bitSize` specifies the float type (e.g., 32 for `float32`).

Examples:

    Parsing a float string:
    conv.ParseFloat("123.45", 32)  // Evaluates to 123.45

    Parsing another float string:
    conv.ParseFloat("0.001", 64)  // Evaluates to 0.001

    Parsing a scientific notation string:
    conv.ParseFloat("1.23e4", 64)  // Evaluates to 12300

---

### conv.ParseUint

The `conv.ParseUint` function in CEL is used to parse a string representation of an unsigned integer with a specified base and bit size.

Syntax:

    conv.ParseUint(input, base, bitSize)

Examples:

    Parsing a decimal string:
    conv.ParseUint("12345", 10, 32)  // Evaluates to 12345

    Parsing a binary string:
    conv.ParseUint("1101", 2, 32)  // Evaluates to 13

    Parsing a hexadecimal string:
    conv.ParseUint("1a3f", 16, 32)  // Evaluates to 6719

---

### conv.Atoi

The `conv.Atoi` function in CEL is used to convert a string to an integer. It is a simpler version of `conv.ParseInt` with base 10 and bit size dependent on the platform.

Syntax:

    conv.Atoi(input)

Examples:

    Converting a decimal string:
    conv.Atoi("12345")  // Evaluates to 12345

    Converting a negative integer string:
    conv.Atoi("-12345")  // Evaluates to -12345

---

### conv.URL

The `conv.URL` function in CEL is used to parse a string into a URL. It returns a URL object and an error if the parsing fails.

Syntax:

    conv.URL(input)

Where:
- `input` is the string representation of the URL.

Examples:

    Parsing a valid URL:
    conv.URL("https://www.example.com")  // Evaluates to a URL object

    Parsing an invalid URL:
    conv.URL("invalid-url")  // Evaluates to an error

    Parsing a URL with query parameters:
    conv.URL("https://www.example.com?page=1&sort=asc")  // Evaluates to a URL object with query parameters

---

### conv.ToInt64

The `conv.ToInt64` function in CEL is used to convert a given input to a 64-bit integer.

Syntax:

    conv.ToInt64(input)

Examples:

    Converting a number to int64:
    conv.ToInt64(12345)  // Evaluates to 12345

    Converting a float to int64:
    conv.ToInt64(123.45)  // Evaluates to 123

    Converting a string to int64:
    conv.ToInt64("12345")  // Evaluates to 12345

---

### conv.ToInt

The `conv.ToInt` function in CEL is used to convert a given input to an integer. The bit size of the integer is dependent on the platform.

Syntax:

    conv.ToInt(input)

Examples:

    Converting a number to int:
    conv.ToInt(12345)  // Evaluates to 12345

    Converting a float to int:
    conv.ToInt(123.45)  // Evaluates to 123

    Converting a string to int:
    conv.ToInt("12345")  // Evaluates to 12345

---

### conv.ToInt64s

The `conv.ToInt64s` function in CEL converts a list of inputs to their respective 64-bit integer values.

Syntax:

    conv.ToInt64s(input1, input2, ...)

Examples:

    Converting multiple values to int64s:
    conv.ToInt64s(123, "456", 789.0)  // Evaluates to [123, 456, 789]

    Converting a list of strings to int64s:
    conv.ToInt64s("123", "456", "789")  // Evaluates to [123, 456, 789]

---

### conv.ToInts

The `conv.ToInts` function in CEL converts a list of inputs to their respective integer values. The bit size of the integers is dependent on the platform.

Syntax:

    conv.ToInts(input1, input2, ...)

Examples:

    Converting multiple values to ints:
    conv.ToInts(123, "456", 789.0)  // Evaluates to [123, 456, 789]

    Converting a list of strings to ints:
    conv.ToInts("123", "456", "789")  // Evaluates to [123, 456, 789]

---

### conv.ToFloat64

The `conv.ToFloat64` function in CEL is used to convert a given input to a 64-bit floating-point number.

Syntax:

    conv.ToFloat64(input)

Examples:

    Converting a number to float64:
    conv.ToFloat64(123)  // Evaluates to 123.0

    Converting a string to float64:
    conv.ToFloat64("123.45")  // Evaluates to 123.45

---

### conv.ToFloat64s

The `conv.ToFloat64s` function in CEL converts a list of inputs to their respective 64-bit floating-point values.

Syntax:

    conv.ToFloat64s(input1, input2, ...)

Examples:

    Converting a list of strings to float64s:
    conv.ToFloat64s("123.45", "678.90", "0.001")  // Evaluates to [123.45, 678.90, 0.001]

---

### conv.ToString

The `conv.ToString` function in CEL is used to convert a given input to a string.

Syntax:

    conv.ToString(input)

Examples:

    Converting a number to string:
    conv.ToString(12345)  // Evaluates to "12345"

    Converting a float to string:
    conv.ToString(123.45)  // Evaluates to "123.45"

    Converting a boolean to string:
    conv.ToString(true)  // Evaluates to "true"

---

### conv.ToStrings

The `conv.ToStrings` function in CEL converts a list of inputs to their respective string values.

Syntax:

    conv.ToStrings(input1, input2, ...)

Examples:

    Converting multiple values to strings:
    conv.ToStrings(123, 456.78, true)  // Evaluates to ["123", "456.78", "true"]

    Converting a list of mixed values to strings:
    conv.ToStrings("apple", 123, true)  // Evaluates to ["apple", "123", "true"]

    Converting a list of booleans to strings:
    conv.ToStrings(true, false, true)  // Evaluates to ["true", "false", "true"]

---

### conv.Default

The `conv.Default` function in CEL is used to return the input value if it is true; otherwise, it returns the default value.

Syntax:

    conv.Default(default, input)

Examples:

    Using a truthy input value:
    conv.Default("default", "input")  // Evaluates to "input"

    Using a falsy input value:
    conv.Default("default", "")  // Evaluates to "default"

    Using a non-string input value:
    conv.Default("default", 123)  // Evaluates to 123

---

### conv.Dict

The `conv.Dict` function in CEL is used to create a dictionary or map from the provided key-value pairs.

Syntax:

    conv.Dict(key1, value1, key2, value2, ...)

Examples:

    Creating a dictionary with string keys and values:
    conv.Dict("apple", "fruit", "carrot", "vegetable")  // Evaluates to {"apple": "fruit", "carrot": "vegetable"}

    Creating a mixed dictionary:
    conv.Dict("name", "Alice", "age", 30)  // Evaluates to {"name": "Alice", "age": 30}

    Creating a dictionary with nested values:
    conv.Dict("user", conv.Dict("name", "Alice", "age", 30), "active", true)  // Evaluates to {"user": {"name": "Alice", "age": 30}, "active": true}
---
### crypto.SHA1

The `crypto.SHA1` function in CEL is used to compute the SHA-1 hash of the input data. Note that SHA-1 is considered insecure for cryptographic purposes.

Syntax:

    crypto.SHA1(data)

Where:
- `data` is the input data to be hashed.

Examples:

    Hashing a simple string:
    crypto.SHA1("hello")  // Might evaluate to "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c"

    Hashing a number represented as a string:
    crypto.SHA1("12345")  // Might evaluate to "8cb2237d0679ca88db6464eac60da96345513964"

    Hashing special characters:
    crypto.SHA1("!@#")  // Might evaluate to "8f9b6cb1cf7d70f23c16c9b9d4894d7f3b8fe15d"
---
### crypto.SHA224

The `crypto.SHA224` function in CEL calculates the SHA-224 hash of the given input data, returning a string representation of the hash.

Syntax:

    crypto.SHA224(data)

Where:
- `data` is the input data to be hashed.

Examples:

    Hashing a simple string:
    crypto.SHA224("hello")  // Might evaluate to "ea09ae9cc6768c50fcee903ed054556e5bfc8347907f12598aa24193"

    Hashing a number represented as a string:
    crypto.SHA224("12345")  // Might evaluate to "b7a875fc1ea228b9061041b7cec4bd3c52ab3ce3e4fdfb2478313b5d"

    Hashing special characters:
    crypto.SHA224("!@#")  // Might evaluate to "b2a4b9a1d4a63ad7b2db380a370a8b3b2cfa7278b2d1c9632fb8a5c9"
---
### crypto.SHA256

The `crypto.SHA256` function in CEL calculates the SHA-256 hash of the provided input data, offering a balance between security and performance.

Syntax:

    crypto.SHA256(data)

Where:
- `data` is the input data to be hashed.

Examples:

    Hashing a simple string:
    crypto.SHA256("hello")  // Might evaluate to "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"

    Hashing a number represented as a string:
    crypto.SHA256("12345")  // Might evaluate to "d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2"

    Hashing special characters:
    crypto.SHA256("!@#")  // Might evaluate to "d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8"
---
### crypto.SHA384

The `crypto.SHA384` function in CEL is used for computing the SHA-384 hash of the input data, which is a truncated version of SHA-512 and provides enhanced security.

Syntax:

    crypto.SHA384(data)

Where:
- `data` is the input data to be hashed.

Examples:

    Hashing a simple string:
    crypto.SHA384("hello")  // Might evaluate to a long hash string

    Hashing a number represented as a string:
    crypto.SHA384("12345")  // Might evaluate to another long hash string

    Hashing special characters:
    crypto.SHA384("!@#")  // Might evaluate to yet another long hash string
---
### crypto.SHA512

The `crypto.SHA512` function in CEL calculates the SHA-512 hash of the given input data. It's commonly used for data integrity verification and password storage.

Syntax:

    crypto.SHA512(data)

Where:
- `data` is the input data to be hashed.

Examples:

    Hashing a simple string:
    crypto.SHA512("hello")  // Might evaluate to a very long hash string

    Hashing a number represented as a string:
    crypto.SHA512("12345")  // Might evaluate to another very long hash string

    Hashing special characters:
    crypto.SHA512("!@#")  // Might evaluate to yet another very long hash string
---
### crypto.SHA512_224

The `crypto.SHA512_224` function in CEL calculates the SHA-512/224 hash of the input data. It's a truncated version of SHA-512, providing higher security levels.

Syntax:

    crypto.SHA512_224(data)

Where:
- `data` is the input data to be hashed.

Examples:

    Hashing a simple string:
    crypto.SHA512_224("hello")  // Might evaluate to "4634270d395b88fa6b8842be8a2fe5e6bf5e6220bcd7a52c51d4c4e8"

    Hashing a number represented as a string:
    crypto.SHA512_224("12345")  // Might evaluate to "4634270d395b88fa6b8842be8a2fe5e6bf5e6220bcd7a52c51d4c4e8"

    Hashing special characters:
    crypto.SHA512_224("!@#")  // Might evaluate to "4634270d395b88fa6b8842be8a2fe5e6bf5e6220bcd7a52c51d4c4e8"
---
### crypto.SHA512_256

The `crypto.SHA512_256` function in CEL calculates the SHA-512/256 hash of the input data, a truncated version of SHA-512, offering enhanced security and performance.

Syntax:

    crypto.SHA512_256(data)

Where:
- `data` is the input data to be hashed.

Examples:

    Hashing a simple string:
    crypto.SHA512_256("hello")  // Might evaluate to a long hash string

    Hashing a number represented as a string:
    crypto.SHA512_256("12345")  // Might evaluate to another long hash string

    Hashing special characters:
    crypto.SHA512_256("!@#")  // Might evaluate to yet another long hash string
---
### crypto.SHA1Bytes

The `crypto.SHA1Bytes` function in CEL computes the SHA-1 hash of the input data and returns it as a byte array. It's generally not recommended for cryptographic security.

Syntax:

    crypto.SHA1Bytes(data)

Where:
- `data` is the input data to be hashed.

Examples:

    Hashing a simple string:
    crypto.SHA1Bytes("hello")  // Might evaluate to a byte array representation of the hash

    Hashing a number represented as a string:
    crypto.SHA1Bytes("12345")  // Might evaluate to another byte array representation of the hash

    Hashing special characters:
    crypto.SHA1Bytes("!@#")  // Might evaluate to yet another byte array representation of the hash
---
### crypto.SHA224Bytes

The `crypto.SHA224Bytes` function in CEL calculates the SHA-224 hash of the given input data and returns the hash as a byte array.

Syntax:

    crypto.SHA224Bytes(data)

Where:
- `data` is the input data to be hashed.

Examples:

    Hashing a simple string:
    crypto.SHA224Bytes("hello")  // Might evaluate to a byte array representation of the hash

    Hashing a number represented as a string:
    crypto.SHA224Bytes("12345")  // Might evaluate to another byte array representation of the hash

    Hashing special characters:
    crypto.SHA224Bytes("!@#")  // Might evaluate to yet another byte array representation of the hash
---
### crypto.SHA256Bytes

The `crypto.SHA256Bytes` function in CEL calculates the SHA-256 hash of the provided input data and returns it as a byte array.

Syntax:

    crypto.SHA256Bytes(data)

Where:
- `data` is the input data to be hashed.

Examples:

    Hashing a simple string:
    crypto.SHA256Bytes("hello")  // Might evaluate to a byte array representation of the hash

    Hashing a number represented as a string:
    crypto.SHA256Bytes("12345")  // Might evaluate to another byte array representation of the hash

    Hashing special characters:
    crypto.SHA256Bytes("!@#")  // Might evaluate to yet another byte array representation of the hash
---
### crypto.SHA384Bytes

The `crypto.SHA384Bytes` function in CEL computes the SHA-384 hash of the input data and returns it as a byte array.

Syntax:

    crypto.SHA384Bytes(data)

Where:
- `data` is the input data to be hashed.

Examples:

    Hashing a simple string:
    crypto.SHA384Bytes("hello")  // Might evaluate to a byte array representation of the hash

    Hashing a number represented as a string:
    crypto.SHA384Bytes("12345")  // Might evaluate to another byte array representation of the hash

    Hashing special characters:
    crypto.SHA384Bytes("!@#")  // Might evaluate to yet another byte array representation of the hash
---
### crypto.SHA512Bytes

The `crypto.SHA512Bytes` function in CEL calculates the SHA-512 hash of the given input data and returns the hash as a byte array.

Syntax:

    crypto.SHA512Bytes(data)

Where:
- `data` is the input data to be hashed.

Examples:

    Hashing a simple string:
    crypto.SHA512Bytes("hello")  // Might evaluate to a byte array representation of the hash

    Hashing a number represented as a string:
    crypto.SHA512Bytes("12345")  // Might evaluate to another byte array representation of the hash

    Hashing special characters:
    crypto.SHA512Bytes("!@#")  // Might evaluate to yet another byte array representation of the hash
---
### crypto.SHA512_224Bytes

The `crypto.SHA512_224Bytes` function in CEL calculates the SHA-512/224 hash of the input data and returns it as a byte array.

Syntax:

    crypto.SHA512_224Bytes(data)

Where:
- `data` is the input data to be hashed.

Examples:

    Hashing a simple string:
    crypto.SHA512_224Bytes("hello")  // Might evaluate to a byte array representation of the hash

    Hashing a number represented as a string:
    crypto.SHA512_224Bytes("12345")  // Might evaluate to another byte array representation of the hash

    Hashing special characters:
    crypto.SHA512_224Bytes("!@#")  // Might evaluate to yet another byte array representation of the hash
---
### crypto.SHA512_256Bytes

The `crypto.SHA512_256Bytes` function in CEL calculates the SHA-512/256 hash of the input data and returns the hash as a byte array.

Syntax:

    crypto.SHA512_256Bytes(data)

Where:
- `data` is the input data to be hashed.

Examples:

    Hashing a simple string:
    crypto.SHA512_256Bytes("hello")  // Might evaluate to a byte array representation of the hash

    Hashing a number represented as a string:
    crypto.SHA512_256Bytes("12345")  // Might evaluate to another byte array representation of the hash

    Hashing special characters:
    crypto.SHA512_256Bytes("!@#")  // Might evaluate to yet another byte array representation of the hash
---
### data.JSON

The `data.JSON` function in CEL is used to convert a JSON formatted string into a map. It returns a map containing the JSON data.

Syntax:

    data.JSON(jsonString)

Where:
- `jsonString` is the JSON formatted string.

Examples:

    Converting a JSON string to a map:
    data.JSON("{\"name\": \"Alice\", \"age\": 30}")  // Evaluates to a map with keys "name" and "age"

    Handling an array in JSON:
    data.JSON("{\"numbers\": [1, 2, 3]}")  // Evaluates to a map with a key "numbers" containing an array

    Nested JSON string conversion:
    data.JSON("{\"person\": {\"name\": \"Bob\", \"age\": 35}}")  // Evaluates to a nested map
---
### data.JSONArray

The `data.JSONArray` function converts a JSON formatted string into an array. It is particularly useful for handling JSON arrays.

Syntax:

    data.JSONArray(jsonArrayString)

Where:
- `jsonArrayString` is the JSON formatted string representing an array.

Examples:

    Converting a JSON array string to an array:
    data.JSONArray("[1, 2, 3]")  // Evaluates to an array [1, 2, 3]

    Handling complex objects in a JSON array:
    data.JSONArray("[{\"name\": \"Alice\"}, {\"name\": \"Bob\"}]")  // Evaluates to an array of maps

    An empty JSON array string:
    data.JSONArray("[]")  // Evaluates to an empty array
---
### data.YAML

The `data.YAML` function in CEL converts a YAML formatted string into a map. It provides an easy way to handle YAML data.

Syntax:

    data.YAML(yamlString)

Where:
- `yamlString` is the YAML formatted string.

Examples:

    Converting a simple YAML string to a map:
    data.YAML("name: Alice\nage: 30")  // Evaluates to a map with keys "name" and "age"

    Handling a YAML sequence:
    data.YAML("numbers:\n- 1\n- 2\n- 3")  // Evaluates to a map with a key "numbers" containing an array

    Nested YAML data conversion:
    data.YAML("person:\n  name: Bob\n  age: 35")  // Evaluates to a nested map
---
### data.YAMLArray

The `data.YAMLArray` function converts a YAML formatted string representing a sequence into an array.

Syntax:

    data.YAMLArray(yamlArrayString)

Where:
- `yamlArrayString` is the YAML formatted string representing a sequence.

Examples:

    Converting a YAML sequence to an array:
    data.YAMLArray("- 1\n- 2\n- 3")  // Evaluates to an array [1, 2, 3]

    Handling complex objects in a YAML sequence:
    data.YAMLArray("- name: Alice\n- name: Bob")  // Evaluates to an array of maps

    An empty YAML sequence:
    data.YAMLArray("")  // Evaluates to an empty array
---
### data.TOML

The `data.TOML` function converts a TOML formatted string into a map, making it easy to work with TOML data.

Syntax:

    data.TOML(tomlString)

Where:
- `tomlString` is the TOML formatted string.

Examples:

    Converting a TOML string to a map:
    data.TOML("name = \"Alice\"\nage = 30")  // Evaluates to a map with keys "name" and "age"

    Handling an array in TOML:
    data.TOML("numbers = [1, 2, 3]")  // Evaluates to a map with a key "numbers" containing an array

    Nested TOML data conversion:
    data.TOML("[person]\nname = \"Bob\"\nage = 35")  // Evaluates to a nested map
---
### data.CSV

The `data.CSV` function converts a CSV formatted string into a two-dimensional array, where each element is a row represented as an array.

Syntax:

    data.CSV(csvString)

Where:
- `csvString` is the CSV formatted string.

Examples:

    Converting a CSV string to a 2D array:
    data.CSV("Alice,30\nBob,35")  // Evaluates to [["Alice", "30"], ["Bob", "35"]]

    Handling a CSV with headers:
    data.CSV("name,age\nAlice,30\nBob,35")  // Evaluates to [["name", "age"], ["Alice", "30"], ["Bob", "35"]]

    An empty CSV string:
    data.CSV("")  // Evaluates to an empty 2D array
---
### data.CSVByRow

The `data.CSVByRow` function converts a CSV formatted string into an array of maps, where each map represents a row with column names as keys.

Syntax:

    data.CSVByRow(csvString)

Where:
- `csvString` is the CSV formatted string.

Examples:

    Converting a CSV string with headers to an array of maps:
    data.CSVByRow("name,age\nAlice,30\nBob,35")  // Evaluates to [{"name": "Alice", "age": "30"}, {"name": "Bob", "age": "35"}]

    Handling a single row CSV:
    data.CSVByRow("name,age\nAlice,30")  // Evaluates to [{"name": "Alice", "age": "30"}]

    An empty CSV string:
    data.CSVByRow("")  // Evaluates to an empty array
---
### data.CSVByColumn

The `data.CSVByColumn` function converts a CSV formatted string into a map of arrays, where keys are column names and values are arrays of column values.

Syntax:

    data.CSVByColumn(csvString)

Where:
- `csvString` is the CSV formatted string.

Examples:

    Converting a CSV string with headers to a map of arrays:
    data.CSVByColumn("name,age\nAlice,30\nBob,35")  // Evaluates to {"name": ["Alice", "Bob"], "age": ["30", "35"]}

    Handling a single column CSV:
    data.CSVByColumn("name\nAlice\nBob")  // Evaluates to {"name": ["Alice", "Bob"]}

    An empty CSV string:
    data.CSVByColumn("")  // Evaluates to an empty map
---
### data.ToCSV

The `data.ToCSV` function converts an array of arrays or an array of maps into a CSV formatted string.

Syntax:

    data.ToCSV(data)

Where:
- `data` is the array of arrays or array of maps to be converted.

Examples:

    Converting an array of arrays to a CSV string:
    data.ToCSV([["Alice", 30], ["Bob", 35]])  // Evaluates to "Alice,30\nBob,35"

    Handling an array of maps:
    data.ToCSV([{"name": "Alice", "age": 30}, {"name": "Bob", "age": 35}])  // Evaluates to "name,age\nAlice,30\nBob,35"

    An empty array:
    data.ToCSV([])  // Evaluates to an empty string
---
### data.ToJSON

The `data.ToJSON` function converts a map or an array into a JSON formatted string.

Syntax:

    data.ToJSON(data)

Where:
- `data` is the map or array to be converted.

Examples:

    Converting a map to a JSON string:
    data.ToJSON({"name": "Alice", "age": 30})  // Evaluates to "{\"name\":\"Alice\",\"age\":30}"

    Handling an array:
    data.ToJSON(["Alice", 30])  // Evaluates to "[\"Alice\",30]"

    An empty map:
    data.ToJSON({})  // Evaluates to "{}"
---
### data.ToJSONPretty

The `data.ToJSONPretty` function converts a map or an array into a pretty-formatted JSON string with indents.

Syntax:

    data.ToJSONPretty(indent, data)

Where:
- `indent` is the string used for indentation.
- `data` is the map or array to be converted.

Examples:

    Pretty formatting a JSON string with two spaces indent:
    data.ToJSONPretty("  ", {"name": "Alice", "age": 30})  // Evaluates to a pretty-formatted JSON string

    Using tab for indentation:
    data.ToJSONPretty("\t", ["Alice", 30])  // Evaluates to a pretty-formatted JSON string with tabs

    An empty map with four spaces indent:
    data.ToJSONPretty("    ", {})  // Evaluates to "{}" with no indents as the map is empty
---
### data.ToYAML

The `data.ToYAML` function converts a map or an array into a YAML formatted string.

Syntax:

    data.ToYAML(data)

Where:
- `data` is the map or array to be converted.

Examples:

    Converting a map to a YAML string:
    data.ToYAML({"name": "Alice", "age": 30})  // Evaluates to "name: Alice\nage: 30"

    Handling an array:
    data.ToYAML(["Alice", 30])  // Evaluates to "- Alice\n- 30"

    An empty map:
    data.ToYAML({})  // Evaluates to an empty string
---
### data.ToTOML

The `data.ToTOML` function converts a map or an array into a TOML formatted string.

Syntax:

    data.ToTOML(data)

Where:
- `data` is the map or array to be converted.

Examples:

    Converting a map to a TOML string:
    data.ToTOML({"name": "Alice", "age": 30})  // Evaluates to "name = \"Alice\"\nage = 30"

    Handling an array (TOML arrays must be of the same type):
    data.ToTOML({"people": ["Alice", "Bob"]})  // Evaluates to "people = [\"Alice\", \"Bob\"]"

    An empty map:
    data.ToTOML({})  // Evaluates to an empty string
---
### filepath.Base

The `filepath.Base` function in CEL returns the last element of a file path. It effectively extracts the file name from the provided path.

Syntax:

    filepath.Base(path)

Where:
- `path` is the file path string.

Examples:

    Extracting the file name from a full path:
    filepath.Base("/path/to/file.txt")  // Evaluates to "file.txt"

    Working with a relative path:
    filepath.Base("folder/file.txt")  // Evaluates to "file.txt"

    When the path is a directory:
    filepath.Base("/path/to/directory/")  // Evaluates to "directory"
---
### filepath.Clean

The `filepath.Clean` function in CEL returns the shortest path name equivalent to the provided path by purely lexical processing.

Syntax:

    filepath.Clean(path)

Where:
- `path` is the file path string.

Examples:

    Cleaning a path with redundant elements:
    filepath.Clean("/path/./to/file.txt")  // Evaluates to "/path/to/file.txt"

    Resolving parent directory references:
    filepath.Clean("folder/../file.txt")  // Evaluates to "file.txt"

    Handling multiple slashes:
    filepath.Clean("//path/to//file.txt")  // Evaluates to "/path/to/file.txt"
---
### filepath.Dir

The `filepath.Dir` function in CEL returns all but the last element of a file path, typically the path's directory.

Syntax:

    filepath.Dir(path)

Where:
- `path` is the file path string.

Examples:

    Getting the directory of a file path:
    filepath.Dir("/path/to/file.txt")  // Evaluates to "/path/to"

    Working with a relative file path:
    filepath.Dir("folder/file.txt")  // Evaluates to "folder"

    When the path is a directory:
    filepath.Dir("/path/to/directory/")  // Evaluates to "/path/to"
---
### filepath.Ext

The `filepath.Ext` function in CEL returns the file name extension used by a file path.

Syntax:

    filepath.Ext(path)

Where:
- `path` is the file path string.

Examples:

    Extracting the extension from a file path:
    filepath.Ext("/path/to/file.txt")  // Evaluates to ".txt"

    Working with a file without an extension:
    filepath.Ext("/path/to/file")  // Evaluates to ""

    When the path is a directory:
    filepath.Ext("/path/to/directory/")  // Evaluates to ""
---
### filepath.FromSlash

The `filepath.FromSlash` function in CEL returns the result of replacing each slash ('/') character in the path with a separator character.

Syntax:

    filepath.FromSlash(path)

Where:
- `path` is the file path string.

Examples:

    Converting slashes on a UNIX system:
    filepath.FromSlash("/path/to/file.txt")  // Evaluates to "/path/to/file.txt"

    Converting slashes on a Windows system:
    filepath.FromSlash("/path/to/file.txt")  // Evaluates to "\\path\\to\\file.txt"

    Working with a relative path:
    filepath.FromSlash("folder/file.txt")  // System-dependent
---
### filepath.IsAbs

The `filepath.IsAbs` function in CEL reports whether the file path is absolute.

Syntax:

    filepath.IsAbs(path)

Where:
- `path` is the file path string.

Examples:

    Checking an absolute path:
    filepath.IsAbs("/path/to/file.txt")  // Evaluates to true

    Checking a relative path:
    filepath.IsAbs("folder/file.txt")  // Evaluates to false

    Working with a Windows-style absolute path:
    filepath.IsAbs("C:\\path\\to\\file.txt")  // Evaluates to true
---
### filepath.Join

The `filepath.Join` function in CEL concatenates multiple string elements to create a single file path.

Syntax:

    filepath.Join(element1, element2, ...)

Where:
- `element1, element2, ...` are the path elements to concatenate.

Examples:

    Joining path elements:
    filepath.Join("/path", "to", "file.txt")  // Evaluates to "/path/to/file.txt"

    Handling trailing and leading slashes:
    filepath.Join("/path/", "/to/", "file.txt")  // Evaluates to "/path/to/file.txt"

    Working with relative paths:
    filepath.Join("folder", "subfolder", "file.txt")  // Evaluates to "folder/subfolder/file.txt"
---
### filepath.Match

The `filepath.Match` function in CEL reports whether the file name matches the shell file pattern.

Syntax:

    filepath.Match(pattern, name)

Where:
- `pattern` is the shell file pattern.
- `name` is the file name string.

Examples:

    Matching a file name with a pattern:
    filepath.Match("*.txt", "file.txt")  // Evaluates to true

    A non-matching pattern:
    filepath.Match("*.jpg", "file.txt")  // Evaluates to false

    Using character ranges in patterns:
    filepath.Match("[0-9].txt", "5.txt")  // Evaluates to true
---
### filepath.Rel

The `filepath.Rel` function in CEL returns a relative path that is lexically equivalent to the target path when joined to the base path with an intervening separator.

Syntax:

    filepath.Rel(basepath, targpath)

Where:
- `basepath` is the base file path string.
- `targpath` is the target file path string.

Examples:

    Getting a relative path:
    filepath.Rel("/path/to", "/path/to/file.txt")  // Evaluates to "file.txt"

    When the target is a subdirectory:
    filepath.Rel("/path", "/path/to/directory")  // Evaluates to "to/directory"

    Handling different directory levels:
    filepath.Rel("/path/to", "/path/from/file.txt")  // Evaluates to "../from/file.txt"
---
### filepath.Split

The `filepath.Split` function in CEL splits a file path into a directory and file name.

Syntax:

    filepath.Split(path)

Where:
- `path` is the file path string.

Examples:

    Splitting a standard file path:
    filepath.Split("/path/to/file.txt")  // Evaluates to ["/path/to/", "file.txt"]

    Working with a file in the root directory:
    filepath.Split("/file.txt")  // Evaluates to ["/", "file.txt"]

    When the path is a directory:
    filepath.Split("/path/to/directory/")  // Evaluates to ["/path/to/directory/", ""]
---
### filepath.ToSlash

The `filepath.ToSlash` function in CEL returns the result of replacing each separator character in the path with a slash ('/') character.

Syntax:

    filepath.ToSlash(path)

Where:
- `path` is the file path string.

Examples:

    Converting backslashes to slashes:
    filepath.ToSlash("\\path\\to\\file.txt")  // Evaluates to "/path/to/file.txt"

    Working with an already slash-separated path:
    filepath.ToSlash("/path/to/file.txt")  // Evaluates to "/path/to/file.txt"

    Handling mixed separators:
    filepath.ToSlash("\\path/to\\file.txt")  // Evaluates to "/path/to/file.txt"

---

### filepath.VolumeName

The `filepath.VolumeName` function in CEL returns the volume name of the file path.

Syntax:

    filepath.VolumeName(path)

Where:
- `path` is the file path string.

Examples:

    Extracting the volume name on a Windows system:
    filepath.VolumeName("C:\\path\\to\\file.txt")  // Evaluates to "C:"

    Working with a UNIX file path:
    filepath.VolumeName("/path/to/file.txt")  // Evaluates to ""

    Handling a Windows UNC path:
    filepath.VolumeName("\\\\server\\share\\file.txt")  // Evaluates to "\\\\server\\share"
---
### IsHealthy

The `IsHealthy` function in CEL is used to determine if a Kubernetes resource is healthy. It returns a boolean value indicating the health status of the resource.

Syntax:
    
    IsHealthy(resource)

Where:
- `resource` is the Kubernetes resource you're checking.

Examples:

    Checking if a pod is healthy:
    IsHealthy(pod)  // Evaluates to true if the pod is healthy

    Verifying the health of a service:
    IsHealthy(service)  // Evaluates to false if the service is not healthy

    Assessing the health of a deployment:
    IsHealthy(deployment)  // Evaluates to true if the deployment is healthy
---
### GetStatus

The `GetStatus` function in CEL retrieves the status of a Kubernetes resource as a string. It provides detailed information about the current state of the resource.

Syntax:
    
    GetStatus(resource)

Where:
- `resource` is the Kubernetes resource whose status you're retrieving.

Examples:

    Retrieving the status of a pod:
    GetStatus(pod)  // Evaluates to "Running" if the pod is running

    Getting the status of a service:
    GetStatus(service)  // Evaluates to "Active" if the service is active

    Checking the status of a deployment:
    GetStatus(deployment)  // Evaluates to "Deployed" if the deployment is successful

---

### GetHealth

The `GetHealth` function in CEL retrieves the health status of a Kubernetes resource as a map. The map contains key-value pairs providing detailed information about the resource's health.

Syntax:
    
    GetHealth(resource)

Where:
- `resource` is the Kubernetes resource whose health information you're retrieving.

Examples:

    Retrieving the health information of a pod:
    GetHealth(pod)  // Evaluates to a map with keys and values indicating the pod's health

    Getting the health information of a service:
    GetHealth(service)  // Evaluates to a map with keys and values indicating the service's health

    Checking the health information of a deployment:
    GetHealth(deployment)  // Evaluates to a map with keys and values indicating the deployment's health
---
### math.IsInt

The `math.IsInt` function in CEL checks if the given input is an integer. It returns a boolean value indicating whether the input is an integer or not.

Syntax:

    math.IsInt(value)

Where:
- `value` is the input value you're checking.

Examples:

    Checking if a number is an integer:
    math.IsInt(5)  // Evaluates to true

    Checking a float value:
    math.IsInt(5.5)  // Evaluates to false

    Checking a string that represents an integer:
    math.IsInt("5")  // Evaluates to true
---
### math.IsFloat

The `math.IsFloat` function determines if the provided value is a floating-point number. It returns a boolean indicating the result.

Syntax:

    math.IsFloat(value)

Where:
- `value` is the input being evaluated.

Examples:

    Evaluating a floating-point number:
    math.IsFloat(3.14)  // Evaluates to true

    Evaluating an integer:
    math.IsFloat(7)  // Evaluates to false

    Evaluating a string representing a float:
    math.IsFloat("3.14")  // Evaluates to true
---
### math.containsFloat

The `math.containsFloat` function checks if any element within the provided list is a float. It returns a boolean value.

Syntax:

    math.containsFloat(list)

Where:
- `list` is the array of values to check.

Examples:

    Checking a list with a float:
    math.containsFloat([1, 2, 3.5])  // Evaluates to true

    Checking a list without a float:
    math.containsFloat([1, 2, 3])  // Evaluates to false

    Checking a mixed-type list:
    math.containsFloat([1, "2", 3.5])  // Evaluates to true
---
### math.IsNum

The `math.IsNum` function checks if the provided value is a number (either integer or float). It returns a boolean value.

Syntax:

    math.IsNum(value)

Where:
- `value` is the input to check.

Examples:

    Checking an integer:
    math.IsNum(42)  // Evaluates to true

    Checking a float:
    math.IsNum(3.14)  // Evaluates to true

    Checking a non-number string:
    math.IsNum("hello")  // Evaluates to false
---
### math.Abs

The `math.Abs` function returns the absolute value of the given number. It supports both integers and floats.

Syntax:

    math.Abs(number)

Where:
- `number` is the input value.

Examples:

    Getting the absolute value of a negative integer:
    math.Abs(-5)  // Evaluates to 5

    Getting the absolute value of a float:
    math.Abs(-3.14)  // Evaluates to 3.14

    Using a positive integer:
    math.Abs(7)  // Evaluates to 7
---
### math.Add

The `math.Add` function sums up all the numbers in the provided list. It supports integers and floats.

Syntax:

    math.Add(values)

Where:
- `values` is the list of numbers to add.

Examples:

    Adding integers:
    math.Add([1, 2, 3])  // Evaluates to 6

    Adding floats:
    math.Add([1.1, 2.2, 3.3])  // Evaluates to 6.6

    Adding a mix of integers and floats:
    math.Add([1, 2.5, 3])  // Evaluates to 6.5
---
### math.Mul

The `math.Mul` function multiplies all the numbers in the provided list. It supports both integers and floats.

Syntax:

    math.Mul(values)

Where:
- `values` is the list of numbers to multiply.

Examples:

    Multiplying integers:
    math.Mul([2, 3, 4])  // Evaluates to 24

    Multiplying floats:
    math.Mul([1.5, 2.5, 3.5])  // Evaluates to 13.125

    Multiplying a mix of integers and floats:
    math.Mul([2, 3.5, 4])  // Evaluates to 28
---
### math.Sub

The `math.Sub` function subtracts the second number from the first one. It supports both integers and floats.

Syntax:

    math.Sub(a, b)

Where:
- `a` is the minuend.
- `b` is the subtrahend.

Examples:

    Subtracting integers:
    math.Sub(10, 3)  // Evaluates to 7

    Subtracting floats:
    math.Sub(10.5, 3.2)  // Evaluates to 7.3

    Subtracting an integer from a float:
    math.Sub(10.5, 3)  // Evaluates to 7.5
---
### math.Div

The `math.Div` function divides the first number by the second one. It returns the quotient and an error if the divisor is zero.

Syntax:

    math.Div(a, b)

Where:
- `a` is the dividend.
- `b` is the divisor.

Examples:

    Dividing integers:
    math.Div(10, 2)  // Evaluates to 5

    Dividing floats:
    math.Div(10.5, 3.5)  // Evaluates to 3

    Dividing by zero:
    math.Div(10, 0)  // Returns an error
---
### math.Rem

The `math.Rem` function calculates the remainder of the division of two integers.

Syntax:

    math.Rem(a, b)

Where:
- `a` is the dividend.
- `b` is the divisor.

Examples:

    Getting the remainder of two integers:
    math.Rem(10, 3)  // Evaluates to 1

    Getting the remainder with a negative dividend:
    math.Rem(-10, 3)  // Evaluates to -1

    Getting the remainder with zero:
    math.Rem(0, 3)  // Evaluates to 0
---
### math.Pow

The `math.Pow` function calculates the power of the first number raised to the second number. It supports both integers and floats.

Syntax:

    math.Pow(base, exponent)

Where:
- `base` is the base number.
- `exponent` is the exponent to which the base is raised.

Examples:

    Calculating the power of integers:
    math.Pow(2, 3)  // Evaluates to 8

    Calculating the power of floats:
    math.Pow(2.5, 3.5)  // Evaluates to approximately 24.705

    Using a negative exponent:
    math.Pow(2, -3)  // Evaluates to 0.125
---
### math.Seq

The `math.Seq` function generates a sequence of integers from the start value to the end value, incrementing by the step value.

Syntax:

    math.Seq(start, end, step)

Where:
- `start` is the starting value of the sequence.
- `end` is the ending value of the sequence.
- `step` is the increment step.

Examples:

    Generating a sequence from 1 to 5:
    math.Seq(1, 5, 1)  // Evaluates to [1, 2, 3, 4, 5]

    Generating a sequence with a step of 2:
    math.Seq(1, 5, 2)  // Evaluates to [1, 3, 5]

    Generating a descending sequence:
    math.Seq(5, 1, -1)  // Evaluates to [5, 4, 3, 2, 1]
---
### math.Max

The `math.Max` function returns the maximum value among the provided numbers. It supports both integers and floats.

Syntax:

    math.Max(a, b, ...)

Where:
- `a` is the first number.
- `b` is the second number.
- `...` represents additional numbers.

Examples:

    Finding the maximum of integers:
    math.Max(1, 2, 3)  // Evaluates to 3

    Finding the maximum of floats:
    math.Max(1.2, 2.3, 3.1)  // Evaluates to 3.1

    Finding the maximum in a mixed list:
    math.Max(1, 2.5, 3)  // Evaluates to 3
---
### math.Min

The `math.Min` function returns the minimum value among the provided numbers. It supports both integers and floats.

Syntax:

    math.Min(a, b, ...)

Where:
- `a` is the first number.
- `b` is the second number.
- `...` represents additional numbers.

Examples:

    Finding the minimum of integers:
    math.Min(1, 2, 3)  // Evaluates to 1

    Finding the minimum of floats:
    math.Min(1.2, 2.3, 0.1)  // Evaluates to 0.1

    Finding the minimum in a mixed list:
    math.Min(1, 2.5, 0)  // Evaluates to 0
---
### math.Ceil

The `math.Ceil` function returns the smallest integer greater than or equal to the provided float.

Syntax:

    math.Ceil(value)

Where:
- `value` is the floating-point number.

Examples:

    Rounding up a positive float:
    math.Ceil(2.3)  // Evaluates to 3

    Rounding up a negative float:
    math.Ceil(-2.3)  // Evaluates to -2

    Using an integer:
    math.Ceil(5)  // Evaluates to 5
---
### math.Floor

The `math.Floor` function returns the largest integer less than or equal to the provided float.

Syntax:

    math.Floor(value)

Where:
- `value` is the floating-point number.

Examples:

    Rounding down a positive float:
    math.Floor(2.7)  // Evaluates to 2

    Rounding down a negative float:
    math.Floor(-2.7)  // Evaluates to -3

    Using an integer:
    math.Floor(5)  // Evaluates to 5
---
### math.Round

The `math.Round` function rounds the provided float to the nearest integer.

Syntax:

    math.Round(value)

Where:
- `value` is the floating-point number.

Examples:

    Rounding a positive float:
    math.Round(2.5)  // Evaluates to 3

    Rounding a negative float:
    math.Round(-2.5)  // Evaluates to -3

    Using an integer:
    math.Round(5)  // Evaluates to 5
---
### path.Base

The `path.Base` function in CEL is used to extract the last element of a path. It returns the base name of the provided path.

Syntax:

    path.Base(path)

Where:
- `path` is the file or directory path string.

Examples:

    Extracting the file name from a path:
    path.Base("/tmp/myfile.txt")  // Evaluates to "myfile.txt"

    Getting the last directory in a path:
    path.Base("/home/user/docs")  // Evaluates to "docs"

    When provided with an empty path:
    path.Base("")  // Evaluates to "."

---

### path.Clean

The `path.Clean` function in CEL returns the shortest path name equivalent to the provided path by purely lexical processing.

Syntax:

    path.Clean(path)

Where:
- `path` is the file or directory path string.

Examples:

    Cleaning a path with dot segments:
    path.Clean("/home/../usr/bin")  // Evaluates to "/usr/bin"

    Cleaning a path with multiple slashes:
    path.Clean("/tmp//myfile.txt")  // Evaluates to "/tmp/myfile.txt"

    Cleaning a relative path:
    path.Clean("./docs")  // Evaluates to "docs"
---
### path.Dir

The `path.Dir` function in CEL returns all but the last element of a path, typically the path's directory.

Syntax:

    path.Dir(path)

Where:
- `path` is the file or directory path string.

Examples:

    Getting the directory for a file path:
    path.Dir("/tmp/myfile.txt")  // Evaluates to "/tmp"

    Getting the parent directory:
    path.Dir("/home/user/docs")  // Evaluates to "/home/user"

    When provided with a root path:
    path.Dir("/")  // Evaluates to "/"
---
### path.Ext

The `path.Ext` function in CEL returns the file name extension used by the provided path.

Syntax:

    path.Ext(path)

Where:
- `path` is the file or directory path string.

Examples:

    Extracting the extension from a file path:
    path.Ext("/tmp/myfile.txt")  // Evaluates to ".txt"

    When the file has no extension:
    path.Ext("/tmp/myfile")  // Evaluates to ""

    Extracting extension from a hidden file:
    path.Ext("/tmp/.myfile")  // Evaluates to ""
---
### path.IsAbs

The `path.IsAbs` function in CEL checks if the provided path is an absolute path.

Syntax:

    path.IsAbs(path)

Where:
- `path` is the file or directory path string.

Examples:

    Checking an absolute path:
    path.IsAbs("/tmp/myfile.txt")  // Evaluates to true

    Checking a relative path:
    path.IsAbs("tmp/myfile.txt")  // Evaluates to false

    Checking an empty path:
    path.IsAbs("")  // Evaluates to false
---
### path.Join

The `path.Join` function in CEL concatenates multiple string elements to create a single, joined path.

Syntax:

    path.Join(element1, element2, ...)

Where:
- `element1, element2, ...` are the path elements to join.

Examples:

    Joining path elements:
    path.Join("/home", "user", "docs")  // Evaluates to "/home/user/docs"

    Joining elements with a relative path:
    path.Join("home", "user", "docs")  // Evaluates to "home/user/docs"

    Joining elements with extra slashes:
    path.Join("/tmp/", "/myfile.txt")  // Evaluates to "/tmp/myfile.txt"
---
### path.Match

The `path.Match` function in CEL checks if the provided string matches the pattern.

Syntax:

    path.Match(pattern, name)

Where:
- `pattern` is the pattern to match.
- `name` is the string to check.

Examples:

    Matching a simple pattern:
    path.Match("*.txt", "myfile.txt")  // Evaluates to true

    Pattern not matching:
    path.Match("*.txt", "myfile.doc")  // Evaluates to false

    Matching with wildcard:
    path.Match("*file.txt", "myfile.txt")  // Evaluates to true
---
### path.Split

The `path.Split` function in CEL splits the path into a directory and file name.

Syntax:

    path.Split(path)

Where:
- `path` is the file or directory path string.

Examples:

    Splitting a standard file path:
    path.Split("/tmp/myfile.txt")  // Evaluates to ["/tmp/", "myfile.txt"]

    Splitting a path ending with a slash:
    path.Split("/home/user/docs/")  // Evaluates to ["/home/user/docs", ""]

    Splitting a relative path:
    path.Split("docs/myfile.txt")  // Evaluates to ["docs/", "myfile.txt"]
---
### random.ASCII

The `random.ASCII` function in CEL generates a random ASCII string of a given length. The characters in the string are within the ASCII printable character range.

Syntax:

    random.ASCII(count)

Where:
- `count` is the length of the random ASCII string to be generated.

Examples:

    Generating a 5-character random ASCII string:
    random.ASCII(5)  // Might evaluate to "A7!2k"

    Creating a 10-character random ASCII string:
    random.ASCII(10)  // Might evaluate to "3e$7^2Go1"

    Producing a 15-character random ASCII string:
    random.ASCII(15)  // Might evaluate to "7g$!3H8^2Kl0p9"
---
### random.Alpha

The `random.Alpha` function in CEL generates a random alphabetic string containing uppercase and lowercase letters, with a specified length.

Syntax:

    random.Alpha(count)

Where:
- `count` is the length of the random alphabetic string to be generated.

Examples:

    Generating a 5-character random alphabetic string:
    random.Alpha(5)  // Might evaluate to "aBcDe"

    Creating a 10-character random alphabetic string:
    random.Alpha(10)  // Might evaluate to "FgHiJkLmNo"

    Producing a 15-character random alphabetic string:
    random.Alpha(15)  // Might evaluate to "pQrStUvWxYzAbCdEf"
---
### random.AlphaNum

The `random.AlphaNum` function in CEL generates a random alphanumeric string containing both letters and digits, with a specified length.

Syntax:

    random.AlphaNum(count)

Where:
- `count` is the length of the random alphanumeric string to be generated.

Examples:

    Generating a 5-character random alphanumeric string:
    random.AlphaNum(5)  // Might evaluate to "a1B2c"

    Creating a 10-character random alphanumeric string:
    random.AlphaNum(10)  // Might evaluate to "3D4e5F6g7H"

    Producing a 15-character random alphanumeric string:
    random.AlphaNum(15)  // Might evaluate to "8i9J0k1L2m3N4o5"
---
### random.String

The `random.String` function in CEL generates a random string based on provided character sets or bounds, with a specified length.

Syntax:

    random.String(count, characterSetOrBounds)

Where:
- `count` is the length of the random string to be generated.
- `characterSetOrBounds` can be a character set string or lower and upper bounds for character codes.

Examples:

    Generating a 5-character random string from a character set:
    random.String(5, "abc123")  // Might evaluate to "1a2b3"

    Creating a 10-character random string within character code bounds:
    random.String(10, 65, 90)  // Might evaluate to random uppercase letters

    Producing a 15-character random string from a regex character class:
    random.String(15, "[[:alnum:]]")  // Might evaluate to a mix of letters and digits
---
### random.Item

The `random.Item` function in CEL selects a random item from a given list of items.

Syntax:

    random.Item(list)

Where:
- `list` is an array or list from which a random item is selected.

Examples:

    Selecting a random item from a list of fruits:
    random.Item(["apple", "banana", "cherry"])  // Might evaluate to "banana"

    Choosing a random number from a list:
    random.Item([1, 2, 3, 4, 5])  // Might evaluate to 3

    Picking a random word from a list:
    random.Item(["hello", "world", "foo", "bar"])  // Might evaluate to "foo"
---
### random.Number

The `random.Number` function in CEL generates a random integer within a specified range.

Syntax:

    random.Number(min, max)

Where:
- `min` is the minimum value of the range (inclusive).
- `max` is the maximum value of the range (inclusive).

Examples:

    Generating a random number between 1 and 10:
    random.Number(1, 10)  // Might evaluate to 7

    Creating a random number between 50 and 100:
    random.Number(50, 100)  // Might evaluate to 89

    Producing a random number between 0 and 1000:
    random.Number(0, 1000)  // Might evaluate to 456
---
### random.Float

The `random.Float` function in CEL generates a random floating-point number within a specified range.

Syntax:

    random.Float(min, max)

Where:
- `min` is the minimum value of the range (inclusive).
- `max` is the maximum value of the range (inclusive).

Examples:

    Generating a random float between 0 and 1:
    random.Float(0, 1)  // Might evaluate to 0.572

    Creating a random float between 5 and 10:
    random.Float(5, 10)  // Might evaluate to 7.283

    Producing a random float between -1 and 1:
    random.Float(-1, 1)  // Might evaluate to -0.456
---
### regexp.Find

The `regexp.Find` function in CEL is used to find the first occurrence of a pattern within a string. It returns the matched substring or an error if the pattern is invalid.

Syntax:

    regexp.Find(pattern, input)

Where:
- `pattern` is the regular expression pattern you're looking for.
- `input` is the string you're searching within.

Examples:

    Finding a pattern within a string:
    regexp.Find("llo", "hello")  // Evaluates to "llo"

    Searching for digits within a string:
    regexp.Find("\\d+", "abc123def")  // Evaluates to "123"

    Pattern not found in the string:
    regexp.Find("xyz", "hello")  // Evaluates to ""
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

    Finding all occurrences of a pattern:
    regexp.FindAll("a.", -1, "banana")  // Evaluates to ["ba", "na", "na"]

    Limiting the number of matches:
    regexp.FindAll("\\d", 2, "12345")  // Evaluates to ["1", "2"]

    Pattern not found:
    regexp.FindAll("z", -1, "hello")  // Evaluates to []
---
### regexp.Match

The `regexp.Match` function in CEL checks if a string matches a given regular expression pattern. It returns a boolean value indicating the match status.

Syntax:

    regexp.Match(pattern, input)

Where:
- `pattern` is the regular expression pattern to match.
- `input` is the string to check.

Examples:

    Checking if a string matches a pattern:
    regexp.Match("^h.llo", "hello")  // Evaluates to true

    Pattern does not match the string:
    regexp.Match("^b", "apple")  // Evaluates to false

    Matching digits in a string:
    regexp.Match("\\d+", "abc123")  // Evaluates to true
---
### regexp.QuoteMeta

The `regexp.QuoteMeta` function in CEL quotes all regular expression metacharacters inside a string. It returns the quoted string.

Syntax:

    regexp.QuoteMeta(input)

Where:
- `input` is the string containing metacharacters to be quoted.

Examples:

    Quoting metacharacters in a string:
    regexp.QuoteMeta("a.b")  // Evaluates to "a\\.b"

    String without metacharacters:
    regexp.QuoteMeta("abc")  // Evaluates to "abc"

    Quoting a complex pattern:
    regexp.QuoteMeta("[a-z].*")  // Evaluates to "\\[a\\-z\\]\\.\\*"
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

    Replacing a pattern in a string:
    regexp.Replace("a.", "x", "banana")  // Evaluates to "bxnxna"

    Pattern not found:
    regexp.Replace("z", "x", "apple")  // Evaluates to "apple"

    Replacing digits:
    regexp.Replace("\\d+", "num", "abc123")  // Evaluates to "abcnum"
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

    Replacing a substring:
    regexp.ReplaceLiteral("apple", "orange", "apple pie")  // Evaluates to "orange pie"

    Substring not found:
    regexp.ReplaceLiteral("z", "x", "apple")  // Evaluates to "apple"

    Replacing a pattern without regex interpretation:
    regexp.ReplaceLiteral("a.", "x", "a.b c.d")  // Evaluates to "x.b c.d"

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

    Splitting a string by a pattern:
    regexp.Split("a.", -1, "banana")  // Evaluates to ["", "n", "n"]

    Limiting the number of splits:
    regexp.Split("\\s", 2, "apple pie is delicious")  // Evaluates to ["apple", "pie is delicious"]

    Pattern not found:
    regexp.Split("z", -1, "hello")  // Evaluates to ["hello"]
---
### HumanDuration

The `HumanDuration` function in CEL converts a duration into a human-readable format.

Syntax:

    HumanDuration(duration)

Where:
- `duration` is the duration you want to convert.

Examples:

    Converting a duration into a human-readable format:
    HumanDuration(3600)  // Evaluates to "1 hour"

    Converting another duration:
    HumanDuration(600)  // Evaluates to "10 minutes"

    Converting a longer duration:
    HumanDuration(86400)  // Evaluates to "1 day"
---
### HumanSize

The `HumanSize` function in CEL converts a size in bytes into a human-readable format.

Syntax:

    HumanSize(size)

Where:
- `size` is the size in bytes you want to convert.

Examples:

    Converting a size into a human-readable format:
    HumanSize(1024)  // Evaluates to "1 KiB"

    Converting another size:
    HumanSize(1048576)  // Evaluates to "1 MiB"

    Converting a larger size:
    HumanSize(1073741824)  // Evaluates to "1 GiB"
---
### Semver

The `Semver` function in CEL parses a version string and returns a map containing the major, minor, patch, prerelease, metadata, and original version.

Syntax:

    Semver(version)

Where:
- `version` is the version string to parse.

Examples:

    Parsing a semantic version:
    Semver("1.2.3-alpha+meta")  // Evaluates to a map with major: "1", minor: "2", patch: "3", prerelease: "alpha", metadata: "meta", original: "1.2.3-alpha+meta"

    Parsing another semantic version:
    Semver("2.3.4-beta+meta2")  // Evaluates to a map with major: "2", minor: "3", patch: "4", prerelease: "beta", metadata: "meta2", original: "2.3.4-beta+meta2"

    Parsing a simple semantic version:
    Semver("3.4.5")  // Evaluates to a map with major: "3", minor: "4", patch: "5", prerelease: "", metadata: "", original: "3.4.5"
---
### SemverCompare

The `SemverCompare` function in CEL compares two semantic version strings.

Syntax:

    SemverCompare(version1, version2)

Where:
- `version1` is the first version string to compare.
- `version2` is the second version string to compare.

Examples:

    Comparing two semantic versions:
    SemverCompare("1.2.3", "1.2.4")  // Evaluates to false

    Comparing two identical versions:
    SemverCompare("2.3.4", "2.3.4")  // Evaluates to true

    Comparing with a prerelease version:
    SemverCompare("3.4.5", "3.4.5-alpha")  // Evaluates to false
---
### ReplaceAll

The `ReplaceAll` function in CEL replaces all occurrences of a substring within a string with another substring.

Syntax:

    ReplaceAll(old, new, string)

Where:
- `old` is the substring to be replaced.
- `new` is the substring to replace with.
- `string` is the original string.

Examples:

    Replacing a substring:
    ReplaceAll("apple", "orange", "I have an apple")  // Evaluates to "I have an orange"

    Replacing another substring:
    ReplaceAll("cat", "dog", "The cat sat on the mat")  // Evaluates to "The dog sat on the mat"

    Replacing a substring with a number:
    ReplaceAll("one", "1", "I have one apple")  // Evaluates to "I have 1 apple"
---
### Contains

The `Contains` function in CEL checks if a string contains a given substring.

Syntax:

    Contains(substr, string)

Where:
- `substr` is the substring to check for.
- `string` is the string to check within.

Examples:

    Checking if a string contains a substring:
    Contains("apple", "I have an apple")  // Evaluates to true

    Checking another string:
    Contains("cat", "The dog sat on the mat")  // Evaluates to false

    Checking a number within a string:
    Contains("123", "My number is 12345")  // Evaluates to true
---
### HasPrefix

The `HasPrefix` function in CEL checks if a string starts with a given prefix.

Syntax:

    HasPrefix(prefix, string)

Where:
- `prefix` is the starting substring to check for.
- `string` is the string to check within.

Examples:

    Checking if a string starts with a prefix:
    HasPrefix("apple", "apple pie")  // Evaluates to true

    Checking another string:
    HasPrefix("cat", "catalogue")  // Evaluates to true

    Checking a number prefix within a string:
    HasPrefix("123", "12345 is my number")  // Evaluates to true
---
### HasSuffix

The `HasSuffix` function in CEL checks if a string ends with a given suffix.

Syntax:

    HasSuffix(suffix, string)

Where:
- `suffix` is the ending substring to check for.
- `string` is the string to check within.

Examples:

    Checking if a string ends with a suffix:
    HasSuffix("pie", "apple pie")  // Evaluates to true

    Checking another string:
    HasSuffix("log", "catalogue")  // Evaluates to false

    Checking a number suffix within a string:
    HasSuffix("45", "12345 is my number")  // Evaluates to true
---
### Repeat

The `Repeat` function in CEL repeats a string for a given number of times.

Syntax:

    Repeat(count, string)

Where:
- `count` is the number of times the string should be repeated.
- `string` is the string to repeat.

Examples:

    Repeating a string:
    Repeat(3, "apple")  // Evaluates to "appleappleapple"

    Repeating another string:
    Repeat(2, "cat")  // Evaluates to "catcat"

    Repeating a number string:
    Repeat(4, "123")  // Evaluates to "123123123123"
---
### Sort

The `Sort` function in CEL sorts a list of strings.

Syntax:

    Sort(list)

Where:
- `list` is the list of strings to sort.

Examples:

    Sorting a list of strings:
    Sort(["banana", "apple", "cherry"])  // Evaluates to ["apple", "banana", "cherry"]

    Sorting another list:
    Sort(["dog", "cat", "bird"])  // Evaluates to ["bird", "cat", "dog"]

    Sorting a list with numbers:
    Sort(["3", "1", "2"])  // Evaluates to ["1", "2", "3"]
---
### Split

The `Split` function in CEL splits a string by a given separator.

Syntax:

    Split(separator, string)

Where:
- `separator` is the string by which to split.
- `string` is the string to split.

Examples:

    Splitting a string:
    Split(",", "apple,banana,cherry")  // Evaluates to ["apple", "banana", "cherry"]

    Splitting another string:
    Split(" ", "The cat sat")  // Evaluates to ["The", "cat", "sat"]

    Splitting a number string:
    Split("-", "123-456-789")  // Evaluates to ["123", "456", "789"]
---
### Trim

The `Trim` function in CEL removes all leading and trailing instances of a set of characters from a string.

Syntax:

    Trim(cutset, string)

Where:
- `cutset` is the set of characters to remove.
- `string` is the string to trim.

Examples:

    Trimming a string:
    Trim("a", "apple")  // Evaluates to "pple"

    Trimming another string:
    Trim("t", "tattletale")  // Evaluates to "attletale"

    Trimming a number string:
    Trim("1", "11231")  // Evaluates to "123"
---
### TrimPrefix

The `TrimPrefix` function in CEL removes a given prefix from a string if the string starts with that prefix.

Syntax:

    TrimPrefix(prefix, string)

Where:
- `prefix` is the starting substring to remove.
- `string` is the string from which the prefix will be removed.

Examples:

    Removing a prefix from a string:
    TrimPrefix("Mr.", "Mr. Smith")  // Evaluates to "Smith"

    Another example:
    TrimPrefix("Astro", "Astronaut")  // Evaluates to "naut"

    If the prefix is not present:
    TrimPrefix("Dr.", "Mr. Smith")  // Evaluates to "Mr. Smith"
---
### TrimSuffix

The `TrimSuffix` function in CEL removes a given suffix from a string if the string ends with that suffix.

Syntax:

    TrimSuffix(suffix, string)

Where:
- `suffix` is the ending substring to remove.
- `string` is the string from which the suffix will be removed.

Examples:

    Removing a suffix from a string:
    TrimSuffix(".jpg", "image.jpg")  // Evaluates to "image"

    Another example:
    TrimSuffix("berry", "blueberry")  // Evaluates to "blue"

    If the suffix is not present:
    TrimSuffix(".png", "image.jpg")  // Evaluates to "image.jpg"
---
### Title

The `Title` function in CEL converts the first character of each word in a string to uppercase.

Syntax:

    Title(string)

Where:
- `string` is the string to convert.

Examples:

    Converting a string:
    Title("hello world")  // Evaluates to "Hello World"

    Another example:
    Title("make this title")  // Evaluates to "Make This Title"

    Working with mixed case:
    Title("mIxEd CaSe")  // Evaluates to "MIxED CASe"
---
### ToUpper

The `ToUpper` function in CEL converts all characters in a string to uppercase.

Syntax:

    ToUpper(string)

Where:
- `string` is the string to convert.

Examples:

    Converting a string:
    ToUpper("hello")  // Evaluates to "HELLO"

    Another example:
    ToUpper("MixedCase")  // Evaluates to "MIXEDCASE"

    Working with numbers and symbols:
    ToUpper("low3r#case")  // Evaluates to "LOW3R#CASE"
---
### ToLower

The `ToLower` function in CEL converts all characters in a string to lowercase.

Syntax:

    ToLower(string)

Where:
- `string` is the string to convert.

Examples:

    Converting a string:
    ToLower("HELLO")  // Evaluates to "hello"

    Another example:
    ToLower("MixedCase")  // Evaluates to "mixedcase"

    Working with numbers and symbols:
    ToLower("UPP3R#CASE")  // Evaluates to "upp3r#case"
---
### TrimSpace

The `TrimSpace` function in CEL removes all leading and trailing white spaces from a string.

Syntax:

    TrimSpace(string)

Where:
- `string` is the string to trim.

Examples:

    Trimming a string:
    TrimSpace("  extra spaces  ")  // Evaluates to "extra spaces"

    Another example:
    TrimSpace(" \t\n  Mixed spaces and tabs \n\t ")  // Evaluates to "Mixed spaces and tabs"

    If there are no spaces:
    TrimSpace("NoSpaces")  // Evaluates to "NoSpaces"
---
### Trunc

The `Trunc` function in CEL truncates a string to a specified length.

Syntax:

    Trunc(length, string)

Where:
- `length` is the number of characters to keep.
- `string` is the string to truncate.

Examples:

    Truncating a string:
    Trunc(3, "hello")  // Evaluates to "hel"

    Another example:
    Trunc(5, "This is a long sentence.")  // Evaluates to "This "

    If the length is longer than the string:
    Trunc(50, "short")  // Evaluates to "short"
---
### Indent

The `Indent` function in CEL indents each line of a string by a specified number of spaces or a specified prefix.

Syntax:

    Indent(width or prefix, string)

Where:
- `width or prefix` is the number of spaces or the prefix string to add before each line.
- `string` is the string to indent.

Examples:

    Indenting with spaces:
    Indent(4, "Line1\nLine2")  // Evaluates to "    Line1\n    Line2"

    Indenting with a prefix:
    Indent("> ", "Line1\nLine2")  // Evaluates to "> Line1\n> Line2"

    Indenting with a mixed prefix:
    Indent("==", "Line1\nLine2")  // Evaluates to "==Line1\n==Line2"
---
### Slug

The `Slug` function in CEL converts a given string into a URL-friendly slug format.

Syntax:

    Slug(string)

Where:
- `string` is the input string to be converted.

Examples:

    Converting a string to a slug:
    Slug("Hello World!")  // Evaluates to "hello-world"

    Converting a string with special characters:
    Slug("Hello, World!")  // Evaluates to "hello-world"

    Converting a multi-word string:
    Slug("Hello Beautiful World")  // Evaluates to "hello-beautiful-world"
---
### Quote

The `Quote` function in CEL adds double quotes around a given string.

Syntax:

    Quote(string)

Where:
- `string` is the input string to be quoted.

Examples:

    Quoting a simple string:
    Quote("Hello World")  // Evaluates to "\"Hello World\""

    Quoting a string with a number:
    Quote("12345")  // Evaluates to "\"12345\""

    Quoting an already quoted string:
    Quote("\"Hello World\"")  // Evaluates to "\"\"Hello World\"\""
---
### ShellQuote

The `ShellQuote` function in CEL quotes a string such that it can be safely used as a token in a shell command.

Syntax:

    ShellQuote(string)

Where:
- `string` is the input string to be shell quoted.

Examples:

    Shell quoting a string:
    ShellQuote("Hello World")  // Evaluates to "'Hello World'"

    Shell quoting a string with special characters:
    ShellQuote("Hello$World")  // Evaluates to "'Hello$World'"

    Shell quoting a string with spaces and special characters:
    ShellQuote("Hello World$123")  // Evaluates to "'Hello World$123'"
---
### Squote

The `Squote` function in CEL adds single quotes around a given string.

Syntax:

    Squote(string)

Where:
- `string` is the input string to be single quoted.

Examples:

    Single quoting a simple string:
    Squote("Hello World")  // Evaluates to "'Hello World'"

    Single quoting a string with a number:
    Squote("12345")  // Evaluates to "'12345'"

    Single quoting an already single quoted string:
    Squote("'Hello World'")  // Evaluates to "'''Hello World'''"
---
### SnakeCase

The `SnakeCase` function in CEL converts a given string into snake_case format.

Syntax:

    SnakeCase(string)

Where:
- `string` is the input string to be converted.

Examples:

    Converting a string to snake_case:
    SnakeCase("Hello World")  // Evaluates to "hello_world"

    Converting a CamelCase string:
    SnakeCase("HelloWorld")  // Evaluates to "hello_world"

    Converting a string with spaces and special characters:
    SnakeCase("Hello Beautiful World!")  // Evaluates to "hello_beautiful_world"
---
### CamelCase

The `CamelCase` function in CEL converts a given string into CamelCase format.

Syntax:

    CamelCase(string)

Where:
- `string` is the input string to be converted.

Examples:

    Converting a string to CamelCase:
    CamelCase("hello world")  // Evaluates to "HelloWorld"

    Converting a snake_case string:
    CamelCase("hello_world")  // Evaluates to "HelloWorld"

    Converting a string with spaces and special characters:
    CamelCase("hello beautiful world!")  // Evaluates to "HelloBeautifulWorld"
---
### KebabCase

The `KebabCase` function in CEL converts a given string into kebab-case format.

Syntax:

    KebabCase(string)

Where:
- `string` is the input string to be converted.

Examples:

    Converting a string to kebab-case:
    KebabCase("Hello World")  // Evaluates to "hello-world"

    Converting a CamelCase string:
    KebabCase("HelloWorld")  // Evaluates to "hello-world"

    Converting a string with spaces and special characters:
    KebabCase("Hello Beautiful World!")  // Evaluates to "hello-beautiful-world"
---
### WordWrap

The `WordWrap` function in CEL wraps the input string at the specified width.

Syntax:

    WordWrap(width, string)

Where:
- `width` is the number of characters at which to wrap the string.
- `string` is the input string to be wrapped.

Examples:

    Wrapping a string at a specified width:
    WordWrap(5, "Hello World")  // Evaluates to "Hello\nWorld"

    Wrapping a longer string:
    WordWrap(10, "Hello Beautiful World")  // Evaluates to "Hello\nBeautiful\nWorld"

    Wrapping a string with special characters:
    WordWrap(5, "Hello$World")  // Evaluates to "Hello\n$World"
---
### RuneCount

The `RuneCount` function in CEL counts the number of runes in a given string.

Syntax:

    RuneCount(string)

Where:
- `string` is the input string whose runes are to be counted.

Examples:

    Counting runes in a string:
    RuneCount("Hello World")  // Evaluates to 11

    Counting runes in a string with special characters:
    RuneCount("Hello$World")  // Evaluates to 11

    Counting runes in an empty string:
    RuneCount("")  // Evaluates to 0
---
### test.Assert

The `test.Assert` function in CEL is used to assert that a given condition is true. It can optionally accept a custom error message to be returned if the assertion fails.

Syntax:

    test.Assert(condition, [message])

Where:
- `condition` is the boolean condition to assert.
- `message` is an optional custom error message.

Examples:

    Asserting a true condition:
    test.Assert(true)  // No error, as the condition is true

    Asserting a false condition with a custom error message:
    test.Assert(false, "Assertion failed!")  // Error: "Assertion failed!"

    Asserting a false condition without a custom error message:
    test.Assert(false)  // Error with a default assertion failed message
---
### test.Fail

The `test.Fail` function in CEL is used to intentionally cause a test to fail, optionally with a custom failure message.

Syntax:

    test.Fail([message])

Where:
- `message` is an optional custom failure message.

Examples:

    Failing a test without a custom message:
    test.Fail()  // Test fails with a default failure message

    Failing a test with a custom message:
    test.Fail("This is a failure message")  // Test fails with the provided message
---
### test.Required

The `test.Required` function in CEL ensures that a given value is not nil or empty, optionally returning a custom error message if the value is nil or empty.

Syntax:

    test.Required(value, [message])

Where:
- `value` is the value to check.
- `message` is an optional custom error message.

Examples:

    Checking a non-empty value:
    test.Required("not empty")  // No error, as the value is not empty

    Checking an empty value with a custom error message:
    test.Required("", "Value cannot be empty!")  // Error: "Value cannot be empty!"

    Checking a nil value:
    test.Required(nil)  // Error with a default non-empty required message
---
### test.Ternary

The `test.Ternary` function in CEL is a conditional operator that returns one of two values depending on whether a given boolean condition is true or false.

Syntax:

    test.Ternary(trueValue, falseValue, condition)

Where:
- `trueValue` is the value returned if the condition is true.
- `falseValue` is the value returned if the condition is false.
- `condition` is the boolean condition to evaluate.

Examples:

    Using ternary with a true condition:
    test.Ternary("yes", "no", true)  // Returns "yes"

    Using ternary with a false condition:
    test.Ternary("yes", "no", false)  // Returns "no"

    Using ternary with a dynamic condition:
    test.Ternary("yes", "no", 5 > 3)  // Returns "yes" because 5 is greater than 3
---
### test.Kind

The `test.Kind` function in CEL returns the kind of the given argument as a string.

Syntax:

    test.Kind(value)

Where:
- `value` is the value whose kind is to be determined.

Examples:

    Getting the kind of a string:
    test.Kind("hello")  // Returns "string"

    Getting the kind of an integer:
    test.Kind(42)  // Returns "int"

    Getting the kind of a boolean:
    test.Kind(true)  // Returns "bool"
---
### test.IsKind

The `test.IsKind` function in CEL checks if the given value is of the specified kind.

Syntax:

    test.IsKind(kind, value)

Where:
- `kind` is the string representing the kind to check for.
- `value` is the value to check.

Examples:

    Checking if a value is a string:
    test.IsKind("string", "hello")  // Returns true

    Checking if a value is an integer:
    test.IsKind("int", 42)  // Returns true

    Checking if a value is a boolean:
    test.IsKind("bool", "hello")  // Returns false, because "hello" is a string
---
### time.ZoneName

The `time.ZoneName` function in CEL returns the name of the local system's time zone. It doesn't require any parameters and is useful for retrieving the time zone information.

Syntax:

    time.ZoneName()

Examples:

    Retrieving the local time zone name:
    time.ZoneName()  // Might evaluate to "PST" if the local time zone is Pacific Standard Time

    Another example of retrieving the time zone:
    time.ZoneName()  // Could evaluate to "EST" for Eastern Standard Time

    Yet another example:
    time.ZoneName()  // Might evaluate to "UTC" for Coordinated Universal Time
---
### time.ZoneOffset

The `time.ZoneOffset` function in CEL returns the offset of the local system's time zone in minutes. It helps in understanding the time difference between the local time zone and UTC.

Syntax:

    time.ZoneOffset()

Examples:

    Getting the time zone offset:
    time.ZoneOffset()  // Could evaluate to -480 for PST

    Another example of getting the offset:
    time.ZoneOffset()  // Might evaluate to 0 for UTC

    Yet another example:
    time.ZoneOffset()  // Could evaluate to 330 for IST (Indian Standard Time)
---
### time.Parse

The `time.Parse` function in CEL is used to parse a given string into a time object based on a specified layout. It's handy for converting string representations of time into actual time objects.

Syntax:

    time.Parse(layout, value)

Where:
- `layout` is the time layout string.
- `value` is the string representation of the time to be parsed.

Examples:

    Parsing a time string with a specific format:
    time.Parse("2006-01-02", "2023-09-26")  // Evaluates to a time object representing September 26, 2023

    Another example with a different format:
    time.Parse("02-01-2006", "26-09-2023")  // Evaluates to the same time object as above

    Parsing a time with hour and minute information:
    time.Parse("15:04 02-01-2006", "14:30 26-09-2023")  // Includes time of day information
---
### time.ParseLocal

The `time.ParseLocal` function in CEL parses a given string into a time object according to a specified layout and the local time zone. It's useful for working with local times.

Syntax:

    time.ParseLocal(layout, value)

Where:
- `layout` is the time layout string.
- `value` is the string representation of the time to be parsed.

Examples:

    Parsing a local time string:
    time.ParseLocal("2006-01-02 15:04", "2023-09-26 14:30")  // Evaluates to a local time object for 14:30 on September 26, 2023

    Another example:
    time.ParseLocal("02-01-2006", "26-09-2023")  // Evaluates to a local time object for September 26, 2023

    Parsing with a different time format:
    time.ParseLocal("15:04 02-01-2006", "14:30 26-09-2023")  // Includes time of day information in local time zone
---
### time.ParseInLocation

The `time.ParseInLocation` function in CEL parses a string into a time object according to a specified layout and time zone. It provides more control over the time zone compared to `time.ParseLocal`.

Syntax:

    time.ParseInLocation(layout, location, value)

Where:
- `layout` is the time layout string.
- `location` is the string name of the time zone.
- `value` is the string representation of the time to be parsed.

Examples:

    Parsing a time string for a specific time zone:
    time.ParseInLocation("2006-01-02", "America/New_York", "2023-09-26")  // Evaluates to a time object for EST/EDT

    Another example for a different time zone:
    time.ParseInLocation("02-01-2006", "Europe/London", "26-09-2023")  // Evaluates to a time object for GMT/BST

    Parsing with hour and minute for a specific zone:
    time.ParseInLocation("15:04 02-01-2006", "Asia/Tokyo", "14:30 26-09-2023")  // Evaluates to a time object for JST
---
### time.Now

The `time.Now` function in CEL returns the current time. It's a straightforward way to retrieve the current date and time according to the system's local time zone.

Syntax:

    time.Now()

Examples:

    Getting the current time:
    time.Now()  // Evaluates to the current date and time

    Another example of retrieving the current time:
    time.Now()  // Will always return the current moment's date and time

    Yet another example:
    time.Now()  // Useful for timestamping or time-stamping events in real-time
---
### time.Unix

The `time.Unix` function in CEL converts a UNIX time (seconds since the UNIX epoch) into a `time.Time` object for further processing. It accepts a string or number (int or float).

Syntax:

    time.Unix(time)

Where:
- `time` is the UNIX time to be converted.

Examples:

    Converting a UNIX timestamp to a time object:
    time.Unix(1601269200)  // Evaluates to a time object representing September 28, 2020, 2:00 AM UTC

    Another example with a different timestamp:
    time.Unix(1613861200)  // Evaluates to February 20, 2021, 2:00 PM UTC

    Using a string to represent the UNIX time:
    time.Unix("1626453200")  // Evaluates to July 17, 2021, 2:00 AM UTC
---
### time.Nanosecond

The `time.Nanosecond` function in CEL converts an integer value into a duration representing that many nanoseconds. It's useful for operations requiring high precision.

Syntax:

    time.Nanosecond(n)

Where:
- `n` is the number of nanoseconds.

Examples:

    Converting an integer to a nanosecond duration:
    time.Nanosecond(1000)  // Evaluates to a duration of 1000 nanoseconds

    Another example with a larger number:
    time.Nanosecond(1000000)  // Evaluates to a duration of 1 millisecond

    Using a string to represent the number of nanoseconds:
    time.Nanosecond("1000000000")  // Evaluates to a duration of 1 second
---
### time.Microsecond

The `time.Microsecond` function in CEL converts an integer value into a duration representing that many microseconds. It's a middle ground between millisecond and nanosecond precision.

Syntax:

    time.Microsecond(n)

Where:
- `n` is the number of microseconds.

Examples:

    Converting an integer to a microsecond duration:
    time.Microsecond(1000)  // Evaluates to a duration of 1 millisecond

    Another example with a larger number:
    time.Microsecond(1000000)  // Evaluates to a duration of 1 second

    Using a string to represent the number of microseconds:
    time.Microsecond("1000000000")  // Evaluates to a duration of about 16 minutes and 40 seconds
---
### time.Millisecond

The `time.Millisecond` function in CEL converts an integer value into a duration representing that many milliseconds. It's commonly used for operations that don't require extreme precision.

Syntax:

    time.Millisecond(n)

Where:
- `n` is the number of milliseconds.

Examples:

    Converting an integer to a millisecond duration:
    time.Millisecond(1000)  // Evaluates to a duration of 1 second

    Another example with a larger number:
    time.Millisecond(60000)  // Evaluates to a duration of 1 minute

    Using a string to represent the number of milliseconds:
    time.Millisecond("3600000")  // Evaluates to a duration of 1 hour
---
### time.Second

The `time.Second` function in CEL converts an integer value into a duration representing that many seconds. It's a standard unit for many time-related operations.

Syntax:

    time.Second(n)

Where:
- `n` is the number of seconds.

Examples:

    Converting an integer to a second duration:
    time.Second(60)  // Evaluates to a duration of 1 minute

    Another example with a larger number:
    time.Second(3600)  // Evaluates to a duration of 1 hour

    Using a string to represent the number of seconds:
    time.Second("86400")  // Evaluates to a duration of 1 day
---
### time.Minute

The `time.Minute` function in CEL converts an integer value into a duration representing that many minutes. It's useful for operations that involve human-readable time intervals.

Syntax:

    time.Minute(n)

Where:
- `n` is the number of minutes.

Examples:

    Converting an integer to a minute duration:
    time.Minute(60)  // Evaluates to a duration of 1 hour

    Another example with a larger number:
    time.Minute(1440)  // Evaluates to a duration of 1 day

    Using a string to represent the number of minutes:
    time.Minute("10080")  // Evaluates to a duration of 1 week
---
### time.Hour

The `time.Hour` function in CEL converts an integer value into a duration representing that many hours. It's useful for operations that involve larger, human-readable time intervals.

Syntax:

    time.Hour(n)

Where:
- `n` is the number of hours.

Examples:

    Converting an integer to an hour duration:
    time.Hour(24)  // Evaluates to a duration of 1 day

    Another example with a larger number:
    time.Hour(168)  // Evaluates to a duration of 1 week

    Using a string to represent the number of hours:
    time.Hour("8760")  // Evaluates to a duration of 1 year (ignoring leap years)
---
### time.ParseDuration

The `time.ParseDuration` function in CEL parses a string into a duration. It supports various units like "s" for seconds, "m" for minutes, "h" for hours, etc.

Syntax:

    time.ParseDuration(duration)

Where:
- `duration` is the string representation of the duration.

Examples:

    Parsing a duration string:
    time.ParseDuration("1h30m")  // Evaluates to a duration of 1 hour and 30 minutes

    Another example with a different format:
    time.ParseDuration("15m30s")  // Evaluates to a duration of 15 minutes and 30 seconds

    Parsing a negative duration:
    time.ParseDuration("-2h45m")  // Evaluates to a duration of -2 hours and -45 minutes
---
### time.Since

The `time.Since` function in CEL calculates the duration that has elapsed since a given time. It is commonly used to measure the time difference between a specified time and the current moment.

Syntax:

    time.Since(pastTime)

Where:
- `pastTime` is a `time.Time` object representing a past point in time.

Examples:

    Calculating the time elapsed since a specific past time:
    time.Since(time.Parse("2006-01-02", "2023-09-26"))  // Evaluates to the duration since September 26, 2023

    Another example with a different past time:
    time.Since(time.Parse("15:04 02-01-2006", "14:30 26-09-2023"))  // Evaluates to the duration since 14:30 on September 26, 2023

    Using the `time.Now` function for a real-time duration:
    time.Since(time.Now())  // Always evaluates to a very small duration, as it's the time since "now"
---
### time.Until

The `time.Until` function in CEL calculates the duration remaining until a specified future time. It helps in determining the time left for an event or deadline.

Syntax:

    time.Until(futureTime)

Where:
- `futureTime` is a `time.Time` object representing a future point in time.

Examples:

    Calculating the time remaining until a specific future time:
    time.Until(time.Parse("2006-01-02", "2023-10-01"))  // Evaluates to the duration until October 1, 2023

    Another example with a different future time:
    time.Until(time.Parse("15:04 02-01-2006", "16:00 30-09-2023"))  // Evaluates to the duration until 16:00 on September 30, 2023

    Using the `time.Now` function for a real-time duration:
    time.Until(time.Now())  // Always evaluates to zero, as it's the time until "now"
---
### uuid.V1

The `uuid.V1` function in CEL generates a version 1 UUID, which is based on the current MAC address and date/time. It returns a string representation of the generated UUID.

Syntax:

    uuid.V1()

Examples:

    Generating a version 1 UUID:
    uuid.V1()  // Evaluates to a string like "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
---

### uuid.V4

The `uuid.V4` function in CEL generates a version 4 UUID, which is random. It returns a string representation of the generated UUID.

Syntax:

    uuid.V4()

Examples:

    Generating a random UUID:
    uuid.V4()  // Evaluates to a string like "550e8400-e29b-41d4-a716-446655440000"

---

### uuid.Nil

The `uuid.Nil` function in CEL returns a nil UUID, which is a UUID with all bits set to zero.

Syntax:

    uuid.Nil()

Examples:

    Retrieving a nil UUID:
    uuid.Nil()  // Evaluates to "00000000-0000-0000-0000-000000000000"

---

### uuid.IsValid

The `uuid.IsValid` function in CEL checks if the given string is in the correct UUID format. It returns a boolean value indicating the validity.

Syntax:

    uuid.IsValid(uuidString)

Where:
- `uuidString` is the UUID string you're validating.

Examples:

    Validating a correct UUID format:
    uuid.IsValid("550e8400-e29b-41d4-a716-446655440000")  // Evaluates to true

    Checking an incorrect UUID format:
    uuid.IsValid("invalid-uuid")  // Evaluates to false

    Validating a nil UUID:
    uuid.IsValid("00000000-0000-0000-0000-000000000000")  // Evaluates to true

---

### uuid.Parse

The `uuid.Parse` function in CEL parses a given UUID string for further manipulation or inspection. It returns the parsed UUID.

Syntax:

    uuid.Parse(uuidString)

Where:
- `uuidString` is the UUID string you're parsing.

Examples:

    Parsing a valid UUID:
    uuid.Parse("550e8400-e29b-41d4-a716-446655440000")  // Evaluates to the same UUID if valid