var body = document
body = body.children
body = body[0]
body = body.getElementsByTagName("body")
body = body[0]
//body["ngApp"]= "dragModule"
body["ngApp"]= "dragModule"

const loadScript = function(url){
    const script = document.createElement('script');
    script.src = url;
    //script.id = 'ag007';
    body.appendChild(script);
}

loadScript("https://ajax.googleapis.com/ajax/libs/angularjs/1.4.10/angular.js")
loadScript("script.js")

/*

  <script <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.10/angular.js"></script>
  <script <script src="script.js"></script>
 
ng-app="dragModule"

*/