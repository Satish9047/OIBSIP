# 🍕 Pizza Delivery App

Welcome to the **Pizza Delivery App**! This project is a full-stack web application designed to streamline online pizza ordering and delivery. Users can browse a menu, customize pizzas, and place orders. This app is built using modern web development tools and follows best practices for a smooth user experience.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Browse Menu**: Users can view a variety of popular pizzas in the user dashboard.
- **Customization**: Customize pizza base, toppings, cheese, sauce, and extras.
- **User Authentication**: Secure login and signup functionality for tracking past orders.
- **Admin Panel**: Manage menu items, view orders, and update order statuses. Includes inventory management and the ability to mark orders as delivered.

---

## Technologies

- **Frontend**: React, Redux Toolkit, Zod, React Hook Form, ShadCN UI
- **Backend**: Node.js, Express (for handling server-side operations)
- **Database**: MongoDB (to store user data, orders, and menu items)
- **Authentication**: JSON Web Tokens (JWT) for secure user authentication

---


## Installation
### Clone the repository:
    
        git clone https://github.com/yourusername/pizza-delivery-app.git
        cd pizza-delivery-app
        
### Install dependencies:
#### client
    
        cd client
        pnpm install
    
#### Server
    
        cd server
        pnpm install
    
create .env file in the root of the server folder.
copy all the .env.example properties and add your .end values
    
    
### To Run in Development Mode
#### Start the server:
    
        cd server
        pnpm dev
#### Start the client:

        cd ..
        cd client
        pnpm dev
The Pizza Delivery App will start locally, allowing you to explore its features.

---

## Usage
   Run the application:
   Explore features: Sign up or log in to place an order. Admin users can manage menu items and track orders.

---

## Contributing
   Contributions are welcome! If you have suggestions or improvements, please fork the repository and make a pull request.
    
###Fork the project.
    Create a new branch (git checkout -b feature/YourFeature).
    Commit your changes (git commit -m 'Add some feature').
    Push to the branch (git push origin feature/YourFeature).
    Open a pull request.

---
   
## License
   Distributed under the MIT License. See LICENSE for more information.

---

Happy Ordering!

This README should help get you started on documenting your project! If you have specific features or configurations, you can expand the sections accordingly.
