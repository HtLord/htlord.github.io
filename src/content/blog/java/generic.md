---
title: Generic
pubDate: '2022-09-03'
tags: 
  - java
  - generic
---

Quick Invoke
---
- Treat whole generic type as a class
- Syntax
    - For class, generic type will be defined after class name
    - For method, generic type will be defined before return type
    - Calling method which assign to, put args, add generic type before method will auto apply generic type

    ```java
    Box b = Util.generateBox();
    Util.<Box>generateBox();
    Util.generateBox(Box b);
    ```

Why
---
- Reuse logic with different inputs
- Generic will helping you to avoid run time error and support strong type constraint. For example

```java
public class Box {
    private Object o;

    Box(Object o) {
        this.o = o;
    }
}

public class GenericBox<T> {
    private T o;

    GenericBox(T o) {
        this.o = o;
    }
}

public class Logic {
    private final Box box = new Box("Hello");

    private final Generic<Integer> genericBox = new Generic<>(1);

    /**
    * If this method is called then it will thorwing error because 
    * assign with String accidentally which does not have intValue method.
    **/
    private void boxLogic() {
        this.box.intValue();
    }

    /**
    * It will fail while compiling, if you assign String.
    */
    private void genericBoxLogic() {
        this.genericBox.intValue();
    }
}

```

How to
---

```java

// Multiple Type Parameters
class name<T1, T2, ..., Tn> { /* ... */ }

public interface Rectangle<T> { /* ... */ }

public class GenericBox<T> implements Rectangle<T> { /* ... */ }

GenericBox<Integer> intBox = new GenericBox<Integer>();

// Parameterized Types
Box<List<String>> paraTypeObj = new Box<>();

// Generic Method
Utils.<String, Integer>doSomething(a1, a2);
```

Concpets
---
### Generic Method
- Defined before method's return type
- Scope on method
- Can apply to static and non-static method

```java
public class Util {
    public static <K, V> boolean compare(Pair<K, V> p1, Pair<K, V> p2) {
        return p1.getKey().equals(p2.getKey()) &&
            p1.getValue().equals(p2.getValue());
    }
}

public class Pair<K, V> { /* ... */ }

public class Example {
    public void doSomething() {
        Pair<Integer, String> p1 = new Pair<>(1, "apple");
        Pair<Integer, String> p2 = new Pair<>(2, "pear");
        boolean same1 = Util.<Integer, String>compare(p1, p2);
        boolean same2 = Util.compare(p1, p2);
    }
}

```

### Boundary Type
- Constraint generic type
- Multiple boundary type
- You can treat whole bundle as type (e.g. GenericBox<Integer>, GenericBox<Number> they are different type)

![Limitation of origin class relationship, copy from oracle](/assets/img/java/generics-subtypeRelationship.gif)

- If generic type extend another generic type, it can be treat as subtype

![Extend relationship from gt to gt, copy from oracle](/assets/img/java/generics-sampleHierarchy.gif)
![Complex example from gt to gt, copy form oracle](/assets/img/java/generics-payloadListHierarchy.gif)

### Inference
- Automatically define type by assign type to variables, method generic type, or method args.

```java
public class Example {
    public void doSomething() {
        GenericBox<Integer> a = new GenericBox<Integer>();
        boolean b = Util.<Integer, String>compare(p1, p2);
        boolean c = Util.compare(1, "2");
    }
}
```

### Wildcard
- Wildcard is present by question mark(?) stand for Object also can use extends or super to define upper bound or lower bound
- Upper bound means generic type can be assign by type which is a subclass of extends class 
- Lower bound means generic type can be assign by type which is a subtype of super class
- General guideline for when to use upper bound or lower bound is, if there is input then use upper bound; if there is output then use lower bound

```java
public interface Example {
    // This is upper bound and means you can assign types extends Number like Integer, Double, etc.
    void doSomething1(List<? extends Number>);

    // This is lower bound and means you can assign types is super class of Integer like Number, Object, etc.
    void doSomething2(List<? super Integer>);
}
```

### Type Erase
- After compile there will execute `erasingtype erasure process` and replace generic type with regular class

```java
// Origin
public class Example1<T> { 
    T o;
    public T void doSomething(T a1) {}
}

public class Example2<T extends Comparable<T>> {
    T o;
    public T void doSomething(T a1) {}
}
// Erased
public class Example1 { 
    Object o;
    public void doSomething(Object a1) {}
}

public class Example2 {
    Comparable o;
    public void doSomething(Comparable a1) {}
}
```

### Restrict
- Cannot Instantiate Generic Types with Primitive Types
- Cannot Create Instances of Type Parameters
- Cannot Declare Static Fields Whose Types are Type Parameters
- Cannot Use Casts or instanceof With Parameterized Types
- Cannot Create Arrays of Parameterized Types
- Cannot Create, Catch, or Throw Objects of Parameterized Types
- Cannot Overload a Method Where the Formal Parameter Types of Each Overload Erase to the Same Raw Type


Mist
---
- Raw types
    - It will happends on legacy code like

    ```java
    Box box = new Box();
    ```



Reference
---
- [Oracle official document](https://docs.oracle.com/javase/tutorial/java/generics/index.html)
- [Generic follow up by Gilad Bracha](https://docs.oracle.com/javase/tutorial/extra/generics/index.html)