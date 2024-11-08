import MovieCard from "./MovieCard"

export default function MovieList() {
  return (
    <div className="px-12 mt-4 space-y-8">
        <div>
            <p className="text-black text-2xl font-semibold mb-4">
                Popular Shows
            </p>
            <div className="grid grid-cols gap-2">
                <MovieCard movie={undefined} lastElementRef={null} />
            </div>
        </div>
    </div>
  )
}
