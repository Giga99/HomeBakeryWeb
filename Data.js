let users = [
    new ProfileInfo("Igor1234", "123", "Igor Stevanovic", "Street123", "+381621234567"),
    new ProfileInfo("User1", "123", "Test User", "Street456", "+381621234567"),
];

let blackForestCake = new Cake(
    "1",
    "Black Forest Cake",
    "Black forest cake with cream",
    "path/to/black_forest_cake_image", // TODO Replace with actual path to image
    50,
    "Indulge in a world where the aroma of freshly baked treats fills the air and every bite is a piece of heaven. Home Bakery is your go-to app for ordering mouth-watering cakes, cupcakes, and pastries right from the comfort of your home.",
    [
        "2 cups all-purpose flour",
        "2 cups granulated sugar",
        "3/4 cup unsweetened cocoa powder",
        "2 teaspoons baking soda",
        "1 teaspoon baking powder",
        "1 teaspoon salt",
        "1 cup buttermilk",
        "1 cup strong black coffee (hot)",
        "1/2 cup vegetable oil",
        "2 large eggs",
        "2 teaspoons vanilla extract"
    ],
    [
        new Comment(
            "Amazing!",
            "Jelena17",
            Date.now() // TODO .minus(3, HOURS)
        ),
        new Comment(
            "Good quality!",
            "User1",
            Date.now() // TODO .minus(7, DAYS)
        ),
        new Comment(
            "Good quality!",
            "User2",
            Date.now() // TODO .minus(15, DAYS)
        )
    ]
);

