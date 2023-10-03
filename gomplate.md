

## `base64.Encode`

Encode data as a Base64 string. Specifically, this uses the standard Base64 encoding as defined in [RFC4648 &sect;4](https://tools.ietf.org/html/rfc4648#section-4) (and _not_ the URL-safe encoding).

Usage

```go
base64.Encode input
```
```go
input | base64.Encode
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ The data to encode. Can be a string, a byte array, or a buffer. Other types will be converted to strings first. |

Examples

```console
$ gomplate -i '{{ base64.Encode "hello world" }}'
aGVsbG8gd29ybGQ=
```
```console
$ gomplate -i '{{ "hello world" | base64.Encode }}'
aGVsbG8gd29ybGQ=
```

## `base64.Decode`

Decode a Base64 string. This supports both standard ([RFC4648 &sect;4](https://tools.ietf.org/html/rfc4648#section-4)) and URL-safe ([RFC4648 &sect;5](https://tools.ietf.org/html/rfc4648#section-5)) encodings.

This function outputs the data as a string, so it may not be appropriate
for decoding binary data. Use [`base64.DecodeBytes`](#base64.DecodeBytes)
for binary data.

Usage

```go
base64.Decode input
```
```go
input | base64.Decode
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ The base64 string to decode |

Examples

```console
$ gomplate -i '{{ base64.Decode "aGVsbG8gd29ybGQ=" }}'
hello world
```
```console
$ gomplate -i '{{ "aGVsbG8gd29ybGQ=" | base64.Decode }}'
hello world
```

## `base64.DecodeBytes`

Decode a Base64 string. This supports both standard ([RFC4648 &sect;4](https://tools.ietf.org/html/rfc4648#section-4)) and URL-safe ([RFC4648 &sect;5](https://tools.ietf.org/html/rfc4648#section-5)) encodings.

This function outputs the data as a byte array, so it's most useful for
outputting binary data that will be processed further.
Use [`base64.Decode`](#base64.Decode) to output a plain string.

Usage

```go
base64.DecodeBytes input
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ The base64 string to decode |

Examples

```console
$ gomplate -i '{{ base64.DecodeBytes "aGVsbG8gd29ybGQ=" }}'
[104 101 108 108 111 32 119 111 114 108 100]
```
```console
$ gomplate -i '{{ "aGVsbG8gd29ybGQ=" | base64.DecodeBytes | conv.ToString }}'
hello world
```
---

These functions help manipulate and query collections of data, like lists (slices, or arrays) and maps (dictionaries).

#### Implementation Note
For the functions that return an array, a Go `[]interface{}` is returned, regardless of whether or not the
input was a different type.

## `coll.Dict`

**Alias:** `dict`

Dict is a convenience function that creates a map with string keys.
Provide arguments as key/value pairs. If an odd number of arguments
is provided, the last is used as the key, and an empty string is
set as the value.

All keys are converted to strings.

This function is equivalent to [Sprig's `dict`](http://masterminds.github.io/sprig/dicts.html#dict)
function, as used in [Helm templates](https://docs.helm.sh/chart_template_guide#template-functions-and-pipelines).

For creating more complex maps, see [`data.JSON`](../data/#data-json) or [`data.YAML`](../data/#data-yaml).

For creating arrays, see [`coll.Slice`](#coll-slice).

Usage

```go
coll.Dict in...
```

Arguments

| name | description |
|------|-------------|
| `in...` | _(required)_ The key/value pairs |

Examples

```console
$ gomplate -i '{{ coll.Dict "name" "Frank" "age" 42 | data.ToYAML }}'
age: 42
name: Frank
$ gomplate -i '{{ dict 1 2 3 | toJSON }}'
{"1":2,"3":""}
```
```console
$ cat <<EOF| gomplate
{{ define "T1" }}Hello {{ .thing }}!{{ end -}}
{{ template "T1" (dict "thing" "world")}}
{{ template "T1" (dict "thing" "everybody")}}
EOF
Hello world!
Hello everybody!
```

## `coll.Slice`

**Alias:** `slice`

Creates a slice (like an array or list). Useful when needing to `range` over a bunch of variables.

Usage

```go
coll.Slice in...
```

Arguments

| name | description |
|------|-------------|
| `in...` | _(required)_ the elements of the slice |

Examples

```console
$ gomplate -i '{{ range slice "Bart" "Lisa" "Maggie" }}Hello, {{ . }}{{ end }}'
Hello, Bart
Hello, Lisa
Hello, Maggie
```

## `coll.Has`

**Alias:** `has`

Reports whether a given object has a property with the given key, or whether a given array/slice contains the given value. Can be used with `if` to prevent the template from trying to access a non-existent property in an object.

Usage

```go
coll.Has in item
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ The object or list to search |
| `item` | _(required)_ The item to search for |

Examples

```console
$ gomplate -i '{{ $l := slice "foo" "bar" "baz" }}there is {{ if has $l "bar" }}a{{else}}no{{end}} bar'
there is a bar
```
```console
$ export DATA='{"foo": "bar"}'
$ gomplate -i '{{ $o := data.JSON (getenv "DATA") -}}
{{ if (has $o "foo") }}{{ $o.foo }}{{ else }}THERE IS NO FOO{{ end }}'
bar
```
```console
$ export DATA='{"baz": "qux"}'
$ gomplate -i '{{ $o := data.JSON (getenv "DATA") -}}
{{ if (has $o "foo") }}{{ $o.foo }}{{ else }}THERE IS NO FOO{{ end }}'
THERE IS NO FOO
```

## `coll.JSONPath`

**Alias:** `jsonpath`

Extracts portions of an input object or list using a [JSONPath][] expression.

Any object or list may be used as input. The output depends somewhat on the expression; if multiple items are matched, an array is returned.

JSONPath expressions can be validated at https://jsonpath.com

[JSONPath]: https://goessner.net/articles/JsonPath

Usage

```go
coll.JSONPath expression in
```
```go
in | coll.JSONPath expression
```

Arguments

| name | description |
|------|-------------|
| `expression` | _(required)_ The JSONPath expression |
| `in` | _(required)_ The object or list to query |

Examples

```console
$ gomplate -i '{{ .books | jsonpath `$..works[?( @.edition_count > 400 )].title` }}' -c books=https://openlibrary.org/subjects/fantasy.json
[Alice's Adventures in Wonderland Gulliver's Travels]
```

## `coll.JQ`

**Alias:** `jq`

Filters an input object or list using the [jq](https://stedolan.github.io/jq/) language, as implemented by [gojq](https://github.com/itchyny/gojq).

Any JSON datatype may be used as input (NOTE: strings are not JSON-parsed but passed in as is).
If the expression results in multiple items (no matter if streamed or as an array) they are wrapped in an array.
Otherwise a single item is returned (even if resulting in an array with a single contained element).

JQ filter expressions can be tested at https://jqplay.org/

See also:

- [jq manual](https://stedolan.github.io/jq/manual/)
- [gojq differences to jq](https://github.com/itchyny/gojq#difference-to-jq)

Usage

```go
coll.JQ expression in
```
```go
in | coll.JQ expression
```

Arguments

| name | description |
|------|-------------|
| `expression` | _(required)_ The JQ expression |
| `in` | _(required)_ The object or list to query |

Examples

```console
$ gomplate \
   -i '{{ .books | jq `[.works[]|{"title":.title,"authors":[.authors[].name],"published":.first_publish_year}][0]` }}' \
   -c books=https://openlibrary.org/subjects/fantasy.json
map[authors:[Lewis Carroll] published:1865 title:Alice's Adventures in Wonderland]
```

## `coll.Keys`

**Alias:** `keys`

Return a list of keys in one or more maps.

The keys will be ordered first by map position (if multiple maps are given),
then alphabetically.

See also [`coll.Values`](#coll-values).

Usage

```go
coll.Keys in...
```
```go
in... | coll.Keys
```

Arguments

| name | description |
|------|-------------|
| `in...` | _(required)_ the maps |

Examples

```console
$ gomplate -i '{{ coll.Keys (dict "foo" 1 "bar" 2) }}'
[bar foo]
$ gomplate -i '{{ $map1 := dict "foo" 1 "bar" 2 -}}{{ $map2 := dict "baz" 3 "qux" 4 -}}{{ coll.Keys $map1 $map2 }}'
[bar foo baz qux]
```

## `coll.Values`

**Alias:** `values`

Return a list of values in one or more maps.

The values will be ordered first by map position (if multiple maps are given),
then alphabetically by key.

See also [`coll.Keys`](#coll-keys).

Usage

```go
coll.Values in...
```
```go
in... | coll.Values
```

Arguments

| name | description |
|------|-------------|
| `in...` | _(required)_ the maps |

Examples

```console
$ gomplate -i '{{ coll.Values (dict "foo" 1 "bar" 2) }}'
[2 1]
$ gomplate -i '{{ $map1 := dict "foo" 1 "bar" 2 -}}{{ $map2 := dict "baz" 3 "qux" 4 -}}{{ coll.Values $map1 $map2 }}'
[2 1 3 4]
```

## `coll.Append`

**Alias:** `append`

Append a value to the end of a list.

_Note that this function does not change the given list; it always produces a new one._

See also [`coll.Prepend`](#coll-prepend).

Usage

```go
coll.Append value list...
```
```go
list... | coll.Append value
```

Arguments

| name | description |
|------|-------------|
| `value` | _(required)_ the value to add |
| `list...` | _(required)_ the slice or array to append to |

Examples

```console
$ gomplate -i '{{ slice 1 1 2 3 | append 5 }}'
[1 1 2 3 5]
```

## `coll.Prepend`

**Alias:** `prepend`

Prepend a value to the beginning of a list.

_Note that this function does not change the given list; it always produces a new one._

See also [`coll.Append`](#coll-append).

Usage

```go
coll.Prepend value list...
```
```go
list... | coll.Prepend value
```

Arguments

| name | description |
|------|-------------|
| `value` | _(required)_ the value to add |
| `list...` | _(required)_ the slice or array to prepend to |

Examples

```console
$ gomplate -i '{{ slice 4 3 2 1 | prepend 5 }}'
[5 4 3 2 1]
```

## `coll.Uniq`

**Alias:** `uniq`

Remove any duplicate values from the list, without changing order.

_Note that this function does not change the given list; it always produces a new one._

Usage

```go
coll.Uniq list
```
```go
list | coll.Uniq
```

Arguments

| name | description |
|------|-------------|
| `list` | _(required)_ the input list |

Examples

```console
$ gomplate -i '{{ slice 1 2 3 2 3 4 1 5 | uniq }}'
[1 2 3 4 5]
```

## `coll.Flatten`

**Alias:** `flatten`

Flatten a nested list. Defaults to completely flattening all nested lists,
but can be limited with `depth`.

_Note that this function does not change the given list; it always produces a new one._

Usage

```go
coll.Flatten [depth] list
```
```go
list | coll.Flatten [depth]
```

Arguments

| name | description |
|------|-------------|
| `depth` | _(optional)_ maximum depth of nested lists to flatten. Omit or set to `-1` for infinite depth. |
| `list` | _(required)_ the input list |

Examples

```console
$ gomplate -i '{{ "[[1,2],[],[[3,4],[[[5],6],7]]]" | jsonArray | flatten }}'
[1 2 3 4 5 6 7]
```
```console
$ gomplate -i '{{ coll.Flatten 2 ("[[1,2],[],[[3,4],[[[5],6],7]]]" | jsonArray) }}'
[1 2 3 4 [[5] 6] 7]
```

## `coll.Reverse`

**Alias:** `reverse`

Reverse a list.

_Note that this function does not change the given list; it always produces a new one._

Usage

```go
coll.Reverse list
```
```go
list | coll.Reverse
```

Arguments

| name | description |
|------|-------------|
| `list` | _(required)_ the list to reverse |

Examples

```console
$ gomplate -i '{{ slice 4 3 2 1 | reverse }}'
[1 2 3 4]
```

## `coll.Sort`

**Alias:** `sort`

Sort a given list. Uses the natural sort order if possible. For inputs
that are not sortable (either because the elements are of different types,
or of an un-sortable type), the input will simply be returned, unmodified.

Maps and structs can be sorted by a named key.

_Note that this function does not modify the input._

Usage

```go
coll.Sort [key] list
```
```go
list | coll.Sort [key]
```

Arguments

| name | description |
|------|-------------|
| `key` | _(optional)_ the key to sort by, for lists of maps or structs |
| `list` | _(required)_ the slice or array to sort |

Examples

```console
$ gomplate -i '{{ slice "foo" "bar" "baz" | coll.Sort }}'
[bar baz foo]
```
```console
$ gomplate -i '{{ sort (slice 3 4 1 2 5) }}'
[1 2 3 4 5]
```
```console
$ cat <<EOF > in.json
[{"a": "foo", "b": 1}, {"a": "bar", "b": 8}, {"a": "baz", "b": 3}]
EOF
$ gomplate -d in.json -i '{{ range (include "in" | jsonArray | coll.Sort "b") }}{{ print .a "\n" }}{{ end }}'
foo
baz
bar
```

## `coll.Merge`

**Alias:** `merge`

Merge maps together by overriding src with dst.

In other words, the src map can be configured the "default" map, whereas the dst
map can be configured the "overrides".

Many source maps can be provided. Precedence is in left-to-right order.

_Note that this function does not modify the input._

Usage

```go
coll.Merge dst srcs...
```
```go
srcs... | coll.Merge dst
```

Arguments

| name | description |
|------|-------------|
| `dst` | _(required)_ the map to merge _into_ |
| `srcs...` | _(required)_ the map (or maps) to merge _from_ |

Examples

```console
$ gomplate -i '{{ $default := dict "foo" 1 "bar" 2}}
{{ $config := dict "foo" 8 }}
{{ merge $config $default }}'
map[bar:2 foo:8]
```
```console
$ gomplate -i '{{ $dst := dict "foo" 1 "bar" 2 }}
{{ $src1 := dict "foo" 8 "baz" 4 }}
{{ $src2 := dict "foo" 3 "bar" 5 }}
{{ coll.Merge $dst $src1 $src2 }}'
map[foo:1 bar:5 baz:4]
```

## `coll.Pick`

Given a map, returns a new map with any entries that have the given keys.

All keys are converted to strings.

This is the inverse of [`coll.Omit`](#coll-omit).

_Note that this function does not modify the input._

Usage

```go
coll.Pick keys... map
```
```go
map | coll.Pick keys...
```

Arguments

| name | description |
|------|-------------|
| `keys...` | _(required)_ the keys to match |
| `map` | _(required)_ the map to pick from |

Examples

```console
$ gomplate -i '{{ $data := dict "foo" 1 "bar" 2 "baz" 3 }}
{{ coll.Pick "foo" "baz" $data }}'
map[baz:3 foo:1]
```

## `coll.Omit`

Given a map, returns a new map without any entries that have the given keys.

All keys are converted to strings.

This is the inverse of [`coll.Pic`](#coll-pick).

_Note that this function does not modify the input._

Usage

```go
coll.Omit keys... map
```
```go
map | coll.Omit keys...
```

Arguments

| name | description |
|------|-------------|
| `keys...` | _(required)_ the keys to match |
| `map` | _(required)_ the map to omit from |

Examples

```console
$ gomplate -i '{{ $data := dict "foo" 1 "bar" 2 "baz" 3 }}
{{ coll.Omit "foo" "baz" $data }}'
map[bar:2]
```


## `conv.Bool`

**Alias:** `bool`

**Note:** See also [`conv.ToBool`](#conv-tobool) for a more flexible variant.

Converts a true-ish string to a boolean. Can be used to simplify conditional statements based on environment variables or other text input.

Usage

```go
conv.Bool in
```
```go
in | conv.Bool
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ the input string |

Examples

_`input.tmpl`:_
```
{{if bool (getenv "FOO")}}foo{{else}}bar{{end}}
```

```console
$ gomplate < input.tmpl
bar
$ FOO=true gomplate < input.tmpl
foo
```

## `conv.Default`

**Alias:** `default`

Provides a default value given an empty input. Empty inputs are `0` for numeric
types, `""` for strings, `false` for booleans, empty arrays/maps, and `nil`.

Note that this will not provide a default for the case where the input is undefined
(i.e. referencing things like `.foo` where there is no `foo` field of `.`), but
[`conv.Has`](#conv-has) can be used for that.

Usage

```go
conv.Default default in
```
```go
in | conv.Default default
```

Arguments

| name | description |
|------|-------------|
| `default` | _(required)_ the default value |
| `in` | _(required)_ the input |

Examples

```console
$ gomplate -i '{{ "" | default "foo" }} {{ "bar" | default "baz" }}'
foo bar
```

## `conv.Dict` _(deprecated)_
**Deprecation Notice:** Renamed to [`coll.Dict`](#coll-dict)

**Alias:** `dict`

Dict is a convenience function that creates a map with string keys.
Provide arguments as key/value pairs. If an odd number of arguments
is provided, the last is used as the key, and an empty string is
set as the value.

All keys are converted to strings.

This function is equivalent to [Sprig's `dict`](http://masterminds.github.io/sprig/dicts.html#dict)
function, as used in [Helm templates](https://docs.helm.sh/chart_template_guide#template-functions-and-pipelines).

For creating more complex maps, see [`data.JSON`](../data/#data-json) or [`data.YAML`](../data/#data-yaml).

For creating arrays, see [`conv.Slice`](#conv-slice).

Usage

```go
conv.Dict in...
```

Arguments

| name | description |
|------|-------------|
| `in...` | _(required)_ The key/value pairs |

Examples

```console
$ gomplate -i '{{ conv.Dict "name" "Frank" "age" 42 | data.ToYAML }}'
age: 42
name: Frank
$ gomplate -i '{{ dict 1 2 3 | toJSON }}'
{"1":2,"3":""}
```
```console
$ cat <<EOF| gomplate
{{ define "T1" }}Hello {{ .thing }}!{{ end -}}
{{ template "T1" (dict "thing" "world")}}
{{ template "T1" (dict "thing" "everybody")}}
EOF
Hello world!
Hello everybody!
```

## `conv.Slice` _(deprecated)_
**Deprecation Notice:** Renamed to [`coll.Slice`](#coll-slice)

**Alias:** `slice`

Creates a slice (like an array or list). Useful when needing to `range` over a bunch of variables.

Usage

```go
conv.Slice in...
```

Arguments

| name | description |
|------|-------------|
| `in...` | _(required)_ the elements of the slice |

Examples

```console
$ gomplate -i '{{ range slice "Bart" "Lisa" "Maggie" }}Hello, {{ . }}{{ end }}'
Hello, Bart
Hello, Lisa
Hello, Maggie
```

## `conv.Has` _(deprecated)_
**Deprecation Notice:** Renamed to [`coll.Has`](#coll-has)

**Alias:** `has`

Reports whether a given object has a property with the given key, or whether a given array/slice contains the given value. Can be used with `if` to prevent the template from trying to access a non-existent property in an object.

Usage

```go
conv.Has in item
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ The object or list to search |
| `item` | _(required)_ The item to search for |

Examples

```console
$ gomplate -i '{{ $l := slice "foo" "bar" "baz" }}there is {{ if has $l "bar" }}a{{else}}no{{end}} bar'
there is a bar
```
```console
$ export DATA='{"foo": "bar"}'
$ gomplate -i '{{ $o := data.JSON (getenv "DATA") -}}
{{ if (has $o "foo") }}{{ $o.foo }}{{ else }}THERE IS NO FOO{{ end }}'
bar
```
```console
$ export DATA='{"baz": "qux"}'
$ gomplate -i '{{ $o := data.JSON (getenv "DATA") -}}
{{ if (has $o "foo") }}{{ $o.foo }}{{ else }}THERE IS NO FOO{{ end }}'
THERE IS NO FOO
```

## `conv.Join`

**Alias:** `join`

Concatenates the elements of an array to create a string. The separator string `sep` is placed between elements in the resulting string.

Usage

```go
conv.Join in sep
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ the array or slice |
| `sep` | _(required)_ the separator |

Examples

```console
$ gomplate -i '{{ $a := slice 1 2 3 }}{{ join $a "-" }}'
1-2-3
```

## `conv.URL`

**Alias:** `urlParse`

Parses a string as a URL for later use. Equivalent to [url.Parse](https://golang.org/pkg/net/url/#Parse)

Any of `url.URL`'s methods can be called on the result.

Usage

```go
conv.URL in
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ the URL string to parse |

Examples

_`input.tmpl`:_
```
{{ $u := conv.URL "https://example.com:443/foo/bar" }}
The scheme is {{ $u.Scheme }}
The host is {{ $u.Host }}
The path is {{ $u.Path }}
```

```console
$ gomplate < input.tmpl
The scheme is https
The host is example.com:443
The path is /foo/bar
```
_Call `Redacted` to hide the password in the output:_
```
$ gomplate -i '{{ (conv.URL "https://user:supersecret@example.com").Redacted }}'
https://user:xxxxx@example.com
```

## `conv.ParseInt`

_**Note:**_ See [`conv.ToInt64`](#conv-toint64) instead for a simpler and more flexible variant of this function.

Parses a string as an int64. Equivalent to [strconv.ParseInt](https://golang.org/pkg/strconv/#ParseInt)

Usage

```go
conv.ParseInt
```


Examples

_`input.tmpl`:_
```
{{ $val := conv.ParseInt (getenv "HEXVAL") 16 32 }}
The value in decimal is {{ $val }}
```

```console
$ HEXVAL=7C0 gomplate < input.tmpl

The value in decimal is 1984
```

## `conv.ParseFloat`

_**Note:**_ See [`conv.ToFloat`](#conv-tofloat) instead for a simpler and more flexible variant of this function.

Parses a string as an float64 for later use. Equivalent to [strconv.ParseFloat](https://golang.org/pkg/strconv/#ParseFloat)

Usage

```go
conv.ParseFloat
```


Examples

_`input.tmpl`:_
```
{{ $pi := conv.ParseFloat (getenv "PI") 64 }}
{{- if (gt $pi 3.0) -}}
pi is greater than 3
{{- end }}
```

```console
$ PI=3.14159265359 gomplate < input.tmpl
pi is greater than 3
```

## `conv.ParseUint`

Parses a string as an uint64 for later use. Equivalent to [strconv.ParseUint](https://golang.org/pkg/strconv/#ParseUint)

Usage

```go
conv.ParseUint
```


Examples

_`input.tmpl`:_
```
{{ conv.ParseInt (getenv "BIG") 16 64 }} is max int64
{{ conv.ParseUint (getenv "BIG") 16 64 }} is max uint64
```

```console
$ BIG=FFFFFFFFFFFFFFFF gomplate < input.tmpl
9223372036854775807 is max int64
18446744073709551615 is max uint64
```

## `conv.Atoi`

_**Note:**_ See [`conv.ToInt`](#conv-toint) and [`conv.ToInt64`](#conv-toint64) instead for simpler and more flexible variants of this function.

Parses a string as an int for later use. Equivalent to [strconv.Atoi](https://golang.org/pkg/strconv/#Atoi)

Usage

```go
conv.Atoi
```


Examples

_`input.tmpl`:_
```
{{ $number := conv.Atoi (getenv "NUMBER") }}
{{- if (gt $number 5) -}}
The number is greater than 5
{{- else -}}
The number is less than 5
{{- end }}
```

```console
$ NUMBER=21 gomplate < input.tmpl
The number is greater than 5
```

## `conv.ToBool`

Converts the input to a boolean value.
Possible `true` values are: `1` or the strings `"t"`, `"true"`, or `"yes"`
(any capitalizations). All other values are considered `false`.

Usage

```go
conv.ToBool input
```
```go
input | conv.ToBool
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ The input to convert |

Examples

```console
$ gomplate -i '{{ conv.ToBool "yes" }} {{ conv.ToBool true }} {{ conv.ToBool "0x01" }}'
true true true
$ gomplate -i '{{ conv.ToBool false }} {{ conv.ToBool "blah" }} {{ conv.ToBool 0 }}'
false false false
```

## `conv.ToBools`

Converts a list of inputs to an array of boolean values.
Possible `true` values are: `1` or the strings `"t"`, `"true"`, or `"yes"`
(any capitalizations). All other values are considered `false`.

Usage

```go
conv.ToBools input
```
```go
input | conv.ToBools
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ The input array to convert |

Examples

```console
$ gomplate -i '{{ conv.ToBools "yes" true "0x01" }}'
[true true true]
$ gomplate -i '{{ conv.ToBools false "blah" 0 }}'
[false false false]
```

## `conv.ToInt64`

Converts the input to an `int64` (64-bit signed integer).

This function attempts to convert most types of input (strings, numbers,
and booleans), but behaviour when the input can not be converted is
undefined and subject to change. Unconvertable inputs may result in
errors, or `0` or `-1`.

Floating-point numbers (with decimal points) are truncated.

Usage

```go
conv.ToInt64 in
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ the value to convert |

Examples

```console
$ gomplate -i '{{conv.ToInt64 "9223372036854775807"}}'
9223372036854775807
```
```console
$ gomplate -i '{{conv.ToInt64 "0x42"}}'
66
```
```console
$ gomplate -i '{{conv.ToInt64 true }}'
1
```

## `conv.ToInt`

Converts the input to an `int` (signed integer, 32- or 64-bit depending
on platform). This is similar to [`conv.ToInt64`](#conv-toint64) on 64-bit
platforms, but is useful when input to another function must be provided
as an `int`.

On 32-bit systems, given a number that is too large to fit in an `int`,
the result is `-1`. This is done to protect against
[CWE-190](https://cwe.mitre.org/data/definitions/190.html) and
[CWE-681](https://cwe.mitre.org/data/definitions/681.html).

See also [`conv.ToInt64`](#conv-toint64).

Usage

```go
conv.ToInt in
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ the value to convert |

Examples

```console
$ gomplate -i '{{conv.ToInt "9223372036854775807"}}'
9223372036854775807
```
```console
$ gomplate -i '{{conv.ToInt "0x42"}}'
66
```
```console
$ gomplate -i '{{conv.ToInt true }}'
1
```

## `conv.ToInt64s`

Converts the inputs to an array of `int64`s.

This delegates to [`conv.ToInt64`](#conv-toint64) for each input argument.

Usage

```go
conv.ToInt64s in...
```

Arguments

| name | description |
|------|-------------|
| `in...` | _(required)_ the inputs to be converted |

Examples

```console
gomplate -i '{{ conv.ToInt64s true 0x42 "123,456.99" "1.2345e+3"}}'
[1 66 123456 1234]
```

## `conv.ToInts`

Converts the inputs to an array of `int`s.

This delegates to [`conv.ToInt`](#conv-toint) for each input argument.

Usage

```go
conv.ToInts in...
```

Arguments

| name | description |
|------|-------------|
| `in...` | _(required)_ the inputs to be converted |

Examples

```console
gomplate -i '{{ conv.ToInts true 0x42 "123,456.99" "1.2345e+3"}}'
[1 66 123456 1234]
```

## `conv.ToFloat64`

Converts the input to a `float64`.

This function attempts to convert most types of input (strings, numbers,
and booleans), but behaviour when the input can not be converted is
undefined and subject to change. Unconvertable inputs may result in
errors, or `0` or `-1`.

Usage

```go
conv.ToFloat64 in
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ the value to convert |

Examples

```console
$ gomplate -i '{{ conv.ToFloat64 "8.233e-1"}}'
0.8233
$ gomplate -i '{{ conv.ToFloat64 "9,000.09"}}'
9000.09
```

## `conv.ToFloat64s`

Converts the inputs to an array of `float64`s.

This delegates to [`conv.ToFloat64`](#conv-tofloat64) for each input argument.

Usage

```go
conv.ToFloat64s in...
```

Arguments

| name | description |
|------|-------------|
| `in...` | _(required)_ the inputs to be converted |

Examples

```console
$ gomplate -i '{{ conv.ToFloat64s true 0x42 "123,456.99" "1.2345e+3"}}'
[1 66 123456.99 1234.5]
```

## `conv.ToString`

Converts the input (of any type) to a `string`.

The input will always be represented in _some_ way.

Usage

```go
conv.ToString in
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ the value to convert |

Examples

```console
$ gomplate -i '{{ conv.ToString 0xFF }}'
255
$ gomplate -i '{{ dict "foo" "bar" | conv.ToString}}'
map[foo:bar]
$ gomplate -i '{{ conv.ToString nil }}'
nil
```

## `conv.ToStrings`

Converts the inputs (of any type) to an array of `string`s

This delegates to [`conv.ToString`](#conv-tostring) for each input argument.

Usage

```go
conv.ToStrings in...
```

Arguments

| name | description |
|------|-------------|
| `in...` | _(required)_ the inputs to be converted |

Examples

```console
$ gomplate -i '{{ conv.ToStrings nil 42 true 0xF (slice 1 2 3) }}'
[nil 42 true 15 [1 2 3]]
```



## `crypto.Bcrypt`

Uses the [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) password hashing algorithm to generate the hash of a given string. Wraps the [`golang.org/x/crypto/brypt`](https://godoc.org/golang.org/x/crypto/bcrypt) package.

Usage

```go
crypto.Bcrypt [cost] input
```
```go
input | crypto.Bcrypt [cost]
```

Arguments

| name | description |
|------|-------------|
| `cost` | _(optional)_ the cost, as a number from `4` to `31` - defaults to `10` |
| `input` | _(required)_ the input to hash, usually a password |

Examples

```console
$ gomplate -i '{{ "foo" | crypto.Bcrypt }}'
$2a$10$jO8nKZ1etGkKK7I3.vPti.fYDAiBqwazQZLUhaFoMN7MaLhTP0SLy
```
```console
$ gomplate -i '{{ crypto.Bcrypt 4 "foo" }}
$2a$04$zjba3N38sjyYsw0Y7IRCme1H4gD0MJxH8Ixai0/sgsrf7s1MFUK1C
```

## `crypto.DecryptAES` _(experimental)_
**Experimental:** This function is [_experimental_][experimental] and may be enabled with the [`--experimental`][experimental] flag.

[experimental]: ../config/#experimental

Decrypts the given input using the given key. By default,
uses AES-256-CBC, but supports 128- and 192-bit keys as well.

This function prints the output as a string. Note that this may result in
unreadable text if the decrypted payload is binary. See
[`crypto.DecryptAESBytes`](#crypto.DecryptAESBytes) for another method.

This function is suitable for decrypting data that was encrypted by
Helm's `encryptAES` function, when the input is base64-decoded, and when
using 256-bit keys.

Usage

```go
crypto.DecryptAES key [keyBits] input
```
```go
input | crypto.DecryptAES key [keyBits]
```

Arguments

| name | description |
|------|-------------|
| `key` | _(required)_ the key to use for decryption |
| `keyBits` | _(optional)_ the key length to use - defaults to `256` |
| `input` | _(required)_ the input to decrypt |

Examples

```console
$ gomplate -i '{{ base64.Decode "Gp2WG/fKOUsVlhcpr3oqgR+fRUNBcO1eZJ9CW+gDI18=" | crypto.DecryptAES "swordfish" 128 }}'
hello world
```

## `crypto.DecryptAESBytes` _(experimental)_
**Experimental:** This function is [_experimental_][experimental] and may be enabled with the [`--experimental`][experimental] flag.

[experimental]: ../config/#experimental

Decrypts the given input using the given key. By default,
uses AES-256-CBC, but supports 128- and 192-bit keys as well.

This function outputs the raw byte array, which may be sent as input to
other functions.

This function is suitable for decrypting data that was encrypted by
Helm's `encryptAES` function, when the input is base64-decoded, and when
using 256-bit keys.

Usage

```go
crypto.DecryptAESBytes key [keyBits] input
```
```go
input | crypto.DecryptAESBytes key [keyBits]
```

Arguments

| name | description |
|------|-------------|
| `key` | _(required)_ the key to use for decryption |
| `keyBits` | _(optional)_ the key length to use - defaults to `256` |
| `input` | _(required)_ the input to decrypt |

Examples

```console
$ gomplate -i '{{ base64.Decode "Gp2WG/fKOUsVlhcpr3oqgR+fRUNBcO1eZJ9CW+gDI18=" | crypto.DecryptAES "swordfish" 128 }}'
hello world
```

## `crypto.EncryptAES` _(experimental)_
**Experimental:** This function is [_experimental_][experimental] and may be enabled with the [`--experimental`][experimental] flag.

[experimental]: ../config/#experimental

Encrypts the given input using the given key. By default,
uses AES-256-CBC, but supports 128- and 192-bit keys as well.

This function is suitable for encrypting data that will be decrypted by
Helm's `decryptAES` function, when the output is base64-encoded, and when
using 256-bit keys.

Usage

```go
crypto.EncryptAES key [keyBits] input
```
```go
input | crypto.EncryptAES key [keyBits]
```

Arguments

| name | description |
|------|-------------|
| `key` | _(required)_ the key to use for encryption |
| `keyBits` | _(optional)_ the key length to use - defaults to `256` |
| `input` | _(required)_ the input to encrypt |

Examples

```console
$ gomplate -i '{{ "hello world" | crypto.EncryptAES "swordfish" 128 | base64.Encode }}'
MnRutHovsh/9JN3YrJtBVjZtI6xXZh33bCQS2iZ4SDI=
```

## `crypto.ECDSAGenerateKey` _(experimental)_
**Experimental:** This function is [_experimental_][experimental] and may be enabled with the [`--experimental`][experimental] flag.

[experimental]: ../config/#experimental

Generate a new Elliptic Curve Private Key and output in
PEM-encoded PKCS#1 ASN.1 DER form.

Go's standard NIST P-224, P-256, P-384, and P-521 elliptic curves are all
supported.

Default curve is P-256 and can be overridden with the optional `curve`
parameter.

Usage

```go
crypto.ECDSAGenerateKey [curve]
```
```go
curve | crypto.ECDSAGenerateKey
```

Arguments

| name | description |
|------|-------------|
| `curve` | _(optional)_ One of Go's standard NIST curves, P-224, P-256, P-384, or P-521 -
defaults to P-256.
 |

Examples

```console
$ gomplate -i '{{ crypto.ECDSAGenerateKey }}'
-----BEGIN EC PRIVATE KEY-----
...
```

## `crypto.ECDSADerivePublicKey` _(experimental)_
**Experimental:** This function is [_experimental_][experimental] and may be enabled with the [`--experimental`][experimental] flag.

[experimental]: ../config/#experimental

Derive a public key from an elliptic curve private key and output in PKIX
ASN.1 DER form.

Usage

```go
crypto.ECDSADerivePublicKey key
```
```go
key | crypto.ECDSADerivePublicKey
```

Arguments

| name | description |
|------|-------------|
| `key` | _(required)_ the private key to derive a public key from |

Examples

```console
$ gomplate -i '{{ crypto.ECDSAGenerateKey | crypto.ECDSADerivePublicKey }}'
-----BEGIN PUBLIC KEY-----
...
```
```console
$ gomplate -d key=priv.pem -i '{{ crypto.ECDSADerivePublicKey (include "key") }}'
-----BEGIN PUBLIC KEY-----
MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQBZvTS1wcCJSsGYQUVoSVctynkuhke
kikB38iNwx/80jzdm+Z8OmRGlwH6OE9NX1MyxjvYMimhcj6zkaOKh1/HhMABrfuY
+hIz6+EUt/Db51awO7iCuRly5L4TZ+CnMAsIbtUOqsqwSQDtv0AclAuogmCst75o
aztsmrD79OXXnhUlURI=
-----END PUBLIC KEY-----
```

## `crypto.PBKDF2`

Run the Password-Based Key Derivation Function &num;2 as defined in
[RFC 8018 (PKCS &num;5 v2.1)](https://tools.ietf.org/html/rfc8018#section-5.2).

This function outputs the binary result as a hexadecimal string.

Usage

```go
crypto.PBKDF2 password salt iter keylen [hashfunc]
```

Arguments

| name | description |
|------|-------------|
| `password` | _(required)_ the password to use to derive the key |
| `salt` | _(required)_ the salt |
| `iter` | _(required)_ iteration count |
| `keylen` | _(required)_ desired length of derived key |
| `hashfunc` | _(optional)_ the hash function to use - must be one of the allowed functions (either in the SHA-1 or SHA-2 sets). Defaults to `SHA-1` |

Examples

```console
$ gomplate -i '{{ crypto.PBKDF2 "foo" "bar" 1024 8 }}'
32c4907c3c80792b
```

## `crypto.RSADecrypt` _(experimental)_
**Experimental:** This function is [_experimental_][experimental] and may be enabled with the [`--experimental`][experimental] flag.

[experimental]: ../config/#experimental

Decrypt an RSA-encrypted input and print the output as a string. Note that
this may result in unreadable text if the decrypted payload is binary. See
[`crypto.RSADecryptBytes`](#crypto.RSADecryptBytes) for a safer method.

The private key must be a PEM-encoded RSA private key in PKCS#1, ASN.1 DER
form, which typically begins with `-----BEGIN RSA PRIVATE KEY-----`.

The input text must be plain ciphertext, as a byte array, or safely
convertible to a byte array. To decrypt base64-encoded input, you must
first decode with the [`base64.DecodeBytes`](../base64/#base64.DecodeBytes)
function.

Usage

```go
crypto.RSADecrypt key input
```
```go
input | crypto.RSADecrypt key
```

Arguments

| name | description |
|------|-------------|
| `key` | _(required)_ the private key to decrypt the input with |
| `input` | _(required)_ the encrypted input |

Examples

```console
$ gomplate -c pubKey=./testPubKey -c privKey=./testPrivKey \
  -i '{{ $enc := "hello" | crypto.RSAEncrypt .pubKey -}}
  {{ crypto.RSADecrypt .privKey $enc }}'
hello
```
```console
$ export ENCRYPTED="ScTcX1NZ6p/EeDIf6R7FKLcDFjvP98YgiBhyhPE4jtehajIyTKP1GL8C72qbAWrgdQ6A2cSVjoyo3viqf/PZxpcBDUUMDJuemTaJqUUjMWaDuPG37mQbmRtcvFTuUhw1qSbKyHorDOgTX5d4DvWV4otycGtBT6dXhnmmb5V72J/w3z68vtTJ21m9wREFD7LrYVHdFFtRZiIyMBAF0ngQ+hcujrxilnmgzPkEAg6E7Ccctn28Ie2c4CojrwRbNNxXNlIWCCkC/8Vq8qlDfZ70a+BsTmJDuScE6BZbTyteo9uGYrLn+bTIHNDj90AeLCKUTyWLUJ5Edi9LhlKVBoJUNQ=="
$ gomplate -c ciphertext=env:///ENCRYPTED -c privKey=./testPrivKey \
  -i '{{ base64.DecodeBytes .ciphertext | crypto.RSADecrypt .privKey }}'
hello
```

## `crypto.RSADecryptBytes` _(experimental)_
**Experimental:** This function is [_experimental_][experimental] and may be enabled with the [`--experimental`][experimental] flag.

[experimental]: ../config/#experimental

Decrypt an RSA-encrypted input and output the decrypted byte array.

The private key must be a PEM-encoded RSA private key in PKCS#1, ASN.1 DER
form, which typically begins with `-----BEGIN RSA PRIVATE KEY-----`.

The input text must be plain ciphertext, as a byte array, or safely
convertible to a byte array. To decrypt base64-encoded input, you must
first decode with the [`base64.DecodeBytes`](../base64/#base64.DecodeBytes)
function.

See [`crypto.RSADecrypt`](#crypto.RSADecrypt) for a function that outputs
a string.

Usage

```go
crypto.RSADecryptBytes key input
```
```go
input | crypto.RSADecryptBytes key
```

Arguments

| name | description |
|------|-------------|
| `key` | _(required)_ the private key to decrypt the input with |
| `input` | _(required)_ the encrypted input |

Examples

```console
$ gomplate -c pubKey=./testPubKey -c privKey=./testPrivKey \
  -i '{{ $enc := "hello" | crypto.RSAEncrypt .pubKey -}}
  {{ crypto.RSADecryptBytes .privKey $enc }}'
[104 101 108 108 111]
```
```console
$ gomplate -c pubKey=./testPubKey -c privKey=./testPrivKey \
  -i '{{ $enc := "hello" | crypto.RSAEncrypt .pubKey -}}
  {{ crypto.RSADecryptBytes .privKey $enc | conv.ToString }}'
hello
```

## `crypto.RSAEncrypt` _(experimental)_
**Experimental:** This function is [_experimental_][experimental] and may be enabled with the [`--experimental`][experimental] flag.

[experimental]: ../config/#experimental

Encrypt the input with RSA and the padding scheme from PKCS#1 v1.5.

This function is suitable for encrypting data that will be decrypted by
[Terraform's `rsadecrypt` function](https://www.terraform.io/docs/configuration/functions/rsadecrypt.html).

The key should be a PEM-encoded RSA public key in PKIX ASN.1 DER form,
which typically begins with `BEGIN PUBLIC KEY`. RSA public keys in PKCS#1
ASN.1 DER form are also supported (beginning with `RSA PUBLIC KEY`).

The output will not be encoded, so consider
[base64-encoding](../base64/#base64.Encode) it for display.

_Note:_ Output encrypted with this function will _not_ be deterministic,
so encrypting the same input twice will not result in the same ciphertext.

_Warning:_ Using this function may not be safe. See the warning on Go's
[`rsa.EncryptPKCS1v15`](https://golang.org/pkg/crypto/rsa/#EncryptPKCS1v15)
documentation.

Usage

```go
crypto.RSAEncrypt key input
```
```go
input | crypto.RSAEncrypt key
```

Arguments

| name | description |
|------|-------------|
| `key` | _(required)_ the public key to encrypt the input with |
| `input` | _(required)_ the encrypted input |

Examples

```console
$ gomplate -c pubKey=./testPubKey \
  -i '{{ "hello" | crypto.RSAEncrypt .pubKey | base64.Encode }}'
ScTcX1NZ6p/EeDIf6R7FKLcDFjvP98YgiBhyhPE4jtehajIyTKP1GL8C72qbAWrgdQ6A2cSVjoyo3viqf/PZxpcBDUUMDJuemTaJqUUjMWaDuPG37mQbmRtcvFTuUhw1qSbKyHorDOgTX5d4DvWV4otycGtBT6dXhnmmb5V72J/w3z68vtTJ21m9wREFD7LrYVHdFFtRZiIyMBAF0ngQ+hcujrxilnmgzPkEAg6E7Ccctn28Ie2c4CojrwRbNNxXNlIWCCkC/8Vq8qlDfZ70a+BsTmJDuScE6BZbTyteo9uGYrLn+bTIHNDj90AeLCKUTyWLUJ5Edi9LhlKVBoJUNQ==
```
```console
$ gomplate -c pubKey=./testPubKey \
  -i '{{ $enc := "hello" | crypto.RSAEncrypt .pubKey -}}
  Ciphertext in hex: {{ printf "%x" $enc }}'
71729b87cccabb248b9e0e5173f0b12c01d9d2a0565bad18aef9d332ce984bde06acb8bb69334a01446f7f6430077f269e6fbf2ccacd972fe5856dd4719252ebddf599948d937d96ea41540dad291b868f6c0cf647dffdb5acb22cd33557f9a1ddd0ee6c1ad2bbafc910ba8f817b66ea0569afc06e5c7858fd9dc2638861fe7c97391b2f190e4c682b4aa2c9b0050081efe18b10aa8c2b2b5f5b68a42dcc06c9da35b37fca9b1509fddc940eb99f516a2e0195405bcb3993f0fa31bc038d53d2e7231dff08cc39448105ed2d0ac52d375cb543ca8a399f807cc5d007e2c44c69876d189667eee66361a393c4916826af77479382838cd4e004b8baa05636805a
```

## `crypto.RSAGenerateKey` _(experimental)_
**Experimental:** This function is [_experimental_][experimental] and may be enabled with the [`--experimental`][experimental] flag.

[experimental]: ../config/#experimental

Generate a new RSA Private Key and output in PEM-encoded PKCS#1 ASN.1 DER
form.

Default key length is 4096 bits, which should be safe enough for most
uses, but can be overridden with the optional `bits` parameter.

In order to protect against [CWE-326](https://cwe.mitre.org/data/definitions/326.html),
keys shorter than `2048` bits may not be generated.

The output is a string, suitable for use with the other `crypto.RSA*`
functions.

Usage

```go
crypto.RSAGenerateKey [bits]
```
```go
bits | crypto.RSAGenerateKey
```

Arguments

| name | description |
|------|-------------|
| `bits` | _(optional)_ Length in bits of the generated key. Must be at least `2048`. Defaults to `4096` |

Examples

```console
$ gomplate -i '{{ crypto.RSAGenerateKey }}'
-----BEGIN RSA PRIVATE KEY-----
...
```
```console
$ gomplate -i '{{ $key := crypto.RSAGenerateKey 2048 -}}
  {{ $pub := crypto.RSADerivePublicKey $key -}}
  {{ $enc := "hello" | crypto.RSAEncrypt $pub -}}
  {{ crypto.RSADecrypt $key $enc }}'
hello
```

## `crypto.RSADerivePublicKey` _(experimental)_
**Experimental:** This function is [_experimental_][experimental] and may be enabled with the [`--experimental`][experimental] flag.

[experimental]: ../config/#experimental

Derive a public key from an RSA private key and output in PKIX ASN.1 DER
form.

The output is a string, suitable for use with other `crypto.RSA*`
functions.

Usage

```go
crypto.RSADerivePublicKey key
```
```go
key | crypto.RSADerivePublicKey
```

Arguments

| name | description |
|------|-------------|
| `key` | _(required)_ the private key to derive a public key from |

Examples

```console
$ gomplate -i '{{ crypto.RSAGenerateKey | crypto.RSADerivePublicKey }}'
-----BEGIN PUBLIC KEY-----
...
```
```console
$ gomplate -c privKey=./privKey.pem \
  -i '{{ $pub := crypto.RSADerivePublicKey .privKey -}}
  {{ $enc := "hello" | crypto.RSAEncrypt $pub -}}
  {{ crypto.RSADecrypt .privKey $enc }}'
hello
```

## `crypto.SHA1`, `crypto.SHA224`, `crypto.SHA256`, `crypto.SHA384`, `crypto.SHA512`, `crypto.SHA512_224`, `crypto.SHA512_256`

Compute a checksum with a SHA-1 or SHA-2 algorithm as defined in [RFC 3174](https://tools.ietf.org/html/rfc3174) (SHA-1) and [FIPS 180-4](http://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf) (SHA-2).

These functions output the binary result as a hexadecimal string.

_Warning: SHA-1 is cryptographically broken and should not be used for secure applications._

Usage
```
crypto.SHA1 input
crypto.SHA224 input
crypto.SHA256 input
crypto.SHA384 input
crypto.SHA512 input
crypto.SHA512_224 input
crypto.SHA512_256 input
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ the data to hash - can be binary data or text |

Examples

```console
$ gomplate -i '{{ crypto.SHA1 "foo" }}'
f1d2d2f924e986ac86fdf7b36c94bcdf32beec15
```
```console
$ gomplate -i '{{ crypto.SHA512 "bar" }}'
cc06808cbbee0510331aa97974132e8dc296aeb795be229d064bae784b0a87a5cf4281d82e8c99271b75db2148f08a026c1a60ed9cabdb8cac6d24242dac4063
```

## `crypto.SHA1Bytes`, `crypto.SHA224Bytes`, `crypto.SHA256Bytes`, `crypto.SHA384Bytes`, `crypto.SHA512Bytes`, `crypto.SHA512_224Bytes`, `crypto.SHA512_256Bytes`

Compute a checksum with a SHA-1 or SHA-2 algorithm as defined in [RFC 3174](https://tools.ietf.org/html/rfc3174) (SHA-1) and [FIPS 180-4](http://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf) (SHA-2).

These functions output the raw binary result, suitable for piping to other functions.

_Warning: SHA-1 is cryptographically broken and should not be used for secure applications._

Usage
```
crypto.SHA1Bytes input
crypto.SHA224Bytes input
crypto.SHA256Bytes input
crypto.SHA384Bytes input
crypto.SHA512Bytes input
crypto.SHA512_224Bytes input
crypto.SHA512_256Bytes input
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ the data to hash - can be binary data or text |

Examples

```console
$ gomplate -i '{{ crypto.SHA256Bytes "foo" | base64.Encode }}'
LCa0a2j/xo/5m0U8HTBBNBNCLXBkg7+g+YpeiGJm564=
```

## `crypto.WPAPSK`

This is really an alias to [`crypto.PBKDF2`](#crypto.PBKDF2) with the
values necessary to convert ASCII passphrases to the WPA pre-shared keys for use with WiFi networks.

This can be used, for example, to help generate a configuration for [wpa_supplicant](http://w1.fi/wpa_supplicant/).

Usage

```go
crypto.WPAPSK ssid password
```

Arguments

| name | description |
|------|-------------|
| `ssid` | _(required)_ the WiFi SSID (network name) - must be less than 32 characters |
| `password` | _(required)_ the password - must be between 8 and 63 characters |

Examples

```console
$ PW=abcd1234 gomplate -i '{{ crypto.WPAPSK "mynet" (getenv "PW") }}'
2c201d66f01237d17d4a7788051191f31706844ac3ffe7547a66c902f2900d34
```



## `datasource`

**Alias:** `ds`

Parses a given datasource (provided by the [`--datasource/-d`](../../usage/#datasource-d) argument or [`defineDatasource`](#definedatasource)).

If the `alias` is undefined, but is a valid URL, `datasource` will dynamically read from that URL.

See [Datasources](../../datasources) for (much!) more information.

Usage

```go
datasource alias [subpath]
```

Arguments

| name | description |
|------|-------------|
| `alias` | _(required)_ the datasource alias (or a URL for dynamic use) |
| `subpath` | _(optional)_ the subpath to use, if supported by the datasource |

Examples

_`person.json`:_
```json
{ "name": "Dave" }
```

```console
$ gomplate -d person.json -i 'Hello {{ (datasource "person").name }}'
Hello Dave
```

## `datasourceExists`

Tests whether or not a given datasource was defined on the commandline (with the
[`--datasource/-d`](../../usage/#datasource-d) argument). This is intended mainly to allow
a template to be rendered differently whether or not a given datasource was
defined.

Note: this does _not_ verify if the datasource is reachable.

Useful when used in an `if`/`else` block.

Usage

```go
datasourceExists alias
```

Arguments

| name | description |
|------|-------------|
| `alias` | _(required)_ the datasource alias |

Examples

```console
$ echo '{{if (datasourceExists "test")}}{{datasource "test"}}{{else}}no worries{{end}}' | gomplate
no worries
```

## `datasourceReachable`

Tests whether or not a given datasource is defined and reachable, where the definition of "reachable" differs by datasource, but generally means the data is able to be read successfully.

Useful when used in an `if`/`else` block.

Usage

```go
datasourceReachable alias
```

Arguments

| name | description |
|------|-------------|
| `alias` | _(required)_ the datasource alias |

Examples

```console
$ gomplate -i '{{if (datasourceReachable "test")}}{{datasource "test"}}{{else}}no worries{{end}}' -d test=https://bogus.example.com/wontwork.json
no worries
```

## `listDatasources`

Lists all the datasources defined, list returned will be sorted in ascending order.

Usage

```go
listDatasources
```

Examples

```console
$ gomplate -d person=env:///FOO -d bar=env:///BAR -i '{{range (listDatasources)}} Datasource-{{.}} {{end}}'
Datasource-bar
Datasource-person
```

## `defineDatasource`

Define a datasource alias with target URL inside the template. Overridden by the [`--datasource/-d`](../../usage/#datasource-d) flag.

Note: once a datasource is defined, it can not be redefined (i.e. if this function is called twice with the same alias, only the first applies).

This function can provide a good way to set a default datasource when sharing templates.

See [Datasources](../../datasources) for (much!) more information.

Usage

```go
defineDatasource alias url
```

Arguments

| name | description |
|------|-------------|
| `alias` | _(required)_ the datasource alias |
| `url` | _(required)_ the datasource's URL |

Examples

_`person.json`:_
```json
{ "name": "Dave" }
```

```console
$ gomplate -i '{{ defineDatasource "person" "person.json" }}Hello {{ (ds "person").name }}'
Hello Dave
$ FOO='{"name": "Daisy"}' gomplate -d person=env:///FOO -i '{{ defineDatasource "person" "person.json" }}Hello {{ (ds "person").name }}'
Hello Daisy
```

## `include`

Includes the content of a given datasource (provided by the [`--datasource/-d`](../../usage/#datasource-d) argument).

This is similar to [`datasource`](#datasource), except that the data is not parsed. There is no restriction on the type of data included, except that it should be textual.

Usage

```go
include alias [subpath]
```

Arguments

| name | description |
|------|-------------|
| `alias` | _(required)_ the datasource alias, as provided by [`--datasource/-d`](../../usage/#datasource-d) |
| `subpath` | _(optional)_ the subpath to use, if supported by the datasource |

Examples

_`person.json`:_
```json
{ "name": "Dave" }
```

_`input.tmpl`:_
```go
{
  "people": [
    {{ include "person" }}
  ]
}
```

```console
$ gomplate -d person.json -f input.tmpl
{
  "people": [
    { "name": "Dave" }
  ]
}
```

## `data.JSON`

**Alias:** `json`

Converts a JSON string into an object. Works for JSON Objects, but will
also parse JSON Arrays. Will not parse other valid JSON types.

For more explict JSON Array support, see [`data.JSONArray`](#data-jsonarray).

#### Encrypted JSON support (EJSON)

If the input is in the [EJSON](https://github.com/Shopify/ejson) format (i.e. has a `_public_key` field), this function will attempt to decrypt the document first. A private key must be provided by one of these methods:

- set the `EJSON_KEY` environment variable to the private key's value
- set the `EJSON_KEY_FILE` environment variable to the path to a file containing the private key
- set the `EJSON_KEYDIR` environment variable to the path to a directory containing private keys (filename must be the public key), just like [`ejson decrypt`'s `--keydir`](https://github.com/Shopify/ejson/blob/master/man/man1/ejson.1.ronn) flag. Defaults to `/opt/ejson/keys`.

Usage

```go
data.JSON in
```
```go
in | data.JSON
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ the input string |

Examples

_`input.tmpl`:_
```
Hello {{ (getenv "FOO" | json).hello }}
```

```console
$ export FOO='{"hello":"world"}'
$ gomplate < input.tmpl
Hello world
```

## `data.JSONArray`

**Alias:** `jsonArray`

Converts a JSON string into a slice. Only works for JSON Arrays.

Usage

```go
data.JSONArray in
```
```go
in | data.JSONArray
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ the input string |

Examples

_`input.tmpl`:_
```
Hello {{ index (getenv "FOO" | jsonArray) 1 }}
```

```console
$ export FOO='[ "you", "world" ]'
$ gomplate < input.tmpl
Hello world
```

## `data.YAML`

**Alias:** `yaml`

Converts a YAML string into an object. Works for YAML Objects but will
also parse YAML Arrays. This can be used to access properties of YAML objects.

For more explict YAML Array support, see [`data.JSONArray`](#data-yamlarray).

Usage

```go
data.YAML in
```
```go
in | data.YAML
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ the input string |

Examples

_`input.tmpl`:_
```
Hello {{ (getenv "FOO" | yaml).hello }}
```

```console
$ export FOO='hello: world'
$ gomplate < input.tmpl
Hello world
```

## `data.YAMLArray`

**Alias:** `yamlArray`

Converts a YAML string into a slice. Only works for YAML Arrays.

Usage

```go
data.YAMLArray in
```
```go
in | data.YAMLArray
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ the input string |

Examples

_`input.tmpl`:_
```
Hello {{ index (getenv "FOO" | yamlArray) 1 }}
```

```console
$ export FOO='[ "you", "world" ]'
$ gomplate < input.tmpl
Hello world
```

## `data.TOML`

**Alias:** `toml`

Converts a [TOML](https://github.com/toml-lang/toml) document into an object.
This can be used to access properties of TOML documents.

Compatible with [TOML v0.4.0](https://github.com/toml-lang/toml/blob/master/versions/en/toml-v0.4.0.md).

Usage

```go
data.TOML input
```
```go
input | data.TOML
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ the TOML document to parse |

Examples

_`input.tmpl`:_
```
{{ $t := `[data]
hello = "world"` -}}
Hello {{ (toml $t).hello }}
```

```console
$ gomplate -f input.tmpl
Hello world
```

## `data.CSV`

**Alias:** `csv`

Converts a CSV-format string into a 2-dimensional string array.

By default, the [RFC 4180](https://tools.ietf.org/html/rfc4180) format is
supported, but any single-character delimiter can be specified.

Usage

```go
data.CSV [delim] input
```
```go
input | data.CSV [delim]
```

Arguments

| name | description |
|------|-------------|
| `delim` | _(optional)_ the (single-character!) field delimiter, defaults to `","` |
| `input` | _(required)_ the CSV-format string to parse |

Examples

_`input.tmpl`:_
```
{{ $c := `C,32
Go,25
COBOL,357` -}}
{{ range ($c | csv) -}}
{{ index . 0 }} has {{ index . 1 }} keywords.
{{ end }}
```

```console
$ gomplate < input.tmpl
C has 32 keywords.
Go has 25 keywords.
COBOL has 357 keywords.
```

## `data.CSVByRow`

**Alias:** `csvByRow`

Converts a CSV-format string into a slice of maps.

By default, the [RFC 4180](https://tools.ietf.org/html/rfc4180) format is
supported, but any single-character delimiter can be specified.

Also by default, the first line of the string will be assumed to be the header,
but this can be overridden by providing an explicit header, or auto-indexing
can be used.

Usage

```go
data.CSVByRow [delim] [header] input
```
```go
input | data.CSVByRow [delim] [header]
```

Arguments

| name | description |
|------|-------------|
| `delim` | _(optional)_ the (single-character!) field delimiter, defaults to `","` |
| `header` | _(optional)_ comma-separated list of column names, set to `""` to get auto-named columns (A-Z), defaults to using the first line of `input` |
| `input` | _(required)_ the CSV-format string to parse |

Examples

_`input.tmpl`:_
```
{{ $c := `lang,keywords
C,32
Go,25
COBOL,357` -}}
{{ range ($c | csvByRow) -}}
{{ .lang }} has {{ .keywords }} keywords.
{{ end }}
```

```console
$ gomplate < input.tmpl
C has 32 keywords.
Go has 25 keywords.
COBOL has 357 keywords.
```

## `data.CSVByColumn`

**Alias:** `csvByColumn`

Like [`csvByRow`](#csvByRow), except that the data is presented as a columnar
(column-oriented) map.

Usage

```go
data.CSVByColumn [delim] [header] input
```
```go
input | data.CSVByColumn [delim] [header]
```

Arguments

| name | description |
|------|-------------|
| `delim` | _(optional)_ the (single-character!) field delimiter, defaults to `","` |
| `header` | _(optional)_ comma-separated list of column names, set to `""` to get auto-named columns (A-Z), defaults to using the first line of `input` |
| `input` | _(required)_ the CSV-format string to parse |

Examples

_`input.tmpl`:_
```
{{ $c := `C;32
Go;25
COBOL;357` -}}
{{ $langs := ($c | csvByColumn ";" "lang,keywords").lang -}}
{{ range $langs }}{{ . }}
{{ end -}}
```

```console
$ gomplate < input.tmpl
C
Go
COBOL
```

## `data.ToJSON`

**Alias:** `toJSON`

Converts an object to a JSON document. Input objects may be the result of `json`, `yaml`, `jsonArray`, or `yamlArray` functions, or they could be provided by a `datasource`.

Usage

```go
data.ToJSON obj
```
```go
obj | data.ToJSON
```

Arguments

| name | description |
|------|-------------|
| `obj` | _(required)_ the object to marshal |

Examples

_This is obviously contrived - `json` is used to create an object._

_`input.tmpl`:_
```
{{ (`{"foo":{"hello":"world"}}` | json).foo | toJSON }}
```

```console
$ gomplate < input.tmpl
{"hello":"world"}
```

## `data.ToJSONPretty`

**Alias:** `toJSONPretty`

Converts an object to a pretty-printed (or _indented_) JSON document.
Input objects may be the result of functions like `data.JSON`, `data.YAML`,
`data.JSONArray`, or `data.YAMLArray` functions, or they could be provided
by a [`datasource`](../general/datasource).

The indent string must be provided as an argument.

Usage

```go
data.ToJSONPretty indent obj
```
```go
obj | data.ToJSONPretty indent
```

Arguments

| name | description |
|------|-------------|
| `indent` | _(required)_ the string to use for indentation |
| `obj` | _(required)_ the object to marshal |

Examples

_`input.tmpl`:_
```
{{ `{"hello":"world"}` | data.JSON | data.ToJSONPretty "  " }}
```

```console
$ gomplate < input.tmpl
{
  "hello": "world"
}
```

## `data.ToYAML`

**Alias:** `toYAML`

Converts an object to a YAML document. Input objects may be the result of
`data.JSON`, `data.YAML`, `data.JSONArray`, or `data.YAMLArray` functions,
or they could be provided by a [`datasource`](../general/datasource).

Usage

```go
data.ToYAML obj
```
```go
obj | data.ToYAML
```

Arguments

| name | description |
|------|-------------|
| `obj` | _(required)_ the object to marshal |

Examples

_This is obviously contrived - `data.JSON` is used to create an object._

_`input.tmpl`:_
```
{{ (`{"foo":{"hello":"world"}}` | data.JSON).foo | data.ToYAML }}
```

```console
$ gomplate < input.tmpl
hello: world
```

## `data.ToTOML`

**Alias:** `toTOML`

Converts an object to a [TOML](https://github.com/toml-lang/toml) document.

Usage

```go
data.ToTOML obj
```
```go
obj | data.ToTOML
```

Arguments

| name | description |
|------|-------------|
| `obj` | _(required)_ the object to marshal as a TOML document |

Examples

```console
$ gomplate -i '{{ `{"foo":"bar"}` | data.JSON | data.ToTOML }}'
foo = "bar"
```

## `data.ToCSV`

**Alias:** `toCSV`

Converts an object to a CSV document. The input object must be a 2-dimensional
array of strings (a `[][]string`). Objects produced by [`data.CSVByRow`](#conv-csvbyrow)
and [`data.CSVByColumn`](#conv-csvbycolumn) cannot yet be converted back to CSV documents.

**Note:** With the exception that a custom delimiter can be used, `data.ToCSV`
outputs according to the [RFC 4180](https://tools.ietf.org/html/rfc4180) format,
which means that line terminators are `CRLF` (Windows format, or `\r\n`). If
you require `LF` (UNIX format, or `\n`), the output can be piped through
[`strings.ReplaceAll`](../strings/#strings-replaceall) to replace `"\r\n"` with `"\n"`.

Usage

```go
data.ToCSV [delim] input
```
```go
input | data.ToCSV [delim]
```

Arguments

| name | description |
|------|-------------|
| `delim` | _(optional)_ the (single-character!) field delimiter, defaults to `","` |
| `input` | _(required)_ the object to convert to a CSV |

Examples

_`input.tmpl`:_
```go
{{ $rows := (jsonArray `[["first","second"],["1","2"],["3","4"]]`) -}}
{{ data.ToCSV ";" $rows }}
```

```console
$ gomplate -f input.tmpl
first,second
1,2
3,4
```



## `filepath.Base`

Returns the last element of path. Trailing path separators are removed before extracting the last element. If the path is empty, Base returns `.`. If the path consists entirely of separators, Base returns a single separator.

A wrapper for Go's [`filepath.Base`](https://golang.org/pkg/path/filepath/#Base) function.

Usage

```go
filepath.Base path
```
```go
path | filepath.Base
```

Arguments

| name | description |
|------|-------------|
| `path` | _(required)_ The input path |

Examples

```console
$ gomplate -i '{{ filepath.Base "/tmp/foo" }}'
foo
```

## `filepath.Clean`

Clean returns the shortest path name equivalent to path by purely lexical processing.

A wrapper for Go's [`filepath.Clean`](https://golang.org/pkg/path/filepath/#Clean) function.

Usage

```go
filepath.Clean path
```
```go
path | filepath.Clean
```

Arguments

| name | description |
|------|-------------|
| `path` | _(required)_ The input path |

Examples

```console
$ gomplate -i '{{ filepath.Clean "/tmp//foo/../" }}'
/tmp
```

## `filepath.Dir`

Returns all but the last element of path, typically the path's directory.

A wrapper for Go's [`filepath.Dir`](https://golang.org/pkg/path/filepath/#Dir) function.

Usage

```go
filepath.Dir path
```
```go
path | filepath.Dir
```

Arguments

| name | description |
|------|-------------|
| `path` | _(required)_ The input path |

Examples

```console
$ gomplate -i '{{ filepath.Dir "/tmp/foo" }}'
/tmp
```

## `filepath.Ext`

Returns the file name extension used by path.

A wrapper for Go's [`filepath.Ext`](https://golang.org/pkg/path/filepath/#Ext) function.

Usage

```go
filepath.Ext path
```
```go
path | filepath.Ext
```

Arguments

| name | description |
|------|-------------|
| `path` | _(required)_ The input path |

Examples

```console
$ gomplate -i '{{ filepath.Ext "/tmp/foo.csv" }}'
.csv
```

## `filepath.FromSlash`

Returns the result of replacing each slash (`/`) character in the path with the platform's separator character.

A wrapper for Go's [`filepath.FromSlash`](https://golang.org/pkg/path/filepath/#FromSlash) function.

Usage

```go
filepath.FromSlash path
```
```go
path | filepath.FromSlash
```

Arguments

| name | description |
|------|-------------|
| `path` | _(required)_ The input path |

Examples

```console
$ gomplate -i '{{ filepath.FromSlash "/foo/bar" }}'
/foo/bar
C:\> gomplate.exe -i '{{ filepath.FromSlash "/foo/bar" }}'
C:\foo\bar
```

## `filepath.IsAbs`

Reports whether the path is absolute.

A wrapper for Go's [`filepath.IsAbs`](https://golang.org/pkg/path/filepath/#IsAbs) function.

Usage

```go
filepath.IsAbs path
```
```go
path | filepath.IsAbs
```

Arguments

| name | description |
|------|-------------|
| `path` | _(required)_ The input path |

Examples

```console
$ gomplate -i 'the path is {{ if (filepath.IsAbs "/tmp/foo.csv") }}absolute{{else}}relative{{end}}'
the path is absolute
$ gomplate -i 'the path is {{ if (filepath.IsAbs "../foo.csv") }}absolute{{else}}relative{{end}}'
the path is relative
```

## `filepath.Join`

Joins any number of path elements into a single path, adding a separator if necessary.

A wrapper for Go's [`filepath.Join`](https://golang.org/pkg/path/filepath/#Join) function.

Usage

```go
filepath.Join elem...
```

Arguments

| name | description |
|------|-------------|
| `elem...` | _(required)_ The path elements to join (0 or more) |

Examples

```console
$ gomplate -i '{{ filepath.Join "/tmp" "foo" "bar" }}'
/tmp/foo/bar
C:\> gomplate.exe -i '{{ filepath.Join "C:\tmp" "foo" "bar" }}'
C:\tmp\foo\bar
```

## `filepath.Match`

Reports whether name matches the shell file name pattern.

A wrapper for Go's [`filepath.Match`](https://golang.org/pkg/path/filepath/#Match) function.

Usage

```go
filepath.Match pattern path
```

Arguments

| name | description |
|------|-------------|
| `pattern` | _(required)_ The pattern to match on |
| `path` | _(required)_ The path to match |

Examples

```console
$ gomplate -i '{{ filepath.Match "*.csv" "foo.csv" }}'
true
```

## `filepath.Rel`

Returns a relative path that is lexically equivalent to targetpath when joined to basepath with an intervening separator.

A wrapper for Go's [`filepath.Rel`](https://golang.org/pkg/path/filepath/#Rel) function.

Usage

```go
filepath.Rel basepath targetpath
```

Arguments

| name | description |
|------|-------------|
| `basepath` | _(required)_ The base path |
| `targetpath` | _(required)_ The target path |

Examples

```console
$ gomplate -i '{{ filepath.Rel "/a" "/a/b/c" }}'
b/c
```

## `filepath.Split`

Splits path immediately following the final path separator, separating it into a directory and file name component.

The function returns an array with two values, the first being the diretory, and the second the file.

A wrapper for Go's [`filepath.Split`](https://golang.org/pkg/path/filepath/#Split) function.

Usage

```go
filepath.Split path
```
```go
path | filepath.Split
```

Arguments

| name | description |
|------|-------------|
| `path` | _(required)_ The input path |

Examples

```console
$ gomplate -i '{{ $p := filepath.Split "/tmp/foo" }}{{ $dir := index $p 0 }}{{ $file := index $p 1 }}dir is {{$dir}}, file is {{$file}}'
dir is /tmp/, file is foo
C:\> gomplate.exe -i '{{ $p := filepath.Split `C:\tmp\foo` }}{{ $dir := index $p 0 }}{{ $file := index $p 1 }}dir is {{$dir}}, file is {{$file}}'
dir is C:\tmp\, file is foo
```

## `filepath.ToSlash`

Returns the result of replacing each separator character in path with a slash (`/`) character.

A wrapper for Go's [`filepath.ToSlash`](https://golang.org/pkg/path/filepath/#ToSlash) function.

Usage

```go
filepath.ToSlash path
```
```go
path | filepath.ToSlash
```

Arguments

| name | description |
|------|-------------|
| `path` | _(required)_ The input path |

Examples

```console
$ gomplate -i '{{ filepath.ToSlash "/foo/bar" }}'
/foo/bar
C:\> gomplate.exe -i '{{ filepath.ToSlash `foo\bar\baz` }}'
foo/bar/baz
```

## `filepath.VolumeName`

Returns the leading volume name. Given `C:\foo\bar` it returns `C:` on Windows. Given a UNC like `\\host\share\foo` it returns `\\host\share`. On other platforms it returns an empty string.

A wrapper for Go's [`filepath.VolumeName`](https://golang.org/pkg/path/filepath/#VolumeName) function.

Usage

```go
filepath.VolumeName path
```
```go
path | filepath.VolumeName
```

Arguments

| name | description |
|------|-------------|
| `path` | _(required)_ The input path |

Examples

```console
C:\> gomplate.exe -i 'volume is {{ filepath.VolumeName "C:/foo/bar" }}'
volume is C:
$ gomplate -i 'volume is {{ filepath.VolumeName "/foo/bar" }}'
volume is
```



## `math.Abs`

Returns the absolute value of a given number. When the input is an integer, the result will be an `int64`, otherwise it will be a `float64`.

Usage

```go
math.Abs num
```

Arguments

| name | description |
|------|-------------|
| `num` | _(required)_ The input number |

Examples

```console
$ gomplate -i '{{ math.Abs -3.5 }} {{ math.Abs 3.5 }} {{ math.Abs -42 }}'
3.5 3.5 42
```

## `math.Add`

**Alias:** `add`

Adds all given operators. When one of the inputs is a floating-point number, the result will be a `float64`, otherwise it will be an `int64`.

Usage

```go
math.Add n...
```

Arguments

| name | description |
|------|-------------|
| `n...` | _(required)_ The numbers to add together |

Examples

```console
$ gomplate -i '{{ math.Add 1 2 3 4 }} {{ math.Add 1.5 2 3 }}'
10 6.5
```

## `math.Ceil`

Returns the least integer value greater than or equal to a given floating-point number. This wraps Go's [`math.Ceil`](https://golang.org/pkg/math/#Ceil).

**Note:** the return value of this function is a `float64` so that the special-cases `NaN` and `Inf` can be returned appropriately.

Usage

```go
math.Ceil num
```

Arguments

| name | description |
|------|-------------|
| `num` | _(required)_ The input number. Will be converted to a `float64`, or `0` if not convertible |

Examples

```console
$ gomplate -i '{{ range (slice 5.1 42 "3.14" "0xFF" "NaN" "Inf" "-0") }}ceil {{ printf "%#v" . }} = {{ math.Ceil . }}{{"\n"}}{{ end }}'
ceil 5.1 = 6
ceil 42 = 42
ceil "3.14" = 4
ceil "0xFF" = 255
ceil "NaN" = NaN
ceil "Inf" = +Inf
ceil "-0" = 0
```

## `math.Div`

**Alias:** `div`

Divide the first number by the second. Division by zero is disallowed. The result will be a `float64`.

Usage

```go
math.Div a b
```
```go
b | math.Div a
```

Arguments

| name | description |
|------|-------------|
| `a` | _(required)_ The divisor |
| `b` | _(required)_ The dividend |

Examples

```console
$ gomplate -i '{{ math.Div 8 2 }} {{ math.Div 3 2 }}'
4 1.5
```

## `math.Floor`

Returns the greatest integer value less than or equal to a given floating-point number. This wraps Go's [`math.Floor`](https://golang.org/pkg/math/#Floor).

**Note:** the return value of this function is a `float64` so that the special-cases `NaN` and `Inf` can be returned appropriately.

Usage

```go
math.Floor num
```

Arguments

| name | description |
|------|-------------|
| `num` | _(required)_ The input number. Will be converted to a `float64`, or `0` if not convertable |

Examples

```console
$ gomplate -i '{{ range (slice 5.1 42 "3.14" "0xFF" "NaN" "Inf" "-0") }}floor {{ printf "%#v" . }} = {{ math.Floor . }}{{"\n"}}{{ end }}'
floor 5.1 = 4
floor 42 = 42
floor "3.14" = 3
floor "0xFF" = 255
floor "NaN" = NaN
floor "Inf" = +Inf
floor "-0" = 0
```

## `math.IsFloat`

Returns whether or not the given number can be interpreted as a floating-point literal, as defined by the [Go language reference](https://golang.org/ref/spec#Floating-point_literals).

**Note:** If a decimal point is part of the input number, it will be considered a floating-point number, even if the decimal is `0`.

Usage

```go
math.IsFloat num
```

Arguments

| name | description |
|------|-------------|
| `num` | _(required)_ The value to test |

Examples

```console
$ gomplate -i '{{ range (slice 1.0 "-1.0" 5.1 42 "3.14" "foo" "0xFF" "NaN" "Inf" "-0") }}{{ if (math.IsFloat .) }}{{.}} is a float{{"\n"}}{{ end }}{{end}}'
1 is a float
-1.0 is a float
5.1 is a float
3.14 is a float
NaN is a float
Inf is a float
```

## `math.IsInt`

Returns whether or not the given number is an integer.

Usage

```go
math.IsInt num
```

Arguments

| name | description |
|------|-------------|
| `num` | _(required)_ The value to test |

Examples

```console
$ gomplate -i '{{ range (slice 1.0 "-1.0" 5.1 42 "3.14" "foo" "0xFF" "NaN" "Inf" "-0") }}{{ if (math.IsInt .) }}{{.}} is an integer{{"\n"}}{{ end }}{{end}}'
42 is an integer
0xFF is an integer
-0 is an integer
```

## `math.IsNum`

Returns whether the given input is a number. Useful for `if` conditions.

Usage

```go
math.IsNum in
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ The value to test |

Examples

```console
$ gomplate -i '{{ math.IsNum "foo" }} {{ math.IsNum 0xDeadBeef }}'
false true
```

## `math.Max`

Returns the largest number provided. If any values are floating-point numbers, a `float64` is returned, otherwise an `int64` is returned. The same special-cases as Go's [`math.Max`](https://golang.org/pkg/math/#Max) are followed.

Usage

```go
math.Max nums...
```

Arguments

| name | description |
|------|-------------|
| `nums...` | _(required)_ One or more numbers to compare |

Examples

```console
$ gomplate -i '{{ math.Max 0 8.0 4.5 "-1.5e-11" }}'
8
```

## `math.Min`

Returns the smallest number provided. If any values are floating-point numbers, a `float64` is returned, otherwise an `int64` is returned. The same special-cases as Go's [`math.Min`](https://golang.org/pkg/math/#Min) are followed.

Usage

```go
math.Min nums...
```

Arguments

| name | description |
|------|-------------|
| `nums...` | _(required)_ One or more numbers to compare |

Examples

```console
$ gomplate -i '{{ math.Min 0 8 4.5 "-1.5e-11" }}'
-1.5e-11
```

## `math.Mul`

**Alias:** `mul`

Multiply all given operators together.

Usage

```go
math.Mul n...
```

Arguments

| name | description |
|------|-------------|
| `n...` | _(required)_ The numbers to multiply |

Examples

```console
$ gomplate -i '{{ math.Mul 8 8 2 }}'
128
```

## `math.Pow`

**Alias:** `pow`

Calculate an exponent - _b<sup>n</sup>_. This wraps Go's [`math.Pow`](https://golang.org/pkg/math/#Pow). If any values are floating-point numbers, a `float64` is returned, otherwise an `int64` is returned.

Usage

```go
math.Pow b n
```

Arguments

| name | description |
|------|-------------|
| `b` | _(required)_ The base |
| `n` | _(required)_ The exponent |

Examples

```console
$ gomplate -i '{{ math.Pow 10 2 }}'
100
$ gomplate -i '{{ math.Pow 2 32 }}'
4294967296
$ gomplate -i '{{ math.Pow 1.5 2 }}'
2.2
```

## `math.Rem`

**Alias:** `rem`

Return the remainder from an integer division operation.

Usage

```go
math.Rem a b
```
```go
b | math.Rem a
```

Arguments

| name | description |
|------|-------------|
| `a` | _(required)_ The divisor |
| `b` | _(required)_ The dividend |

Examples

```console
$ gomplate -i '{{ math.Rem 5 3 }}'
2
$ gomplate -i '{{ math.Rem -5 3 }}'
-2
```

## `math.Round`

Returns the nearest integer, rounding half away from zero.

**Note:** the return value of this function is a `float64` so that the special-cases `NaN` and `Inf` can be returned appropriately.

Usage

```go
math.Round num
```

Arguments

| name | description |
|------|-------------|
| `num` | _(required)_ The input number. Will be converted to a `float64`, or `0` if not convertable |

Examples

```console
$ gomplate -i '{{ range (slice -6.5 5.1 42.9 "3.5" 6.5) }}round {{ printf "%#v" . }} = {{ math.Round . }}{{"\n"}}{{ end }}'
round -6.5 = -7
round 5.1 = 5
round 42.9 = 43
round "3.5" = 4
round 6.5 = 7
```

## `math.Seq`

**Alias:** `seq`

Return a sequence from `start` to `end`, in steps of `step`. Can handle counting
down as well as up, including with negative numbers.

Note that the sequence _may_ not end at `end`, if `end` is not divisible by `step`.

Usage

```go
math.Seq [start] end [step]
```

Arguments

| name | description |
|------|-------------|
| `start` | _(optional)_ The first number in the sequence (defaults to `1`) |
| `end` | _(required)_ The last number in the sequence |
| `step` | _(optional)_ The amount to increment between each number (defaults to `1`) |

Examples

```console
$ gomplate -i '{{ range (math.Seq 5) }}{{.}} {{end}}'
1 2 3 4 5
```
```console
$ gomplate -i '{{ conv.Join (math.Seq 10 -3 2) ", " }}'
10, 8, 6, 4, 2, 0, -2
```

## `math.Sub`

**Alias:** `sub`

Subtract the second from the first of the given operators.  When one of the inputs is a floating-point number, the result will be a `float64`, otherwise it will be an `int64`.

Usage

```go
math.Sub a b
```
```go
b | math.Sub a
```

Arguments

| name | description |
|------|-------------|
| `a` | _(required)_ The minuend (the number to subtract from) |
| `b` | _(required)_ The subtrahend (the number being subtracted) |

Examples

```console
$ gomplate -i '{{ math.Sub 3 1 }}'
2
```


## `path.Base`

Returns the last element of path. Trailing slashes are removed before extracting the last element. If the path is empty, Base returns `.`. If the path consists entirely of slashes, Base returns `/`.

A wrapper for Go's [`path.Base`](https://golang.org/pkg/path/#Base) function.

Usage

```go
path.Base path
```
```go
path | path.Base
```

Arguments

| name | description |
|------|-------------|
| `path` | _(required)_ The input path |

Examples

```console
$ gomplate -i '{{ path.Base "/tmp/foo" }}'
foo
```

## `path.Clean`

Clean returns the shortest path name equivalent to path by purely lexical processing.

A wrapper for Go's [`path.Clean`](https://golang.org/pkg/path/#Clean) function.

Usage

```go
path.Clean path
```
```go
path | path.Clean
```

Arguments

| name | description |
|------|-------------|
| `path` | _(required)_ The input path |

Examples

```console
$ gomplate -i '{{ path.Clean "/tmp//foo/../" }}'
/tmp
```

## `path.Dir`

Returns all but the last element of path, typically the path's directory.

A wrapper for Go's [`path.Dir`](https://golang.org/pkg/path/#Dir) function.

Usage

```go
path.Dir path
```
```go
path | path.Dir
```

Arguments

| name | description |
|------|-------------|
| `path` | _(required)_ The input path |

Examples

```console
$ gomplate -i '{{ path.Dir "/tmp/foo" }}'
/tmp
```

## `path.Ext`

Returns the file name extension used by path.

A wrapper for Go's [`path.Ext`](https://golang.org/pkg/path/#Ext) function.

Usage

```go
path.Ext path
```
```go
path | path.Ext
```

Arguments

| name | description |
|------|-------------|
| `path` | _(required)_ The input path |

Examples

```console
$ gomplate -i '{{ path.Ext "/tmp/foo.csv" }}'
.csv
```

## `path.IsAbs`

Reports whether the path is absolute.

A wrapper for Go's [`path.IsAbs`](https://golang.org/pkg/path/#IsAbs) function.

Usage

```go
path.IsAbs path
```
```go
path | path.IsAbs
```

Arguments

| name | description |
|------|-------------|
| `path` | _(required)_ The input path |

Examples

```console
$ gomplate -i 'the path is {{ if (path.IsAbs "/tmp/foo.csv") }}absolute{{else}}relative{{end}}'
the path is absolute
$ gomplate -i 'the path is {{ if (path.IsAbs "../foo.csv") }}absolute{{else}}relative{{end}}'
the path is relative
```

## `path.Join`

Joins any number of path elements into a single path, adding a separating slash if necessary.

A wrapper for Go's [`path.Join`](https://golang.org/pkg/path/#Join) function.

Usage

```go
path.Join elem...
```

Arguments

| name | description |
|------|-------------|
| `elem...` | _(required)_ The path elements to join (0 or more) |

Examples

```console
$ gomplate -i '{{ path.Join "/tmp" "foo" "bar" }}'
/tmp/foo/bar
```

## `path.Match`

Reports whether name matches the shell file name pattern.

A wrapper for Go's [`path.Match`](https://golang.org/pkg/path/#Match) function.

Usage

```go
path.Match pattern path
```

Arguments

| name | description |
|------|-------------|
| `pattern` | _(required)_ The pattern to match on |
| `path` | _(required)_ The path to match |

Examples

```console
$ gomplate -i '{{ path.Match "*.csv" "foo.csv" }}'
true
```

## `path.Split`

Splits path immediately following the final slash, separating it into a directory and file name component.

The function returns an array with two values, the first being the directory, and the second the file.

A wrapper for Go's [`path.Split`](https://golang.org/pkg/path/#Split) function.

Usage

```go
path.Split path
```
```go
path | path.Split
```

Arguments

| name | description |
|------|-------------|
| `path` | _(required)_ The input path |

Examples

```console
$ gomplate -i '{{ $p := path.Split "/tmp/foo" }}{{ $dir := index $p 0 }}{{ $file := index $p 1 }}dir is {{$dir}}, file is {{$file}}'
dir is /tmp/, file is foo
```


## `random.ASCII`

Generates a random string of a desired length, containing the set of
printable characters from the 7-bit [ASCII](https://en.wikipedia.org/wiki/ASCII)
set. This includes _space_ (' '), but no other whitespace characters.

Usage

```go
random.ASCII count
```

Arguments

| name | description |
|------|-------------|
| `count` | _(required)_ the length of the string to produce (number of characters) |

Examples

```console
$ gomplate -i '{{ random.ASCII 8 }}'
_woJ%D&K
```

## `random.Alpha`

Generates a random alphabetical (`A-Z`, `a-z`) string of a desired length.

Usage

```go
random.Alpha count
```

Arguments

| name | description |
|------|-------------|
| `count` | _(required)_ the length of the string to produce (number of characters) |

Examples

```console
$ gomplate -i '{{ random.Alpha 42 }}'
oAqHKxHiytYicMxTMGHnUnAfltPVZDhFkVkgDvatJK
```

## `random.AlphaNum`

Generates a random alphanumeric (`0-9`, `A-Z`, `a-z`) string of a desired length.

Usage

```go
random.AlphaNum count
```

Arguments

| name | description |
|------|-------------|
| `count` | _(required)_ the length of the string to produce (number of characters) |

Examples

```console
$ gomplate -i '{{ random.AlphaNum 16 }}'
4olRl9mRmVp1nqSm
```

## `random.String`

Generates a random string of a desired length.

By default, the possible characters are those represented by the
regular expression `[a-zA-Z0-9_.-]` (alphanumeric, plus `_`, `.`, and `-`).

A different set of characters can be specified with a regular expression,
or by giving a range of possible characters by specifying the lower and
upper bounds. Lower/upper bounds can be specified as characters (e.g.
`"q"`, or escape sequences such as `"\U0001f0AF"`), or numeric Unicode
code-points (e.g. `48` or `0x30` for the character `0`).

When given a range of Unicode code-points, `random.String` will discard
non-printable characters from the selection. This may result in a much
smaller set of possible characters than intended, so check
the [Unicode character code charts](http://www.unicode.org/charts/) to
verify the correct code-points.

Usage

```go
random.String count [regex] [lower] [upper]
```

Arguments

| name | description |
|------|-------------|
| `count` | _(required)_ the length of the string to produce (number of characters) |
| `regex` | _(optional)_ the regular expression that each character must match (defaults to `[a-zA-Z0-9_.-]`) |
| `lower` | _(optional)_ lower bound for a range of characters (number or single character) |
| `upper` | _(optional)_ upper bound for a range of characters (number or single character) |

Examples

```console
$ gomplate -i '{{ random.String 8 }}'
FODZ01u_
```
```console
$ gomplate -i '{{ random.String 16 `[[:xdigit:]]` }}'
B9e0527C3e45E1f3
```
```console
$ gomplate -i '{{ random.String 20 `[\p{Canadian_Aboriginal}]` }}'
ᗄᖖᣡᕔᕫᗝᖴᒙᗌᘔᓰᖫᗵᐕᗵᙔᗠᓅᕎᔹ
```
```console
$ gomplate -i '{{ random.String 8 "c" "m" }}'
ffmidgjc
```
```console
$ gomplate -i 'You rolled... {{ random.String 3 "⚀" "⚅" }}'
You rolled... ⚅⚂⚁
```
```console
$ gomplate -i 'Poker time! {{ random.String 5 "\U0001f0a1" "\U0001f0de" }}'
Poker time! 🂼🂺🂳🃅🂪
```

## `random.Item`

Pick an element at a random from a given slice or array.

Usage

```go
random.Item items
```
```go
items | random.Item
```

Arguments

| name | description |
|------|-------------|
| `items` | _(required)_ the input array |

Examples

```console
$ gomplate -i '{{ random.Item (seq 0 5) }}'
4
```
```console
$ export SLICE='["red", "green", "blue"]'
$ gomplate -i '{{ getenv "SLICE" | jsonArray | random.Item }}'
blue
```

## `random.Number`

Pick a random integer. By default, a number between `0` and `100`
(inclusive) is chosen, but this range can be overridden.

Note that the difference between `min` and `max` can not be larger than a
63-bit integer (i.e. the unsigned portion of a 64-bit signed integer).
The result is given as an `int64`.

Usage

```go
random.Number [min] [max]
```

Arguments

| name | description |
|------|-------------|
| `min` | _(optional)_ The minimum value, defaults to `0`. Must be less than `max`. |
| `max` | _(optional)_ The maximum value, defaults to `100` (if no args provided) |

Examples

```console
$ gomplate -i '{{ random.Number }}'
55
```
```console
$ gomplate -i '{{ random.Number -10 10 }}'
-3
```
```console
$ gomplate -i '{{ random.Number 5 }}'
2
```

## `random.Float`

Pick a random decimal floating-point number. By default, a number between
`0.0` and `1.0` (_exclusive_, i.e. `[0.0,1.0)`) is chosen, but this range
can be overridden.

The result is given as a `float64`.

Usage

```go
random.Float [min] [max]
```

Arguments

| name | description |
|------|-------------|
| `min` | _(optional)_ The minimum value, defaults to `0.0`. Must be less than `max`. |
| `max` | _(optional)_ The maximum value, defaults to `1.0` (if no args provided). |

Examples

```console
$ gomplate -i '{{ random.Float }}'
0.2029946480303966
```
```console
$ gomplate -i '{{ random.Float 100 }}'  
71.28595374161743
```
```console
$ gomplate -i '{{ random.Float -100 200 }}'
105.59119437834909
```


## `regexp.Find`

Returns a string holding the text of the leftmost match in `input`
of the regular expression `expression`.

This function provides the same behaviour as Go's
[`regexp.FindString`](https://golang.org/pkg/regexp/#Regexp.FindString) function.

Usage

```go
regexp.Find expression input
```
```go
input | regexp.Find expression
```

Arguments

| name | description |
|------|-------------|
| `expression` | _(required)_ The regular expression |
| `input` | _(required)_ The input to search |

Examples

```console
$ gomplate -i '{{ regexp.Find "[a-z]{3}" "foobar"}}'
foo
```
```console
$ gomplate -i 'no {{ "will not match" | regexp.Find "[0-9]" }}numbers'
no numbers
```

## `regexp.FindAll`

Returns a list of all successive matches of the regular expression.

This can be called with 2 or 3 arguments. When called with 2 arguments, the
`n` argument (number of matches) will be set to `-1`, causing all matches
to be returned.

This function provides the same behaviour as Go's
[`regexp.FindAllString`](https://golang.org/pkg/regexp/#Regexp.FindAllString) function.

Usage

```go
regexp.FindAll expression [n] input
```
```go
input | regexp.FindAll expression [n]
```

Arguments

| name | description |
|------|-------------|
| `expression` | _(required)_ The regular expression |
| `n` | _(optional)_ The number of matches to return |
| `input` | _(required)_ The input to search |

Examples

```console
$ gomplate -i '{{ regexp.FindAll "[a-z]{3}" "foobar" | toJSON}}'
["foo", "bar"]
```
```console
$ gomplate -i '{{ "foo bar baz qux" | regexp.FindAll "[a-z]{3}" 3 | toJSON}}'
["foo", "bar", "baz"]
```

## `regexp.Match`

Returns `true` if a given regular expression matches a given input.

This returns a boolean which can be used in an `if` condition, for example.

Usage

```go
regexp.Match expression input
```
```go
input | regexp.Match expression
```

Arguments

| name | description |
|------|-------------|
| `expression` | _(required)_ The regular expression |
| `input` | _(required)_ The input to test |

Examples

```console
$ gomplate -i '{{ if (.Env.USER | regexp.Match `^h`) }}username ({{.Env.USER}}) starts with h!{{end}}'
username (hairyhenderson) starts with h!
```

## `regexp.QuoteMeta`

Escapes all regular expression metacharacters in the input. The returned string is a regular expression matching the literal text.

This function provides the same behaviour as Go's
[`regexp.QuoteMeta`](https://golang.org/pkg/regexp/#Regexp.QuoteMeta) function.

Usage

```go
regexp.QuoteMeta input
```
```go
input | regexp.QuoteMeta
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ The input to escape |

Examples

```console
$ gomplate -i '{{ `{hello}` | regexp.QuoteMeta }}'
\{hello\}
```

## `regexp.Replace`

Replaces matches of a regular expression with the replacement string.

The replacement is substituted after expanding variables beginning with `$`.

This function provides the same behaviour as Go's
[`regexp.ReplaceAllString`](https://golang.org/pkg/regexp/#Regexp.ReplaceAllString) function.

Usage

```go
regexp.Replace expression replacement input
```
```go
input | regexp.Replace expression replacement
```

Arguments

| name | description |
|------|-------------|
| `expression` | _(required)_ The regular expression string |
| `replacement` | _(required)_ The replacement string |
| `input` | _(required)_ The input string to operate on |

Examples

```console
$ gomplate -i '{{ regexp.Replace "(foo)bar" "$1" "foobar"}}'
foo
```
```console
$ gomplate -i '{{ regexp.Replace "(?P<first>[a-zA-Z]+) (?P<last>[a-zA-Z]+)" "${last}, ${first}" "Alan Turing"}}'
Turing, Alan
```

## `regexp.ReplaceLiteral`

Replaces matches of a regular expression with the replacement string.

The replacement is substituted directly, without expanding variables
beginning with `$`.

This function provides the same behaviour as Go's
[`regexp.ReplaceAllLiteralString`](https://golang.org/pkg/regexp/#Regexp.ReplaceAllLiteralString) function.

Usage

```go
regexp.ReplaceLiteral expression replacement input
```
```go
input | regexp.ReplaceLiteral expression replacement
```

Arguments

| name | description |
|------|-------------|
| `expression` | _(required)_ The regular expression string |
| `replacement` | _(required)_ The replacement string |
| `input` | _(required)_ The input string to operate on |

Examples

```console
$ gomplate -i '{{ regexp.ReplaceLiteral "(foo)bar" "$1" "foobar"}}'
$1
```
```console
$ gomplate -i '{{ `foo.bar,baz` | regexp.ReplaceLiteral `\W` `$` }}'
foo$bar$baz
```

## `regexp.Split`

Splits `input` into sub-strings, separated by the expression.

This can be called with 2 or 3 arguments. When called with 2 arguments, the
`n` argument (number of matches) will be set to `-1`, causing all sub-strings
to be returned.

This is equivalent to [`strings.SplitN`](../strings/#strings-splitn),
except that regular expressions are supported.

This function provides the same behaviour as Go's
[`regexp.Split`](https://golang.org/pkg/regexp/#Regexp.Split) function.

Usage

```go
regexp.Split expression [n] input
```
```go
input | regexp.Split expression [n]
```

Arguments

| name | description |
|------|-------------|
| `expression` | _(required)_ The regular expression |
| `n` | _(optional)_ The number of matches to return |
| `input` | _(required)_ The input to search |

Examples

```console
$ gomplate -i '{{ regexp.Split `[\s,.]` "foo bar,baz.qux" | toJSON}}'
["foo","bar","baz","qux"]
```
```console
$ gomplate -i '{{ "foo bar.baz,qux" | regexp.Split `[\s,.]` 3 | toJSON}}'
["foo","bar","baz"]
```


## `strings.Abbrev`

Abbreviates a string using `...` (ellipses). Takes an optional offset from the beginning of the string, and a maximum final width (including added ellipses).

_Also see [`strings.Trunc`](#strings-trunc)._

Usage

```go
strings.Abbrev [offset] width input
```
```go
input | strings.Abbrev [offset] width
```

Arguments

| name | description |
|------|-------------|
| `offset` | _(optional)_ offset from the start of the string. Must be `4` or greater for ellipses to be added. Defaults to `0` |
| `width` | _(required)_ the desired maximum final width of the string, including ellipses |
| `input` | _(required)_ the input string to abbreviate |

Examples

```console
$ gomplate -i '{{ "foobarbazquxquux" | strings.Abbrev 9 }}'
foobar...
$ gomplate -i '{{ "foobarbazquxquux" | strings.Abbrev 6 9 }}'
...baz...
```

## `strings.Contains`

Reports whether a substring is contained within a string.

Usage

```go
strings.Contains substr input
```
```go
input | strings.Contains substr
```

Arguments

| name | description |
|------|-------------|
| `substr` | _(required)_ the substring to search for |
| `input` | _(required)_ the input to search |

Examples

_`input.tmpl`:_
```
{{ if (.Env.FOO | strings.Contains "f") }}yes{{else}}no{{end}}
```

```console
$ FOO=foo gomplate < input.tmpl
yes
$ FOO=bar gomplate < input.tmpl
no
```

## `strings.HasPrefix`

Tests whether a string begins with a certain prefix.

Usage

```go
strings.HasPrefix prefix input
```
```go
input | strings.HasPrefix prefix
```

Arguments

| name | description |
|------|-------------|
| `prefix` | _(required)_ the prefix to search for |
| `input` | _(required)_ the input to search |

Examples

```console
$ URL=http://example.com gomplate -i '{{if .Env.URL | strings.HasPrefix "https"}}foo{{else}}bar{{end}}'
bar
$ URL=https://example.com gomplate -i '{{if .Env.URL | strings.HasPrefix "https"}}foo{{else}}bar{{end}}'
foo
```

## `strings.HasSuffix`

Tests whether a string ends with a certain suffix.

Usage

```go
strings.HasSuffix suffix input
```
```go
input | strings.HasSuffix suffix
```

Arguments

| name | description |
|------|-------------|
| `suffix` | _(required)_ the suffix to search for |
| `input` | _(required)_ the input to search |

Examples

_`input.tmpl`:_
```
{{.Env.URL}}{{if not (.Env.URL | strings.HasSuffix ":80")}}:80{{end}}
```

```console
$ URL=http://example.com gomplate < input.tmpl
http://example.com:80
```

## `strings.Indent`

**Alias:** `indent`

Indents a string. If the input string has multiple lines, each line will be indented.

Usage

```go
strings.Indent [width] [indent] input
```
```go
input | strings.Indent [width] [indent]
```

Arguments

| name | description |
|------|-------------|
| `width` | _(optional)_ number of times to repeat the `indent` string. Default: `1` |
| `indent` | _(optional)_ the string to indent with. Default: `" "` |
| `input` | _(required)_ the string to indent |

Examples

This function can be especially useful when adding YAML snippets into other YAML documents, where indentation is important:

_`input.tmpl`:_
```
foo:
{{ `{"bar": {"baz": 2}}` | json | toYAML | strings.Indent "  " }}
{{- `{"qux": true}` | json | toYAML | strings.Indent 2 }}
  quux:
{{ `{"quuz": 42}` | json | toYAML | strings.Indent 2 "  " -}}
```

```console
$ gomplate -f input.tmpl
foo:
  bar:
    baz: 2
  qux: true

  quux:
    quuz: 42
```

## `strings.Sort` _(deprecated)_
**Deprecation Notice:** Use [`coll.Sort`](../coll/#coll-sort) instead

Returns an alphanumerically-sorted copy of a given string list.

Usage

```go
strings.Sort list
```
```go
list | strings.Sort
```

Arguments

| name | description |
|------|-------------|
| `list` | _(required)_ The list to sort |

Examples

```console
$ gomplate -i '{{ (slice "foo" "bar" "baz") | strings.Sort }}'
[bar baz foo]
```

## `strings.Split`

Creates a slice by splitting a string on a given delimiter.

Usage

```go
strings.Split separator input
```
```go
input | strings.Split separator
```

Arguments

| name | description |
|------|-------------|
| `separator` | _(required)_ the string sequence to split |
| `input` | _(required)_ the input string |

Examples

Use on its own to produce an array:
```console
$ gomplate -i '{{ "Bart,Lisa,Maggie" | strings.Split "," }}'
[Bart Lisa Maggie]
```

Use in combination with `range` to iterate over all items:
```console
$ gomplate -i '{{range ("Bart,Lisa,Maggie" | strings.Split ",") }}Hello, {{.}}
{{end}}'
Hello, Bart
Hello, Lisa
Hello, Maggie
```

Use in combination with `index` function to pick a specific value from the resulting array
```console
$ gomplate -i '{{index ("Bart,Lisa,Maggie" | strings.Split ",") 0 }}'
Bart
```


## `strings.SplitN`

Creates a slice by splitting a string on a given delimiter. The count determines
the number of substrings to return.

Usage

```go
strings.SplitN separator count input
```
```go
input | strings.SplitN separator count
```

Arguments

| name | description |
|------|-------------|
| `separator` | _(required)_ the string sequence to split |
| `count` | _(required)_ the maximum number of substrings to return |
| `input` | _(required)_ the input string |

Examples

```console
$ gomplate -i '{{ range ("foo:bar:baz" | strings.SplitN ":" 2) }}{{.}}
{{end}}'
foo
bar:baz
```

## `strings.Quote`

**Alias:** `quote`

Surrounds an input string with double-quote characters (`"`). If the input is not a string, converts first.

`"` characters in the input are first escaped with a `\` character.

This is a convenience function which is equivalent to:

```
{{ print "%q" "input string" }}
```

Usage

```go
strings.Quote in
```
```go
in | strings.Quote
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ The input to quote |

Examples

```console
$ gomplate -i '{{ "in" | quote }}'
"in"
$ gomplate -i '{{ strings.Quote 500 }}'
"500"
```

## `strings.Repeat`

Returns a new string consisting of `count` copies of the input string.

It errors if `count` is negative or if the length of `input` multiplied by `count` overflows.

This wraps Go's [`strings.Repeat`](https://golang.org/pkg/strings/#Repeat).

Usage

```go
strings.Repeat count input
```
```go
input | strings.Repeat count
```

Arguments

| name | description |
|------|-------------|
| `count` | _(required)_ the number of times to repeat the input |
| `input` | _(required)_ the input to repeat |

Examples

```console
$ gomplate -i '{{ "hello " | strings.Repeat 5 }}'
hello hello hello hello hello
```

## `strings.ReplaceAll`

**Alias:** `replaceAll`

Replaces all occurrences of a given string with another.

Usage

```go
strings.ReplaceAll old new input
```
```go
input | strings.ReplaceAll old new
```

Arguments

| name | description |
|------|-------------|
| `old` | _(required)_ the text to replace |
| `new` | _(required)_ the new text to replace with |
| `input` | _(required)_ the input to modify |

Examples

```console
$ gomplate -i '{{ strings.ReplaceAll "." "-" "172.21.1.42" }}'
172-21-1-42
$ gomplate -i '{{ "172.21.1.42" | strings.ReplaceAll "." "-" }}'
172-21-1-42
```

## `strings.Slug`

Creates a a "slug" from a given string - supports Unicode correctly. This wraps the [github.com/gosimple/slug](https://github.com/gosimple/slug) package. See [the github.com/gosimple/slug docs](https://godoc.org/github.com/gosimple/slug) for more information.

Usage

```go
strings.Slug input
```
```go
input | strings.Slug
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ the input to "slugify" |

Examples

```console
$ gomplate -i '{{ "Hello, world!" | strings.Slug }}'
hello-world
```
```console
$ echo 'Rock & Roll @ Cafe Wha?' | gomplate -d in=stdin: -i '{{ strings.Slug (include "in") }}'
rock-and-roll-at-cafe-wha
```

## `strings.ShellQuote`

**Alias:** `shellQuote`

Given a string, emits a version of that string that will evaluate to its literal data when expanded by any POSIX-compliant shell.

Given an array or slice, emit a single string which will evaluate to a series of shell words, one per item in that array or slice.

Usage

```go
strings.ShellQuote in
```
```go
in | strings.ShellQuote
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ The input to quote |

Examples

```console
$ gomplate -i "{{ slice \"one word\" \"foo='bar baz'\" | shellQuote }}"
'one word' 'foo='"'"'bar baz'"'"''
```
```console
$ gomplate -i "{{ strings.ShellQuote \"it's a banana\" }}"
'it'"'"'s a banana'
```

## `strings.Squote`

**Alias:** `squote`

Surrounds an input string with a single-quote (apostrophe) character (`'`). If the input is not a string, converts first.

`'` characters in the input are first escaped in the YAML-style (by repetition: `''`).

Usage

```go
strings.Squote in
```
```go
in | strings.Squote
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ The input to quote |

Examples

```console
$ gomplate -i '{{ "in" | squote }}'
'in'
```
```console
$ gomplate -i "{{ strings.Squote \"it's a banana\" }}"
'it''s a banana'
```

## `strings.Title`

**Alias:** `title`

Convert to title-case.

Usage

```go
strings.Title input
```
```go
input | strings.Title
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ the input |

Examples

```console
$ gomplate -i '{{strings.Title "hello, world!"}}'
Hello, World!
```

## `strings.ToLower`

**Alias:** `toLower`

Convert to lower-case.

Usage

```go
strings.ToLower input
```
```go
input | strings.ToLower
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ the input |

Examples

```console
$ echo '{{strings.ToLower "HELLO, WORLD!"}}' | gomplate
hello, world!
```

## `strings.ToUpper`

**Alias:** `toUpper`

Convert to upper-case.

Usage

```go
strings.ToUpper input
```
```go
input | strings.ToUpper
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ the input |

Examples

```console
$ gomplate -i '{{strings.ToUpper "hello, world!"}}'
HELLO, WORLD!
```

## `strings.Trim`

Trims a string by removing the given characters from the beginning and end of
the string.

Usage

```go
strings.Trim cutset input
```
```go
input | strings.Trim cutset
```

Arguments

| name | description |
|------|-------------|
| `cutset` | _(required)_ the set of characters to cut |
| `input` | _(required)_ the input |

Examples

```console
$ gomplate -i '{{ "_-foo-_" | strings.Trim "_-" }}
foo
```

## `strings.TrimPrefix`

Returns a string without the provided leading prefix string, if the prefix is present.

This wraps Go's [`strings.TrimPrefix`](https://golang.org/pkg/strings/#TrimPrefix).

Usage

```go
strings.TrimPrefix prefix input
```
```go
input | strings.TrimPrefix prefix
```

Arguments

| name | description |
|------|-------------|
| `prefix` | _(required)_ the prefix to trim |
| `input` | _(required)_ the input |

Examples

```console
$ gomplate -i '{{ "hello, world" | strings.TrimPrefix "hello, " }}'
world
```

## `strings.TrimSpace`

**Alias:** `trimSpace`

Trims a string by removing whitespace from the beginning and end of
the string.

Usage

```go
strings.TrimSpace input
```
```go
input | strings.TrimSpace
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ the input |

Examples

```console
$ gomplate -i '{{ "  \n\t foo" | strings.TrimSpace }}'
foo
```

## `strings.TrimSuffix`

Returns a string without the provided trailing suffix string, if the suffix is present.

This wraps Go's [`strings.TrimSuffix`](https://golang.org/pkg/strings/#TrimSuffix).

Usage

```go
strings.TrimSuffix suffix input
```
```go
input | strings.TrimSuffix suffix
```

Arguments

| name | description |
|------|-------------|
| `suffix` | _(required)_ the suffix to trim |
| `input` | _(required)_ the input |

Examples

```console
$ gomplate -i '{{ "hello, world" | strings.TrimSuffix "world" }}jello'
hello, jello
```

## `strings.Trunc`

Returns a string truncated to the given length.

_Also see [`strings.Abbrev`](#strings-abbrev)._

Usage

```go
strings.Trunc length input
```
```go
input | strings.Trunc length
```

Arguments

| name | description |
|------|-------------|
| `length` | _(required)_ the maximum length of the output |
| `input` | _(required)_ the input |

Examples

```console
$ gomplate -i '{{ "hello, world" | strings.Trunc 5 }}'
hello
```

## `strings.CamelCase`

Converts a sentence to CamelCase, i.e. `The quick brown fox` becomes `TheQuickBrownFox`.

All non-alphanumeric characters are stripped, and the beginnings of words are upper-cased. If the input begins with a lower-case letter, the result will also begin with a lower-case letter.

See [CamelCase on Wikipedia](https://en.wikipedia.org/wiki/Camel_case) for more details.

Usage

```go
strings.CamelCase in
```
```go
in | strings.CamelCase
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ The input |

Examples

```console
$ gomplate -i '{{ "Hello, World!" | strings.CamelCase }}'
HelloWorld
```
```console
$ gomplate -i '{{ "hello jello" | strings.CamelCase }}'
helloJello
```

## `strings.SnakeCase`

Converts a sentence to snake_case, i.e. `The quick brown fox` becomes `The_quick_brown_fox`.

All non-alphanumeric characters are stripped, and spaces are replaced with an underscore (`_`). If the input begins with a lower-case letter, the result will also begin with a lower-case letter.

See [Snake Case on Wikipedia](https://en.wikipedia.org/wiki/Snake_case) for more details.

Usage

```go
strings.SnakeCase in
```
```go
in | strings.SnakeCase
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ The input |

Examples

```console
$ gomplate -i '{{ "Hello, World!" | strings.SnakeCase }}'
Hello_world
```
```console
$ gomplate -i '{{ "hello jello" | strings.SnakeCase }}'
hello_jello
```

## `strings.KebabCase`

Converts a sentence to kebab-case, i.e. `The quick brown fox` becomes `The-quick-brown-fox`.

All non-alphanumeric characters are stripped, and spaces are replaced with a hyphen (`-`). If the input begins with a lower-case letter, the result will also begin with a lower-case letter.

See [Kebab Case on Wikipedia](https://en.wikipedia.org/wiki/Kebab_case) for more details.

Usage

```go
strings.KebabCase in
```
```go
in | strings.KebabCase
```

Arguments

| name | description |
|------|-------------|
| `in` | _(required)_ The input |

Examples

```console
$ gomplate -i '{{ "Hello, World!" | strings.KebabCase }}'
Hello-world
```
```console
$ gomplate -i '{{ "hello jello" | strings.KebabCase }}'
hello-jello
```

## `strings.WordWrap`

Inserts new line breaks into the input string so it ends up with lines that are at most `width` characters wide.

The line-breaking algorithm is _naïve_ and _greedy_: lines are only broken between words (i.e. on whitespace characters), and no effort is made to "smooth" the line endings.

When words that are longer than the desired width are encountered (e.g. long URLs), they are not broken up. Correctness is valued above line length.

The line-break sequence defaults to `\n` (i.e. the LF/Line Feed character), regardless of OS.

Usage

```go
strings.WordWrap [width] [lbseq] in
```
```go
in | strings.WordWrap [width] [lbseq]
```

Arguments

| name | description |
|------|-------------|
| `width` | _(optional)_ The desired maximum line length (number of characters - defaults to `80`) |
| `lbseq` | _(optional)_ The line-break sequence to use (defaults to `\n`) |
| `in` | _(required)_ The input |

Examples

```console
$ gomplate -i '{{ "Hello, World!" | strings.WordWrap 7 }}'
Hello,
World!
```
```console
$ gomplate -i '{{ strings.WordWrap 20 "\\\n" "a string with a long url http://example.com/a/very/long/url which should not be broken" }}'
a string with a long
url
http://example.com/a/very/long/url
which should not be
broken
```

## `strings.RuneCount`

Return the number of _runes_ (Unicode code-points) contained within the
input. This is similar to the built-in `len` function, but `len` counts
the length in _bytes_. The length of an input containing multi-byte
code-points should therefore be measured with `strings.RuneCount`.

Inputs will first be converted to strings, and multiple inputs are
concatenated.

This wraps Go's [`utf8.RuneCountInString`](https://golang.org/pkg/unicode/utf8/#RuneCountInString)
function.

Usage

```go
strings.RuneCount input
```
```go
input | strings.RuneCount
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ the input(s) to measure |

Examples

```console
$ gomplate -i '{{ range (slice "\u03a9" "\u0030" "\u1430") }}{{ printf "%s is %d bytes and %d runes\n" . (len .) (strings.RuneCount .) }}{{ end }}'
Ω is 2 bytes and 1 runes
0 is 1 bytes and 1 runes
ᐰ is 3 bytes and 1 runes
```

## `contains`

**See [`strings.Contains`](#strings-contains) for a pipeline-compatible version**

Contains reports whether the second string is contained within the first. Equivalent to
[strings.Contains](https://golang.org/pkg/strings#Contains)

Usage

```go
contains input substring
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ the string to search |
| `substring` | _(required)_ the string to search for |

Examples

_`input.tmpl`:_
```
{{if contains .Env.FOO "f"}}yes{{else}}no{{end}}
```

```console
$ FOO=foo gomplate < input.tmpl
yes
$ FOO=bar gomplate < input.tmpl
no
```

## `hasPrefix`

**See [`strings.HasPrefix`](#strings-hasprefix) for a pipeline-compatible version**

Tests whether the string begins with a certain substring. Equivalent to
[strings.HasPrefix](https://golang.org/pkg/strings#HasPrefix)

Usage

```go
hasPrefix input prefix
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ the string to search |
| `prefix` | _(required)_ the prefix to search for |

Examples

_`input.tmpl`:_
```
{{if hasPrefix .Env.URL "https"}}foo{{else}}bar{{end}}
```

```console
$ URL=http://example.com gomplate < input.tmpl
bar
$ URL=https://example.com gomplate < input.tmpl
foo
```

## `hasSuffix`

**See [`strings.HasSuffix`](#strings-hassuffix) for a pipeline-compatible version**

Tests whether the string ends with a certain substring. Equivalent to
[strings.HasSuffix](https://golang.org/pkg/strings#HasSuffix)

Usage

```go
hasSuffix input suffix
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ the input to search |
| `suffix` | _(required)_ the suffix to search for |

Examples

_`input.tmpl`:_
```
{{.Env.URL}}{{if not (hasSuffix .Env.URL ":80")}}:80{{end}}
```

```console
$ URL=http://example.com gomplate < input.tmpl
http://example.com:80
```

## `split`

**See [`strings.Split`](#strings-split) for a pipeline-compatible version**

Creates a slice by splitting a string on a given delimiter. Equivalent to
[strings.Split](https://golang.org/pkg/strings#Split)

Usage

```go
split input separator
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ the input string |
| `separator` | _(required)_ the string sequence to split |

Examples

```console
$ gomplate -i '{{range split "Bart,Lisa,Maggie" ","}}Hello, {{.}}
{{end}}'
Hello, Bart
Hello, Lisa
Hello, Maggie
```

## `splitN`

**See [`strings.SplitN`](#strings-splitn) for a pipeline-compatible version**

Creates a slice by splitting a string on a given delimiter. The count determines
the number of substrings to return. Equivalent to [strings.SplitN](https://golang.org/pkg/strings#SplitN)

Usage

```go
splitN input separator count
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ the input string |
| `separator` | _(required)_ the string sequence to split |
| `count` | _(required)_ the maximum number of substrings to return |

Examples

```console
$ gomplate -i '{{ range splitN "foo:bar:baz" ":" 2 }}{{.}}
{{end}}'
foo
bar:baz
```

## `trim`

**See [`strings.Trim`](#strings-trim) for a pipeline-compatible version**

Trims a string by removing the given characters from the beginning and end of
the string. Equivalent to [strings.Trim](https://golang.org/pkg/strings/#Trim)

Usage

```go
trim input cutset
```

Arguments

| name | description |
|------|-------------|
| `input` | _(required)_ the input |
| `cutset` | _(required)_ the set of characters to cut |

Examples

_`input.tmpl`:_
```
Hello, {{trim .Env.FOO " "}}!
```

```console
$ FOO="  world " | gomplate < input.tmpl
Hello, world!
```


## `test.Assert`

**Alias:** `assert`

Asserts that the given expression or value is `true`. If it is not, causes
template generation to fail immediately with an optional message.

Usage

```go
test.Assert [message] value
```
```go
value | test.Assert [message]
```

Arguments

| name | description |
|------|-------------|
| `message` | _(optional)_ The optional message to provide in the case of failure |
| `value` | _(required)_ The value to test |

Examples

```console
$ gomplate -i '{{ assert (eq "foo" "bar") }}'
template: <arg>:1:3: executing "<arg>" at <assert (eq "foo" "ba...>: error calling assert: assertion failed
$ gomplate -i '{{ assert "something horrible happened" false }}'
template: <arg>:1:3: executing "<arg>" at <assert "something ho...>: error calling assert: assertion failed: something horrible happened
```

## `test.Fail`

**Alias:** `fail`

Cause template generation to fail immediately, with an optional message.

Usage

```go
test.Fail [message]
```
```go
message | test.Fail
```

Arguments

| name | description |
|------|-------------|
| `message` | _(optional)_ The optional message to provide |

Examples

```console
$ gomplate -i '{{ fail }}'
template: <arg>:1:3: executing "<arg>" at <fail>: error calling fail: template generation failed
$ gomplate -i '{{ test.Fail "something is wrong!" }}'
template: <arg>:1:7: executing "<arg>" at <test.Fail>: error calling Fail: template generation failed: something is wrong!
```

## `test.IsKind`

**Alias:** `isKind`

Report whether the argument is of the given Kind. Can be used to render
different templates depending on the kind of data.

See [the Go `reflect` source code](https://github.com/golang/go/blob/36fcde1676a0d3863cb5f295eed6938cd782fcbb/src/reflect/type.go#L595..L622)
for the complete list, but these are some common values:

- `string`
- `bool`
- `int`, `int64`, `uint64`
- `float64`
- `slice`
- `map`
- `invalid` (a catch-all, usually just `nil` values)

In addition, the special kind `number` is accepted by this function, to
represent _any_ numeric kind (whether `float32`, `uint8`, or whatever).
This is useful when the specific numeric type is unknown.

See also [`test.Kind`](test-kind).

Usage

```go
test.IsKind kind value
```
```go
value | test.IsKind kind
```

Arguments

| name | description |
|------|-------------|
| `kind` | _(required)_ the kind to compare with (see desription for possible values) |
| `value` | _(required)_ the value to check |

Examples

```console
$ gomplate -i '{{ $data := "hello world" }}
{{- if isKind "string" $data }}{{ $data }} is a string{{ end }}'
hello world is a string
```
```console
$ gomplate -i '{{ $object := dict "key1" true "key2" "foobar" }}
{{- if test.IsKind "map" $object }}
Got a map:
{{ range $key, $value := $object -}}
  - "{{ $key }}": {{ $value }}
{{ end }}
{{ else if test.IsKind "number" $object }}
Got a number: {{ $object }}
{{ end }}'

Got a map:
- "key1": true
- "key2": foobar
```

## `test.Kind`

**Alias:** `kind`

Report the _kind_ of the given argument. This differs from the _type_ of
the argument in specificity; for example, while a slice of strings may
have a type of `[]string`, the _kind_ of that slice will simply be `slice`.

If you need to know the precise type of a value, use `printf "%T" $value`.

See also [`test.IsKind`](test-iskind).

Usage

```go
test.Kind value
```
```go
value | test.Kind
```

Arguments

| name | description |
|------|-------------|
| `value` | _(required)_ the value to check |

Examples

```console
$ gomplate -i '{{ kind "hello world" }}'
string
```
```console
$ gomplate -i '{{ dict "key1" true "key2" "foobar" | test.Kind }}'
map
```

## `test.Required`

**Alias:** `required`

Passes through the given value, if it's non-empty, and non-`nil`. Otherwise,
exits and prints a given error message so the user can adjust as necessary.

This is particularly useful for cases where templates require user-provided
data (such as datasources or environment variables), and rendering can not
continue correctly.

This was inspired by [Helm's `required` function](https://github.com/kubernetes/helm/blob/master/docs/charts_tips_and_tricks.md#know-your-template-functions),
but has slightly different behaviour. Notably, gomplate will always fail in
cases where a referenced _key_ is missing, and this function will have no
effect.

Usage

```go
test.Required [message] value
```
```go
value | test.Required [message]
```

Arguments

| name | description |
|------|-------------|
| `message` | _(optional)_ The optional message to provide when the required value is not provided |
| `value` | _(required)_ The required value |

Examples

```console
$ FOO=foobar gomplate -i '{{ getenv "FOO" | required "Missing FOO environment variable!" }}'
foobar
$ FOO= gomplate -i '{{ getenv "FOO" | required "Missing FOO environment variable!" }}'
error: Missing FOO environment variable!
```
```console
$ cat <<EOF> config.yaml
defined: a value
empty: ""
EOF
$ gomplate -d config=config.yaml -i '{{ (ds "config").defined | required "The `config` datasource must have a value defined for `defined`" }}'
a value
$ gomplate -d config=config.yaml -i '{{ (ds "config").empty | required "The `config` datasource must have a value defined for `empty`" }}'
template: <arg>:1:25: executing "<arg>" at <required "The `confi...>: error calling required: The `config` datasource must have a value defined for `empty`
$ gomplate -d config=config.yaml -i '{{ (ds "config").bogus | required "The `config` datasource must have a value defined for `bogus`" }}'
template: <arg>:1:7: executing "<arg>" at <"config">: map has no entry for key "bogus"
```

## `test.Ternary`

**Alias:** `ternary`

Returns one of two values depending on whether the third is true. Note that the third value does not have to be a boolean - it is converted first by the [`conv.ToBool`](../conv/#conv-tobool) function (values like `true`, `1`, `"true"`, `"Yes"`, etc... are considered true).

This is effectively a short-form of the following template:

```
{{ if conv.ToBool $condition }}{{ $truevalue }}{{ else }}{{ $falsevalue }}{{ end }}
```

Keep in mind that using an explicit `if`/`else` block is often easier to understand than ternary expressions!

Usage

```go
test.Ternary truevalue falsevalue condition
```
```go
condition | test.Ternary truevalue falsevalue
```

Arguments

| name | description |
|------|-------------|
| `truevalue` | _(required)_ the value to return if `condition` is true |
| `falsevalue` | _(required)_ the value to return if `condition` is false |
| `condition` | _(required)_ the value to evaluate for truthiness |

Examples

```console
$ gomplate -i '{{ ternary "FOO" "BAR" false }}'
BAR
$ gomplate -i '{{ ternary "FOO" "BAR" "yes" }}'
FOO
```


## `time.Now`

Returns the current local time, as a `time.Time`. This wraps [`time.Now`](https://golang.org/pkg/time/#Now).

Usually, further functions are called using the value returned by `Now`.

Usage

```go
time.Now
```


Examples

Usage with [`UTC`](https://golang.org/pkg/time/#Time.UTC) and [`Format`](https://golang.org/pkg/time/#Time.Format):
```console
$ gomplate -i '{{ (time.Now).UTC.Format "Day 2 of month 1 in year 2006 (timezone MST)" }}'
Day 14 of month 10 in year 2017 (timezone UTC)
```
Usage with [`AddDate`](https://golang.org/pkg/time/#Time.AddDate):
```console
$ date
Sat Oct 14 09:57:02 EDT 2017
$ gomplate -i '{{ ((time.Now).AddDate 0 1 0).Format "Mon Jan 2 15:04:05 MST 2006" }}'
Tue Nov 14 09:57:02 EST 2017
```

_(notice how the TZ adjusted for daylight savings!)_
Usage with [`IsDST`](https://golang.org/pkg/time/#Time.IsDST):
```console
$ gomplate -i '{{ $t := time.Now }}At the tone, the time will be {{ ($t.Round (time.Minute 1)).Add (time.Minute 1) }}.
  It is{{ if not $t.IsDST }} not{{ end }} daylight savings time.
  ... ... BEEP'
At the tone, the time will be 2022-02-10 09:01:00 -0500 EST.
It is not daylight savings time.
... ... BEEP
```

## `time.Parse`

Parses a timestamp defined by the given layout. This wraps [`time.Parse`](https://golang.org/pkg/time/#Parse).

A number of pre-defined layouts are provided as constants, defined
[here](https://golang.org/pkg/time/#pkg-constants).

Just like [`time.Now`](#time-now), this is usually used in conjunction with
other functions.

_Note: In the absence of a time zone indicator, `time.Parse` returns a time in UTC._

Usage

```go
time.Parse layout timestamp
```
```go
timestamp | time.Parse layout
```

Arguments

| name | description |
|------|-------------|
| `layout` | _(required)_ The layout string to parse with |
| `timestamp` | _(required)_ The timestamp to parse |

Examples

Usage with [`Format`](https://golang.org/pkg/time/#Time.Format):
```console
$ gomplate -i '{{ (time.Parse "2006-01-02" "1993-10-23").Format "Monday January 2, 2006 MST" }}'
Saturday October 23, 1993 UTC
```

## `time.ParseDuration`

Parses a duration string. This wraps [`time.ParseDuration`](https://golang.org/pkg/time/#ParseDuration).

A duration string is a possibly signed sequence of decimal numbers, each with
optional fraction and a unit suffix, such as `300ms`, `-1.5h` or `2h45m`. Valid
time units are `ns`, `us` (or `µs`), `ms`, `s`, `m`, `h`.

Usage

```go
time.ParseDuration duration
```
```go
duration | time.ParseDuration
```

Arguments

| name | description |
|------|-------------|
| `duration` | _(required)_ The duration string to parse |

Examples

```console
$ gomplate -i '{{ (time.Now).Format time.Kitchen }}
{{ ((time.Now).Add (time.ParseDuration "2h30m")).Format time.Kitchen }}'
12:43AM
3:13AM
```

## `time.ParseLocal`

Same as [`time.Parse`](#time-parse), except that in the absence of a time zone
indicator, the timestamp wil be parsed in the local timezone.

Usage

```go
time.ParseLocal layout timestamp
```
```go
timestamp | time.ParseLocal layout
```

Arguments

| name | description |
|------|-------------|
| `layout` | _(required)_ The layout string to parse with |
| `timestamp` | _(required)_ The timestamp to parse |

Examples

Usage with [`Format`](https://golang.org/pkg/time/#Time.Format):
```console
$ bin/gomplate -i '{{ (time.ParseLocal time.Kitchen "6:00AM").Format "15:04 MST" }}'
06:00 EST
```

## `time.ParseInLocation`

Same as [`time.Parse`](#time-parse), except that the time is parsed in the given location's time zone.

This wraps [`time.ParseInLocation`](https://golang.org/pkg/time/#ParseInLocation).

Usage

```go
time.ParseInLocation layout location timestamp
```
```go
timestamp | time.ParseInLocation layout location
```

Arguments

| name | description |
|------|-------------|
| `layout` | _(required)_ The layout string to parse with |
| `location` | _(required)_ The location to parse in |
| `timestamp` | _(required)_ The timestamp to parse |

Examples

Usage with [`Format`](https://golang.org/pkg/time/#Time.Format):
```console
$ gomplate -i '{{ (time.ParseInLocation time.Kitchen "Africa/Luanda" "6:00AM").Format "15:04 MST" }}'
06:00 LMT
```

## `time.Since`

Returns the time elapsed since a given time. This wraps [`time.Since`](https://golang.org/pkg/time/#Since).

It is shorthand for `time.Now.Sub t`.

Usage

```go
time.Since t
```
```go
t | time.Since
```

Arguments

| name | description |
|------|-------------|
| `t` | _(required)_ the `Time` to calculate since |

Examples

```console
$ gomplate -i '{{ $t := time.Parse time.RFC3339 "1970-01-01T00:00:00Z" }}time since the epoch:{{ time.Since $t }}'
time since the epoch:423365h0m24.353828924s
```

## `time.Unix`

Returns the local `Time` corresponding to the given Unix time, in seconds since
January 1, 1970 UTC. Note that fractional seconds can be used to denote
milliseconds, but must be specified as a string, not a floating point number.

Usage

```go
time.Unix time
```
```go
time | time.Unix
```

Arguments

| name | description |
|------|-------------|
| `time` | _(required)_ the time to parse |

Examples

_with whole seconds:_
```console
$ gomplate -i '{{ (time.Unix 42).UTC.Format time.Stamp}}'
Jan  1, 00:00:42
```

_with fractional seconds:_
```console
$ gomplate -i '{{ (time.Unix "123456.789").UTC.Format time.StampMilli}}'
Jan  2 10:17:36.789
```

## `time.Until`

Returns the duration until a given time. This wraps [`time.Until`](https://golang.org/pkg/time/#Until).

It is shorthand for `$t.Sub time.Now`.

Usage

```go
time.Until t
```
```go
t | time.Until
```

Arguments

| name | description |
|------|-------------|
| `t` | _(required)_ the `Time` to calculate until |

Examples

```console
$ gomplate -i '{{ $t := time.Parse time.RFC3339 "2020-01-01T00:00:00Z" }}only {{ time.Until $t }} to go...'
only 14922h56m46.578625891s to go...
```

Or, less precise:
```console
$ bin/gomplate -i '{{ $t := time.Parse time.RFC3339 "2020-01-01T00:00:00Z" }}only {{ (time.Until $t).Round (time.Hour 1) }} to go...'
only 14923h0m0s to go...
```

## `time.ZoneName`

Return the local system's time zone's name.

Usage

```go
time.ZoneName
```


Examples

```console
$ gomplate -i '{{time.ZoneName}}'
EDT
```

## `time.ZoneOffset`

Return the local system's time zone offset, in seconds east of UTC.

Usage

```go
time.ZoneOffset
```


Examples

```console
$ gomplate -i '{{time.ZoneOffset}}'
-14400
```


## `uuid.V1`

Create a version 1 UUID (based on the current MAC address and the current date/time).

Use [`uuid.V4`](#uuid-v4) instead in most cases.

Usage

```go
uuid.V1
```


Examples

```console
$ gomplate -i '{{ uuid.V1 }}'
4d757e54-446d-11e9-a8fa-72000877c7b0
```

## `uuid.V4`

Create a version 4 UUID (randomly generated).

This function consumes entropy.

Usage

```go
uuid.V4
```


Examples

```console
$ gomplate -i '{{ uuid.V4 }}'
40b3c2d2-e491-4b19-94cd-461e6fa35a60
```

## `uuid.Nil`

Returns the _nil_ UUID, that is, `00000000-0000-0000-0000-000000000000`,
mostly for testing scenarios.

Usage

```go
uuid.Nil
```


Examples

```console
$ gomplate -i '{{ uuid.Nil }}'
00000000-0000-0000-0000-000000000000
```

## `uuid.IsValid`

Checks that the given UUID is in the correct format. It does not validate
whether the version or variant are correct.

Usage

```go
uuid.IsValid uuid
```
```go
uuid | uuid.IsValid
```

Arguments

| name | description |
|------|-------------|
| `uuid` | _(required)_ The uuid to check |

Examples

```console
$ gomplate -i '{{ if uuid.IsValid "totally invalid" }}valid{{ else }}invalid{{ end }}'
invalid
```
```console
$ gomplate -i '{{ uuid.IsValid "urn:uuid:12345678-90ab-cdef-fedc-ba9876543210" }}'
true
```

## `uuid.Parse`

Parse a UUID for further manipulation or inspection.

This function returns a `UUID` struct, as defined in the [github.com/google/uuid](https://godoc.org/github.com/google/uuid#UUID) package. See the docs for examples of functions or fields you can call.

Both the standard UUID forms of `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` and
`urn:uuid:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` are decoded as well as the
Microsoft encoding `{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}` and the raw hex
encoding (`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`).

Usage

```go
uuid.Parse uuid
```
```go
uuid | uuid.Parse
```

Arguments

| name | description |
|------|-------------|
| `uuid` | _(required)_ The uuid to parse |

Examples

```console
$ gomplate -i '{{ $u := uuid.Parse uuid.V4 }}{{ $u.Version }}, {{ $u.Variant}}'
VERSION_4, RFC4122
```
```console
$ gomplate -i '{{ (uuid.Parse "000001f5-4470-21e9-9b00-72000877c7b0").Domain }}'
Person
```
