

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";



function CreateCabinForm({ cabin }) {
  const queryClient = useQueryClient()
  const { register, handleSubmit, reset, getValues, formState } = useForm()
  const { errors } = formState
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabins,
    onSuccess: () => {
      toast.success("cabin successfully created")

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: (err) => {
      // alert(err.message)
      toast.error(err.message)

    }
  })

  const submit = async (dataForm) => {

    const data = mutate({ ...dataForm, image: dataForm.image[0] })
    reset()
    console.log(data)

  }
  const errorHandling = async (dataForm) => {

  }

  return (
    <Form onSubmit={handleSubmit(submit, errorHandling)}>
      <FormRow label="Cabin name" error={errors?.name?.message} >
        <Input type="text" id="name" disabled={isCreating}  {...register("name", {
          required: "this field is required"
        })} />

      </FormRow>

      <FormRow label="max capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isCreating}  {...register("maxCapacity", {
          required: "this field is required",
          min: {
            value: 1,
            message: "capacity should be at least 1"
          }
        })} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>

        <Input type="number" disabled={isCreating} id="regularPrice" {...register("regularPrice", {
          required: "this field is required",
          min: {
            value: 1,
            message: "capacity should be at least 1"
          }
        })} />

      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>

        <Input type="number" disabled={isCreating} id="discount" defaultValue={0} {...register("discount", {
          required: "this field is required",
          validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular price"

        })} />

      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" disabled={isCreating} id="description" defaultValue="" {...register("description", {
          required: "this field is required"
        })} />
      </FormRow>

      <FormRow label="Cabin photo">

        <FileInput id="image" accept="image/*" disabled={isCreating} type="file"
          {...register("image", {
            required: "this field is required",

          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isCreating} >
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
