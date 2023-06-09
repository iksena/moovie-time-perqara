import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { LIBRARY_GENRES, LIBRARY_TYPE, getImage } from '@/lib/tmdb';
import { formatYear } from '@/lib/utils';

function ViewButton({ children, href }) {
  return (
    <Link
      href={href}
      className="rounded-large px-4 py-2 text-neutral-200 font-semibold z-10 bg-moovie-red focus:bg-black/20 hover:bg-black/20"
    >
      {children}
    </Link>
  );
}

function PosterHover({
  vote_average,
  genre,
  id,
  type = LIBRARY_TYPE.MOVIE,
}) {
  return (
    <div className="absolute inset-0 flex flex-col justify-around items-center bg-black/80">
      <div className="flex flex-row">
        <Image
          src="/star.svg"
          alt="star"
          width={24}
          height={24}
          priority
        />
        <span className="text-neutral-200 font-semibold text-2xl ml-2">{vote_average}</span>
      </div>
      <span className="text-neutral-200 font-semibold text-lg">{genre}</span>
      <ViewButton href={`/library/${type}/${id}`}>VIEW</ViewButton>
    </div>
  );
}

function MovieItem(props) {
  const {
    poster_path, vote_average, title, release_date, genre_ids, name, first_air_date,
  } = props;
  const [hover, setHover] = useState(false);
  const genre = Object.values(LIBRARY_GENRES).find(
    (item) => genre_ids.includes(item.movieId) || genre_ids.includes(item.tvId),
  )?.name ?? '';

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-col z-10">
        <div className="relative">
          <Image
            src={getImage(poster_path)}
            alt={`Poster image of ${title}`}
            placeholder="blur"
            blurDataURL="/poster.png"
            className="object-cover overflow-hidden w-80"
            width={220}
            height={330}
          />
          <span className="absolute top-0 right-0 bg-neutral-800/80 text-neutral-200 font-bold p-1">
            {vote_average}
          </span>
          {hover && <PosterHover {...props} genre={genre} />}
        </div>
        <div className="flex flex-col whitespace-pre-wrap break-words">
          <span className="text-base text-neutral-200 font-semibold mt-3">{title ?? name}</span>
          <span className="text-sm text-moovie-subtitle font-normal mt-1">{formatYear((release_date || first_air_date) || 0)}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieItem;
