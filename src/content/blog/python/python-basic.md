---
title: Python basic syntax
pubDate: '2021-04-24'
tags:
  - python
---
Python Basic
===

Tips
---
- Empty line is matter

Basic
---
### Import module
```python
# Must 2 blank lines from codes
import sys


some_codes_here()
...
```

### Export module
```python
# Exporting module folder structure:
# CAUSION: __init__.py can be empty but MUST be added in module
# project_root_folder
# ├ foldername
# │  ├ __init__.py
# │  └ filename.py
# └ ...
import foldername.filename
```


### Function
```python
def name(args):
    statemnt1
    statemnt2
    ...
    return v
    
```

### Class
```python
class Hello:
    field1 = {}
    field2 = []
    
    # If you want singleton add this
    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
        
    def method1(self, args):
        # ...
    
    def method2():
        # ...
```


### Variable/Const
- No const
- variable will looks like `a = 'that is enough for a as a variable'`

### String
- Literal
  ```python
  a = 'hello'
  b = 'world'
  c = f'{a} mtfk {b}'
  # >>> hellow mtfk world
  ```
- Multiple line
    ```python
    a =  "hello"
         "world"
         
    b = 'hello' \
        'world'
    ```
- Multiple line2
  ```python
  a = """
      hello
      multiple
      line
      string !!!
  """
  ```


### List
- Select range
    ```python
    a = [1, 2, 3, 4, 5]
    a[:len(a)]
    # >>> [1, 2, 3, 4, 5]
    a[:len(a) - 1]
    # >>> [1, 2, 3, 4]
    a[3:]
    # >>> [4, 5]
    a[3:4]
    # >>> [4]
    ```
- Add value
    ```python
    a = [1, 2, 3]
    a.append(4)
    b = [5, 6]
    a += b
    # >>> [1, 2, 3, 4, 5, 6]
    ```
    
### Dictionary
- Normal usage
    ```python
    a = {
        'f1': 1,
        'hello': 'world'
    }
    a['f1']
    # >>> 1
    a['hello']
    # >> world
    ```
- Convert tuples into dictionary
    ```python
    k = ['id', 'name', 'phone']
    v = ['1', 'hello', '09000000000']
    dist(zip(k, v))
    ```
- Check exist key
    ```python
    a = {
        'f1': 1,
        'hello': 'world'
    }
    'f1' in a
    # >>> True
    'f2' in a
    # >>> False
    ```


Reference
---
- [Python offical tutorial](https://docs.python.org/3/tutorial/index.html)