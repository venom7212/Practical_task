import React, { useState, useEffect } from 'react';
import Card from "./Card";
import Pagination from './Pagination';
import search from '../resources/search.png'
import minus from '../resources/minus.png'
import grey_minus from '../resources/grey_minus.png'
import plus from '../resources/plus.png'
import grey_plus from '../resources/grey_plus.png'
import './MainPage.css';

const MainPage = () => {
    const [cards, setCards] = useState([])
    const searchValueFromStorage = localStorage.getItem("searchValue");
    const [searchValue, setSearchValue] = useState(searchValueFromStorage == null ? "" : searchValueFromStorage);
    const cardsData = JSON.parse(localStorage.getItem("data"))
    const [currentPages, setCurrentPages] = useState()
    const [cardPerPages, setCardPerPage] = useState(10)
    const lastCardIndex = currentPages * cardPerPages
    const firstCardIndex = lastCardIndex - cardPerPages
    const currentCard = cardsData?.slice(firstCardIndex, lastCardIndex)
    const totalCards = cardsData?.length
    const pagesCount = Math.ceil(totalCards / cardPerPages)
    
    const getRepositories = async (searchValue) => {
        localStorage.setItem("searchValue", searchValue)
        const url = `https://api.github.com/search/repositories${searchValue ? `?q=${searchValue}` : ''}`;
        const response = await fetch(url);
        if (response.status == 200) {
            return response.json();
        } else {
            return null
        }
    }

    const deleteCard = (id) => {
        const newCardsList = cardsData.filter(item => {
            return item.owner.id !== id
        });
        
        setCards(newCardsList);
        localStorage.setItem("data", JSON.stringify(newCardsList));
      }

    const onSearchClick = async () => {
        const result = await getRepositories(searchValue);
        if (result) {
            setCards(result.items);
            localStorage.setItem("searchValue", searchValue);
            localStorage.setItem("data", JSON.stringify(result.items));
        } else {
            localStorage.removeItem("searchValue");
            localStorage.removeItem("data");
        }
    }

    const inputHandler = (e) => {
        const value = e.currentTarget.value
        setSearchValue(value)
    }

    const getCards = () => {
        return currentCard?.map((item, index) => {
            return <Card
                cardData={item}
                key={index}
                onclick={deleteCard}
            />
        });
    }

    const paginate = pageNumber => {
        setCurrentPages(pageNumber)
        localStorage.setItem("pageNumber", pageNumber)
    }

    const nextPage = () => {
        setCurrentPages(currentPages + 1)
    }
    const prevPage = () => {
        setCurrentPages(currentPages - 1)
    }

    useEffect(() => {
        if (cards) {
            setCards(JSON.parse(localStorage.getItem("data")));
        }
    }, [searchValue]);

    useEffect(() => {
        if (!currentPages) {
            const pageFromStorage = localStorage.getItem("pageNumber");
            setCurrentPages(pageFromStorage ? parseInt(pageFromStorage) : 1);
        }
    }, []);

    useEffect(() => {
        if (currentPages) {
            localStorage.setItem("pageNumber", currentPages);
        }
    }, [currentPages]);

    return (
        <div className='MainPage'>
            <div className='header'>
                <input
                    className='search_input'
                    value={searchValue}
                    placeholder='Начните вводить текст для поиска (не менее трех символов)'
                    onChange={(e) => (inputHandler(e))}
                >
                </input>
                <div className='search_div'>
                    <img className='search_img' onClick={() => { onSearchClick(); setCurrentPages(1) }} src={search} alt='img'></img>
                </div>
            </div>
            <div className='body'>
                <div className='cards'>
                    {cards?.length > 0 ? getCards() : <p>Проекты отсутствуют</p>}
                </div>
            </div>
            {cards?.length > 0 ?
                <div className='count_div'>
                    <div className='dropdown'>
                        <button className='dropbtn' onClick={() => { setCardPerPage(10); setCurrentPages(1) }}>10 ▼</button>
                        <div className="dropdown-content">
                            <button className="dropbtn" onClick={() => { setCardPerPage(25); setCurrentPages(1) }}>25</button>
                            <button className="dropbtn" onClick={() => { setCardPerPage(50); setCurrentPages(1) }}>50</button>
                        </div>
                    </div>
                    <div className='count_menu'>
                        <button className='minus_count' onClick={() => prevPage()} disabled={currentPages === 1}>
                            <img className='minus_img' src={currentPages === 1 ? grey_minus : minus} alt="minus" />

                        </button>
                        {cardsData?.length ? <Pagination
                            cardPerPages={cardPerPages}
                            totalCards={totalCards}
                            paginate={paginate}
                            isAsctive={currentPages}
                        /> : null}
                        <button className='plus_count' onClick={() => nextPage()} disabled={currentPages === pagesCount}>
                            <img className='plus_img' src={currentPages === pagesCount ? grey_plus : plus} alt="plus" />
                        </button>
                    </div>
                </div>
                : null}
        </div>
    )
}

export default MainPage


