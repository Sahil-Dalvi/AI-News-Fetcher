import React,{useEffect,useState} from 'react';
import alanBtn  from '@alan-ai/alan-sdk-web';
import NewsCards  from './components/NewsCards/NewsCards';
import useStyles from "./styles"
import image from "/Users/Sahil dalvi/voice_assistant_alan/src/img.jpeg"
import wordsToNumbers from 'words-to-numbers';

const App=()=>{

    const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();
    // const alanKey= 'd4c3964f231ed8da159fc011528a06f42e956eca572e1d8b807a3e2338fdd0dc/stage';
    useEffect(() => {
        alanBtn({
          key: 'd4c3964f231ed8da159fc011528a06f42e956eca572e1d8b807a3e2338fdd0dc/stage',
          onCommand: ({ command, articles, number }) => {
            if (command === 'newHeadlines') { 
              setNewsArticles(articles);
              setActiveArticle(-1);
            } else if (command === 'instructions') {
              setIsOpen(true);
            } else if (command === 'highlight') {
              setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
            } else if (command === 'open') {
              const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
              const article = articles[parsedNumber - 1];
    
              if (parsedNumber > articles.length) {
                alanBtn().playText('Please try that again...');
              } else if (article) {
                window.open(article.url, '_blank');
                alanBtn().playText('Opening...');
              } else {
                alanBtn().playText('Please try that again...');
              }
            }
          },
        });
      }, []);

    return(
            <div>
                <div className={classes.logoContainer}>
                <img src={image} className={classes.alanLogo} alt="logo" />

                </div>
                <NewsCards articles={newsArticles} />
            </div>


    )
}


export default App;