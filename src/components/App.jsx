import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./Modal/Modal";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ServiseRequest } from "servise/ServiseRequest";
import css from './Section/Section.module.css'
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";


export class App extends Component {

  state = {
    array: [],
    searchQuery: '',
    page: 1,
    imageSrc: '',
    showModal: false,
    showBtn: false,
    isEmpty: false,
    isLoader: false,
   
  };

  handleFormSubmit = (searchQuery) => {
    this.setState({
      searchQuery,
      array: [],
      page: 1,
      per_page: 20,
      showModal: false,
      showBtn: false,
      isEmpty: false,
    })
  };
  onHandelClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }))
  };

  handelFillModal = (i, largeImageURL) => {
    // const item =  this.state.array.filter(item => i === item.id);
    this.setState({imageSrc: largeImageURL})
  };

  componentDidUpdate(_, prevState) {

    if (prevState.searchQuery !== this.state.searchQuery || prevState.page !== this.state.page) {
      const { searchQuery, page } = this.state
      this.setState({isLoader: true})
      ServiseRequest(searchQuery, page)
        .then((res) => res.json())
        .then((array) => {
          const { hits, totalHits } = array
          if (hits.length === 0) {
            this.setState({ isEmpty: true })
            return
          }
          this.setState(prevState => ({
            array: [...prevState.array, ...hits],
            showBtn: this.state.page < Math.ceil(totalHits / 20),
          }));
        })
        .catch()
        .finally(()=>{
          this.setState({isLoader: false})
        })
    };
  };
  render() {
    const { array, showBtn, showModal, isEmpty, imageSrc, isLoader} = this.state;

    return (
      <div>
         <Searchbar onSubmit={this.handleFormSubmit} />
        <section className={css.section}>
          {showModal && <Modal closeModal={this.toggleModal}>
            <img src={imageSrc} alt='' />
          </Modal>
          }
         
          {isLoader && <Loader/>}
          {isEmpty && <p>There is no images...</p>}
          {array && <ImageGallery array={array} openModal={this.toggleModal} handelFillModal={this.handelFillModal}/>}
          {showBtn && <Button text={'Load more'} onHandelClick={this.onHandelClick} />}
        </section>
      </div>
    );

  }
};
