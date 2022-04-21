const ErrorMessages = (props) => {
    const {children} = props
    return (
      <div style={{ margin: "5px 0 2px 0", color: "crimson" }}>{children}</div>
    );
  };
  export default ErrorMessages;