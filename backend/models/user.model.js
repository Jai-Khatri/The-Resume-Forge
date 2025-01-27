import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!!!"],
    },
    resumes: [
      {
        title: {
          type: String,
          required: [true, "Title is required!!"]
        },
        personalInfo: {
          name: {
            type: String,
            required: [true, "Name is required!"],
          },
          email: {
            type: String,
            required: [true, "Email is required!"],
            match: [/.+\@.+\..+/, "Please enter a valid email address!"],
          },
          phone: {
            type: String,
            required: [true, "Phone number is required!"],
          },
          city: { 
            type: String,
            required: [true, "City is required!"],
          },
          summary: {
            type: String,
            maxlength: [800, "Summary cannot exceed 800 characters."],
          },
        },
        education: [
          {
            degree: {
              type: String,
              required: [true, "Degree is required!"],
            },
            institution: {
              type: String,
              required: [true, "Institution name is required!"],
            },
            graduationYear:{
              type: Number,
              required: [true, "Graduation Year is required!"]
            }
          },
        ],
        experience: [
          {
            jobTitle: {
              type: String,
            },
            companyName: {
              type: String,
            },
            startDate: {
              type: Date,
            },
            endDate: {
              type: Date,
            },
            responsibilities: {
              type: String,
            },
          },
        ],
        skills: [
          {
            skillName: {
              type: String,
              required: [true, "Skill name is required!"],
            },
          },
        ],
        certifications:[
          {
             certificationName:{
                 type:String,
                 required:[true,"Certification name is required!"]
             },
             by:{
              type:String,
              required: [true, "Name of Issuer is required!"]
             }
          }
        ],
        customSections:[  
          {
            sectionTitle:{
               type:String,
               required:[true,"Section title is required!"]
             },
             content:{
               type:String,
               required:[true,"Content for the section is required!"]
             }
          }
        ]
      }
    ],
  },
  { timestamps: true, versionKey:false }
);

const User = mongoose.model("User", userSchema);

export default User;
