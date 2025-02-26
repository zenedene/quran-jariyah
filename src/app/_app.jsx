// In your _app.js file
import "src/app/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="scroll-smooth">
      {" "}
      {/* Add here */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
