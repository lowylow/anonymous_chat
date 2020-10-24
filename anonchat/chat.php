<?php
    if (isset($_POST['username']) and (strlen($_POST['username']) >= 2 and (strlen($_POST['username']) <= 13))){
        $entered_as = $_POST['username'];
        if (trim($entered_as) != "[LOG]" and trim($entered_as) != 'lowlow' and trim($entered_as) != 'l0wlow' and trim($entered_as) != 'lowl0w' and trim($entered_as) != 'l0wl0w' and trim($entered_as) != '1owlow' and trim($entered_as) != 'low1ow' and trim($entered_as) != '1ow1ow' and trim($entered_as) != '10w1ow' and trim($entered_as) != '1ow10w' and trim($entered_as) != '10w10w'){
            if ($entered_as == '18211821Acde!'){
                $entered_as = 'lowlow';
                $admin = true;
            }
            else{
                $admin = false;
            }
        include('config/db_connect.php');
?>

<!DOCTYPE html>
<html>
    <head>
        <link rel='stylesheet' href="css/chat/style.css">
        <link rel='stylesheet' href="style/materialize.css">
    </head> 
    <body>
        <div id='main'>
            <div id='middle'>
                <div id='messages'>
                </div>
            </div>
            <div id='bottom'>
                <footer>
                    <div id="send-msg">
                        <span id='chars-left'> 100 chars left.</span>
                        <textarea id='send-context' class='grey lighten-1' maxlength="100" minlength="1" required></textarea>
                        <button id='send' class='btn'>SEND</button>
                <?php
                    if ($admin){?>
                        <!-- If you're not the admin, good job.. You exploited your way in!-->
                        <button id='clearall' class='btn deep-orange' style='position: fixed; transform: translate(-50%,-50%); top: 96.2%; left: 40%;'>CLEAR ALL</button>
                        <script id='welcome-admin!'>
                        document.querySelector('#clearall').onclick = () => {
                            let xml = new XMLHttpRequest();
                            xml.onreadystatechange = () => {
                                if (xml.readyState == 4 && xml.status == 200){
                                    eval(xml.responseText);
                                };
                            };
                            xml.open('GET', 'admincoms.php?com=clear&pass='+document.querySelector('#send-context').value);
                            xml.send();
                        } 
                        </script>
                <?php 
                    } 
                ?>
                        
                    </div>
                </footer>
            </div>
        </div>
        <!--
            <?php 
                foreach(range(0, 100000) as $_){
                    echo "\n";
                };
            ?>
        -->
        <script>const entered_as = "<?=$entered_as?>";</script>
        <script src='js/chat/style.js'></script>
        <script src='js/chat/functionality.js'></script>
        <script src='js/chat/db_functionality.js'></script>
    </body>
</html>

<?php
    }
    else{
        echo '<script> location.href = location.href.replace("/chat", "/login")</script>';
    }
} 
else{
    echo '<script> location.href = location.href.replace("/chat", "/login")</script>';
}
?>