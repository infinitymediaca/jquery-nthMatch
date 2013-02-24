jQuery-nthMatch
==============
A jQuery plugin that filters the wrapped set with a CSS style nth-child or nth-of-type style equation like 3n+1.

This is useful when the wrapped set you have is full of disparate or out of order items.

nth-child is dependent on the element's tree position and siblings.
nth-of-type is dependent on the element type.

In BOTH cases the outcome can be influenced by elements not in the wraped set.  nthMatch is dependent ONLY on the contents of the wrapped set. Type and child position have no bearing.  consider the following tree:

    html
      body
        div.menu
          ul
            li.first
              a.firstLink
            li.last
              a.lastLink
        div.content
          h2
            span
          p
            strong
        

the following $('body *').nthMatch('3n+1'); would yeild a wrapped set with: a.firstLink, div.content & p.  

The only thing that nthMatch bases its count off of is the contents of the wrapped set.  

This abstraction can be useful.
