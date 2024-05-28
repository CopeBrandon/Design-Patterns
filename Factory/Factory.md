# Factory
Also known as: *Virtual Constructor*

## What the heck is this thing?
The factory method allows for a class to use a instanced object which uses a particular interface or abstract class without knowing which specific implementation/extension it is using. It does this because the knowledge of which class is being instantiated is encapsulated within the factory method itself.

## Thoughts
What is the application of this? If you have multiple factory methods, then wouldn't the knowledge of which class you're implementing be known at some point regardless due to the fact that there has to be some logic causing one choice to be made over another?

For instance: You could imagine a bit of code where you have multiple different document types you want to create, but you want the generic code of the application to treat them all as documents. When you create them, you still only need the interface in this case, and you would be able to instantiate whichever one you want based on what is being called on or sent at that particular point. I don't see why a factory is needed for this. This is what is described in the "motivation" section anyways.

I'll try implementing it and see if I'm a dummy... [TO CODE].
I need time to let this percolate...