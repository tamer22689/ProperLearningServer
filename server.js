// Create Server
const express = require("express");
const app = express();
const _PORT = process.env.PORT;
const cors = require("cors");
app.use(cors());
app.use(express.json());

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin/User/Course/Lecturer Models
const AdminModel = require('./models/Admins');
const UserModel = require('./models/Users');
const CourseModel = require("./models/Courses");
const LecturerModel = require("./models/Lecturers");
const ExamModel = require("./models/Exams");


/*--------------------------------------------------Connect To Mongo DB------------------------------------------------*/
const username = process.env.USERNAME,
  password = process.env.PASSWORD,
  database = process.env.DB;
const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://${username}:${password}@${database}.1ppdhio.mongodb.net/?retryWrites=true&w=majority`);
/*---------------------------------------------------------------------------------------------------------------------*/


/*-----------------------------------------------------user Api--------------------------------------------------------*/
// create user
app.post("/createUser", async (req, res) => {
  const { username, password } = req.body
  const user = await UserModel.findOne({ username });

  user && res.json({ message: "User already exists!" })

  const hashedpassword = bcrypt.hashSync(password, 10);

  const newUser = new UserModel({
    ...req.body,
    password: hashedpassword
  });

  await newUser.save();

  return res.json(newUser);

});

// delete user by username
app.delete("/deleteUser/:username", async (req, res) => {
  const { username } = req.params;

  try {
    // Find the user by username
    const user = await UserModel.findOne({ username });

    // If user doesn't exist, return an error message
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user from the database
    await UserModel.deleteOne({ username });

    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while deleting the user" });
  }
});

app.post('/addCourseToUser', async (req, res) => {
  const user = await UserModel.findById(req.body.userid);

  if (!user.courses.find(item => item.courseid === req.body.usedrid)) {
    user.courses = [...user.courses, req.body.course];
  }

  user.save();

  res.json(user);
})

// users get request
app.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});
/*---------------------------------------------------------------------------------------------------------------------*/

// add course
app.post("/addCourse", async (req, res) => {
  const { coursename } = req.body
  const course = await CourseModel.findOne({ coursename });
  course && res.json({ message: "Course already exists!" })
  const newCourse = new CourseModel(req.body);
  await newCourse.save();
  return res.json(newCourse);

})

// delete course by id
app.delete("/deleteCourse/:id", async (req, res) => {
  const { courseid } = req.params;

  try {
    // Find the course by id
    const course = await CourseModel.findOne({ courseid });

    // If course doesn't exist, return an error message
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Delete the course from the database
    await CourseModel.deleteOne({ courseid });

    return res.json({ message: "Course deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while deleting the Course" });
  }
});


// course get request
app.get("/Courses", async (req, res) => {
  // const courses = await CourseModel.find();
  const courses = [
    {
      "id": "0995748",
      "title": "Advanced Java Programming",
      "description": "Take your Java programming skills to the next level with advanced topics such as multithreading, networking, and database connectivity.",
      "imageUrl": "src/assets/images/courses/Java-1.png",
      "lecturer": "Professor John Smith",
      "rating": 4.5,
      "exams": []
    },
    {
      "id": "0995768",
      "title": "C Programming Basics",
      "description": "Get started with the fundamentals of C programming language, including syntax, variables, control structures, and functions.",
      "imageUrl": "src/assets/images/courses/C-2.png",
      "lecturer": "Dr. Emily Brown",
      "rating": 4.2,
      "exams": []
    },
    {
      "id": "0995887",
      "title": "Python Programming for Beginners",
      "description": "Learn the basics of Python programming language, including variables, data types, control flow, and functions.",
      "imageUrl": "src/assets/images/courses/Python-1.png",
      "lecturer": "Dr. Michael Johnson",
      "rating": 4.7,
      "exams": []
    },
    {
      "id": "0997894",
      "title": "PHP Web Development",
      "description": "Explore the world of PHP web development and learn how to build dynamic and interactive websites using PHP and MySQL.",
      "imageUrl": "src/assets/images/courses/Php-1.png",
      "lecturer": "Mr. David Thompson",
      "rating": 4.3,
      "exams": []
    },
    {
      "id": "0927991",
      "title": "Angular for Web Development",
      "description": "Discover the power of Angular framework and learn how to build modern and scalable web applications.",
      "imageUrl": "src/assets/images/courses/Angular-1.png",
      "lecturer": "Ms. Laura Wilson",
      "rating": 4.6,
      "exams": []
    },
    {
      "id": "0971364",
      "title": "HTML and CSS Fundamentals",
      "description": "Master the basics of HTML and CSS to create well-structured and visually appealing web pages.",
      "imageUrl": "src/assets/images/courses/Html-2.png",
      "lecturer": "Dr. Mark Thompson",
      "rating": 4.4,
      "exams": []
    },
  ];
  res.json(courses);
});

