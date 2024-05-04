import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const { isCreating, createCabins } = useCreateCabin();
  const { isEditing, editCabins } = useEditCabin();

  const isEditSession = Boolean(editId);

  const isWorking = isCreating || isEditing;

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabins(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabins(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    console.error(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Cabin name is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
            min: {
              value: 1,
              message: "Minimum capacity is 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Regular price is required",
            min: {
              value: 1,
              message: "Minimum price is 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Discount is required",
            validate: (value) => {
              value <= getValues().regularPrice ||
                "Discount cannot be higher than regular price";
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Desciption for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Description is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Cabin photo is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create New cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
