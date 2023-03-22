import React from 'react';

const Pagination = ({ cardPerPages, totalCards, paginate,isAsctive }) => {
  
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalCards / cardPerPages); i++) {
    pageNumbers.push(i)
  }

  const clickNumberPage = (number) => {
    paginate(number)
  }

  const constPaginationButtons = () => {
    return pageNumbers.map(number => {
      if (number == isAsctive) {
        return (
          <div className='page_item active' onClick={() => {clickNumberPage(number);}} key={number}>
            <div className='page_item_target' >{number}</div>
          </div>
        )
      } else {
        return (
          <div className='page_item' onClick={() => {clickNumberPage(number);}} key={number}>
            <div className='number' >{number}</div>
          </div>
        )
      }
    })
  }
  return (
    <div className='pages'>
      {constPaginationButtons()}
    </div>
  );
};

export default Pagination;