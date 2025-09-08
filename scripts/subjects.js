/* 
    1. window.location.search gives the query string part of
       the url i.e everything after ?. here in this case ?data=ssc
    2. new URLSearchParams() creates on object that extract query
    3. params.get("data") get the value of data
    4. decodeURIComponent() converts URL-encoded characters into normal
        text -> %20 bacomes (space)
*/
const params = new URLSearchParams(window.location.search);
const examName = decodeURIComponent(params.get("data"));

console.log(examName);
