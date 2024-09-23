<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        body{
            font-family: Arial, Helvetica, sans-serif;
        }
        .check_mail_btn{
            transition: background 0.3s ease, transform 0.3s ease;
        }
        .check_mail_btn:hover {
        background: rgb(14, 88, 14);
        transform: translate(10px, 10px); /* Example of translation (move right and down by 10px) */
    }

    </style>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>TaskApp</title>
</head>

<body>
    <div class="container">
        <div class="card card-body" style="margin-left: 40px; margin-left:50px;">
            <div align="center">
                <a href="{{url('/')}}"><img width="100" src="{{url('/others/logo.png')}}"></a>
            </div>

            <h3>E-mail Verification.</h3>
            <p>Hello, <br/> <br/>
            we have sent you this email to check if this email: <a href="#">{{ $user->email }}</a> you've provided is a valid one; click on the link to verify it.
        </p><br />
        <a style="font-weight:bold;color:#fff; text-decoration:none; background:rgb(49, 207, 49); padding:10px; border-radius:10px" class="check_mail_btn" target="_blank" href="http://127.0.0.1:8000/check_email/{{$user->remember_token}}">Check my email</a>  </p><br/>
		<p>Yours sincerely.</p>
        </div>
    </div>
</body>
</html>
