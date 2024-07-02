# State
"Allow an object to alter its behavior when its internal state changes. The object will appear to change its class."

## What is this thing?
From my interpretation of the description from this book, we create an interface that describes and object that has some method. This method will differ based on which different implementation you use, and some class will call any of these implementations. Which implementation you get depends on the state of the object, which is changed based on whatever is handling the creation of these stateful objects. 

My first thought when I see this is wondering, "Why not simply use an if statement"? If you did use an if statement, then you would incur some processing cost of having to determine the truthiness of that statement. The benefit then, would be that you would get to simply pass that processing to whatever is creating a distributing the state of these objects around, and the determination of which method implementation to use would be based on whatever class you end up instantiating in the end.

I'll be honest, I don't know exactly how I'm going to mutate and object around. My first thought is that maybe casting it allows you to mutate the methods alongside the class, but I'm not certain. I'll be investigating that in my tests below.

## Test


## Results
