---
title: Python Database with Postgresql
pubDate: '2021-04-25'
tags: 
  - python
  - db
---
Python Database
===

Tip
---
- Remeber close connection
- Remeber commit after execute insert/update/delete
- When using %s in execute(). It is easy to mismatch number of %s, args, and params.

Setup
---
- Install `psycopg2`
- Set host, port, user, password for `psyconpg2` to connect to db
- Open cursor to perform operation
- Done

Example
---
Using postgres as example
```python
    import psycopg2
    
    
    # Connect to postgres db
    conn = psycopg2.connect("host=htlord.taipei port=5566 dbname=htlord user=htlord password=taipei")
    
    # Open a cursor to perform database operations
    cur = conn.cursor()
    
    # Query samples
    querySample1 = cur.execute('SELECT * FROM user;')
    (uid, name, phoneCall) = cur.execute('SELECT id as uid, name as name, phone as phoneCall FROM user')
    
    # Insert sample
    cur.execute('INSERT user VALUES (%s,%s,%s)', [1, 'hello', '090000000'])
    conn.commit()
    
    # End of useing db
    conn.close()
```

Troubleshooting
---
- TypeError('not all arguments converted during string formatting'), you missing %s when using `execute`