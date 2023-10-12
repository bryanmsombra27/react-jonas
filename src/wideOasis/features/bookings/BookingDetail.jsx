import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./hooks/useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import useCheckout from "./hooks/useCheckout";
import Modal from "../../ui/Modal-v2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./hooks/useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  // const booking = {};
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { booking = {}, isLoading } = useBooking()
  const { isDeliting, mutate } = useDeleteBooking()
  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)} >Check In</Button>
        )}

        {status === "checked-in" && (
          <Button icon={<HiArrowUpOnSquare />} onClick={() => { useCheckout(bookingId) }} >Check Out</Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>

          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete resourceName="booking" onConfirm={() => mutate(bookingId, {
              onSettled: () => navigate(-1)
            })} />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>


      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
