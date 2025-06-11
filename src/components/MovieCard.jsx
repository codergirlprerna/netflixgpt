import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  const IMG_CDN = "https://image.tmdb.org/t/p/w500"; // use proper size

  return (
    <div style={{ width: "200px", flexShrink: 0 }}>
      <img
        src={IMG_CDN_URL + posterPath}
        alt="movie poster"
        style={{ width: "100%", borderRadius: "8px" }}
      />
    </div>
  );
};

export default MovieCard;