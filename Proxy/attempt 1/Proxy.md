# Proxy
Partial or null version of another object that allows for privatization of data or loading data only as is needed(lazy loading).

## Why is this needed?
Sometimes a user only needs a partial section of data, as when they have different levels of authorization. Having a "proxy" in this case would allow you to create an interface that contains the data the user needs access to. 

In another case, the user attempts to view an image. It might be massive, like a satellite image of the Earth. A proxy would allow you to create a standarized subsection of the image. Having a template would allow you to isolate the section of memory used currently and pass it to the user in a specific understood template created by the code. Giving the responsibility of the template to the code allows for a reduced possibility of miscommunication.
## Design
This design pattern is quite simple, realistically. You have some object, the "subject"; and then a proxy which acts as a communication point for the user.
## Experimentation
I think I'll try creating a google map example which has a subset of image information. I'll simplify the concept by using substrings of content as the details that are distributed by the proxy. This allows for a reasonable test-case.
## Post Experimentation
Seems like this design pattern is pretty simple to implement. 
I don't know if I can even think of any downsides to this pattern in essence. Realistically, it's just creating a segmented version of another class. If you didn't do that, you'd have to access the whole object in whatever that means in that moment. More memory usage, more access than required, etc. I guess it's a computation tax to some extent, as you have to build up the proxy. Thats only really a concern when you're going to end up lazy loading the rest of the subject class.

One of the uses for this I could definitely see is when you're generating data for use in your API. You might want to send a truncated or specific sections of the class. 
