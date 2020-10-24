<?php
    include('config/db_connect.php');

    if (isset($_GET['msg']) and isset($_GET['author'])){
        $author = $_GET['author'];
        $msg = $_GET['msg'];
        if (strlen($author) >= 2 and strlen($author) <= 13 and strlen($msg) >= 1 and strlen($msg) <= 100){
            $timestamp = date('U');
            $sql = $conn->prepare("INSERT INTO `message_info`(`author`, `context`, `sent_at`) VALUES (?, ?, ?)");
            $sql->bind_param('sss', $author, $msg, $timestamp);
            $sql->execute();
            if (mysqli_error($conn)){
                echo mysqli_error($conn);
            }
            else{
                echo 'Message sent!';
            }
        }
        else{
            echo '[OOF] Your name and text should meet our standards (2 <= author <= 6) (1 <= msg <= 255)';
        }
    }
    else{
        echo '[OOF] Don\'t skip the username or message context step. ("/login" for username) (input bar for message context)';
    }

?>