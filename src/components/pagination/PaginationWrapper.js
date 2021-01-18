import React from "react";


export const PaginationWrapper = ({
															 children,
															 currentPage,
															 totalPage,
															 onPrevClick,
															 onNextClick,
															 handleFirstPage,
															 handleLastPage
													 }) => {


		const handleNextClick = () => {
				if (currentPage + 1 <= totalPage) {
						onNextClick && onNextClick(currentPage + 1)
				}
		}
		const handlePrevClick = () => {
				if (currentPage - 1 > 0) {
						onPrevClick && onPrevClick(currentPage - 1)
				}
		}
		const handleFirstPageClick = () => {
				handleFirstPage && handleFirstPage(1)
		}
		const handleLastPageClick = () => {
				handleLastPage && handleLastPage(totalPage)
		}
		return (
				<div>
						<div>
								<button disabled={currentPage - 1 === 0} onClick={handleFirstPageClick}>first page</button>
								<button disabled={currentPage - 1 === 0} onClick={handlePrevClick}>prev page</button>
								<span>{currentPage} of {totalPage}</span>
								<button disabled={currentPage + 1 > totalPage} onClick={handleNextClick}>next page</button>
								<button disabled={currentPage + 1 > totalPage} onClick={handleLastPageClick}>last page</button>
						</div>
						{children}
				</div>
		)
}
