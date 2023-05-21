import { FC } from "react"

type DaySelectItemProps = {
  day: string
  onClick: (...params: any[]) => any
  badges?: number
  className?: string
}

const DaySelectItem: FC<DaySelectItemProps> = ({ day, className, onClick, badges }) => {
  return (
    <button
      type="button"
      onClick={() => {
        onClick()
      }}
      className={`relative aspect-square rounded-xl bg-neutral-100 text-black w-8 h-8 grid place-items-center transition duration-200 ${
        className ?? ""
      }`}
    >
      {badges && (
        <div className="absolute -top-1.5 -right-1.5 bg-red-500 rounded-full p-0.5 w-3.5 h-3.5 grid place-items-center aspect-square">
          <p className="font-semibold text-[0.55rem] leading-[0px] text-white">
            {badges < 10 ? badges : "9+"}
          </p>
        </div>
      )}

      <p className="text-base font-bold">{day}</p>
    </button>
  )
}

export default DaySelectItem
