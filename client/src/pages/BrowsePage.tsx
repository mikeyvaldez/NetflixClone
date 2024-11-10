import Billboard from "../components/Billboard"
import NavBar from "../components/NavBar"
import MovieList from "../components/MovieList"
import useMoviesList from "../hooks/useMoviesList";

export default function BrowsePage() {

  const {data, loading, error} = useMoviesList();

  console.log({ data, loading, error });

  return (
    <div>
        <NavBar />
        <Billboard />
        <div className="pb-5">
            <MovieList />
        </div>
    </div>
  )
}
