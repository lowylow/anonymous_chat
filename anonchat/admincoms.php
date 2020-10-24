<?php
    if (isset($_GET['pass']) and substr_count($_GET['pass'],18211821)){
        if ($_GET['com'] == 'clear'){
            include('config/db_connect.php');
            $sql = 'DELETE FROM `message_info`';
            mysqli_query($conn, $sql);
            $timestamp = date('U');
            $sql = "INSERT INTO `message_info`(`author`, `context`, `sent_at`, `reload_needed`) VALUES ('[LOG]','Admin has cleared the chat.','$timestamp', 1)";
            mysqli_query($conn, $sql);
            echo "location.reload();";
        }
    }
?>