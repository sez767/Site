const API_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg1ZGVhZjA0ZmIwMjMyMDA5ODg3Yjk3N2JhZTY2Y2VhODMzOGMxOTYwZmU5OGQzMzk5M2EyMTE3MDFlMTkzOWI1MDRlYjFkODllNGJhNWY1In0.eyJhdWQiOiIxMCIsImp0aSI6Ijg1ZGVhZjA0ZmIwMjMyMDA5ODg3Yjk3N2JhZTY2Y2VhODMzOGMxOTYwZmU5OGQzMzk5M2EyMTE3MDFlMTkzOWI1MDRlYjFkODllNGJhNWY1IiwiaWF0IjoxNTkwNDIwOTAxLCJuYmYiOjE1OTA0MjA5MDEsImV4cCI6MTkwNTk1MzcwMSwic3ViIjoiMjEzMSIsInNjb3BlcyI6WyJ1c2VyQmFzZUluZm8iLCJ1c2VyRGV0YWlsZWRJbmZvIiwidXNlckNvdXJzZUluZm8iXX0.5Jp10fsizt8N7bLIkqw0SDm24w2Gcw7sMTGgtvC186bVSf49800ZxjHqiFVmwMjKkbH9-bjc8CoZiSjJIy7wZ4ZRLz8d_rGakj5jcvd8du_ITuPnIBo_uaOOdYPK5YGsEJS_u9ZyhLYeqOzs0fLp0aYMyiVVzDLB5KNlb01pGcm2z3QlvfvpljhdFmzpUBnm_ixMSdADwFb4n4vsGZjnAAlquS6CgtEV8DYlYV0LGn4rAvhMf6-jKk7qkKDjlqxRsML5IetEEmfWIzNf3WNbgtbwxpBRgBktAob4N2MXwvmH8OyEz0BP1xffSuY56OLYLTfpafBLFdLf7pRER921O697Tx16Afp39BppotSmgh9Ltj5M71koeMs5CsHVOidCAM1SvTLjRflWE-cX7nocA62JhdAV1RVdv1jCFttM052m_b565XccLEwnKjVMXRHyY0MRUPk_ws5IJ8oSGKZZyho9GHvxnIZnYkggXD6_W8Sjkj0zj5Hb81B2xGP0JREkF3jmXPQCMrcMaZD8Ey4A3POms4eL_UELufCgGiMAQdV6fHNS1t_JFeeXCaIPru0aZkI4ZFEJdE1QfEEjBTfOjGHsDogwZFPA1sKcq-xZtMjFnEjL1SVh4tcRUl0xVG_bYUwiEGxbLlb6F63M3gMeqsVXYnU2AQ-Ub111_sjEyfk";
let client = new INTITAClient({
  key: API_KEY,
});

client.getUserDetails(function (error, data) {
  console.log(error, data);
  const myName = (document.getElementById("name").innerHTML = data.firstName);
  const mySurName = (document.getElementById("sname").innerHTML = data.secondName);
  const myLivPlace = (document.getElementById("place").innerHTML = data.city + ", " + data.address);
  const myPhone = (document.getElementById("phone").innerHTML = data.phone);
  const myMail = (document.getElementById("email").innerHTML = data.email);
  const myEdu = (document.getElementById("education").innerHTML = data.education);
  const myEduForm = (document.getElementById("eduForm").innerHTML = data.educationForm);
  const trainer = (document.getElementById("trainer").innerHTML = data.trainers["0"].firstName + " " + data.trainers["0"].secondName);
});

client.getUserCoursesAndModules(function (error, data) {
  console.log(error, data);
  let coursesCount = document.getElementById("courses");
  coursesCount.innerText += " " + data.courses[0].title;
  let modulesCount = document.getElementById("modules");

  client.getCourseModules(data.courses[0].id, function (error, Modules) {
    console.log(error, Modules);
    let MODULE = modulesCount;

    Modules.forEach(function (module) {
      let moduleName = module.title;
      let moduleId = module.id;
      let allOfModules = document.createElement("div");

      allOfModules.onclick = function () {
        if (lectures.style.display == "block") {
          lectures.style.display = "none";
        } else {
          lectures.style.display = "block";
        }
      };

      allOfModules.innerHTML = "<li>" + moduleName + "</li>";
      MODULE.appendChild(allOfModules);
      let lectures = document.createElement("ol");
      lectures.style.cssText = "padding-left:90px";
      lectures.style.display = "none";
      allOfModules.appendChild(lectures);

      client.getModuleLectures(moduleId, function (error, Lectures) {
        Lectures.forEach(function (lecture) {
          let lectureName = document.createElement("li");

          lectureName.innerText = lecture.title;
          lectures.appendChild(lectureName);
        });
      });
    });
  });
});

//   client.getUserDetails(function(data, error) {
//   	console.log(error, data);
//   });

//   client.getUserCoursesAndModules(function(error, data) {
//   	console.log(error, data);
//   });

// var element = data.courses[0].id;
//  client.getCourseModules( element, function (error,modules) {
//  	console.log(element,error, modules);
//  });

// client.getModuleLectures(function(error, data) {
// 	console.log(error, data);
// })
