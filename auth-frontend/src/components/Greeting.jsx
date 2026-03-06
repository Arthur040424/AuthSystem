function Greeting(props) {
  // JavaScript variables can be injected into JSX using curly braces {}
  return (
    <div style={{ padding: "10px", border: "1px solid black", margin: "a0ppx" }}>
      <h2>Hello there, {props.name}!</h2>
    </div>
  );
}

export default Greeting;