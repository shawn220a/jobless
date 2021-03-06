import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import Spinner from '../../components/BlogComponents/Spinner/Spinner';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BlogHome = (props) => {
  useEffect(() => {
    const { onLoad } = props;

    axios('/api/articles').then((res) => {
      onLoad(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    const { onDelete } = props;

    return axios.delete(`/api/articles/${id}`).then(() => onDelete(id));
  };

  const handleEdit = (article) => {
    const { setEdit } = props;

    setEdit(article);
  };

  const { articles } = props;

  if (articles.length === 0) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div
        style={{ textAlign: 'center', display: 'initial' }}
        className='container'
      >
        <h1> Jobless Blog </h1>

        <a href='/blog/post'>
          <p>Create a post</p>
        </a>
      </div>

      <div className='row pt-5'>
        <div className='col-12 col-lg-6 offset-lg-3'>
          {articles.map((article) => {
            return (
              <div className='card my-3'>
                <div
                  style={{ fontWeight: 'bold', textAlign: 'center' }}
                  className='card-header'
                >
                  {article.title}
                </div>
                <div className='card-body'>
                  {article.body}
                  <p className='mt-5 text-muted'>
                    <b>{article.author}</b>{' '}
                    {moment(new Date(article.createdAt)).fromNow()}
                  </p>
                </div>
                <div className='card-footer'>
                  <div className='row'>
                    <button
                      onClick={() => handleEdit(article)}
                      className='btn btn-primary mx-3'
                    >
                      Edit
                    </button>
                    <button
                      style={{ marginLeft: '71.5%' }}
                      onClick={() => handleDelete(article._id)}
                      className='btn btn-danger'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  articles: state.bloghome.articles || [],
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (data) => dispatch({ type: 'HOME_PAGE_LOADED', data }),
  onDelete: (id) => dispatch({ type: 'DELETE_ARTICLE', id }),
  setEdit: (article) => dispatch({ type: 'SET_EDIT', article }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogHome);
