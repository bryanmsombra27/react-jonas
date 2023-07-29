import "./Loader.css";

const Loader = () => {
  return (
    <>
      <div
        class="lds-ring"
        style={{
          margin: "5rem auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default Loader;
