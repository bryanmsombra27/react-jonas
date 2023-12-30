import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import useCabins from "../cabins/hooks/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { isLoading, bookings } = useRecentBookings()
  const { isLoading: isLoadingStays, stays, confirmStays, numDays } = useRecentStays()
  const { isLoading: isloadingCabins, cabins } = useCabins()


  if (isLoading || isLoadingStays || isloadingCabins) {
    return <Spinner />
  }

  return (

    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmStays={confirmStays} cabinCount={cabins.length} numDays={numDays} />
    </StyledDashboardLayout>
  )

}

export default DashboardLayout;