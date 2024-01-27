import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import React, { useEffect, useState } from 'react';

const NewsWidget = () => {
  const [news, setNews] = useState(null);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  useEffect(() => {
    // Fetch news data from your API
    const fetchNews = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey={YOUR_API_KEY}');
        const data = await response.json();
        const shuffledArticles = shuffleArray(data.articles);
        setNews(shuffledArticles.slice(0, 3)); // Update the news state with the fetched data
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };
  

    fetchNews();
  }, []);

  return (
    <WidgetWrapper>
      <Typography color={palette.primary.main} variant="h4" fontWeight="500" pb="1rem">
        Latest News
      </Typography>
      {news && news.map((article, index) => (
        <div key={index}>
          <Typography textAlign="left" color={dark}>
            {article.title}
          </Typography>
          <hr color="#e1e3e1" style={{ margin: "1rem 0" }} />
        </div>
      ))}
    </WidgetWrapper>
  );
};

export default NewsWidget;
