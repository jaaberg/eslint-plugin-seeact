# Prevent using this.state inside a this.setState (no-access-state-in-setstate)

This rule should prevent usage of `this.state` inside `this.setState` calls. 
Such usage of `this.state` might result in errors when two state calls are
called in a batch and thus referencing the old state and not the current
state. The following may lead to problems:

```
this.setState({counter: this.state.counter+ 1});
```

This form of `setState()` is also asynchronous, and multiple calls during the 
same cycle may be batched together. For example, if you attempt to increment 
an item quantity more than once in the same cycle, that will result in the 
equivalent of:

```
Object.assign(
  previousState,
  {counter: state.counter + 1},
  {counter: state.counter + 1},
  ...
)
```

This can be avoided by using a callback which takes the previous state
as the first argument:

```  
this.setState(prevState => ({counter: prevState.counter + 1}));
```

Then react will call the argument with the correct and updated state, 
even when things happen in batches. 

This is the recommended way of doing it in the [react docs](https://reactjs.org/docs/react-component.html#setstate).