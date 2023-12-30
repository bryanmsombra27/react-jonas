import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmStays, cabinCount, numDays }) => {
    const numBookings = bookings.length;
    const totalSales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0)
    const checkins = confirmStays.length
    const occupation = confirmStays.reduce((acc, stay) => acc + stay.numNights, 0) / (numDays * cabinCount)
    return (
        <>
            <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={numBookings} />
            <Stat title="sales" color="green" icon={<HiOutlineBanknotes />} value={formatCurrency(totalSales)} />
            <Stat title="Check ins" color="indigo" icon={<HiOutlineCalendarDays />} value={checkins} />
            <Stat title="Occupancy rate" color="yellow" icon={<HiOutlineChartBar />} value={Math.round(occupation * 100) + "%"} />

        </>



    )

}

export default Stats;