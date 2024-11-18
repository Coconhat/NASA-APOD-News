import Trending from "./Trending";

export default function NewsList({ news, openModal, isTodayLoading }) {
  const today = new Date().toISOString().split("T")[0];

  // Get today's news
  const todayNews = news.find((item) => item.date === today);

  // Get top 3 news items (excluding today's)
  const topNews = news.filter((item) => item.date !== today).slice(0, 3);

  // Get previous news (excluding today's and top 3)
  const previousNews = news.filter((item) => item.date !== today).slice(3, 12);

  return (
    <>
      <div className="news-list">
        <div className="today-news">
          {isTodayLoading ? (
            <div className="today-loading-message">
              <h2 className="gradient-heading">
                Today's Astronomy Picture of the Day
              </h2>
              <p className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 text-slate-900 hover:text-slate-100 before:hover:bg-slate-800 ">
                <p className="relative skew-y-3">
                  Today's picture is not yet available. Please check back later!
                </p>
              </p>
            </div>
          ) : todayNews ? (
            <Trending
              data={todayNews}
              onReadMore={() => openModal(todayNews)}
            />
          ) : (
            <div className="today-loading-message text-white text-lg">
              <h2 className="font-semibold">
                {["Today's", "Astronomy", "Picture", "of", "the", "Day"].map(
                  (word, idx) => (
                    <span
                      key={idx}
                      className="hover:animate-color-word transition-colors duration-500"
                    >
                      {word}{" "}
                    </span>
                  )
                )}
              </h2>
              <p>
                {[
                  "Today's",
                  "picture",
                  "will",
                  "be",
                  "available",
                  "soon.",
                  "In",
                  "the",
                  "meantime,",
                  "enjoy",
                  "our",
                  "previous",
                  "selections!",
                ].map((word, idx) => (
                  <span
                    key={idx}
                    className="hover:animate-color-word transition-colors duration-500"
                  >
                    {word}{" "}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>

        <div className="top-news-section">
          {topNews.map((item, index) => (
            <div key={index} className="top-news-item">
              <Trending data={item} onReadMore={() => openModal(item)} />
            </div>
          ))}
        </div>

        <div className="previous-news-grid">
          {previousNews.map((item, index) => (
            <Trending
              key={index}
              data={item}
              onReadMore={() => openModal(item)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
