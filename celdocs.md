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
### Membership Test Operator `in`
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
## FuncName

Description

Syntax

```
FuncName(str, index)
```


Examples:

    

```