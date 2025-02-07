import React, { useState } from "react";

const ChildComponent = React.memo(({ value }) => {
  console.log("Child rendered");
  return <div>Value: {value}</div>;
});

export default function AppMemo() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <ChildComponent value="Static Value" />
      <button onClick={() => setCount(count + 1)}>Increment: {count}</button>
    </div>
  );
}






// function ChildComponent({ value }) {
//   console.log("Child rendered");
//   return <div>Value: {value}</div>;
// }

// export default function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <ChildComponent value="Static Value" />
//       <button onClick={() => setCount(count + 1)}>Increment: {count}</button>
//     </div>
//   );
// }