let cakes = [
    blackForestCake,
    new Cake(
        "5",
        "Low Gluten Cake",
        "Low gluten cake for the birthday",
        "path/to/black_forest_cake_image", // TODO Replace with actual path to image
        70,
        "Indulge in a world where the aroma of freshly baked treats fills the air and every bite is a piece of heaven. Home Bakery is your go-to app for ordering mouth-watering cakes, cupcakes, and pastries right from the comfort of your home.",
        [
            "2 cups all-purpose flour",
            "2 cups granulated sugar",
            "3/4 cup unsweetened cocoa powder",
            "2 teaspoons baking soda",
            "1 teaspoon baking powder",
            "1 teaspoon salt",
            "1 cup buttermilk",
            "1 cup strong black coffee (hot)",
            "1/2 cup vegetable oil",
            "2 large eggs",
            "2 teaspoons vanilla extract"
        ],
        [
            new Comment(
                "Amazing!",
                "Jelena17",
                Date.now() // TODO .minus(3, HOURS)
            ),
            new Comment(
                "Good quality!",
                "User1",
                Date.now() // TODO .minus(7, DAYS)
            ),
            new Comment(
                "Good quality!",
                "User2",
                Date.now() // TODO .minus(15, DAYS)
            ),
        ]
    ),
    new Cake(
        "6",
        "Chocolate Chip Muffin",
        "Tasty chocolate chip muffin",
        "path/to/black_forest_cake_image", // TODO Replace with actual path to image
        50,
        "Indulge in a world where the aroma of freshly baked treats fills the air and every bite is a piece of heaven. Home Bakery is your go-to app for ordering mouth-watering cakes, cupcakes, and pastries right from the comfort of your home.",
        [
            "2 cups all-purpose flour",
            "2 cups granulated sugar",
            "3/4 cup unsweetened cocoa powder",
            "2 teaspoons baking soda",
            "1 teaspoon baking powder",
            "1 teaspoon salt",
            "1 cup buttermilk",
            "1 cup strong black coffee (hot)",
            "1/2 cup vegetable oil",
            "2 large eggs",
            "2 teaspoons vanilla extract"
        ],
        [
            new Comment(
                "Amazing!",
                "Jelena17",
                Date.now() // TODO .minus(3, HOURS)
            ),
            new Comment(
                "Good quality!",
                "User1",
                Date.now() // TODO .minus(7, DAYS)
            ),
            new Comment(
                "Good quality!",
                "User2",
                Date.now() // TODO .minus(15, DAYS)
            ),
        ]
    ),
    new Cake(
        "2",
        "Chocolate Birthday Cake",
        "The best chocolate cake for the birthday",
        "path/to/black_forest_cake_image", // TODO Replace with actual path to image
        85,
        "Indulge in a world where the aroma of freshly baked treats fills the air and every bite is a piece of heaven. Home Bakery is your go-to app for ordering mouth-watering cakes, cupcakes, and pastries right from the comfort of your home.",
        [
            "2 cups all-purpose flour",
            "2 cups granulated sugar",
            "3/4 cup unsweetened cocoa powder",
            "2 teaspoons baking soda",
            "1 teaspoon baking powder",
            "1 teaspoon salt",
            "1 cup buttermilk",
            "1 cup strong black coffee (hot)",
            "1/2 cup vegetable oil",
            "2 large eggs",
            "2 teaspoons vanilla extract"
        ],
        [
            new Comment(
                "Amazing!",
                "Jelena17",
                Date.now() // TODO .minus(3, HOURS)
            ),
            new Comment(
                "Good quality!",
                "User1",
                Date.now() // TODO .minus(7, DAYS)
            ),
            new Comment(
                "Good quality!",
                "User2",
                Date.now() // TODO .minus(15, DAYS)
            ),
        ]
    ),
    new Cake(
        "3",
        "Vanilla Birthday Cake",
        "Vanilla cake for the birthday",
        "path/to/black_forest_cake_image", // TODO Replace with actual path to image
        55,
        "Indulge in a world where the aroma of freshly baked treats fills the air and every bite is a piece of heaven. Home Bakery is your go-to app for ordering mouth-watering cakes, cupcakes, and pastries right from the comfort of your home.",
        [
            "2 cups all-purpose flour",
            "2 cups granulated sugar",
            "3/4 cup unsweetened cocoa powder",
            "2 teaspoons baking soda",
            "1 teaspoon baking powder",
            "1 teaspoon salt",
            "1 cup buttermilk",
            "1 cup strong black coffee (hot)",
            "1/2 cup vegetable oil",
            "2 large eggs",
            "2 teaspoons vanilla extract"
        ],
        [
            new Comment(
                "Amazing!",
                "Jelena17",
                Date.now() // TODO .minus(3, HOURS)
            ),
            new Comment(
                "Good quality!",
                "User1",
                Date.now() // TODO .minus(7, DAYS)
            ),
            new Comment(
                "Good quality!",
                "User2",
                Date.now() // TODO .minus(15, DAYS)
            ),
        ]
    ),
    new Cake(
        "4",
        "Chantilly Cake",
        "Fluffy and sweat cake with berry cream filling",
        "path/to/black_forest_cake_image", // TODO Replace with actual path to image
        50,
        "Indulge in a world where the aroma of freshly baked treats fills the air and every bite is a piece of heaven. Home Bakery is your go-to app for ordering mouth-watering cakes, cupcakes, and pastries right from the comfort of your home.",
        [
            "2 cups all-purpose flour",
            "2 cups granulated sugar",
            "3/4 cup unsweetened cocoa powder",
            "2 teaspoons baking soda",
            "1 teaspoon baking powder",
            "1 teaspoon salt",
            "1 cup buttermilk",
            "1 cup strong black coffee (hot)",
            "1/2 cup vegetable oil",
            "2 large eggs",
            "2 teaspoons vanilla extract"
        ],
        [
            new Comment(
                "Amazing!",
                "Jelena17",
                Date.now() // TODO .minus(3, HOURS)
            ),
            new Comment(
                "Good quality!",
                "User1",
                Date.now() // TODO .minus(7, DAYS)
            ),
            new Comment(
                "Good quality!",
                "User2",
                Date.now() // TODO .minus(15, DAYS)
            ),
        ]
    )
];

let promotions = cakes.filter(cake =>
    cake.id === "2" || cake.id === "3" || cake.id === "4"
)

let notifications = [
    new Notification("12345", true),
    new Notification("67890", false),
    new Notification("14523", false),
    new Notification("28943", true),
];

let homeBakeryInfo = new HomeBakeryInfo(
    "Home Bakery",
    "Street 456",
    "+381621234567",
    "Indulge in a world where the aroma of freshly baked treats fills the air and every bite is a piece of heaven. Home Bakery is your go-to app for ordering mouth-watering cakes, cupcakes, and pastries right from the comfort of your home.",
)
