import { useState, useEffect } from "react";
import "./App.css";
import TextExpander from "./assets/utils/TextExpander";
import Button from "./components/Button";
import Header from "./components/Header";

function App() {
  const [news, setNews] = useState([]);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    async function getAPI() {
      const key = "ENih9eDN948LbnogKhIOWaAWAI4ernkzAsnfc1y5";

      const fetchNewsForDate = async (date) => {
        try {
          const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`
          );

          if (!response.ok) {
            throw new Error("Error in fetching data...");
          }
          const data = await response.json();

          return {
            image: data.url,
            title: data.title,
            description: data.explanation,
            date: data.date,
          };
        } catch (error) {
          console.error("There was a problem with fetching data...", error);
          return null;
        }
      };

      const today = new Date();
      const newsPromises = [];

      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const formattedDate = date.toISOString().split("T")[0];
        newsPromises.push(fetchNewsForDate(formattedDate));
      }

      const newsResults = await Promise.all(newsPromises);

      setNews((prevNews) => {
        const existingTitles = new Set(prevNews.map((item) => item.title));

        const newNewsItems = newsResults.filter(
          (item) => item !== null && !existingTitles.has(item.title)
        );

        const updatedNews = [...prevNews, ...newNewsItems];

        if (updatedNews.length > 30) {
          updatedNews.splice(0, updatedNews.length - 30);
        }

        return updatedNews;
      });
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
      <NewsList news={news} openModal={openModal} />
      {modalData && <Modal data={modalData} onClose={closeModal} />}
    </>
  );
}

function NewsList({ news, openModal }) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="news-list">
      {news.map((item, index) =>
        item.date === today ? (
          <div key={index} className="today-news">
            <Trending data={item} onReadMore={() => openModal(item)} />
          </div>
        ) : (
          <Trending
            key={index}
            data={item}
            onReadMore={() => openModal(item)}
          />
        )
      )}
    </div>
  );
}

function Trending({ data, onReadMore, className }) {
  if (!data) return null;

  const formattedDate = new Date(data.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className={`trending-container ${className}`}>
      {" "}
      <p className="trending-p">{formattedDate}</p>
      <div className="trending-container2">
        <div className="image-container">
          {data.media_type === "video" ? (
            <iframe
              className="trending-video"
              title={data.title}
              src={data.url}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img className="trending-image" src={data.image} alt={data.title} />
          )}
          <div className="title-overlay">
            <h2>{data.title}</h2>
          </div>
          <TextExpander numberOfText={30}>{data.description}</TextExpander>
          <button className="read-more" onClick={onReadMore}>
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal Component
function Modal({ data, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{data.title}</h2>
        <p className="modal-date">{new Date(data.date).toLocaleDateString()}</p>
        <img className="modal-image" src={data.image} alt={data.title} />
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

//git try
export default App;
