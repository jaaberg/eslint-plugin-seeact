# Prevent using this.state inside a this.setState (no-access-state-in-setstate)

This rule should prevent usage of `this.state` inside `this.setState` calls. 
Such usage of `this.state` might result in errors when two state calls are
called in a batch and thus referencing the old state and not the current
state. The following may lead to problems:

```
this.setState({counter: this.state.counter+ 1});
```

If these two `setState` operations is grouped together in a batch, the state 
will be the same.

This can be avoided by using callbacks which takes the previous state
as the first argument:

```  
this.setState(prevState => ({counter: prevState.counter + 1}));
```

Then react will call the argument with the correct and updated state, 
even when things happen in batches. 