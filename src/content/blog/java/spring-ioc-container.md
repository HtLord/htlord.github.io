---
title: IoC Container - Spring Core
pubDate: '2022-09-12'
tags: 
  - spring
---


Abstract
---
We will tell about what is IoC, how it work, and several terminology. If you want to quick go through the documentation. Before you direct dive into document practice we startup spring will make reading official document easier.


Reading Recommend
---
- Skim 1.1, 1.2, 1.3, 1.4 and record some buzz word go back here later because it is hard to read for beginner and not having enough details for advencer.
- Check star topic will give you enough understanding of spring

⭐IoC Container
---
Inverse of control means in most of scenario you do not need to consider what mechanism is or real workflow. Configure things which document tell you need to be setup and rests IoC will just work. This is magic also what a sorcery.

The configuration will call meta data or context will be set into container(spring engine) then it do rest for you.

![Spring Container Image](/assets/img/java/spring-container-magic.png)


[Bean Scope](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-scopes)
---

Bean definiton is treat as a reciept tell Spring Container how to generate defined object(a.k.a bean). The scope means when should beans be init, reused, or destoried.

There is 2 major type scope
- Regular
	- singleton scope
	- prototype scope
- Web (avaliable to be used only when web library be contained)
	- request scope
	- session scope
	- application scope
	- websocket scope

### Singleton Scope
Create bean only once when container has been created


### Prototype Scope
Create bean on every time it has been called

### Request Scope
Create bean on every request

### Session Scope
Create bean on every session

### Application Scope
Rather to use skip here

