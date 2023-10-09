import { useState } from "react";
import Button from "../../ui/Button";
// import Modal from "../../ui/Modal";
import Modal from "../../ui/Modal-v2";
import CreateCabinForm from "./CreateCabinForm";

// const AddCabin = () => {
//     const [isOpenModal, setIsOpenModal] = useState(false);

//     const closeModal = () => {
//         setIsOpenModal(false)
//     }

//     return (

//         <>

//             <Button onClick={() => setIsOpenModal(prevSate => !prevSate)} >Add new cabin</Button>

//             {isOpenModal && <Modal onClose={closeModal}>
//                 <CreateCabinForm onCloseModal={closeModal} />
//             </Modal>}

//         </>
//     )

// }

const AddCabin = () => {

    return (

        <div>
            <Modal>
                <Modal.Open opens="cabin-form">
                    <Button>Add new cabin</Button>
                </Modal.Open>
                <Modal.Window name="cabin-form">
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>

        </div>
    )

}


export default AddCabin;