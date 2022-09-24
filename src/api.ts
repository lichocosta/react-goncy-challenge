import type { Note } from "./types";

const api = {
  notes: {
    list: (): Note[] => {
      try {
        return JSON.parse(localStorage.getItem("todos") || "[]");
      } catch (error) {
        return [];
      }
    },
    set: (notes: Note[]) => {
      localStorage.setItem("todos", JSON.stringify(notes))
    }
  },
};

// const api = {
//   notes: {
//     list: (): Note[] => [
//       {
//         id: "nota",
//         title: "Practice React",
//         lastEdited: "07/09/2022",
//         archived: false,
//         content: "More and more and more",
//         categories: ["random"],
//       },
//       {
//         id: "nota2",
//         title: "Practice Cypress",
//         lastEdited: "07/09/2022",
//         archived: false,
//         content: "More and more and more",
//         categories: ["random"],
//       },
//     ],
//   },
// };

export default api;
