import "./App.css";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./components/Input";
import { useEffect, useState } from "react";
import RadioGroup from "./components/RadioGroup";
import Badge from "./components/Badge";
import Button from "./components/Button";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import EditButton from "./components/EditButton";

const radioGroupValue = ["To do", "In Progress", "Done"];

type Inputs = {
  title: string;
  description: string;
  type: string;
};

function App() {
  const [todos, setTodos] = useState<Inputs[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? (JSON.parse(saved) as Inputs[]) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setTodos([...todos, data]);
    resetField("title");
    resetField("description");
  };

  const handleDelete = (idx: number) => {
    const filtered = todos.filter((_, i) => i !== idx)
    setTodos(filtered)
  }

  return (
    <main>
      <section className="w-full min-h-screen gird place-items-center text-[14px] pb-8 pt-16 px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[400px] w-full flex flex-col gap-3"
        >
          <Input
            label="Title"
            className="px-2 py-1 border-black/50 border-2 border-solid rounded-[0.25rem] focus:outline-1 outline-black focus:border-black w-full"
            {...register("title", { required: "Title is required" })}
            type="text"
            error={errors.title ? errors.title.message : ""}
          />
          <Input
            label="Description"
            className="px-2 py-1 border-black/50 border-2 border-solid rounded-[0.25rem] focus:outline-1 outline-black focus:border-black"
            {...register("description", {
              required: "Description is required",
            })}
            type="text"
            error={errors.description ? errors.description.message : ""}
          />
          <RadioGroup
            className="flex gap-4 justify-center"
            data={radioGroupValue}
            defaultChecked="auto"
            {...register("type", { required: true })}
          />
          <input
            type="submit"
            className="text-[14px] hover:bg-black bg-black/88 px-2 py-1.75 text-white w-full rounded-[0.25rem] cursor-pointer"
          />
        </form>
        <div className="flex flex-col max-w-[400px] w-full mt-4 gap-3">
          {todos.map(
            (
              i: { title: string; description: string; type: string },
              idx: number
            ) => {
              return (
                <div
                  className="flex flex-col px-4 py-2   border-black border-1 border-solid text-black hover:translate-y-[-3px] hover:translate-x-[-3px] hover:shadow-[3px_3px_0px_0px_#000000]"
                  key={idx}
                  style={{
                    transition: "all ease-in-out 250ms",
                  }}
                >
                  <p className="text-[15px] font-medium">{i.title}</p>
                  <p className="opacity-75">{i.description}</p>
                  <div className="flex justify-between w-full mt-4">
                    <div className="flex gap-2">
                      <EditButton
                        onSubmitEdit={(data) => {
                          const updated = [...todos];
                          updated[idx] = data;
                          setTodos(updated)
                        }}
                        defaultValueData={i}
                        icon={<MdOutlineModeEdit />}
                        className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 inset-ring inset-ring-yellow-600/20 gap-1 cursor-pointer"
                      >
                        Edit
                      </EditButton>
                      <Button
                        icon={<FiTrash2 />}
                        className="gap-1 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 inset-ring inset-ring-red-600/10 cursor-pointer"
                        onClick={() => handleDelete(idx)}
                      >
                        Delete
                      </Button>
                    </div>
                    <Badge>{i.type}</Badge>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
