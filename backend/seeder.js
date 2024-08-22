import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModels.js";
import Product from "./models/products.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async  ()=>{
    try{
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]?._id;

        const sampleProducts = products?.map((product)=>{
            return {...product, user:adminUser};
        })

        await Product.insertMany(sampleProducts);

        console.log("Data imported:-".green.inverse);
        process.exit();

    }catch(error){
        console.error(`${error}`.red.inverse)
         process.exit(1);
    }
}

const destroyData = async ()=> {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log("Data destroyed".red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

// node seeder -d
// node seeder -h
// [
//     'C:\\Program Files\\nodejs\\node.exe',
//     'D:\\proshop\\backend\\seeder',
//     '-hello'
// ]

if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}