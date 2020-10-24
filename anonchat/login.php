<!DOCTYPE html> 
<html>
    <head>
        <link rel='stylesheet' href='style/materialize.css'>
        <link rel='stylesheet' href='css/login/style.css'>
    </head>
    <body>

        <div id='main'>
            <form method='POST' action='chat'>
                <input id='username' class='white-text' name='username' minlength="2" maxlength="13" required placeholder="username.." autocomplete="none">
                <button id='enter' class='btn'>ENTER</button>
            </form>
        </div>

        <script src='js/login/style.js'></script>
    </body>
</html>