app.get("/Course/:id", async (req, res) => {
  // const courses = await CourseModel.find();
  const courses = [
    {
      "id": "0995748",
      "title": "Advanced Java Programming",
      "description": "Take your Java programming skills to the next level with advanced topics such as multithreading, networking, and database connectivity.",
      "imageUrl": "src/assets/images/courses/Java-1.png",
      "lecturer": "Professor John Smith",
      "rating": 4.5,
      "content": [
        {
          "title": "Java",
          "material": "Take your Java programming skills to the next level"
        }, {
          "title": "Java2",
          "material": "Take your Java programming skills to the next level2"
        },
        {
          "title": "Java3",
          "material": "Take your Java programming skills to the next level3"
        },
        {
          "title": "Java4",
          "material": "Take your Java programming skills to the next level4"
        }, {
          "title": "Java5",
          "material": "Take your Java programming skills to the next level5"
        }
        
      ]
    },
    {
      "id": "0995768",
      "title": "C Programming Basics",
      "description": "Get started with the fundamentals of C programming language, including syntax, variables, control structures, and functions.",
      "imageUrl": "src/assets/images/courses/C-2.png",
      "lecturer": "Dr. Emily Brown",
      "rating": 4.2,
      "content": [
        {
          "title": "C Programming",
          "material": "Get started with the fundamentals of C programming language"
        }
      ]
    },
    {
      "id": "0995887",
      "title": "Python Programming for Beginners",
      "description": "Learn the basics of Python programming language, including variables, data types, control flow, and functions.",
      "imageUrl": "src/assets/images/courses/Python-1.png",
      "lecturer": "Dr. Michael Johnson",
      "rating": 4.7,
      "content": [
        {
          "title": "Python",
          "material": "Learn the basics of Python programming language"
        }
      ]
    },
    {
      "id": "0997894",
      "title": "PHP Web Development",
      "description": "Explore the world of PHP web development and learn how to build dynamic and interactive websites using PHP and MySQL.",
      "imageUrl": "src/assets/images/courses/Php-1.png",
      "lecturer": "Mr. David Thompson",
      "rating": 4.3,
      "content": [
        {
          "title": "PHP",
          "material": "Explore the world of PHP web development"
        }
      ]
    },
    {
      "id": "0927991",
      "title": "Angular for Web Development",
      "description": "Discover the power of Angular framework and learn how to build modern and scalable web applications.",
      "imageUrl": "src/assets/images/courses/Angular-1.png",
      "lecturer": "Ms. Laura Wilson",
      "rating": 4.6,
      "content": [
        {
          "title": "Angular",
          "material": "Discover the power of Angular framework"
        }
      ]
    },
    {
      "id": "0971364",
      "title": "HTML and CSS Fundamentals",
      "description": "Master the basics of HTML and CSS to create well-structured and visually appealing web pages.",
      "imageUrl": "src/assets/images/courses/Html-2.png",
      "lecturer": "Dr. Mark Thompson",
      "rating": 4.4,
      "content": [
        {
          "title": "HTML",
          "material": "Master the basics of HTML and CSS"

        }
      ]
    },
  ];
  res.json(courses.find(course => course.id === req.params.id));
});

// add lecturers

app.post("/addlecturer", async (req, res) => {
  const { lecturername } = req.body
  const lecturer = await LecturerModel.findOne({ lecturername });
  lecturer && res.json({ message: "lecturer already exists!" })
  const newLecturer = new LecturerModel(req.body);
  await newLecturer.save();
  return res.json(newLecturer);

})

// delete lecturer by id
app.delete("/deletelecturer/:id", async (req, res) => {
  const { lecturerid } = req.params;

  try {
    // Find the lecturer by id
    const lecturer = await LecturerModel.findOne({ lecturerid });

    // If lecturer doesn't exist, return an error message
    if (!lecturer) {
      return res.status(404).json({ message: "Lecturer not found" });
    }

    // Delete the lecturer from the database
    await LecturerModel.deleteOne({ lecturerid });

    return res.json({ message: "Lecturer deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while deleting the Lecturer" });
  }
});

// lecturer get request
app.get("/Lecturers", async (req, res) => {
  const lecturers = await LecturerModel.find();
  res.json(lecturers);
});

// add exam
app.post("/addExam", async (req, res) => {
  const { examname } = req.body
  const exam = await ExamModel.findOne({ examname });
  exam && res.json({ message: "Exam already exists!" })
  const newExam = new ExamModel(req.body);
  await newExam.save();
  return res.json(newExam);

})

// delete exam by id
app.delete("/deleteExam/:id", async (req, res) => {
  const { examid } = req.params;

  try {
    // Find the exam by id
    const exam = await ExamModel.findOne({ examid });

    // If exam doesn't exist, return an error message
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Delete the exam from the database
    await ExamModel.deleteOne({ examid });

    return res.json({ message: "Exam deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while deleting the Exam" });
  }
});

// exam get request
app.get("/Exams", async (req, res) => {
  const exams = await ExamModel.find();
  res.json(exams);
});

/* ---------------------------------------------------------------------- */
app.post("/register", async (req, res) => {
  const { username, password } = req.body
  const admin = await AdminModel.findOne({ username });

  admin && res.json({ message: "Admin already exists!" })

  const hashedpassword = bcrypt.hashSync(password, 10);

  const newAdmin = new AdminModel({
    username,
    password: hashedpassword
  });

  await newAdmin.save();

  return res.json({ message: "Admin created succefully" });
});

/* ---------------------------------------------------------------------- */
app.post("/login", async (req, res) => {
  const { username, password } = req.body

  const user = await UserModel.findOne({ username });
  !user && res.status(404).json({ message: "user doesn't exists!" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  !isPasswordValid && res.status(400).json({ message: "Username or password is not correct" });

  const token = jwt.sign({ id: user._id }, process.env.SECRET);
  return res.json(user)
})

app.listen(_PORT, () => {
  console.log(`server works on port ${_PORT}!!`);
});