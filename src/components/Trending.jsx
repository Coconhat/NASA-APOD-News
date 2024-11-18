export default function Trending({ data, onReadMore }) {
  if (!data) return null;

  const formattedDate = new Date(data.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="trending-container">
      <div className="image-container">
        {data.media_type === "video" ? (
          <iframe
            className="trending-video"
            title={data.title}
            src={data.image}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img className="trending-image" src={data.image} alt={data.title} />
        )}
        <p className="trending-p">{formattedDate}</p>
        <div className="title-overlay" onClick={onReadMore}>
          <h2 className="title-title">{data.title}</h2>
        </div>
      </div>
    </div>
  );
}
