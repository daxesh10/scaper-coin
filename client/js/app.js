 

//           var config = {
//     apiKey: "AIzaSyAyq26wbymvfgUZnkZPU0_-EUgs73jG7Jk",
//     authDomain: "my-project-1470706710924.firebaseapp.com",
//     databaseURL: "https://my-project-1470706710924.firebaseio.com",
//     projectId: "my-project-1470706710924",
//     storageBucket: "my-project-1470706710924.appspot.com",
//     messagingSenderId: "805918855405"
//   };

//  firebase.initializeApp(config);



 var config = {
    apiKey: "AIzaSyA_ECTvmFcCLgJdgWVflcRtMkEszNmloOQ",
    authDomain: "mydata-d5748.firebaseapp.com",
    databaseURL: "https://mydata-d5748.firebaseio.com",
    projectId: "mydata-d5748",
    storageBucket: "mydata-d5748.appspot.com",
    messagingSenderId: "1097794308491"
  };
 firebase.initializeApp(config);



        var app =  angular.module('firstApplication', ['ngRoute','ngAnimate','ngAria','ngMaterial','ngRoute','firebase','ngMessages'])
                 
         app.controller('myctrl',['$scope','$log','$firebaseObject','$firebaseArray','$mdSidenav','$mdDialog','$mdToast','$timeout','$rootScope',
         ($scope,$log,$firebaseObject,$firebaseArray,$mdSidenav,$mdDialog,$mdToast,$timeout,$rootScope)=>{

             $scope.dev = " daxesh mehra" 


             let updateViews=()=>{

                    let ref = firebase.database().ref('mydata')
                    let views = ref.child("/websiteData/views/-Kq0-hPtqXjvWpHqeFd3")            
                    let obj = $firebaseObject(views)            
                    obj.$loaded().then(function(){

                        $scope.views = obj.$value
                    })

             }

             $scope.updateViews = ()=>{
                    let ref = firebase.database().ref('mydata')
                    let views = ref.child("/websiteData/views/-Kq0-hPtqXjvWpHqeFd3")            
                    let obj = $firebaseObject(views)            
                    obj.$loaded().then(function(){

                        let val =  obj.$value
                        val++
                        $log.info("view vals", val)
                        ref.child("/websiteData/views/-Kq0-hPtqXjvWpHqeFd3").set(val)
                        
                        
                    })

                    updateViews()
            }


           







          let getDoctorLocations = ()=>{   
            let ref = firebase.database().ref('mydata')
            let docs = ref.child("doctors").child("loaction")
            let obj = $firebaseObject(docs)
            console.log("doc ctrl",obj)
          }

          $scope.googleLogin = function(){  
              
              console.log("clicked")
                // Using a popup.
                var provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('google');
                provider.addScope('daxeshmehra30@gmail.com');
                provider.addScope('thankyou')
                firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                });

                
          }


          let loginToast =(msg)=>{

              $mdToast.show(
                $mdToast.simple()
                    .textContent(msg)
                    .position('top left')
                    .hideDelay(4000)
                    
                );

                            }

                            $scope.loginToast = loginToast


            $scope.logout = ()=>{

                firebase.auth().signOut().then(function() {
                    // Sign-out successful.
                    console.log("user ha signed out ")

                         if($scope.profileToggle) 
                         {
                          $scope.profileToggle = false;
                          $scope.loginToggle = true;
                         }

                        loginToast($rootScope.cUser.email+" log out ")

                    }).catch(function(error) {
                    // An error happened.

                    console.log("user could not log out ")

                    });

            }                
          

            $scope.signupWithEmail = function()
            {
                console.log($scope.user.email)
                console.log($scope.user.password)

                firebase.auth().createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    
                        console.log(errorCode , errorMessage)
                     $scope.signUpError = error.message
                     $scope.loginToast(error.message)
                       
                        $timeout(function(){
                            $scope.signUpError = ""
                        },7000) 
                    // ...
                    });


                    try 
                    {           
                                let currentuser = {};
                    
                                firebase.auth().onAuthStateChanged(firebaseUser=>{
                                    // Currentuser.name = firebaseUser.email
                                        currentuser.email = firebaseUser.email;
                                        currentuser.uid = firebaseUser.uid;
                                        currentuser.auth = firebaseUser.emailVerified;

                                        console.log("signed in user ",JSON.stringify(currentuser))

                                        if(currentuser.email != null)
                                        loginToast(" user "+currentuser.email+" created ")

                                        $scope.loginToggle = false;
                                        $scope.profileToggle = true;
                                        $scope.currentUser = firebaseUser
                                        $rootScope.cUser = firebaseUser

                                       //  console.log(($rootScope.cUser)?" email "+$rootScope.cUser.email:"email not present")
                                }) 
                        
                    
                
            
                    } catch (error) 
                    {
                        console.log(error)    
                    }
                    

                   
            }

            $scope.signinWithEmail = ()=>{

                console.log("singim email",$scope.user.email)
                console.log("singim password",$scope.user.password)

                
                const promise = firebase.auth().signInWithEmailAndPassword($scope.user.email,$scope.user.password)
                promise.catch(function(error) {
                    // Handle Errors here.


                    
                    console.log("error",error.message)
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    $scope.loginToast(error.message)
                    $scope.loginError = error.message
                    if(error)
                    {
                           
                        
                        $timeout(function(){
                            $scope.loginError = ""
                        },7000) 
                    }
                    
                    });
                    // ...
                  
                    
                    try 
                    {

                                   let currentuser = {}
                    
                                    firebase.auth().onAuthStateChanged(firebaseUser=>{
                                        
                                        currentuser.email = firebaseUser.email,
                                        currentuser.uid = firebaseUser.uid;

                                        console.log("signed in user ",currentuser)

                                        if(currentuser.email != null)
                                        loginToast(" user "+currentuser.email +" logged in")

                                        $scope.loginToggle = false;
                                        $scope.profileToggle = true;
                                        $scope.currentUser = firebaseUser
                                        $rootScope.cUser = firebaseUser

                                        //console.log(($rootScope.cUser)?" email "+$rootScope.cUser.email:"email not present")
                                })



                    } catch (error)
                    {
                        console.log(error)

                    }

                  
                    

                   

            }


            $scope.loginTog = ()=>{ $scope.loginToggle =!$scope.loginToggle}
             //for sidenavs
              
              $scope.openRightMenu = function() {
               $mdSidenav('left').toggle();
             };

          

             let Profile = ()=>
             {

                 const auth = firebase
                 let user = auth.getInstance().getCurrentUser();
                    if(user!=null)
                    {
                        let name = user.getDisplayName()
                        , email = user.getEmail()
                        , photoUrl = user.getPhotoUrl();

                        // Check if user's email is verified
                        let emailVerified = user.isEmailVerified();

                        let userProfile = {}

                        userProfile['name'] = name
                        userProfile['email'] = email
                        userProfile['photoUrl'] = photoUrl
                        userProfile['auth']= emailVerified

                        $scope.userProfile = userProfile

                        console.log(userProfile)
                    }
                    else
                    {
                        $scope.userProfile = "login first"
                        console.log(userProfile)
                    }

             }
            // Profile()


         }])
         app.config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });


  app.controller("profileCtrl",function($scope){

$scope.currentUser = false

  })

 app.controller("viewsCtrl", function($scope,$firebaseObject,$firebaseArray,$log,$http)
    {
           let updateLikes=()=>{

                    let ref = firebase.database().ref('mydata')
                    let likes1 = ref.child("/websiteData/likes/-Kq0-DDwPPdIfrCFhe1L")            
                    let obj1 = $firebaseObject(likes1)            
                    obj1.$loaded().then(function(){

                        $scope.likes = obj1.$value
                    })

             }

             updateLikes()
             
             $scope.updateLikes = ()=>{
                   
                   $log.info("clikced like")
                    let ref = firebase.database().ref('mydata')
                    let likes = ref.child("/websiteData/likes/-Kq0-DDwPPdIfrCFhe1L")            
                    let obj = $firebaseObject(likes)            
                    obj.$loaded().then(function(){

                        let val =  obj.$value
                        val++
                        $log.info("likes vals", val)
                        ref.child("/websiteData/likes/-Kq0-DDwPPdIfrCFhe1L").set(val)
                        
                        
                    })

                    updateLikes()
                }
    })
       
  app.controller("jobListCtrl",
  function($scope,$firebaseObject,$firebaseArray,$log)
    {
            
         
            let ref = firebase.database().ref('mydata')
            let jobLocs = ref.child("linkedin")
            let obj = $firebaseObject(jobLocs)
            
            obj.$loaded().then(function(){

                // let jobLocations = []
                // angular.forEach(obj,function(value,locationKey){

                //     console.log(obj[locationKey])
                //     jobLocations.push(obj[locationKey])

                // })
                // if(jobLocations.length >0)
                // {
                //     $scope.jobLocations = jobLocations
                // }

                $scope.jobLocations = obj

            })

            $scope.jobListing = function(x)
            {

                
                //val here will be relevance
               Object.keys(x).forEach((val,index)=>{

                //    Object.keys(x[val]).forEach((relevanceVal,relevanceIndex)=>{

                //         console.log(relevanceVal)
                //    })
              
              //  console.log(x[val]) comapny and easylinks Object
                    $scope.jobList = x[val]
               })
                $scope.loginToast("    -- company or easyLinks to refresh !! -- ")
               $scope.showJobList = true
              
            }

            $scope.showListedJobs = function(jobListVal,jobListKey)
            {
                console.log("joblist key",jobListKey)
                if(jobListKey==='company')
                {
                        console.log("joblist")
                        let companyList = []
                        Object.keys(jobListVal).forEach((val,index)=>{

                                console.log("filet "+val+" val "+jobListVal[val])
                                companyList.push(jobListVal[val])

                        })
                         $scope.companyList = companyList
                }
                else if(jobListKey==='easyLinks')
                {
                         let easylinksCompany = []   
                         Object.keys(jobListVal).forEach((val,index)=>{

                             if(val==='company')
                             {

                                 //console.log(" vals "+val+" val "+JSON.stringify(jobListVal[val])+"index "+index) index:0
                                 Object.keys(jobListVal[val]).forEach((easyVal,index)=>{

                                //      // console.log("filet "+val+" val "+jobListVal[val][easyVal])

                                  console.log(" easyVal "+easyVal +" index "+index +" jobListVal[val][easyVal] "+ JSON.stringify(jobListVal[val][easyVal])) 
                                  easylinksCompany.push(jobListVal[val][easyVal])
                                //         console.log(" val "+JSON.stringify(jobListVal[val])+"index "+index)
                                        
                                  })
                             }
                         })
                         if(easylinksCompany.length>0)
                         {
                             $scope.easylinksCompany = easylinksCompany
                         }

                }
                else
                {
                    console.log("no results")
                }


            }

            $scope.jobLocationClick = function(x)
            {

                
                $scope.x = x
           //     $scope.x = $routeParams.x;                     

                let jobType = jobLocs.child(x)
                let obj = $firebaseObject(jobType)
              

                obj.$loaded().then(function(){

                        let jobTitles = []

                        angular.forEach(obj,function(value,jobTitleKey){

                            console.log(obj[jobTitleKey])
                            jobTitles.push(jobTitleKey)
                        })

                        if(jobTitles.length > 0 )
                        {
                            console.log("titels",jobTitles)
                            $scope.jobTitles = jobTitles
                        }
                })

                $scope.showJobTitles = !$scope.showJobTitles
                
            } 
            
            
            
            
            
            
            
            // $scope.jobName = " dex Jobs Listing";

            // let companys = firebase.database().ref('mydata').child("linkedin").child("Los Angeles, California/Computer Science/relevance/company")
            // let obj = $firebaseObject(companys)
                
            // obj.$loaded().then(function(){

            //     let relevanceCompanyList = []
            //       //for all relevance comapny  
            //      angular.forEach(obj,function(value,lkey){


            //     //for each individual comapny
            //     //      Object.keys(obj[lkey]).forEach((val,index)=>{

            //     //     console.log("vals ",obj[lkey]['companyTitle'])
                    
            //     // })

            //     console.log("all objs of comapny ",obj[lkey])
            //     relevanceCompanyList.push(obj[lkey])
            //      })

            //    if(relevanceCompanyList.length > 0)
            //    {
            //        $scope.relevanceCompanyList = relevanceCompanyList
            //    }  
                

            // })


    })



  app.controller("blogCtrl",function($scope,$log,$mdToast) {
  this.myDate = new Date();
  this.isOpen = false;




$scope.blogList = []

$scope.blogInit=
{

    name:"DEX",
    desc:"Just me, myself and I, exploring the universe of uknownment. I want to share my curosity with you.",
    title:"BLOCKCHAIN",
    date:"04/07/2016",
    imgUrl:"assets/images/blockchain.jpg",
    avatar:"assets/images/avatars/1.jpg",
    content:"Blockchain is the world's leading software platform for digital assets. Offering the largest production blockchain platform in the world, we are using new technology to build a radically better financial system. Our software has powered over 100M transactions and empowered users in 140 countries across the globe to transact quickly and without costly intermediaries. We also offer tools for developers and real time transaction data for users to analyze the burgeoning digital economy"



}

let ref = firebase.database().ref('mydata').child('blogs')

$scope.blogList.push($scope.blogInit)


$scope.getRandomSpan = function(){
  return Math.floor((Math.random()*6)+1);
}


$scope.subBlog = function()
{


var blogDetail = 
{
    name:$scope.user.name,
    desc:$scope.user.desc,
    title:$scope.user.title,
    date:new Date(),
    imgUrl:$scope.user.imgUrl,
    content:$scope.myTextarea,
    avatar:$scope.getRandomSpan()

}

$scope.blogList.push(blogDetail)
    $log.info("summbit was clicked !!",JSON.stringify($scope.blogList))

//tosting
$mdToast.show(
      $mdToast.simple()
        .textContent('blog event submited!')
        .position('top right')
        .hideDelay(3000)
    );

}



})

       
       
      app.directive("w3", function() {
    return {
        restrict : "A",
        //template : "<h1>Made by a directive!</h1>"
        templateUrl : "views/page1.html",
        controller: "blogCtrl"
    };
});
        
