import { HelloWorld } from "./aother";

console.log("Apollo");
// import { ReactDOM } from 'react-dom/client';

// const rootReact = ReactDOM.createRoot(
//   document.getElementById("root")
// );

// const App = () => {
//   return React.createElement(
//     "h1",
//     { style: { color: "red" } },
//     "Hello World"
//   );
// };

// rootReact.render(React.createElement(App));
// const App = () => {
//     return <div>This is ReactApp Using Babel</div>
// }
// const rootBABEL=ReactDOM.createRoot(document.getElementById("root"))
// rootReact.render(App);

// const App = () => {
//   return <div>This is ReactApp Using Babel</div>;
// };

// const rootBABEL = ReactDOM.createRoot(
//   document.getElementById("root")
// );

// rootBABEL.render(<App />);



const bundlerReact = ReactDOM.createRoot(
  document.getElementById("root")
);

const App = () => {
  return React.createElement(
    "h1",
    { style: { color: "red" } },
    "Hello World",
    HelloWorld()
  );
};

bundlerReact.render(React.createElement(App));