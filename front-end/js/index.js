var sum = 0;
function member_count(j) {
    if (j=1)sum ++;
    else sum--;
    if (sum<0) sum=0;
}
function function_create() {
  var clasname = prompt("Please enter your name", "Class1");
  if (clasname != null) {
    document.getElementById("Class_Title").innerHTML = clasname;
  }
}
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
  });
