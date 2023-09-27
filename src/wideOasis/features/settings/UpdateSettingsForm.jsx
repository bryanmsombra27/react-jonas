import { updateSetting } from '../../services/apiSettings';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useSettings from './hooks/useSettings';
import useUpdateSettings from './hooks/useUpdateSettings';

function UpdateSettingsForm() {
  const { isLoading, settings = {} } = useSettings()
  const { editSetting, isUpdating } = useUpdateSettings()
  const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings

  if (isLoading) {
    return <Spinner />
  }

  const handleUpdate = async (e, name) => {
    const { value } = e.target
    if (!value) {
      return
    }

    editSetting({
      [name]: value
    })

  }



  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minBookingLength} onBlur={(e) => handleUpdate(e, "minBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
