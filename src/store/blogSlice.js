import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogs: [
    {
      id: 1,
      title: 'Sport',
      content: `Le sport joue un rôle essentiel dans la vie quotidienne. Il permet non seulement de maintenir une bonne santé physique, mais aussi de développer des valeurs importantes comme la discipline, le respect et l'esprit d'équipe. Que ce soit à travers des sports individuels comme la natation ou le cyclisme, ou des sports collectifs comme le football et le basketball, l'activité physique aide à réduire le stress et à améliorer le bien-être mental. De plus, le sport rassemble les gens, crée des liens sociaux et peut même devenir un véritable vecteur d'intégration culturelle et sociale.`,
      comments: [],  // Initialized comments
    },
    {
      id: 2,
      title: 'Programmation',
      content: `La programmation est l'art d'écrire des instructions pour qu'un ordinateur exécute des tâches spécifiques. Elle permet de créer des logiciels, des sites web, des applications mobiles et bien plus encore. En apprenant des langages comme **Python**, **JavaScript** ou **C++**, les développeurs peuvent résoudre des problèmes, automatiser des processus et innover dans de nombreux domaines. La programmation développe aussi la logique, la créativité et la pensée critique. Aujourd'hui, c'est une compétence essentielle dans un monde de plus en plus numérique, où la technologie est au cœur de presque toutes les industries.`,
      comments: [],  // Initialized comments
    },
    {
      id: 3,
      title: 'React',
      content: `React est une bibliothèque JavaScript développée par Facebook pour construire des interfaces utilisateur (UI), en particulier des applications web rapides et interactives.

Caractéristiques principales :
Composants : Tu crées des petits blocs de code réutilisables appelés composants pour construire l'interface.
JSX : Une syntaxe qui combine HTML et JavaScript pour décrire l’interface.
Virtual DOM : Optimise les performances en mettant à jour uniquement les parties modifiées de l’interface.
Unidirectional Data Flow : Les données circulent dans un seul sens, ce qui rend l'application plus prévisible.`,
      comments: [],  // Initialized comments
    },
    {
      id: 4,
      title: 'Redux',
      content: `Redux est une bibliothèque de gestion d'état pour les applications JavaScript. Il est souvent utilisé avec React pour gérer l’état global de l’application (comme les données des utilisateurs, les paramètres, etc.).

Pourquoi Redux ?
Quand ton app devient complexe, gérer l’état avec seulement React peut être difficile. Redux centralise tous les états dans un store global, ce qui facilite la gestion et le suivi des données.

Concepts clés :
Store : Un objet centralisé qui contient l'état global de l'application.
Actions : Des objets décrivant ce qui s'est passé (ex: un utilisateur a cliqué sur un bouton).
Reducers : Des fonctions qui prennent l'état actuel et une action pour retourner un nouvel état.
`,
      comments: [],  // Initialized comments
    },
    // Add more blogs here...
  ],
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },
    updateBlog: (state, action) => {
      const index = state.blogs.findIndex((blog) => blog.id === action.payload.id);
      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
    },
    toggleReaction: (state, action) => {
      const { id, type } = action.payload; // type = 'like', 'dislike', 'love'
      const blog = state.blogs.find((blog) => blog.id === id);
      if (blog) {
        if (type === 'like') blog.likes = (blog.likes || 0) + 1;
        if (type === 'dislike') blog.dislikes = (blog.dislikes || 0) + 1;
        if (type === 'love') blog.loveCount = (blog.loveCount || 0) + 1;
      }
    },
    addComment: (state, action) => {
      const { id, comment } = action.payload;
      const blog = state.blogs.find((blog) => blog.id === id);
      if (blog) {
        if (!blog.comments) {
          blog.comments = [];  
        }
        blog.comments.push(comment);
      }
    },
    addBlog: (state, action) => {
      state.blogs.push({
        ...action.payload,
        comments: action.payload.comments || [], 
      });
    },
    clearBlogs: (state) => {
      state.blogs = [];
    },
  },
});

export const {
  deleteBlog,
  updateBlog,
  toggleReaction,
  addComment,
  addBlog,
  clearBlogs,
} = blogSlice.actions;

export default blogSlice.reducer;
