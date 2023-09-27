const express=require("express")
const {users}=require("../data/users.json")

const router=express.Router()


// * Route:/users
// *Method:get
// *Descriptions:get all users
// *Acess:public
// *parameters:none


router.get("/",(req,res)=>{
    res.status(200).json({
        sucess:true,
        data:users
    })
    
    })

    
// * Route:/users/:id
// *Method:GET
// *Descriptions:get  user by their id
// *Acess:public
// *parameters:ID

router.get("/:id",(req,res) =>{
    const {id}=req.params;
    const user=users.find((each)=> each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"user not found",
        });
    }
     return res.status(200).json({
           succes:true,
           message:"user fouind",
           data:user,
     })
})

// / * Route:/users
// *Method:POST
// *Descriptions:create a new user
// *Acess:public
// *parameters:none

router.get("/",(req,res)=>{

    const {id,name,surname,email,subscriptionType,subscriptionDate}=
    req.body;
    const user=users.find((each)=> each.id===id);
    if(!user){
        return re.status(404).json({
            success:false,
            message:"user exits with this ID",
        })
    }
     users.push({
               id,
               name,
               surname,
               email,
               subscriptionType,
               subscriptionDate,
     });
     return res.status(201).json({
        success:true,
        data:users,
     })
})


// / * Route:/users/:id
// *Method:PUT
// *Descriptions:update user
// *Acess:public
// *parameters:none

router.put("/:id",(req,res)=>{
    const{id}=req.params;
    const{data}=req.body;
     const user=users.find((each)=>each.id===id);
     if(!user)
     return res.status(404).json({
        success:false,
        message:"user does not exit",
    });
    const updateduser=user.map((each)=>{
        if (each.id===id){
            return{
                ...each,
                ...data,
            }
        }
        return each;
    })
    return re.status(200).json({
        status:true,
        data:updateduser,
    })
})


//  * Route:/users/:id
// *Method:DELETE
// *Descriptions:delete an  user
// *Acess:public
// *parameters:none

router.delete("/:id",(req,res)=>{
    const{id}=req.params;
    const user=users.find((each) =>each.id===id)
    if(!user)
    return res.status(404).json({
        status:false,
        message:"user does not exit",});

        const index =users.indexOf(user);
        users.splice(404).json({
            status:true,
            data:user,
        });
})



/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Decsription: Get all user subscription details by their ID
 * Access: Public
 * Paramaters: ID
 */

router.get('/subscription-details/:id', (req, res)=>{
    const {id} = req.params;

    const user = users.find((each)=> each.id === id);
    if(!user)
        return res.status(404).json({success: false, message: "User With The Given Id Doesn't Exist"});

    const getDateInDays = (data = "")=> {
        let date;
        if(data === ""){
            // current Date
            date = new Date();
        }else{
            // getting date on a basis of data variable
            date = new Date(data);
        }
        let days = Math.floor(data / (1000 * 60 * 60 * 24));
        return days;
    };

    const subscriptionType = (date) => {
        if(user.subscriptionType === "Basic"){
            date = date + 90;
        }else if(user.subscriptionType === "Standard"){
            date = date + 180;
        }else if(user.subscriptionType === "Premium"){
            date = date + 365;
        }
        return date;
    };

    // Subscription expiration calcus
    // Jan 1, 1970, UTC // milliseconds
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        daysLeftForExpiration: subscriptionExpiration <= currentDate ? 0 : subscriptionDate - currentDate,
        fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0, 
    }

     res.status(200).json({
        success: true,
        data: data,
     })
})






module.exports=router;


