type Props = {
  isLoading: boolean;
  isActive: boolean;
  name: string;
}
export default function Tab({ isLoading, isActive, name }: Props) {
  return (
    <>
      {isLoading ? (
        <button className="relative inline-flex h-12 w-full overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center px-4 rounded-lg bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {name}
          </span>
        </button>
      ) : (
        <>
          {isActive ? (
            <button className="p-[1.5px] relative w-full">
              {/* Outer border */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />

              {/* Inner content */}
              <div
                className="
                relative
                px-4 py-3
                rounded-lg
                flex items-center justify-start
                w-full
                text-left
                text-sm
                font-medium
                text-white
                bg-gradient-to-r from-indigo-500 to-purple-500
              "
              >
                {name}
              </div>
            </button>
          ) : (
            <>
              {/* <button className="p-[1.5px] relative w-full cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[10px]" />

                <div
                  className="
                    relative
                    px-4 py-3
                    bg-black
                    rounded-[10px]
                    group
                    transition duration-200
                    text-white
                    hover:bg-transparent
                    flex items-center justify-start
                    w-full
                    text-left
                    text-sm
                  "
                >
                  {name}
                </div>
              </button> */}
              <div className="group hover:bg-gradient-to-r from-indigo-500 to-purple-500 p-[1.5px] rounded-lg">
                <div className="bg-[#2c2c2c] text-sm rounded-md p-3 cursor-pointer group-hover:bg-slate-950">{name}</div>
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}
