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

/*--------------------------------------------------Connect To Mongo DB------------------------------------------------*/
const username = process.env.USERNAME,
      password = process.env.PASSWORD,
      database = process.env.DB;
const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://${username}:${password}@${database}.1ppdhio.mongodb.net/?retryWrites=true&w=majority`);
/*---------------------------------------------------------------------------------------------------------------------*/


/*-----------------------------------------------------user Api--------------------------------------------------------*/
// create user
app.post("/createUser", async (req,res)=>{
    const {username, password} = req.body
    const user = await UserModel.findOne({username});

    user && res.json({message: "User already exists!"})

    const hashedpassword = bcrypt.hashSync(password,10);

    const newUser = new UserModel({...req.body,
        password:hashedpassword
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

// users get request
app.get("/users", async (req,res)=>{
    const users = await UserModel.find();
    res.json(users);
});
/*---------------------------------------------------------------------------------------------------------------------*/

// add course
app.post("/addCourse",async(req,res)=>{
    const {coursename} = req.body
    const course = await CourseModel.findOne({coursename});
    course && res.json({message: "Course already exists!"})
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
app.get("/Courses", async (req,res)=>{
    const courses = await CourseModel.find();
    res.json(courses);
});

// add lecturers

app.post("/addlecturer",async(req,res)=>{
    const {lecturername} = req.body
    const lecturer = await LecturerModel.findOne({lecturername});
    lecturer && res.json({message: "lecturer already exists!"})
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
app.get("/Lecturers", async (req,res)=>{
    const lecturers = await LecturerModel.find();
    res.json(lecturers);
});

/* ---------------------------------------------------------------------- */
app.post("/register", async (req,res)=>{
    const {username, password} = req.body
    const admin = await AdminModel.findOne({username});

    admin && res.json({message: "Admin already exists!"})

    const hashedpassword = bcrypt.hashSync(password,10);

    const newAdmin = new AdminModel({username,
        password:hashedpassword
    });

    await newAdmin.save();

    return res.json({message:"Admin created succefully"});
});

/* ---------------------------------------------------------------------- */
app.post("/login",async(req,res)=>{
    const {username, password} = req.body

    const user = await UserModel.findOne({username});
    !user && res.status(404).json({message: "user doesn't exists!"});

    const isPasswordValid = await bcrypt.compare(password,user.password);
    !isPasswordValid && res.status(400).json({message: "Username or password is not correct"});

    const token = jwt.sign({id:user._id},process.env.SECRET);
    return res.json({...user})
})

app.listen(_PORT,()=>{
    console.log(`server works on port ${_PORT}!!`);
});