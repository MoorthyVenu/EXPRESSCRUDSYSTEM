
const userdb = require('../model/model')

//create and save new user
exports.create = async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).send({ message: "Content can not be empty" });
      }
  
      const user = new userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
      });
  
      const userdetails = await user.save();
      
      // You can send a success response or perform further actions here if needed.
      // res.status(201).send({ message: "User created successfully", user: userdetails });
      res.redirect('/add-user')
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "An error occurred while creating the user" });
    }
  };
  

//retrive and return all users / single user
exports.find=async (req,res)=>{
    try {
        if(req.query.id){
         const id = req.query.id;
          const users= await userdb.findById(id)
          res.status(201).send({ message: "specific User find successfully", user: users });
        }
        else{
            const user= await userdb.find()
            res.status(201).send({ message: "Users find successfully", user: user });
        }
        
    } catch (error) {
        console.error(error);
      res.status(500).send({ message: "An error occurred when retriving the user" });
    }
}

//update a new identified user by user id
exports.update= async (req,res)=>{
    try {
        if(!req.body){
            return res.status(400).send({ message: "Content can not be empty" });
        }
        const id= req.params.id;

        const user =await userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        res.status(201).send({ message: "User updated successfully", user: user });
        
    } catch (error) {
        console.error(error);
      res.status(500).send({ message: "An error occurred when modifying the user" });
    }
    
}

//delete a user with specific id
exports.delete=async (req,res)=>{
    try {
        if(!req.body){
            return res.status(400).send({ message: "Content can not be empty" });
        }
        const id= req.params.id;

        const user =await userdb.findByIdAndDelete(id)
        res.status(201).send({ message: "User deleted successfully", user: user });
        
    } catch (error) {
        console.error(error);
      res.status(500).send({ message: "An error occurred when deleted the user" });
    }
}


