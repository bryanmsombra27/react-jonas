import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

const AddCabin = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const closeModal = () => {
        setIsOpenModal(false)
    }

    return (

        <>

            <Button onClick={() => setIsOpenModal(prevSate => !prevSate)} >Add new cabin</Button>

            {isOpenModal && <Modal onClose={closeModal}>
                <CreateCabinForm onCloseModal={closeModal} />
            </Modal>}

        </>
    )

}

export default AddCabin;