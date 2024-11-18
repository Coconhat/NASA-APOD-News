import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

function App() {
  const [news, setNews] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isTodayLoading, setIsTodayLoading] = useState(true);

  useEffect(() => {
    async function getAPI() {
      setIsLoading(true);
      const key = "ENih9eDN948LbnogKhIOWaAWAI4ernkzAsnfc1y5";

      const fetchNewsForDate = async (date) => {
        const cachedData = localStorage.getItem(`nasa_apod_${date}`);
        if (cachedData) {
          return JSON.parse(cachedData);
        }

        try {
          const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`
          );

          if (!response.ok) {
            if (response.status === 404) {
              return null; // Return null for not yet available dates
            }
            throw new Error("Error in fetching data...");
          }
          const data = await response.json();

          const processedData = {
            image: data.url,
            title: data.title,
            description: data.explanation,
            date: data.date,
            media_type: data.media_type,
          };

          // Store data in localStorage
          localStorage.setItem(
            `nasa_apod_${date}`,
            JSON.stringify(processedData)
          );

          return processedData;
        } catch (error) {
          console.error("There was a problem with fetching data...", error);
          if (error.message.includes("404")) {
            return null; 
          }
          setError(error.message);
          return null;
        }
      };

      const today = new Date();
      const newsPromises = [];

      const todayFormatted = today.toISOString().split("T")[0];
      const todayData = await fetchNewsForDate(todayFormatted);
      setIsTodayLoading(false);

      for (let i = 1; i <= 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const formattedDate = date.toISOString().split("T")[0];
        newsPromises.push(fetchNewsForDate(formattedDate));
      }

      const previousNewsResults = await Promise.all(newsPromises);

      setNews((prevNews) => {
        const existingTitles = new Set(prevNews.map((item) => item.title));

        const allResults = todayData
          ? [todayData, ...previousNewsResults]
          : previousNewsResults;

        const newNewsItems = allResults.filter(
          (item) => item !== null && !existingTitles.has(item.title)
        );

        const updatedNews = [...prevNews, ...newNewsItems];

        if (updatedNews.length > 30) {
          updatedNews.splice(30);
        }

        return updatedNews;
      });
      setIsLoading(false);
    }

    getAPI();
  }, []);

  const openModal = (item) => {
    setModalData(item);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <>
      <Header />

      {isLoading && <Loader />}

      {!isLoading && !error && (
        <NewsList
          news={news}
          openModal={openModal}
          isTodayLoading={isTodayLoading}
        />
      )}
      {error && <ErrorMessage message={error} />}
      {modalData && <Modal data={modalData} onClose={closeModal} />}

      <Footer />
    </>
  );
}

function ErrorMessage({ message }) {
  return <p className="error-message">{message}</p>;
}

function NewsList({ news, openModal, isTodayLoading }) {
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

function Trending({ data, onReadMore }) {
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

function Modal({ data, onClose }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{data.title}</h2>
        <p className="modal-date">{new Date(data.date).toLocaleDateString()}</p>

        <img
          className={`modal-image ${isFullScreen ? "full-screen" : ""}`}
          src={data.image}
          alt={data.title}
          onClick={toggleFullScreen}
        />

        <div className="modal-description">
          <p>{data.description}</p>
        </div>

        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default App;
