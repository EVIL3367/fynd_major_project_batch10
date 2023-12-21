import React from 'react';
import { useParams } from 'react-router-dom';
import articlecontent from './article-content';

// components
import Articles from '../components/Articles';
const Article = () => {
  const {name} = useParams();
  const article = articlecontent.find((article) => article.name === name)
  if(!article) return <h1>Article is not present</h1>
  const otherArticles = articlecontent.filter(article => article.name !== name)
  return (
    <>
      <h1 className='sm:text-4ml text-2xl font-bold my-6 text-gray-900'>
        {article.title}
      </h1>
      {article.content.map((paragraph, index) => (<p className='mx-auto leading-relaxed text-base mb-4' key={index}>{paragraph}</p>))}
      <h1 className='sm:text-2xl text-xl font-bold my-4 text-gray-900'>Other articles
      </h1>
      <div className='flex flex-wrap -m-4'>
      <Articles articles={otherArticles}/>
      </div>
    </>
  )
}

export default Article
