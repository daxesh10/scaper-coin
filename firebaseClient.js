let firebase = require('firebase-admin')
,serviceAcc = require('./serviceAccount.json')


firebase.initializeApp({
    credential: firebase.credential.cert(serviceAcc),
    databaseURL: "https://mydata-d5748.firebaseio.com"

});

//console.log(firebase)

let ref = firebase.database().ref('mydata')
let msgref = ref


//like and views 
let initLikes = ()=>{

let likeref = ref.child('/websiteData/likes')
likeref.push("20")



}

let initViews = () =>{

    let likeref = ref.child('/websiteData/views')
likeref.push("20")
}


let update=(val)=>{

        let updateRef1 = ref.child('/websiteData/likes/-Kq0-DDwPPdIfrCFhe1L')
            updateRef1.set(val)
            console.log("val is",val)
        }


let updateLikes = ()=>{

        let updateRef = ref.child('/websiteData/likes/-Kq0-DDwPPdIfrCFhe1L')
        
            updateRef.on('value',snap=>{

            let val = snap.val()
            val++
            update(val)

            })
}



let getLikes = (callback)=>{

let updateRef = ref.child('/websiteData/likes/-Kq0-DDwPPdIfrCFhe1L')
 updateRef.on('value',snap=>{

     let value = snap.val()
     

     
     callback(value)
 })

}



let updateViews = ()=>{

let updateRef = ref.child('/websiteData/views/-Kq0-hPtqXjvWpHqeFd3')

    let update=(val)=>{

        updateRef.set(val)
    }
    
    updateRef.on('value',snap=>{

      let val = snap.val()
      val++
      update(val)
      
        console.log("likes :"+snap.val())
    })
}


let postReview = (reviewObj)=>{

    let reviewRef = ref.child("/websiteData/reviews")    

    reviewRef.push(reviewObj)

}

let getReviews = (callback)=>{

let reviewRef = ref.child("/websiteData/reviews")
let reviews = []
reviewRef.on("value",snapshot=>{

        Object.keys(snapshot.val()).forEach((rkey,index)=>{

                reviews.push(snapshot.val()[rkey])

        })

        callback(reviews)

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
})


}

// let reviewObj = {

//         "name":"dax",
//         "email":"daxshmehra101@gmail.com",
//         "msg": "test for review 2"
//     }

// postReview(reviewObj)
// getReviews(review=>console.log("posted review ",JSON.stringify(review)))







let fbinit = (fbpath)=>
{

msgref = ref.child(fbpath)

}

let fbinitReturn = (fbpath)=>
{
msgref = ref.child(fbpath)
return msgref
}

let addWithRef = (msgref,obj)=>
{
    msgref.push(obj)
    status()
}

let getKeys = (loc,callback)=>
{
    let myurl = {},keys=[]
let urls = firebase.database().ref('mydata/'+loc)
urls.once("value",function(snapshot){

 myurl = snapshot.val() 
 Object.keys(myurl).forEach(item=>{

     console.log("inside",item)
     keys.push(item)
 })


console.log("outside",keys)
callback(keys)
})



}

let myurl = {}
let getValue = function(loc,callback)
{


let urls = firebase.database().ref('mydata/'+loc)
let urlA = []
urls.once("value",function(snapshot){
 
        
  //      if(snapshot.exists())
 //       {
        myurl = snapshot.val()
        //console.log("myurl ",myurl)
        
        Object.keys(myurl).forEach(item=>{

           // console.log(myurl[item])
            urlA.push(myurl[item])
        })


        //console.log("returning ",urlA)
        callback(urlA)
       // }

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
})

 

}


let myurls = {}
let getValueObj = function(loc,callback)
{


let urls = firebase.database().ref('mydata/'+loc)
let urlA = []
urls.once("value",function(snapshot){
 
        
       if(snapshot.exists())
       {
        myurls = snapshot.val()
 
        callback(myurls)
       }

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
})

 

}



//info for firebase updates
let status = ()=>{

msgref.orderByKey().limitToLast(1).on('child_changed',function(snap){

    console.log('changed: '+ JSON.stringify(snap.val()))
})

msgref.orderByKey().limitToLast(1).on('child_removed',function(snap){
    console.log('deleted : '+ JSON.stringify(snap.val()))
})

msgref.orderByKey().limitToLast(1).on('child_added',function(snap){
       console.log('added new entry')//+ JSON.stringify(snap.val()))
})

}

let addEntry = (obj)=>{

  msgref.push(obj)
 // console.log('msg key', msgref.push().key)
  status()      

}

let delEntry = (key)=>{

msgref.on("value",(snapshot)=>{

    if(snapshot.exists())
    {
        msgref.child(key).remove()
        status()
    }
})

// msgref.orderByKey().limitToLast(1).on('value',function(snap){
//     console.log(snap.val())
// })

//console.log(msgref.child(key))

 
}

let delWithRef = (fbpath,key)=>{

msgref.child("/"+fbpath).child(key).remove()
status()

}

// msgref.once('value').then(function(snapshot){

//     console.log('key: '+snapshot.key+'\n')
//     console.log('values: '+JSON.stringify(snapshot.val())+'\n')
//     console.log('refence'+snapshot.ref.toString()+'\n')
// })

// msgref.child("-KhUBFg7FiX3brk3BHhW").set({name:"hello guys !!",count:3})
// ref.child("-KhUBFg7FiX3brk3BHhW").remove()

let getall = (callback)=>{

let values = {}
msgref.on('value',function(snapshot){

//console.log(snapshot.val())
let v = snapshot.val()
Object.keys(v).forEach((key)=>{

    values[key] = v[key]
})
//console.log("return from fb values: ",values)
callback(values)
})

}
//return values



/// image downloadewr 
let firebaseSetImageDownload = (obj)=>
{
let ref = firebase.database().ref('mydata/imageDownload/user1/searches').push()

ref.push(obj)

}
let firebaseGetRecentImageDownload = (callback)=>{

let ref = firebase.database().ref('mydata/imageDownload/user1/searches')

let results = []
ref.on('value',function(snapshot){

//console.log(snapshot.val())
let searches = snapshot.val()
Object.keys(searches).forEach((sval,index)=>{

    Object.keys(searches[sval]).forEach((val,index)=>{

        //console.log(searches[sval][val])
        results.push(searches[sval][val])
    })
})

    return callback(results.pop())
//console.log(results.pop())
})//on value

}






module.exports = {

add:addEntry,
deleted:delEntry,
getall:getall,
getValue:getValue,
fbinit:fbinit,
fbinitReturn:fbinitReturn,
addWithRef:addWithRef,
getKeys:getKeys,
delWithRef:delWithRef,
getValueObj:getValueObj,
firebaseSetImageDownload:firebaseSetImageDownload,
firebaseGetRecentImageDownload:firebaseGetRecentImageDownload,
updateViews:updateViews,
updateLikes:updateLikes,
postReview:postReview,
getReviews:getReviews,
getLikes:getLikes

}




 //delEntry('KhUBFgIOnDACzbBNXA6')