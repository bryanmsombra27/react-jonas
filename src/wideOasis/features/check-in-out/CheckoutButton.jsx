import Button from "../../ui/Button";
import useCheckout from "../bookings/hooks/useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckout } = useCheckout()

  return (
    <Button variation="primary" size="small" onClick={() => checkout(bookingId)} disabled={isCheckout}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
