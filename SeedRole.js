const fs = require('fs');
const { default: mongoose } = require('mongoose');
const connectToMongo = require('../../config/db')
connectToMongo()

// userModel
const Role = require('../../models/RoleModel');
const Permission = require('../../models/PermissionModel');

const seedRole = [
    {
        "name":"Super Admin",
        "description":"Access each and every thing",
        "permissions":[]
    },
    {
        "name":"Admin",
        "description":"Access some part of superAdmin",
        "permissions":[] 
    },
    {
        "name":"User",
        "description":"Access some part of Admin",
        "permissions":[] 
    }
]

// to import a data
const importData = async () => {
    try {
        await Role.insertMany(seedRole)
        let permissionId = await Permission.find({name:"see profile"},{_id:1})
        let id = permissionId[0]._id
        let roles = await Role.find()
        for(let i in roles){
            let roleId = roles[i]._id
            await Role.findOneAndUpdate({_id:roleId},{permissions:[id]})
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
