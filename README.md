jQuery-nthMatch
==============

A jQuery plug-in that filters the wrapped set with a CSS style nth-child or nth-of-type style equation like 3n+1 or 5n or -n+4.

This is useful when the wrapped set you have is full of disparate or out of order items.

nth-child is dependent on the element's tree position and siblings for its index count.
nth-of-type is dependent on the element type for its index count.

In BOTH cases the outcome can be influenced by elements not in the wrapped set.  nthMatch is dependent ONLY on the contents of the wrapped set. Type and child position have no bearing.  Consider the following tree:

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
        

Consider the following jQuery:

    $allTags = $('body *');

The star '*' is a wild card that selects all elements.  so this wrapped set would include every tag on the page.  It can then be filtered using nthMatch.

    $someTags = $allTags.nthMatch('3n+1'); 

Would yield a wrapped set with: [a.firstLink, div.content, p].  Notice that this pays no heed to when elements are or are not the nth of their type or their parent's children.  The only thing that nthMatch bases its matches off, is index positions of the contents of the wrapped set.  

This abstraction can be useful.  Consider the following use case. You have many sibling divs and you want to hide or show these based off user interaction.  Further you want to float all these divs and display them in rows of say  or 4.  When you do this it is important to clear the first visible element in each row otherwise layout issues can occur, especially if the height of these divs varies, a concern that should always be accounted for if working with content from a CMS.  Now the following command can be run every time you run the code to reorder or hide or show any divs.  Let's assume a row size of 4 items.

    $('#myContainer > div:visible').removeClass('clear').nthMatch('4n+1').addClass('clear');

This code grabs all the divs that are a direct child of #myContainer and uses the :visible pseudo-class so as to not include hidden divs in the wrapped set.  It then removes the class of clear so that we don't clear any previous matches based on old filtering conditions.  Then the nthMatch() function removes all elements from the wrapped set that do NOT match the equation and keeps only the ones that do.  It then adds the clear class to those.  add the following CSS to your page and you're done!

    <style>
      #myContainer .clear {clear:left;}
    </style> 

This would not be possible with either :nth-match(4n+1) or :nth-of-type(4n+1) because some of the divs need to be ignored based on custom conditions.  With this plugin you can use any code or selectors you like to get the items required into the wrapped set and then filter them with this according to the nth equation paradigm.

## Behind the curtain.

At its core the plug-in is simply a convenience function for the jQuery .filter() function. http://api.jquery.com/filter/#using-filter-function.  Indexes of items are calculated as a 1 base to conform the the CSS nth-child methodology.  the syntax for nthMatch is as follows:

    $('.selector .of .your .choice').nthMatch('integer / equation / keyword');

* integer
    * any positive or negative integer.  (note negative integers will never match anything so don't bother)
* equation
    * an n based equation follow the patten of:
      * Mn+S
      * Where: 
        * M is any integer
        * n is actually the letter n and will be used to represent a steadily increasing integer for the calculation
        * S is any Scalar integer to add to the final result (positive or negative)
      * for example: with 3n+1, M = 3, S = 1 so the indices that would match would be 1 (3*0+1), 4 (3*1+1), 7 (3*2+1) and So on...
* keyword
    * the two supported keywords are 'even' and 'odd' and they are converted to the equations 2n and 2n+1 respectively.

This plugin was create to hopefully help you overcome the limitations of both nth-child and nth-of-type.  Hopefully it helps you.  If it does, please drop me a line on github and let me know.

https://github.com/infinitymediaca/jquery-nthMatch

- Infinity.