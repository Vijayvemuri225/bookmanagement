const express=require("express");
const{books}=require("../data/books.json");
const{users}=require("../data/users.json");
const router=express.Router();


// * Route:/boooks
// *Method:GET
// *Descriptions:get all books
// *Acess:public
// *parameters:none

router.get("/",(res,req)=>{
    res.status(200).json({
        success:true,
        data:books,

    })
})


// * Route:/books/:id
// *Method:get
// *Descriptions:get  books by their id
// *Acess:public
// *parameters:ID

router.get("/:id",(res,req)=>{
    const{id}=req.params
    constbook=books.find((each)=>each.id===id)
    if(!book){
        return res.status(404).json({
            succes:false,
            message:"book not found",
            
        })
       
    }
    return res.status(200).json({
        succes:true,
        data:books,
    })

})


// / * Route:/books/issued/books
// *Method:GET
// *Descriptions:get all issued books
// *Acess:public
// *parameters:none


router.get("/issued/books",(req,res)=>{
    const userwithissuedBooks=users.filter((each)=>{
        if (each.issuedBook) return each;
    })
    const issuedBooks=[];
    userwithissuedBooks.foreach((each)=>{
        const book=books.find((book)=>book.id===each.issuedBook);

        book.issuedBy=each.name;
        book.issuedDate=each.issuedDate;
        book.returnDate=each.returnDate;
        issuedBooks.push(book)
    });
    if(issuedBooks.length===0){
        return res.status(404).json({
            success:false,
            messasage:"no boook issued yet"
        })
    }
    return res.status(200).json({
        success:true,
        data:books,
    })

})


// / * Route:/books
// *Method:POST
// *Descriptions:get all issued books
// *Acess:public
// *parameters:none
// *Data=id,publisher,author,name,price,genre

router.post("/",(req,res)=>{
    const{data}=req.body;

    if(!data){
    return res.status(404).json({
      success:false,
      message:"no data provided"

})
}
const book=books.find((each)=>each.id===data.id);
if(book){
    return res.status(200).json({
        status:true,
        message:"book with this data already provided",
    })
}
const allBooks=[...books,data];
return res.status(200).json({
success:true,
data:allBooks,
})
})

// / * Route:/books/:id
// *Method:PUT
// *Descriptions:update by bits id
// *Acess:public
// *parameters:id

router.put("/:id",(res,req)=>{
    const {id}=req.params;
    const{data}=req.body;
    const boook=books.find((each)=>each.id===id)

    if(!id){
        return res(400).json({
            success:false,
            meaning:"book not found"
        });
    }
    const updatebook=user.map((each)=>{
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
        data:updatebook,
    })
    })
    

// to export the router
module.exports=router;