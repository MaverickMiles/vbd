const fullText = `
Long ago,
in the distant lands of Ethiopia
A tiny human
was preparing to make her grand entrance 
into the world

The world was not ready for what was coming—
No instruction manual came with this one.
A force of nature who'd one day grow up 
to master the art
Of microwaving food to the exact second it needs to be heated.

Making her grand entrance into the world
With such grace and consideration
For her mother's comfort
She set a new hospital record:
Zero to baby in just over an hour.
(Talk about optimization from day one!)

On November 22, 1998
This hero of a baby
Said hello to the world for the very first time

[animate]
Baby V was beautiful,
A star unaware of itself.
Unaware of its light.

Her thinking mind was peacefully asleep,
Serving only her needs—
A warm shelter, endless love, 
and a cup of milk
Ok multiple cups 
(everyday)

It was a simpler time.

She was fluent with what she loved—
Dogs and Damon Salvatore

She would sleep and dream...

For she had not yet learned the fear 
of giving herself up to sleep at night

Her Sundays were not yet haunted
By the ghost of Monday mornings to come.

She was not yet burdened

By all the balls she would throw up in the air 
And not be able to catch.


On a day like this,
We are reminded of that simpler time...

We are reminded of who she was

Who she is
Underneath all she does...
And all she is not able to do.

So, who is she?

Well, it depends.

At her best,
She is sweet, loving and kind

Sensitive to all the nuances 
that bridge the gap 
between understanding and division.

She is Equipped 
with a 2x speed mind
With which she picks apart textbooks 
and chicken nuggets on her plate.

Sometimes this mind gets the best of her 
(Actually many times)
But when it's appropriately directed 
At the activity at hand instead of herself,
She is unmatched.

As many friends noted,
She was the type to terrify herself 
With the prospects of failing an exam 
and becoming homeless

Then walk into the exam room 
And come out with an A+.

Of course, she's not all rainbow and good day sunshine.

At her worst,
She cosplays a neglectful drunk mother.

Just kidding!

Even at her lowest points,
She never loses sight of what truly matters.
To her😁

It might take a long walk and many ted talks,
But she always finds her way back home.

So cheers to finding our light again
In the simplicity of who we once were

Cheers to the freedom that comes
Not from perfection
But from dancing between our shadow and light.

Cheers to being exactly as we are—
Emboldened 
by our own being and becoming.

Cheers to V
All that she loves
All she is loved by
And cheers to the milk industry,
Which should sends her annual thank you cards at this point

And now, let's turn to her friends
Who've witnessed her evolution
From tiny crying creature
To slightly taller crying creature,
To hear their birthday wishes
And what they remember best...
`;

export const formattedFullText = fullText.trim();

export const [inceptionParagraphText, postInceptionParagraphText] = formattedFullText.split('[animate]');

export const inceptionParagraphs = inceptionParagraphText.split('\n\n');
export const postInceptionParagraphs = postInceptionParagraphText.split('\n\n');