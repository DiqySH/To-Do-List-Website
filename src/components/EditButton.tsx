import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Input from "./Input";
import RadioGroup from "./RadioGroup";
import { SubmitHandler, useForm } from "react-hook-form";
import { ReactNode, useState } from "react";
import { cn } from "../lib/utils";
import ErrorMessage from "./ErrorMessage";

const radioGroupValue = ["To do", "In Progress", "Done"];

type Inputs = {
  title: string;
  description: string;
  type: string;
};

const EditButton = ({
  icon,
  children,
  className,
  onClick,
  defaultValueData,
  onSubmitEdit,
  ...props
}: {
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  defaultValueData: { title: string; description: string; type: string };
  onSubmitEdit: (data: Inputs) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (onSubmitEdit) {
      onSubmitEdit(data);
      setIsOpen(false);
    }
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <button
          className={cn("flex items-center justify-center", className)}
          type="button"
          {...props}
          onClick={() => setIsOpen(true)}
        >
          {icon}
          <span>{children}</span>
        </button>
      </DialogTrigger>

      <DialogContent className="text-[14px] bg-white !max-w-[300px] w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <DialogHeader>
            <DialogTitle>
              <p className="text-[15px]">Edit</p>
            </DialogTitle>
          </DialogHeader>

          <Input
            label="Title"
            className="px-2 py-1 border-black/50 border-2 border-solid rounded-[0.25rem] focus:outline-1 outline-black focus:border-black w-full"
            {...register("title", { required: "Title is required" })}
            type="text"
            error={errors.title ? errors.title.message : ""}
            defaultValue={defaultValueData?.title}
          />
          <Input
            label="Description"
            className="px-2 py-1 border-black/50 border-2 border-solid rounded-[0.25rem] focus:outline-1 outline-black focus:border-black"
            {...register("description", {
              required: "Description is required",
            })}
            type="text"
            error={errors.description ? errors.description.message : ""}
            defaultValue={defaultValueData?.description}
          />
          <div className="flex flex-col">
            <RadioGroup
              className="flex gap-4 justify-center"
              defaultChecked=""
              data={radioGroupValue}
              {...register("type", { required: "Type is required" })}
            />
            <ErrorMessage>
              {errors.type ? errors.type.message : ""}
            </ErrorMessage>
          </div>
          <DialogFooter>
            <div className="flex w-full mt-2">
              <DialogClose asChild className="flex-1/2">
                <button type="button">Close</button>
              </DialogClose>
              <input
                type="submit"
                onClick={onClick}
                className="text-[14px] flex-1/2 hover:bg-black bg-black/88 px-2 py-1.75 text-white w-full rounded-[0.25rem] cursor-pointer"
              />
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditButton;
