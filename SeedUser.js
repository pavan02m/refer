// Bcrypt Package 
const bcrypt = require("bcrypt")
const { default: mongoose } = require('mongoose');
const connectToMongo = require('../../config/db')
connectToMongo()

// userModel
const User = require('../../models/UserModel');
const Role = require('../../models/RoleModel');

const seedUser = [
    {
        "name": "pavan",
        "surname": "metkari",
        "email": "pavan.metkari02@gmail.com",
        "bithDate": "02 oct 2002",
        "gender":"Male",
        "password": "mainahibataunga",
        "roles":[],
    },
]

// to import a data
const importData = async () => {
    try {
        await User.deleteMany()
        await User.insertMany(seedUser)
        let roleId = await Role.find({name:"Super Admin"},{_id:1})
        let id = roleId[0]._id
        let users = await User.find()
        for(let i in users){
            let userId = users[i]._id
            let oldPass = users[i].password
            const salt = await bcrypt.genSalt(10);
            let newPassword = await bcrypt.hash(oldPass, salt);
            await User.findOneAndUpdate({_id:userId},{roles:[id],password:newPassword})
        }
        console.log("Data imported successfully");
        process.exit()
    } catch (error) {
        console.error(error)
    }
}

importData().then(() => {
    mongoose.connection.close()
})    

// check conditions
