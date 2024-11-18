import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import NewsList from "./components/NewsList";
import ErrorMessage from "./components/ErrorMessage";

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
