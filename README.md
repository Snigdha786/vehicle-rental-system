This project provides a user-friendly form for collecting essential information required for vehicle rentals using Node.js, React.js, and MySQL.

Project Setup

1. Create a .env File

Before running the project, create a .env file in the root directory and add the following configurations:

PORT=5000
DB_HOST=localhost
DB_NAME=vehicles
DB_USER=your_user
DB_PASSWORD=your_password

Replace your_user and your_password with your actual database credentials.

2. Install Dependencies

Run the following command to install all required dependencies:

npm install

3. Run Database Migrations & Seeders

Execute the following commands to set up the database:

npm run seq:mig   # Run migrations
npm run seq:seed  # Seed initial data

4. Start the Backend Server

To start the backend server, run:

nodemon index.js  # If using Nodemon
# OR
node index.js     # Run without Nodemon

5. Start the Frontend Server

Navigate to the frontend directory, install dependencies, and start the development server:

npm install
npm run dev

Now, your Vehicle Rental System should be up and running!