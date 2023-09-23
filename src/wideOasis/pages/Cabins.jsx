import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [form, setForm] = useState(false);



  return (

    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter and sort</p>
      </Row>
      <Row>
        <CabinTable />

        <Button onClick={() => setForm(prevSate => !prevSate)} >Add new cabin</Button>

        {form && <CreateCabinForm />}

      </Row>
    </>

  );
}

export default Cabins;
