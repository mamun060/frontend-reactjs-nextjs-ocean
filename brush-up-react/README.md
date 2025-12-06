### React , RTK, Tailwind and Typescripts - asset file working docs ocean

### React Route DOM setup
```js
// install react router dom 
npm install react-router-dom
```
# 📘 React Hooks — Complete Theory Guide (Interview Ready)

This document provides a clear, interview-friendly explanation of the most important React hooks:

* useState
* useEffect
* useRef
* useContext
* useReducer
* useMemo
* useCallback

---

# 🔥 1. `useState`

### **Purpose**

Stores and updates component state.

### **Why**

React re-renders components when state changes. `useState` manages values that change over time.

### **Key Points**

* Triggers re-render when updated.
* Updates are asynchronous.
* Used for simple UI state (input, toggles, counters).

### **Example**

```jsx
const [count, setCount] = useState(0);

setCount(count + 1);
```

---

# 🔥 2. `useEffect`

### **Purpose**

Handles side effects (API calls, timers, subscriptions, event listeners).

### **Why**

React rendering must stay pure; `useEffect` runs *after* render.

### **Dependency Rules**

* `[]` → run once (mount)
* `[value]` → run when value changes
* no array → run on every render

### **Example**

```jsx
useEffect(() => {
  fetchData();
}, []);
```

### **Cleanup**

Cleanups run on unmount or before next effect.

---

# 🔥 3. `useRef`

### **Purpose**

Stores a mutable value that does *not* cause re-renders.

### **Why**

Useful for: DOM access, timers, previous value storage, avoiding re-render loops.

### **Behaviors**

* Persists across renders.
* Changing `.current` does NOT trigger re-render.

### **Example**

```jsx
const inputRef = useRef(null);

<input ref={inputRef} />
```

---

# 🔥 4. `useContext`

### **Purpose**

Pass data deeply without prop drilling.

### **Why**

Avoid passing props manually through many components.

### **Key Points**

* Global/shared state for subtree.
* Re-renders all consumers on value change.

### **Example**

```jsx
const ThemeContext = createContext();

const theme = useContext(ThemeContext);
```

---

# 🔥 5. `useReducer`

### **Purpose**

Manages complex state with predictable transitions.

### **Why**

Better for multi-step, structured, or inter-dependent state logic.

### **Key Points**

* Similar to Redux.
* Uses `dispatch(action)`.

### **Example**

```jsx
function reducer(state, action) {
  switch(action.type) {
    case 'increment':
      return { count: state.count + 1 };
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });
```

---

# 🔥 6. `useMemo`

### **Purpose**

Memoizes expensive calculations.

### **Why**

Avoid recalculating heavy operations on every render.

### **Key Points**

* Optimization hook.
* Only recomputes when dependencies change.

### **Example**

```jsx
const value = useMemo(() => slowFunction(num), [num]);
```

---

# 🔥 7. `useCallback`

### **Purpose**

Memoizes a function.

### **Why**

Prevents re-creation of functions on each render → avoids unnecessary child re-renders.

### **Key Points**

* Works with `React.memo`.
* Improves performance.

### **Example**

```jsx
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
```

---

# 🧠 Hook Selection Guide

| Use Case                   | Best Hook   |
| -------------------------- | ----------- |
| UI updates                 | useState    |
| Side effects               | useEffect   |
| DOM access / mutable value | useRef      |
| Global state sharing       | useContext  |
| Complex state logic        | useReducer  |
| Memoize value              | useMemo     |
| Memoize function           | useCallback |

---
# 📌 Interview Tips

* `useRef` does not cause re-renders.
* `useEffect` cleanup runs before next run.
* `useMemo` & `useCallback` are performance optimizers, not state managers.
* `useReducer` is ideal for multi-step state transitions.
* Context triggers re-renders; optimize with memoization.

---

If you want, I can also add:
✅ Examples for each hook
✅ Real interview questions
✅ Custom hooks section

### react hooks

### useState
**Stores and updates state inside a component.**

### useRef() hooks uses for mainly two perposes:
* 1. Accessing the DOM property directly. 
*2. Storign the mutable values that don't Trigger Re-renders