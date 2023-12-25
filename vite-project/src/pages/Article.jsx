import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import articlecontent from './article-content';

// components
import AddCommentForm from '../components/AddCommentform';
import Articles from '../components/Articles';
import CommentList from '../components/commentlist';
// pages
import Notfound from './notfound';
const Article = () => {
  const {name} = useParams();
  const article = articlecontent.find((article) => article.name === name)
  const [articleInfo , setarticleInfo] = useState({ comments: []})
  useEffect(() => {
    const fetchData = async () =>{
      const result = await fetch(`http://localhost:8000/api/articles/${name}`)
      console.log(result);
      const body = await result.json()
      console.log(body);
      setarticleInfo(body);
      };
      fetchData();
    
  }, [name]);
  
  if(!article) return <Notfound/>
  const otherArticles = articlecontent.filter(article => article.name !== name)
  return (
    <>
      <h1 className='sm:text-4ml text-2xl font-bold my-6 text-gray-900'>
        {article.title}
      </h1>
      {article.content.map((paragraph, index) => (<p className='mx-auto leading-relaxed text-base mb-4' key={index}>{paragraph}</p>))}
      <CommentList comments={articleInfo.comments}/>
      <AddCommentForm articleName={name} setArticleInfo={setarticleInfo} />
      <h1 className='sm:text-2xl text-xl font-bold my-4 text-gray-900'>Other articles
      </h1>
      <div className='flex flex-wrap -m-4'>
      <Articles articles={otherArticles}/>
      </div>
    </>
  )
}

export default Article
