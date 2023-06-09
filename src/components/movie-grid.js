import MovieItem from './movie-item';

function MovieGrid({ movies, col, type }) {
  const colGridStyles = {
    4: 'grid-cols-4 gap-x-5',
    5: 'grid-cols-5 gap-x-6',
  };

  return (
    <div className={`grid ${colGridStyles[col] ?? ''} gap-y-8`}>
      {movies.map((movie) => <MovieItem key={movie.title} type={type} {...movie} />)}
    </div>
  );
}

MovieGrid.defaultProps = {
  col: 5,
};

export default MovieGrid;
