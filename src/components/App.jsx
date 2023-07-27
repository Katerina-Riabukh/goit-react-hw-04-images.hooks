
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./Modal/Modal";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ServiseRequest } from "servise/ServiseRequest";
import css from './Section/Section.module.css'
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { useState, useEffect } from "react";


export const App = () => {

  const [array, setArray] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [imageSrc, setImageSrs] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [isLoader, setIsLoader] = useState(false)


  const handleFormSubmit = (searchQuery) => {
    setSearchQuery(searchQuery)

    setArray([])
    setPage(1)
    setShowModal(false)
    setIsEmpty(false)
    setShowBtn(false)
  };

  const onHandelClick = () => {
    setPage(prev => page + 1);

    // const item = document
    //   .querySelector(".galleryItem")
    // // .firstElementChild.getBoundingClientRect();
    // console.log(item);

    // window.scrollBy({
    //   top: item * 2,
    //   behavior: "smooth",
    // });
  };

  const toggleModal = () => {
    setShowModal(!showModal)
  };

  const handelFillModal = (i, largeImageURL) => {
    setImageSrs(largeImageURL)
  };

  useEffect(() => {
    if (searchQuery === '') {
      return
    }
    setIsLoader(true)
    ServiseRequest(searchQuery, page)
      .then((data) => data.json())
      .then((array) => {
        const { hits, totalHits } = array
        if (hits.length === 0) {
          setIsEmpty(true)
          return
        }
        setArray(prev => [...prev, ...hits])
        setShowBtn(page < Math.ceil(totalHits / 20))
      })
      .catch()
      .finally(() => {
        setIsLoader(false)
      })
  }, [page, searchQuery]);

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <section className={css.section}>
        {showModal && <Modal closeModal={toggleModal} imageSrc={imageSrc} />}
        {isLoader && <Loader />}
        {isEmpty && <p>There is no images...</p>}
        {array && <ImageGallery array={array} openModal={toggleModal} handelFillModal={handelFillModal} />}
        {showBtn && <Button text={'Load more'} onHandelClick={onHandelClick} />}
      </section>
    </div>
  );

}
