const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('./models/employee');

dotenv.config();


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


const employees = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    department: 'Engineering',
    position: 'Manager',
    salary: 90000,
    date_of_joining: new Date('2022-01-15'),
  },
  {
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    department: 'HR',
    position: 'Recruiter',
    salary: 65000,
    date_of_joining: new Date('2021-07-10'),
  },
  {
    first_name: 'Alice',
    last_name: 'Brown',
    email: 'alice.brown@example.com',
    department: 'Marketing',
    position: 'Content Writer',
    salary: 55000,
    date_of_joining: new Date('2020-03-12'),
  }
];

const seedDatabase = async () => {
  try {
    await Employee.deleteMany(); 
    await Employee.insertMany(employees);
    console.log('Test data successfully inserted');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting test data:', error.message);
  }
};

seedDatabase();
