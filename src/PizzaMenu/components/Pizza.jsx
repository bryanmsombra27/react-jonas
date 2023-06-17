const Pizza = ({ data }) => {
  return (
    <>
      <div className="pizza">
        <img src={data.photoName} alt={data.name} />
        <div>
          <h3>{data.name}</h3>
          <p>{data.ingredients}</p>
          <span>{data.price}</span>
        </div>
      </div>
    </>
  );
};

export default Pizza;
