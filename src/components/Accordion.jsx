import { useState } from "react";
import "./Accordion.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

const Accordion = () => {
  const [curOpen, setCurOpen] = useState(null);
  return (
    <>
      <div className="accordion">
        {faqs.map((item, index) => (
          <AccordionItem
            item={item}
            index={index}
            curOpen={curOpen}
            setIsOpen={setCurOpen}
          />
        ))}
      </div>
    </>
  );
};
const AccordionItem = ({ item, index, setIsOpen, curOpen }) => {
  const isOpen = index == curOpen;
  const handleClick = () => {
    // setIsOpen((prevState) => !prevState);
    setIsOpen(index);
  };
  return (
    <>
      <div
        className={`item ${isOpen && "open"} `}
        key={index}
        onClick={handleClick}
      >
        <p className="number">{index < 9 ? `0${index + 1}` : index + 1}</p>
        <p className="text">{item.title}</p>
        <p className="icon">{isOpen ? "-" : "+"}</p>
        {isOpen && <div className="content-box">{item.text}</div>}
      </div>
    </>
  );
};

export default Accordion;
