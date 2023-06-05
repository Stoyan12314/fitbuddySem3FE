// // import React, { createContext, useState, useEffect } from "react";
// // import api from "../apis/ExerciseService.js";

// // export const ExerciseContext = createContext();

// // export const ExerciseProvider = (props) => {
// //   const [exercises, setExercises] = useState(null);
// //   const [page, setPage] = useState(0);
// //   const [size, setSize] = useState(10);
// //   const [searchTerm, setSearchTerm] = useState("");

// //   const fetchExercises = async () => {
// //     api.getExercisesByName(searchTerm, page, size).then((response) => {
// //       setExercises(response.data.exercises);
// //     });
// //   };

// //   useEffect(() => {
// //     fetchExercises();
// //   }, [page, searchTerm, size]);

// //   const nextPage = () => setPage((prevPage) => prevPage + 1);
// //   const previousPage = () => setPage((prevPage) => prevPage - 1);
// //   const setSearch = (term) => setSearchTerm(term);

// //   return (
// //     <ExerciseContext.Provider
// //       value={{ exercises, fetchExercises, nextPage, previousPage, setSearch }}
// //     >
// //       {props.children}
// //     </ExerciseContext.Provider>
// //   );
// // };

// import React, { createContext, useState, useEffect } from "react";
// import api from "../apis/ExerciseService.js";

// export const ExerciseContext = createContext();

// export const ExerciseProvider = (props) => {
//   const [exercises, setExercises] = useState(null);
//   const [page, setPage] = useState(0);
//   const [size, setSize] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [totalPages, setTotalPages] = useState(0);

//   const fetchExercises = () => {
//     api
//       .getExercisesByName(searchTerm, page, size)
//       .then((response) => {
//         setExercises(response.data.exercises);
//         setTotalPages(response.data.totalPages);
//       })
//       .catch((error) => {
//         console.error("Error fetching exercises by name: ", error);
//         setExercises([]);
//       });
//   };

//   useEffect(() => {
//     fetchExercises();
//   }, [page, searchTerm, size]);

//   const nextPage = () => setPage((prevPage) => prevPage + 1);
//   const previousPage = () => setPage((prevPage) => prevPage - 1);
//   const setSearch = (term) => setSearchTerm(term);

//   return (
//     <ExerciseContext.Provider
//       value={{ exercises, fetchExercises, nextPage, previousPage, setSearch }}
//     >
//       {props.children}
//     </ExerciseContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";
import api from "../apis/ExerciseService.js";

export const ExerciseContext = createContext();

export const ExerciseProvider = (props) => {
  const [exercises, setExercises] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const fetchExercises = () => {
    api
      .getExercisesByName(searchTerm, page, size)
      .then((response) => {
        if (
          response.data &&
          Array.isArray(response.data.exercises) &&
          typeof response.data.totalPages === "number"
        ) {
          setExercises(response.data.exercises);
          setTotalPages(response.data.totalPages);
        } else {
          setExercises([]);
          setTotalPages(0);
        }
      })
      .catch((error) => {
        console.error("Error fetching exercises by name: ", error);
        setExercises([]);
        setTotalPages(0);
      });
  };

  useEffect(() => {
    fetchExercises();
  }, [page, searchTerm, size]);

  const nextPage = () => setPage((prevPage) => prevPage + 1);
  const previousPage = () => setPage((prevPage) => prevPage - 1);
  const setSearch = (term) => setSearchTerm(term);

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        fetchExercises,
        nextPage,
        previousPage,
        setSearch,
        setPage,
        page,
        totalPages,
      }}
    >
      {props.children}
    </ExerciseContext.Provider>
  );
};
