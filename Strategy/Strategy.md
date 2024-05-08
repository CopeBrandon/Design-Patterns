# Strategy Pattern
The pattern which describes a set of algorithms that can be used interchangeably, but not wih the same output. The book has an example of differing linebreaking algorithms, each different one would have different use cases, but each would require the same structure externally. 


## Notes from Strategy.ts
As I was designing the compositor, I realized that I wanted the compositor to be able to handle any type of data that could be structured. The way that I want to implement this sounds like it will work but I think there are some problems with the way I am implementing it. This is the general idea behind it:
    
    Pass in a type to the composition when it is created, allowing you to generate a composition(that is, an array of contents) that may be mutated by using the compose function frmo the compositor. It would do this by taking in an array as part of its constructor, as well as a compositor object, which would expect the particular type as well. Forcing the type down the pipeline allows for us to utilize strict typing on the array's contents, which can be handy down the line. I want the compose function to do one of the following: return a Composition back to the original, or modify the contents of the original composition using the passed in Composition.

I think there are some downsides to both methods, but the first method of returning a whole composition back means that it is:
1. Less safe to changes, extensibility, etc. This is because the child class of the composition might have a more expansive constructor, thus not be able to rely on the parent class's constructor to work.
2. It will(probably) be slower because it needs to generate a new Object instance every time the compositor is run.

A potential downside to the modification would be that you would have to make the contents of the Composition class publicly accessible, which reduces safety. Ostensibly, this is unlikely to be an issue, but it's a noticeable thing. This could definitely be mitigated through a more complex implementation of setter methods to allow for safer data mutation.

All of the above was done by reading the first few pages of the section and then attempting to implement the design pattern without checking on the details of the implementation in any detail greater than skimming the design and code. This allowed me to create a mental image of the pattern that can come into contact with the more specific details with a more keen eye.

## Reading Notes
One of the applicability points notes you should use the Strategy pattern when you want data to be private. This makes some degree of sense to me; however, I'm wondering exactly what the implementation of code would look like where the use of the algorithm would be visible but the method structure would not.

The strategy pattern does allow you to create many algorithm only classes that affect one main data type. An example that came to mind of how to use something like the strategy pattern was something of this nature:

    A game character object can be multivariate, but you might have numerous methods that can alter the internals of one. As an example, you might have a game character that is acted on by another. The acting character calls for a strategy call depending on what it has going on. For instance, dealing damage might call for a GameActions.dealDamage(gameObject), or GameActions.invertGravity(gameObject), and the implementations of the methods allow for a specific targetting of a field inside of that object without necessarily needing to know all the details about which subclass it is or extensions it is utilizing.

The structure of the strategy pattern could be described as: a context is acted upon by a strategy which extends an abstract parent which contains a method that multiple different classes extend, but implement differently.

I think that the biggest downside to this pattern is that it requires some maintenance to some extent, if you modify a class you will need to modify the contents of the strategy as well sometimes. This can be a problem for maintaining code, I think. This particular pattern could be substituted through the usage of abstract methods, or interfaces. Personally, I find the usage of interfaces to modify the methods of an object far more persuasive than the stratey pattern, but I'm not certain. I suppose a downside of my method would be the increased number of full classes, but they wouldn't need to be fully implemented to work, as a child class that extends an interface to modify it's behavior ------ I just realized that in order for this to work, you have to substantially curb the amount of free flow of objects around. That can be a big downside sometimes. I'm not sure what the pattern would be called for this kind of structure, where you extend an interface to allow multiple different objects to be called into a particular method call, but I suppose the structure is the inverse in some sense. The place using the method needs to be aware that the data coming in is the correct interface, and then uses the method. The strategy pattern allows for a method to be called on a particular object(or child) and uses the parts it needs to do the behavior from the outside. As a general rule, I would suspect that the Strategy pattern is helpful for modifying content based on the contents of an object's properties, whereas this interface concept I created would be useful for internal modification or reducing the "breadth" of the codebase in some sense.

## Next Readings
Apparently, Context is a design pattern that interacts with the strategy pattern. The book states "A context may pass all data required by the algorithm to the strategy when the algorithm is called. Alternatively, the context can pass itself as an argument to Strategy operations. That lets the strategy call back on the context as required". With that in mind, it makes sense to read the section on Context.

TODO: Read the rest from the implementation section.

The book also specifies that Clients can utilize strategies. 

Flyweight is also mentioned.

