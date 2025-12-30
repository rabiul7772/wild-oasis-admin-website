import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import useUpdateSettings from './useUpdateSettings';
import useSettings from './useSettings';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
  const { settings = {}, isPending } = useSettings(); // initially settings empty that's why default value settings = {}

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestPerBooking,
    breakfastPrice
  } = settings;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const { isUpdating, updateSettings } = useUpdateSettings(reset);

  function onSubmit(settingsData) {
    updateSettings(settingsData);
  }

  function onError(errors) {
    // console.log(errors);
  }

  if (isPending) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label="Minimum nights/booking"
        error={errors?.minBookingLength?.message}
      >
        <Input
          type="number"
          id="minBookingLength"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          {...register('minBookingLength', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Minimum night should be at least 1'
            }
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum nights/booking"
        error={errors?.maxBookingLength?.message}
      >
        <Input
          type="number"
          id="maxBookingLength"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          {...register('maxBookingLength', {
            required: 'This field is required',
            max: {
              value: 10,
              message: 'Maximum night should be less than or equal to 10'
            }
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum guests/booking"
        error={errors?.maxGuestPerBooking?.message}
      >
        <Input
          type="number"
          id="maxGuestPerBooking"
          disabled={isUpdating}
          defaultValue={maxGuestPerBooking}
          {...register('maxGuestPerBooking', {
            required: 'This field is required',
            max: {
              value: 14,
              message: 'Maximum guests should be less than or equal to 14'
            }
          })}
        />
      </FormRow>

      <FormRow label="Breakfast price" error={errors?.breakfastPrice?.message}>
        <Input
          type="number"
          id="breakfastPrice"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          {...register('breakfastPrice', {
            required: 'This field is required'
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isUpdating}
          variation="secondary"
          size="medium"
          type="reset"
        >
          Reset
        </Button>
        <Button disabled={isUpdating} variation="primary" size="medium">
          Submit settings
        </Button>
      </FormRow>

      {/* <FormRow label="Minimum nights/booking">
        <Input type="number" id="min-nights" />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input type="number" id="max-nights" />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input type="number" id="max-guests" />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input type="number" id="breakfast-price" />
      </FormRow> */}
    </Form>
  );
}

export default UpdateSettingsForm;
