import Pizza from "./Pizza";

const Menu = ({ data }) => {
  return (
    <>
      <main className="menu">
        <h2>Our Menu</h2>
        {data.map((item, index) => (
          <Pizza data={item} key={index} />
        ))}
      </main>
    </>
  );
};

export default Menu;
