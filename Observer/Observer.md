# Observer Pattern
According to Design Patterns, the intent behind the design is described as: to "define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically".

**Also Known As**: Dependents, Publish-subscribe

## Why is this needed?
Whenever an object relies on another, the dependee may change. This could cause dependents to act improperly, as if they are not aware of the changes, their behavior may no longer function as intended.  

## Design
![alt text](image.png)

 The observer detects state change in the subject by being attached via method. 

 The subject can attach any number of observers to itself. The observer stores state consistent with the subject's.

 *Query:* How do you go about implementing the ability for an update method to be run for every observer? How do you determine what data is passed to them?
*Answer*: The subject doesn't pass the data, the observer queries for it.

 According to the book the subject and observer are only aware of the interface of the other, which allows for the concrete implementation to differ. Makes sense. 

 One of the concerns mentioned in the consequences section says that because observers have no knowledge of each other, they can change the subject in a way that could unexpectedly change something.

 To me, this speaks to a misunderstanding I had at the start: The observer pattern is more about allowing an open "interface"(not literally) between classes for communicate without knowledge about the other's structure. The advantage of this is that you can update the implementation of the concrete classes without breaking any of the structure inherently.

## After Testing
I want to do the example where you specify an aspect of interest for the Observer as it's being attached.