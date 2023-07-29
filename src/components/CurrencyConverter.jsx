import { useEffect, useState } from "react";

const CurrencyConverterApp = () => {
  const [form, setForm] = useState({
    value: null,
    selectedCurr: "",
    convertedCurr: "",
  });
  const [convertedValue, setConvertedValue] = useState(0);

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchCurrency = async () => {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${form.value}&from=${form.selectedCurr}&to=${form.convertedCurr}`,
        {
          signal: controller.signal,
        }
      );
      const data = await res.json();
      console.log(data);
      setConvertedValue(data?.rates[form.convertedCurr]);
    };

    fetchCurrency();

    return () => {
      controller.abort();
    };
  }, [form]);

  return (
    <>
      <div>
        <input
          type="text"
          name="value"
          value={form.value}
          onChange={handleInputChange}
        />
        <select
          name="selectedCurr"
          value={form.selectedCurr}
          onChange={handleInputChange}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
          name="convertedCurr"
          value={form.convertedCurr}
          onChange={handleInputChange}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <p>{convertedValue}</p>
      </div>
    </>
  );
};

export default CurrencyConverterApp;
