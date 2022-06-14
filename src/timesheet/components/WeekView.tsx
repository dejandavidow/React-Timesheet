import React from "react";

const WeekView = React.memo(() => {
  console.log("Greeting Comp render");
  return <>
  <h1>Hi</h1>;
  <h2>Hello</h2>
  </>
});
export default WeekView