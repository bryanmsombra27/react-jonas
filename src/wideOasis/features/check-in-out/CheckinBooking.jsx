import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/hooks/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "../bookings/hooks/useCheckin";
import useSettings from "../settings/hooks/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { booking = {}, isLoading } = useBooking()
  const { checkin, isCheckIn } = useCheckin()
  const { settings, isLoading: isLoadingSettings } = useSettings()
  // const booking = {};

  useEffect(() => {
    setConfirmedPaid(booking?.isPaid ?? false)
  }, [booking]);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {
    if (!confirmedPaid) return

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice
        }
      })

    } else {
      checkin({ bookingId, breakfast: {} })

    }
  }

  if (isLoading || isCheckIn) {
    return <Spinner />
  }
  const optionalBreakfastPrice = settings?.breakfastPrice * numNights * numGuests

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            check={addBreakfast}
            onChange={() => {
              setAddBreakfast(prevState => !prevState)
              // setConfirmedPaid((prev) => !prev)
              setConfirmedPaid(false)
              console.log(optionalBreakfastPrice)
            }}>Want to add breakfast for {formatCurrency(optionalBreakfastPrice)} ?</Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmedPaid || isCheckIn}
          onChange={() => setConfirmedPaid(confirm => !confirm)}
          id="confirm"
          disabled={confirmedPaid}
        >I confirm that {guests.fullName} has paid the total amount of {!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} +  ${formatCurrency(optionalBreakfastPrice)}) `} </Checkbox>
      </Box>

      <ButtonGroup>
        {confirmedPaid && (
          <Button disabled={!confirmedPaid || isCheckIn} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