app.directive("my",function(){
    return{
        restrict:"A",
        templateUrl:"views/myInfo.html"
    }
})        
      
    

app.directive("blog",function(){
    return{
        restrict:"A",
        templateUrl:"views/blogForm.html",
        controller: "blogCtrl"
    }
})        
          
app.directive("loginform",function(){
    return{
        restrict:"ACE",
        templateUrl:"views/login.html"
     
    }
})        
app.directive("joblist",function(){

    return {

        restrict:"ACE",
        templateUrl:"views/jobList.html",
        controller: "jobListCtrl"
        
    }
})
app.directive("profile",function(){

    return {

         restrict:"ACE",
        templateUrl:"views/userProfile.html",
        controller: "profileCtrl"
    }
})
app.directive("cards",function(){

    return {

         restrict:"ACE",
        templateUrl:"views/companyCardList.html",
        controller: "jobListCtrl"
    }
})
app.directive("easycards",function(){

    return {

         restrict:"ACE",
        templateUrl:"views/easyLinksCard.html",
        controller: "jobListCtrl"
    }
})
app.directive("login2",function(){

    return {

         restrict:"ACE",
        templateUrl:"views/login2.html",
        
    }
})

app.directive("signup",function(){

    return {

         restrict:"ACE",
        templateUrl:"views/signup.html",
        
    }
})

app.directive("user",function(){

    return {

         restrict:"ACE",
        templateUrl:"views/user.html",
        
    }
})
 

app.directive("main",function(){

    return {

         restrict:"ACE",
        templateUrl:"views/mainPage.html",
        
    }
}) 

app.directive("logo",function(){

    return {

         restrict:"ACE",
        template:"<div id='header'><div id='logoContainer'><span><div id='logo'></div></span></div></div>",
        
    }
}) 
app.directive("maps",function(){

    return {

         restrict:"ACE",
         templateUrl:"views/map.html"
        
    }
}) 

app.directive("views",function(){

      return {

         restrict:"ACE",
       templateUrl:"views/websiteView.html"
      // controller:"viewsCtrl"
        
    }
})

app.directive("likes",function(){

      return {

         restrict:"ACE",
       templateUrl:"views/websiteLikes.html"
     // controller:"viewsCtrl"
        
    }
})

app.controller('mapCtrl', function($scope) {
      
       $scope.initialize = function() {
          var map = new google.maps.Map(document.getElementById('map_div'), {
             center: {lat: -34.397, lng: 150.644},
             zoom: 8
          });
       }    
       
       google.maps.event.addDomListener(window, 'load', $scope.initialize);   

    });