<!--
---
linkTitle: "CEL Expression Extensions"
weight: 8
---
-->

See [CEL Language Definition](https://github.com/google/cel-spec/blob/master/doc/langdef.md)

# CEL expression extensions

The CEL expression is configured to expose parts of the request, and some custom
functions to make matching easier.

In addition to the custom function extension listed below, you can craft any
valid CEL expression as defined by the
[cel-spec language definition](https://github.com/google/cel-spec/blob/master/doc/langdef.md)

## String functions

The [upstream CEL implementation](https://github.com/google/cel-go/) provides
extensions to the CEL specification for manipulating strings.

For example:

```javascript
'refs/heads/main'.split('/') // result = list ['refs', 'heads', 'main']
['refs', 'heads', 'main'].join('/') // result = string 'refs/heads/main'
'my place'.replace('my ',' ') // result = string 'place'
'this that another'.replace('th ',' ', 2) // result = 'is at another'
```

The `replace` overload allows an optional limit on replacements.

## Notes on numbers in CEL expressions

One thing to be aware of is how numeric values are treated in CEL expressions,
JSON numbers are decoded to
[CEL double](https://github.com/google/cel-spec/blob/master/doc/langdef.md#values)
values.

For example:

```json
{
  "count": 2,
  "measure": 1.7
}
```

In the JSON above, both numbers are parsed as CEL double (Go `float64`) values.

This means that if you want to do integer arithmetic, you'll need to
[use explicit conversion functions](https://github.com/google/cel-spec/blob/master/doc/langdef.md#numeric-values).

From the CEL specification:

> Note that currently there are no automatic arithmetic conversions for the
> numeric types (int, uint, and double).

You can either explicitly convert the number, or add another double value e.g.

```yaml
interceptors:
  - cel:
      overlays:
        - key: count_plus_1
          expression: "body.count + 1.0"
        - key: count_plus_2
          expression: "int(body.count) + 2"
        - key: measure_times_3
          expression: "body.measure * 3.0"
```

These will be serialised back to JSON appropriately:

```json
{
  "count_plus_1": 2,
  "count_plus_2": 3,
  "measure_times_3": 5.1
}
```

### Error messages in conversions

The following example will generate an error with the JSON example.

```yaml
interceptors:
  - cel:
      overlays:
        - key: bad_measure_times_3
          expression: "body.measure * 3"
```

**bad_measure_times_3** will fail with
`failed to evaluate overlay expression 'body.measure * 3': no such overload`
because there's no automatic conversion.

## CEL expression examples

### Matching on an element in an array

CEL provides several [macros](https://github.com/google/cel-spec/blob/master/doc/langdef.md#macros) which can operate on JSON objects.

If you have a JSON body like this:

```json
{
  "labels": [
    {
      "name": "test-a"
    },
    {
      "name":"test-b"
    }
  ]
}
```

You can use this in filters in the following ways:

* `filter: body.labels.exists(x, x.name == 'test-b')` is _true_
* `filter: body.labels.exists(x, x.name == 'test-c')` is _false_
* `filter: body.labels.exists_one(x, x.name.endsWith('-b'))` is _true_
* `filter: body.labels.exists_one(x, x.name.startsWith('test-'))` is _false_
* `filter: body.labels.all(x, x.name.startsWith('test-'))` is _true_
* `filter: body.labels.all(x, x.name.endsWith('-b'))` is _false_

You can also parse additional data from each of the labels:

```yaml
overlays:
- key: suffixes
  expression: "body.labels.map(x, x.name.substring(x.name.lastIndexOf('-')+1))"
```

This yields an array of `["a", "b"]` in the `suffixes` extension key.

```yaml
overlays:
- key: filtered
  expression: "body.labels.filter(x, x.name.endsWith('-b'))"
```

This would add an extensions key `filtered` with only one of the labels.

```yaml
[
  {
    "name": "test-b"
  }
]
```

## cel-go extensions

All the functionality from the cel-go project's [CEL extension](https://github.com/google/cel-go/tree/master/ext) is available in
your CEL expressions.

### cel-go Bytes

The cel-go project function `base64.decode` returns a [CEL `Bytes`](https://github.com/google/cel-spec/blob/master/doc/langdef.md#string-and-bytes-values) value.

To compare this to a string, you will need to convert it to a Bytes type:

```
base64.decode(body.b64value) == b'hello' # compare to Bytes literal
base64.decode(body.b64value) == bytes('hello') # convert to bytes.
```

### Returning Bytes

If you decode a base64 string with the cel-go base64 decoder, the result will
be a set of base64 decoded bytes. To ensure the result is encoded as a string
you will need to explicitly convert it to a CEL string.

```yaml
interceptors:
  - cel:
      overlays:
        - key: base64_decoded
          expression: "string(base64.decode(body.b64Value))"
```

This will correctly appear in the extension as the decoded version.

## List of extensions

The body from the `http.Request` value is decoded to JSON and exposed, and the
headers are also available.

## Troubleshooting CEL expressions

You can use the `cel-eval` tool to evaluate your CEL expressions against a specific HTTP request.

To install the `cel-eval` tool use the following command:

```sh
go install github.com/tektoncd/triggers/cmd/cel-eval@latest
```

Below is an example of using the tool to evaluate a CEL expression:

```sh
$ cat testdata/expression.txt
body.test.nested == "value"

$ cat testdata/http.txt
POST /foo HTTP/1.1
Content-Length: 29
Content-Type: application/json
X-Header: tacocat

{"test": {"nested": "value"}}

$ cel-eval -e testdata/expression.txt -r testdata/http.txt
true
```
