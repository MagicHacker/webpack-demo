import _ from "lodash";
import "./style.css";
import printMe from "./print.js";
function component() {
  var element = document.createElement("div");
  var btn = document.createElement("button");
  element.innerHTML = _.join(["Hello ", "Webpack"], " ");
  element.classList.add("hello");
  btn.innerHTML = "Click me and check the console!";
  btn.onclick = printMe;
  element.appendChild(btn);
  return element;
}
document.body.appendChild(component());
