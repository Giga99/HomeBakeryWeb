import cbCake from "../assets/cb-cake.png";
import cCake from "../assets/c-cake.png";
import vbCake from "../assets/vb-cake.png";
import bfCake from "../assets/bf-cake.png";
import ccM from "../assets/ccm.png";
import lgCake from "../assets/lg-cake.png";

let data = [
    {
        id: 1,
        name: "Chocolate Birthday Cake",
        description: "The best chocolate cake for the birthday.",
        price: 20.99,
        img: cbCake,
        url: "cb-cake",
        ingredients: [
            {value: "2 cups all-purpose flour"},
            {value: "2 cups granulated sugar"},
            {value: "3/4 cup unsweetened cocoa powder"},
            {value: "2 teaspoons baking soda"},
            {value: "1 teaspoon baking powder"},
            {value: "1 teaspoon salt"},
            {value: "1 cup buttermilk"},
            {value: "1 cup strong black coffee (hot)"},
            {value: "1/2 cup vegetable oil"},
            {value: "2 large eggs"},
            {value: "2 teaspoons vanilla extract"},
        ],
        comments: [
            {id: 1, user: "Korisnik1", text: "Good quality!", time: "7d"},
            {id: 2, user: "Jelena17", text: "Amazing!", time: "3h"},
            {id: 3, user: "Igor1234", text: "Very delicious cake!", time: "1h"},
        ],
    },
    {
        id: 2,
        name: "Vanilla Birthday Cake",
        description: "Vanilla cake for the birthday.",
        price: 18.99,
        img: vbCake,
        url: "vb-cake",
        ingredients: [
            {value: "2 cups all-purpose flour"},
            {value: "2 cups granulated sugar"},
            {value: "3/4 cup unsweetened cocoa powder"},
            {value: "2 teaspoons baking soda"},
            {value: "1 teaspoon baking powder"},
            {value: "1 teaspoon salt"},
            {value: "1 cup buttermilk"},
            {value: "1 cup strong black coffee (hot)"},
            {value: "1/2 cup vegetable oil"},
            {value: "2 large eggs"},
            {value: "2 teaspoons vanilla extract"},
        ],
        comments: [
            {id: 1, user: "Korisnik1", text: "Good quality!", time: "7d"},
            {id: 2, user: "Jelena17", text: "Amazing!", time: "3h"},
            {id: 3, user: "Igor1234", text: "Very delicious cake!", time: "1h"},
        ],
    },
    {
        id: 3,
        name: "Chantilly Cake",
        description: "Fluffy and sweat with berry cream filling",
        price: 18.99,
        img: cCake,
        url: "c-cake",
        ingredients: [
            {value: "2 cups all-purpose flour"},
            {value: "2 cups granulated sugar"},
            {value: "3/4 cup unsweetened cocoa powder"},
            {value: "2 teaspoons baking soda"},
            {value: "1 teaspoon baking powder"},
            {value: "1 teaspoon salt"},
            {value: "1 cup buttermilk"},
            {value: "1 cup strong black coffee (hot)"},
            {value: "1/2 cup vegetable oil"},
            {value: "2 large eggs"},
            {value: "2 teaspoons vanilla extract"},
        ],
        comments: [
            {id: 1, user: "Korisnik1", text: "Good quality!", time: "7d"},
            {id: 2, user: "Jelena17", text: "Amazing!", time: "3h"},
            {id: 3, user: "Igor1234", text: "Very delicious cake!", time: "1h"},
        ],
    },
    {
        id: 4,
        name: "Black Forest Cake",
        description: "Black forest cake with cream.",
        price: 18.99,
        img: bfCake,
        url: "bf-cake",
        ingredients: [
            {value: "2 cups all-purpose flour"},
            {value: "2 cups granulated sugar"},
            {value: "3/4 cup unsweetened cocoa powder"},
            {value: "2 teaspoons baking soda"},
            {value: "1 teaspoon baking powder"},
            {value: "1 teaspoon salt"},
            {value: "1 cup buttermilk"},
            {value: "1 cup strong black coffee (hot)"},
            {value: "1/2 cup vegetable oil"},
            {value: "2 large eggs"},
            {value: "2 teaspoons vanilla extract"},
        ],
        comments: [
            {id: 1, user: "Korisnik1", text: "Good quality!", time: "7d"},
            {id: 2, user: "Jelena17", text: "Amazing!", time: "3h"},
            {id: 3, user: "Igor1234", text: "Very delicious cake!", time: "1h"},
        ],
    },
    {
        id: 5,
        name: "Low Gluten Cake",
        description: "Low gluten cake for the birthday.",
        price: 18.99,
        img: lgCake,
        url: "lg-cake",
        ingredients: [
            {value: "2 cups all-purpose flour"},
            {value: "2 cups granulated sugar"},
            {value: "3/4 cup unsweetened cocoa powder"},
            {value: "2 teaspoons baking soda"},
            {value: "1 teaspoon baking powder"},
            {value: "1 teaspoon salt"},
            {value: "1 cup buttermilk"},
            {value: "1 cup strong black coffee (hot)"},
            {value: "1/2 cup vegetable oil"},
            {value: "2 large eggs"},
            {value: "2 teaspoons vanilla extract"},
        ],
        comments: [
            {id: 1, user: "Korisnik1", text: "Good quality!", time: "7d"},
            {id: 2, user: "Jelena17", text: "Amazing!", time: "3h"},
            {id: 3, user: "Igor1234", text: "Very delicious cake!", time: "1h"},
        ],
    },
    {
        id: 6,
        name: "Chocolate Cake Muffin",
        description: "Tasty chocolate chip muffin",
        price: 18.99,
        img: ccM,
        url: "ccm",
        ingredients: [
            {value: "2 cups all-purpose flour"},
            {value: "2 cups granulated sugar"},
            {value: "3/4 cup unsweetened cocoa powder"},
            {value: "2 teaspoons baking soda"},
            {value: "1 teaspoon baking powder"},
            {value: "1 teaspoon salt"},
            {value: "1 cup buttermilk"},
            {value: "1 cup strong black coffee (hot)"},
            {value: "1/2 cup vegetable oil"},
            {value: "2 large eggs"},
            {value: "2 teaspoons vanilla extract"},
        ],
        comments: [
            {id: 1, user: "Korisnik1", text: "Good quality!", time: "7d"},
            {id: 2, user: "Jelena17", text: "Amazing!", time: "3h"},
            {id: 3, user: "Igor1234", text: "Very delicious cake!", time: "1h"},
        ],
    },
];

export default data;
