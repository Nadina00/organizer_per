//import axios from "axios";
import { useEffect } from "react";
//import * as cheerio from 'cheerio';
import css from "./News.module.css";
import { useDispatch, useSelector } from "react-redux";
import newsOperations from "../../redux/news/news-operations";
import { selectisLoaderNews, selectNews } from "../../redux/news/news-select";

export const News = () => {
  
  const newsList = useSelector(selectNews)
  const isLoader = useSelector(selectisLoaderNews)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(newsOperations.newsList());
  }, [dispatch]);

  if (!newsList && !isLoader) {
    return <p>Новостей нет.</p>;
  }

 
  return (
    <div className={css.news_container}>
      <h2>Latest news:</h2>
      <ul className={css.news_list}>
        {!newsList ? (
          <p>No news</p>
        ) : (
            newsList.map((newsItem) => (
            <li key={newsItem.id} className={css.news_item}>
              <h3>{newsItem.webTitle}</h3>
              <p>{newsItem.description}</p>
              <a
                href={newsItem.webUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
