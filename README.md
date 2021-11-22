# HulerTodo

## **Process**
```

Hello!
I've approached this task in the same way I would approach writing production code. 

In some cases the design document didn't have enough details or contained ambiguous information. As an example, the default color naming scheme in the doc is not usable in an actual application ('--unnamed-color-ffffff' etc.). There are also no notes on what should be the behaviour when adding lists that don't have a title or have a title that is a duplicate.

Faced with such a problem in a real work scenario I would confirm with the designer or product owner what is the intention in this case. Are these colors a part of a bigger naming scheme that we should keep consistent across multiple projects or is it ok to rename them entirely? Are there common acceptance criteria for add buttons and forms that I should implement? Are there common CSS transition solutions that should be added? In the scope of a tech task - I don't know.

These problems or possibilities of further improvements weren't ignored, I've left ToDos in places where I was unsure about problems like this one. They mark spots where the current implementation is lacking (e.g you can add a list without a title) but also where making an assumption might result in an error.

## **Structure and how to run**
```

This project has been created by using Vue setup tools. 
I chose to import Vue.Draggable as a tool for managing drag and drop sorting and behaviour.

https://github.com/SortableJS/Vue.Draggable

Runnin the project should be as simple as 

```
npm install
npm run serve
```

