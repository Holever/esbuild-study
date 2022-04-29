// import Server from "react-dom/server"
import React from "react";
import { render } from "https://cdn.skypack.dev/react-dom";

let Greet = () => <h1>Hello, EsBuild</h1>

// console.log(Server.renderToString(<Greet></Greet>))

render(<Greet />, document.getElementById("root"));