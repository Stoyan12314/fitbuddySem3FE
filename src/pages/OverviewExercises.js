// import React, { useEffect, useState, useContext } from "react";
// import ExercisesList from "./ExercisesList";
// import { ExerciseContext } from "../context/ExerciseContext";

// function ExercisesPage() {
//   const { exercises, fetchExercises, nextPage, previousPage, setSearch } =
//     useContext(ExerciseContext);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [size, setSize] = useState(10);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     setSearch(searchTerm);
//     setPage(0);
//   }, [searchTerm, setSearch]);

//   useEffect(() => {
//     fetchExercises();
//   }, [page, size]);

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleNextPage = () => {
//     if (page < totalPages - 1) {
//       setPage(page + 1);
//     }
//   };
//   const handlePrevPage = () => {
//     if (page > 0) {
//       setPage(page - 1);
//     }
//   };
//   const handlePageClick = (pageNumber) => {
//     setPage(pageNumber);
//   };
//   const pages = Array.from(Array(totalPages).keys());

//   if (!exercises) return <div>No exercises</div>;

//   return (
//     <div style={{ marginTop: "5rem" }}>
//       <input
//         id="search"
//         type="text"
//         value={searchTerm}
//         onChange={handleInputChange}
//         required
//       />

//       <ExercisesList exercises={exercises} />

//       <div>
//         <button onClick={handlePrevPage} disabled={page === 0}>
//           Previous Page
//         </button>
//         {pages.map((pageNumber) => (
//           <button
//             key={pageNumber}
//             disabled={pageNumber === page}
//             onClick={() => handlePageClick(pageNumber)}
//           >
//             {pageNumber + 1}
//           </button>
//         ))}
//         <button onClick={handleNextPage} disabled={page === totalPages - 1}>
//           Next Page
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ExercisesPage;

import React, { useEffect, useContext } from "react";
import ExercisesList from "./ExercisesList";
import { ExerciseContext } from "../context/ExerciseContext";
import styles from "./OverviewCss.module.css";
function ExercisesPage() {
  const {
    exercises,
    fetchExercises,
    nextPage,
    previousPage,
    setPage,
    setSearch,
    totalPages,
    page,
  } = useContext(ExerciseContext);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const pages = Array.from(Array(totalPages).keys());

  if (!exercises) return <div>No exercises</div>;

  return (
    <div style={{ marginTop: "5rem" }}>
      <input id="search" type="text" onChange={handleInputChange} required />

      <ExercisesList exercises={exercises} />

      <div className={styles.pagination}>
        <button
          className={styles.button}
          onClick={previousPage}
          disabled={page === 0}
        >
          &lt;
        </button>
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            disabled={pageNumber === page}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button
          className={styles.button}
          onClick={nextPage}
          disabled={page === totalPages - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default ExercisesPage;
