const mongoose = require('mongoose');




 async  function connectToDb (){
   // mongodb+srv://dath33603:<password>@cluster0.bcy0tpl.mongodb.net/
    try{
     await   mongoose.connect('mongodb+srv://dath33603:j56Ww6AGIDhtq5Xq@cluster0.bcy0tpl.mongodb.net/instagram_clone')
     console.log('connect successfully')      

    }catch(e){
        console.log(e)
    }
}



module.exports = { connectToDb }