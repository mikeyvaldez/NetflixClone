
export default function PlansPage() {
  return (
    <div className="flex items-center h-screen justify-center">
        <div className="w-[600px]">
            <h1 className="font-semibold text-3xl">Choose a plan that works for you</h1>
            <div className="flex mt-4">
                <div className="h-[350px] w-full pointer mr-3">

                    <div className="rounded bg-gradient-to-r from-cyan-500 to-blue-500 w-full p-3 text-white font-bold">
                        <h3 className="text-2xl">
                            Basic
                        </h3>
                        <p className="font-light">$5.00</p>
                    </div>

                    <div className="border-b py-4 flex text-reg items-center">
                        <div className="w-6 h-6 rounded-full text-sm bg-cyan-500 flex items-center justify-center">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
