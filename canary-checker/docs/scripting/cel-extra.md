## Filepath

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

## Path 

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

### 

## UUID

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

