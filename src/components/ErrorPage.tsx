function ErrorPage()
{
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <h1>Uh oh! This page does not exist.</h1>
      <a href="/">Back to home</a>
    </div>
  )
}

export default ErrorPage;
