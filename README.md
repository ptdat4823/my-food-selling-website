# My Food Selling Website

### A Comprehensive Solution for Online Food Ordering

Welcome to My Food Selling Website! This project is a robust online food ordering system designed to streamline the operations of food businesses. With an intuitive dashboard, efficient inventory and order management for administrators, and a user-friendly interface for customers, our platform ensures a seamless food ordering experience.

### Features

- **Admin Dashboard:** Gain insights and manage your business efficiently with a comprehensive dashboard.
- **Inventory Management:** Keep track of your stock levels and ensure you never run out of essential ingredients.
- **Order Management:** Easily handle orders from customers, track their status, and manage deliveries.
- **User Home Page:** Provide your customers with a welcoming and easy-to-navigate home page.
- **Cart Functionality**: Allow users to add their favorite foods to a cart and proceed to checkout seamlessly.
- **Order History:** Enable users to view their past orders and reorder with ease.
- **Favorite Foods:** Let customers save their favorite dishes for quick access in the future.

### Installation

To get started with My Food Selling Website, follow these simple steps:

**1. Clone the Repository:**

```bash
git clone https://github.com/ptdat4823/my-food-selling-website.git
```

**2. Frontend Setup (NextJS):**

- _Navigate to the Project Directory:_

```bash
cd my-food-selling-website
```

- _Copy the `env.sample` file to `.env` file_

```bash
cp env.sample .env
```

- _Install dependencies for nextjs:_

```bash
npm install
```

- _Start the development server NextJS:_

```bash
npm run dev
```

**3. Backend Setup with Docker:**

- _Download Docker Desktop at [here](https://www.docker.com/products/docker-desktop/)._

- _Install Docker Image via terminal_

```bash
docker pull ptdat4823/freshmart-spring
```

- _Run docker by terminal_

```bash
docker run -p 8080:8080 ptdat4823/freshmart-spring
```

**4. Access the Website:**

Open your browser and go to http://localhost:3000 to experience the website.

## Additional Notes

- Ensure that Docker is running before attempting to start the backend server.
- The backend server will be accessible at http://localhost:8080. Make sure this port is not in use by another service.
- For production deployment, further configuration may be required to ensure security and scalability.

## Contribution

We welcome contributions to improve My Food Selling Website. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Submit a pull request with a description of your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Support

If you have any questions or need support, please open an issue in the repository or contact us at phamtiendat@gmail.com

Thank you for using My Food Selling Website!
