const fs = require('fs');
const { default: mongoose } = require('mongoose');
const connectToMongo = require('../../config/db')
connectToMongo()

// userModel
const Permission = require('../../models/PermissionModel');

const seedPermissions = [
    {
        "name":"see profile",
        "description":"Access each and every thing",
    },
    {
        "name":"add grevience",
        "description":"Access some part of superAdmin", 
    }
]

// to import a data
const importData = async () => {
    try {
        await Permission.insertMany(seedPermissions)
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
