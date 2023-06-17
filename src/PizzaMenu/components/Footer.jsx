const Footer = () => {
  const hour = new Date().getHours();
  const openHours = 12;
  const closeHours = 22;
  const isOpen = hour >= openHours && hour <= closeHours;

  return (
    <>
      <footer className="footer">
        {isOpen && (
          <div className="order">
            <p>
              we are open until {closeHours}:00. Come and visit us or order
              online.
            </p>
            <button className="btn">order</button>
          </div>
        )}
      </footer>
    </>
  );
};

export default Footer;
