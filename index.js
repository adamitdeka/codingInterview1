var lstEmp = "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php";
var lstRoles = "http://sandbox.bittsdevelopment.com/code1/fetchroles.php";
//function to get data from api endpoints
var getData = (url, callback) =>{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = ()=>{
        var status = xhr.status;
        if(status === 200){
            callback(null, xhr.response);
        }
        else{
            callback(status, xhr.response);
        }
    };
    xhr.send();
}

window.onload = () => {
    getData(lstEmp, (err, data) =>{
        if(err !== null){
            console.log('Something is wrong:',err);
        }
        else{
            console.log("script running");
            console.log(Object.values(data));
            Object.values(data).map(makeList);
        }
    });
};

function makeList(empObj){
    var output = document.getElementById('main-container');
    var empId = empObj.employeeid;
    var empFName = empObj.employeefname;
    var empLName = empObj.employeelname;
    var empBio = empObj.employeebio;
    var empRoles = empObj.roles;
    var empImg = "";
    if(empObj.employeehaspic == 1){
        empImg = "http://sandbox.bittsdevelopment.com/code1/employeepics/"+empId+".jpg";
    }
    var card = "<div class='card-container'>";
    card += "<div class='f-icon-outer'>";
    card +="<div id='crown-"+empId+"' class='f-icon-container'>";
    card +="<img src='crown.svg' class='f-icon'>";
    card +="</div>";
    card +="</div>";
    card +="<div class='emp-img-container'>";
    card +="<img src='"+empImg+"' class='emp-img' alt='Profile picture'>";
    card +="</div>";
    card +="<span class='emp-name'>"+empFName+" "+empLName+"</span>";
    card +="<span class='emp-bio'>"+empBio+"</span>";
    card +="<div id = 'role-container"+empObj.employeeid+"' class='emp-roles-container'>";
    card +="</div>";
    card +="</div>";

    output.innerHTML += card;
    Object.values(empRoles).map(populateRoles);
    function populateRoles(roleObj){
        var roleContainer = document.getElementById('role-container'+empId);
        roleContainer.innerHTML += "<span class='emp-roles' style = 'background-color:"+roleObj.rolecolor+"'>"+roleObj.rolename+"</span>";
    }

    if(empObj.employeeisfeatured != 1){
        document.getElementById('crown-'+empId).classList.add('hidden');
    }



}