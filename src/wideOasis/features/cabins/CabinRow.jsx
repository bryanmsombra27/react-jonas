import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./hooks/useDeleteCabin";
import { HiPencil, HiTrash, HiOutlineChartSquareBar } from "react-icons/hi"
import useCreateCabin from "./hooks/useCreateCabin";
import Modal from "../../ui/Modal-v2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;


const CabinRow = ({ cabin }) => {
  const { image, name, maxCapacity, regularPrice, discount, id, description } = cabin
  const { mutate, isDeliting } = useDeleteCabin()
  const { createCabin, isCreating } = useCreateCabin()

  const handleDelete = (id) => {
    mutate(id)
  }

  const handleDuplicate = () => {
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    })
  }

  return (
    <>
      <Table.Row>
        <Img src={image}></Img>
        <Cabin >{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)} </Discount>

        ) : <span>&mdash;</span>}

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>

                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>

                </Modal.Open>

                <Menus.Button
                  icon={<HiOutlineChartSquareBar />}
                  onClick={handleDuplicate}
                >Duplicate</Menus.Button>
              </Menus.List>
            </Menus.Menu>



            <Modal.Window name="edit">
              <CreateCabinForm cabin={cabin} />
            </Modal.Window>



            <Modal.Window name="delete">
              <ConfirmDelete resourceName="cabins" disabled={isDeliting}

                onConfirm={() => handleDelete(id)}
              />
            </Modal.Window>

          </Modal>

        </div>

      </Table.Row>


    </>


  )

}

export default CabinRow;