###  Websocket Scope
[Details here when you need it.](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#websocket-stomp-websocket-scope)


### Scope Dependencies or Collaborators
You can inject scoped bean into other bean. Makesure there on in the same scope. Otherwise it will not work like you thought. If there is the senario you want a bean go through some flow then use AOP will be a better option.


### Customized Scope
I prefer to skip it.

Nature of bean(bean of Lifecycle)
---
I will think this is like What a bean behavior(init, destroy, etc) and how it be controlled(C of IoC). This nature of bean will containing 3 topic. BTW, This naming is confuse me a lots. 
- Callbacks
	- Lifecycle callback
	- Initialization callback
	- Destruction callback
- ApplicationContextAware
- OtherAwares

### Inital, Destory, and Lifecycle <a name="inital-destroy-and-lifecycle"></a>
This provide you customize some behavior which operated after constrcut for init and let container whcihc contain it to destroy by callback.

Bean Initialization Callback
- Behavior, do something after container create the bean
- How 
	- Implement InitializationBean `afterPropertiesSet`
	- Add `init` method to bean
	- Add `@Bean(initMethod="someMethodInBean")` annotation
	- Use `@PostConstruct` annotation
- Recommend no to used it because of coupling business logic to spring-spec.

Bean Destruction Callback
- Behavior, do something before container is destroied which the bean be contained inside.
- How, 
	- Implement DisposableBean `destroy`
	- Add `destroy` method to bean
	- Add `@Bean(destroyMethod="someMethodInBean")` annotation
	- Use `@PreDestroy` annotation
- Recommend no to used it because of coupling business logic to spring-spec.

Order of bean lifecycle
1. `@PostConstruct
2. afterPropertiesSet defined by InitalizationBean
3. init method
4. @PreDestroy defined by DestroyBean
2. destroy method

Lifecycl Callback
- Behavior, If `ApplicationContext` get start, stop, etc signals it will cascade it to ALL Lifecycle implementations
- For more details here is a list for
	- Lifecycle
	- LifecycleProcessor
	- SmartLifecycle
	- DefaultSmartLifecycle

> In offical documentation it recommend yout to use `@PostConstruct` `@PreDestroy`

### ApplicationContextAware
It is provide another way to inject ApplicationContext into Beans by implement ApplicationContextAware interface. 
BTW, It's not recommedn to use ApplicationContext.

[There is other awares can be used](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#aware-list)


Bean Inheritance
---
[Just tell you that bean definition in xml can inherit like class](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-child-bean-definitions)


Container Extension Point
---
[Providing more details about convenient xml setting](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-extension)


⭐Annotation-Based Container Configuration
---
Give you several example about how to use it rather than xml and include lots of trick here check this if needed is enough. Here will list serverl common annotation which is used frequently.
- `@Required`, means this bean must be inject.
- `@Autowired`, container will find one for you, more details will in later chapter.
- `@Primary`, there may lots of bean is avaliable to fit bean required which has the same class type. By adding primary to tell container which one should be apply if there is no indicate to specific one.
- `@Qualifier`, inject by a bean by qulifier defined name
- `@Resource`, I read the document but I still not understand what it should be.
- `@Value`, inject specific value to field like String, Number, List, etc.
- `@PostConstruct`, [check Inital, Destory, and Lifecycle](#inital-destroy-and-lifecycle)
- `@PreDestroy`, [check Inital, Destory, and Lifecycle](#inital-destroy-and-lifecycle)


Classpath Scanning and Managed Component 
---
- `@Component`, tell container object need to be treat as bean and do some process for it. There is other common generic annotation list below:
	- `@Repository`
	- `@Service`
	- `@Controller`
- `@Configuration` and `@ComponentScan`, Setup java-base configuration for container and tell where to getting start will use @Configuration. Then add `@ComponentScan` with @Configuration to tell container where is other beans to load. Extra, you can add @Filter as behavior for `@ComponentScan`
- `@Import`, not descript in offical document
- `@DependOn`, not descript in offical document


JSR-330 annotations
---
In my opinion, it's realy rare be used. Take a peek [here](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-standard-annotations-limitations) for checking if there is something helpful, or not.


[Java-based Configuration](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-java)
---
If you are reading document from top to down or has experence to maintain projects based on Java then it almost useless. If you has some problems with `@Bean`, `@Configuration`, `@ImportResource`, etc then check it. Or you need to craft 3rd-party library for spring then you do really need such details.


[Environment Abstraction](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-environment)
---
Check this. If you have problems with `@Profile`, `@PropertySource` or want more details about dynamic value in code which depend on external files.


[Timeweaver](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#context-load-time-weaver)
---
Check this. If you want to know what is Timeweaver or more extra info for it check links inside the section.


[Addictional Capability of ApplicationContext](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#context-introduction)
---
Check this If(1st, 2nd, 4th is recommend to read anyway)
- [You want to setup message template with or without i18n(MessageSource)](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#context-functionality-messagesource)
- [You want beans is available to communicated with other beans with notification and listener, infos about `@ApplicationEventPublisherAware` and `@ApplicationEventPublisherAware`, or brief message system inside container(like sending email, publish message, etc)](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#context-functionality-events)
- [You want to load extra source(like file) into container or infos about `@ResourceLoader`, `@ResourceLoaderAware`](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#context-functionality-resources)
- [You want to understand whole flow of you spring application step by step](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#context-functionality-startup)
- [You want load context from xml](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#context-create)
- [You want deploy as Java EE RAR](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#context-deploy-rar)
- [You want to know BeanFactory](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-beanfactory)


Tips
---
- ApplicationContext is implementation of BeanFactory and ApplicationContext has a lots of extensions for different purpose
- If there is lots of annotation no descripted clearly, you always can find more details in code or java doc.
- Use `@Import` to recruit `@Configuration` rather than `@ComponentScan`. Because, `@Import` just provide class directly and ease to use but `@ComponentScan` need scan whole folder
- Use `@ImportResource` for `@Value` to get value from property files with SpEL
- BeanPostProcessor for do something for all bean after init


Summary
---
You can image spring framework is fill-in questions for software enginering. For example, If you want to create an api server it provide you `Controller`, `Service`, and `Repository` to fulfill for your business logic and you do not need to consider how to create connection from clinic, how to parsing byte to string or convert into object, etc. Only you need to focus is your business logic. 

Reference
---
- [Spring core](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html)
