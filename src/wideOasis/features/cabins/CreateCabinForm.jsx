

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./hooks/useCreateCabin";
import useEditCabin from "./hooks/useEditCabin";



function CreateCabinForm({ cabin = {}, onCloseModal }) {

  const { id: editId, ...editValues } = cabin
  const isEdit = Boolean(editId)

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit ? editValues : {}
  })
  const { errors } = formState
  const { createCabin, isCreating } = useCreateCabin()
  const { editCabin, isEditing } = useEditCabin()

  const isWorking = isCreating || isEditing

  const submit = async (dataForm) => {
    const image = typeof dataForm.image === "string" ? dataForm.image : dataForm.image[0]

    if (isEdit) {
      editCabin({ cabin: { ...dataForm, image }, id: editId })
    } else {
      createCabin({ ...dataForm, image })

    }
    reset()
    onCloseModal?.()
  }
  const errorHandling = async (dataForm) => {

  }

  return (
    <Form onSubmit={handleSubmit(submit, errorHandling)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message} >
        <Input type="text" id="name" disabled={isWorking}  {...register("name", {
          required: "this field is required"
        })} />

      </FormRow>

      <FormRow label="max capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isWorking}  {...register("maxCapacity", {
          required: "this field is required",
          min: {
            value: 1,
            message: "capacity should be at least 1"
          }
        })} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>

        <Input type="number" disabled={isWorking} id="regularPrice" {...register("regularPrice", {
          required: "this field is required",
          min: {
            value: 1,
            message: "capacity should be at least 1"
          }
        })} />

      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>

        <Input type="number" disabled={isWorking} id="discount" defaultValue={0} {...register("discount", {
          required: "this field is required",
          validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular price"

        })} />

      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" disabled={isWorking} id="description" defaultValue="" {...register("description", {
          required: "this field is required"
        })} />
      </FormRow>

      <FormRow label="Cabin photo">

        <FileInput id="image" accept="image/*" disabled={isWorking} type="file"
          {...register("image", {
            required: isEdit ? false : "this field is required",

          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isWorking} onClick={() => onCloseModal?.()}   >
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEdit ? "Edit" : "Create new"} cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
