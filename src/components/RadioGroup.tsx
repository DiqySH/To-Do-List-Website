import { cn } from "../../lib/utils";

const RadioGroup = ({
  data,
  className,
  defaultChecked,
  ...props
}: {
  data: string[];
  className?: string;
  defaultChecked: string;
  DCArg?: boolean;
}) => {
  return (
    <div className={cn("", className)}>
      {data.map((i: string, idx: number) => {
        const bool = idx == 0;
        return (
          <label className="flex gap-2 cursor-pointer" key={idx}>
            <input
              type="radio"
              value={i}
              {...props}
              defaultChecked={defaultChecked === "auto" ? bool : false}
            />
            <span>{i}</span>
          </label>
        );
      })}
    </div>
  );
};

export default RadioGroup;
