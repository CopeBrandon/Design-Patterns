# Factory
Also known as: *Virtual Constructor*

## What the heck is this thing?
The factory method allows for a class to use a instanced object which uses a particular interface or abstract class without knowing which specific implementation/extension it is using. It does this because the knowledge of which class is being instantiated is encapsulated within the factory method itself.

## Thoughts
What is the application of this? If you have multiple factory methods, then wouldn't the knowledge of which class you're implementing be known at some point regardless due to the fact that there has to be some logic causing one choice to be made over another?

For instance: You could imagine a bit of code where you have multiple different document types you want to create, but you want the generic code of the application to treat them all as documents. When you create them, you still only need the interface in this case, and you would be able to instantiate whichever one you want based on what is being called on or sent at that particular point. I don't see why a factory is needed for this. This is what is described in the "motivation" section anyways.

I'll try implementing it and see if I'm a dummy...

## Results
I am a dummy, but that's okay.
I finished implementing the class and my overall thoughts were that it makes sense, and I can see some value to it, but after reading the chapter again and looking at my implementation and what they suggest for implementations I come away with a few thoughts:

- I am confused why you cannot use abstract and static together. It seems to me, that the reasons for it are basically language related; however, I think that there is a substantial loss when you cannot create hierarchies of static behaviors. I know that theoretically, it would be unlikely to be required, but I think that realistically, sometimes you don't need to use memory to generate behaviors, even those that might rely on some sort of logic. For instance, if you have a class that does some calculation based on inputs and you have a similar child class that does some calculation based on inputs, those classes do not necessarily need any properties inherent to this structure. Thus, you could say that if you wanted to create a class that utilizes a particular template, you could ensure that template is used in the moment. I know technically, this doesn't improve any efficiency, however it(in my opinion) would allow you to create handshakes for particular behaviors that would not otherwise be possible without using memory. In essence, this problem could be solved with conditional statements(as most anything could), but I just don't see why I need these guide rails, when I could make this decision myself.

- One of the supposed advantages of factory methods is that they allow you to create extended versions of classes under the same umbrella, but from my understanding you wouldn't be able to access any of the elements of the child class's extended properties and methods utilizing the contract created by the factory method itself, as it merely returns the abstract or parent class. I'm at loss on this one, but I think it might be from a fundamental misunderstanding of how extension and instance creation works.

- One of the suggestions for using an abstract factory, was utilizing a parallel class hierarchy for having a manager for another class, as the main class does not need all of the information about how it's being transformed. While I suppose that's true, it begs the question for me that I don't quite understand why not just have the transformations in the main class anyhow, as the main class's transformations can apply to all subclasses, and the information will be contained in the instance anyways. It feels very much like an encapsulation for encapsulation's sake, but perhaps I'm misunderstanding the value of it.

